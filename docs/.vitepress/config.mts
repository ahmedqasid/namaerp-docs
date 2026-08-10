import {defineConfig} from 'vitepress'
import container from 'markdown-it-container'
import {transliterate} from 'transliteration'
import postcssRTLCSS from 'postcss-rtlcss'
import {Mode} from 'postcss-rtlcss/options'
import {SIDEBAR_CONFIG} from './sidebar.js'
import {SECTION_PAGER, SECTION_SIDEBARS} from './section-trees.js'
import {collectPageForSearchIndex, devSearchIndexPlugin, writeSearchIndexJSON} from './search-index-builder.mts'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const HOSTNAME = 'https://docs.namasoft.com/'
const SEARCH_INDEX_STABLE_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), 'search-index.json')

function rtlLtrContainer(md, type) {
    md.use(container, type, {
        render: (tokens, idx) =>
            tokens[idx].nesting === 1 ? `<div dir="${type}" class="${type}-block">\n` : '</div>\n'
    })
}

function writeRedirectsMap(destDir) {
    const map = new Map()
    const collisions = new Map()

    function walk(dir) {
        for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
            const full = path.join(dir, entry.name)
            if (entry.isDirectory()) {
                // Legacy basename short-links always point at the English (root) pages;
                // the /ar/ mirror would otherwise collide with every translated page
                if (dir === destDir && entry.name === 'ar') continue
                walk(full)
                continue
            }
            if (!entry.isFile() || !entry.name.endsWith('.html')) continue
            if (entry.name === 'index.html') continue

            const base = entry.name.slice(0, -'.html'.length)
            const urlPath = '/' + path.relative(destDir, full).split(path.sep).join('/')

            if (map.has(base)) {
                if (!collisions.has(base)) collisions.set(base, [map.get(base)])
                collisions.get(base).push(urlPath)
            } else {
                map.set(base, urlPath)
            }
        }
    }

    walk(destDir)

    for (const [base, paths] of collisions) {
        map.delete(base)
        console.warn(`[redirects] duplicate basename "${base}" — no redirect generated:\n  ` + paths.join('\n  '))
    }

    const lines = [...map.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}\t${v}`)
        .join('\n')
    fs.writeFileSync(path.join(destDir, 'redirects.txt'), lines + '\n', 'utf8')
    console.log(`[redirects] wrote ${map.size} entries to redirects.txt (${collisions.size} basenames skipped)`)
}

function pageUrl(relativePath) {
    return HOSTNAME + relativePath.replace(/\.md$/, '.html').replace(/(^|\/)index\.html$/, '$1')
}

// The keys GenNamaDocsIndex writes into section-trees.js: the folder holding the page, and the page itself
function folderKey(relativePath) {
    return '/' + relativePath.replace(/[^/]*\.md$/, '')
}

function pageKey(relativePath) {
    return '/' + relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
}

// VitePress's dead-link checker only validates markdown-syntax links; links rendered by a Vue
// component (LandingCard props, the page-data driven sidebar) become raw <a> tags it never inspects.
// This walks the built output and fails the build on any of them that doesn't resolve.
function validateComponentLinks(outDir, base) {
    const broken = []
    let checked = 0
    const anchorRe = /<a\b[^>]*\bclass="[^"]*\b(?:landing-card|section-link)\b[^"]*"[^>]*>/g
    const hrefRe = /\bhref="([^"]+)"/

    function walk(dir) {
        for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
            const full = path.join(dir, entry.name)
            if (entry.isDirectory()) {
                walk(full)
                continue
            }
            if (!entry.isFile() || !entry.name.endsWith('.html')) continue
            const html = fs.readFileSync(full, 'utf8')
            const sourcePage = '/' + path.relative(outDir, full).split(path.sep).join('/')
            for (const tag of html.match(anchorRe) || []) {
                const m = hrefRe.exec(tag)
                if (!m) continue
                const href = m[1]
                if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:')) continue
                let target = href.split('#')[0].split('?')[0]
                if (!target.startsWith('/')) continue
                if (base !== '/' && target.startsWith(base)) target = '/' + target.slice(base.length)
                target = target.replace(/^\/+/, '')
                if (target === '' || target.endsWith('/')) target += 'index.html'
                checked++
                if (!fs.existsSync(path.join(outDir, target)))
                    broken.push(`${sourcePage} -> ${href}`)
            }
        }
    }

    walk(outDir)
    console.log(`[component-links] checked ${checked} component-rendered link(s)`)
    if (broken.length)
        throw new Error(`[component-links] ${broken.length} broken component-rendered link(s):\n  ` + broken.join('\n  '))
}

export default defineConfig({
    title: 'Nama Docs',
    description: 'Nama ERP Documentation',
    locales: {
        root: {
            label: 'English',
            lang: 'en',
            dir: 'ltr',
            themeConfig: {
                nav: [
                    {text: 'Home', link: '/'},
                    {text: 'Q&A', link: 'https://ask.namasoft.com'},
                    {text: 'Namasoft.com', link: 'https://namasoft.com'},
                    {text: 'Data Model', link: 'https://dm.namasoft.com'}
                ]
            }
        },
        ar: {
            label: 'العربية',
            lang: 'ar',
            dir: 'rtl',
            link: '/ar/',
            themeConfig: {
                nav: [
                    {text: 'الرئيسية', link: '/ar/'},
                    {text: 'Q&A', link: 'https://ask.namasoft.com'},
                    {text: 'Namasoft.com', link: 'https://namasoft.com'},
                    {text: 'Data Model', link: 'https://dm.namasoft.com'}
                ]
            }
        }
    },
    vite: {
        css: {
            postcss: {
                // Auto-generates [dir="rtl"] mirrored rules for ALL css (including the default theme),
                // so the whole layout flips for the Arabic (/ar/) locale. The original (LTR) rules
                // stay untouched for the default English (root) locale.
                plugins: [postcssRTLCSS({mode: Mode.override})]
            }
        },
        plugins: [devSearchIndexPlugin(SEARCH_INDEX_STABLE_PATH)]
    },
    head: [
        ['link', {rel: 'shortcut icon', type: 'image/png', href: '/namasoft.png'}],
        ['script', {async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-H68GM8HY15'}],
        ['script', {}, `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-H68GM8HY15');`]
    ],
    // Strict: the build fails on dead internal links (the site is currently clean)
    ignoreDeadLinks: false,
    sitemap: {hostname: HOSTNAME},
    markdown: {
        anchor: {
            // Must stay identical to the old VuePress slugify — existing inbound anchor links depend on it
            slugify: (str) => transliterate(str).replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '')
        },
        config: (md) => {
            rtlLtrContainer(md, 'rtl')
            rtlLtrContainer(md, 'ltr')
        }
    },
    transformPageData(pageData) {
        // The sidebar rides along with each page's own data instead of themeConfig, which VitePress
        // inlines into every generated page (SectionSidebar renders it). The prev/next footer would
        // normally be derived from that inlined sidebar, so its links are handed over here as well.
        pageData.frontmatter.sectionSidebar = SECTION_SIDEBARS[folderKey(pageData.relativePath)] ?? []
        const pager = SECTION_PAGER[pageKey(pageData.relativePath)]
        if (pager?.prev)
            pageData.frontmatter.prev ??= pager.prev
        if (pager?.next)
            pageData.frontmatter.next ??= pager.next
        pageData.frontmatter.head ??= []
        pageData.frontmatter.head.push(
            ['link', {rel: 'canonical', href: pageUrl(pageData.relativePath)}],
            ['meta', {property: 'og:title', content: pageData.title || 'Nama Docs'}],
            ['meta', {property: 'og:description', content: pageData.description || 'Nama ERP Documentation'}],
            ['meta', {property: 'og:url', content: pageUrl(pageData.relativePath)}],
            ['meta', {property: 'og:type', content: 'article'}]
        )
    },
    themeConfig: {
        logo: '/hero.svg',
        sidebar: SIDEBAR_CONFIG,
        editLink: {
            pattern: 'https://github.com/ahmedqasid/namaerp-docs/edit/master/docs/:path',
            text: 'Edit On github'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/ahmedqasid/namaerp-docs'}
        ],
    },
    transformHtml: (html, id, ctx) => {
        collectPageForSearchIndex(html, ctx.page, ctx.pageData.title)
    },
    buildEnd: (siteConfig) => {
        writeRedirectsMap(siteConfig.outDir)
        writeSearchIndexJSON(siteConfig.outDir, SEARCH_INDEX_STABLE_PATH)
        validateComponentLinks(siteConfig.outDir, siteConfig.site.base)
    }
})
