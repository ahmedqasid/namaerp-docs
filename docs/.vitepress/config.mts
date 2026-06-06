import {defineConfig} from 'vitepress'
import container from 'markdown-it-container'
import {transliterate} from 'transliteration'
import {SIDEBAR_CONFIG} from './sidebar.js'
import fs from 'node:fs'
import path from 'node:path'

const HOSTNAME = 'https://docs.namasoft.com/'

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

export default defineConfig({
    title: 'Nama ERP Docs',
    description: 'Nama ERP Documentation',
    lang: 'ar',
    head: [
        ['link', {rel: 'shortcut icon', type: 'image/png', href: '/namasoft.png'}]
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
        pageData.frontmatter.head ??= []
        pageData.frontmatter.head.push(
            ['link', {rel: 'canonical', href: pageUrl(pageData.relativePath)}],
            ['meta', {property: 'og:title', content: pageData.title || 'Nama ERP Docs'}],
            ['meta', {property: 'og:description', content: pageData.description || 'Nama ERP Documentation'}],
            ['meta', {property: 'og:url', content: pageUrl(pageData.relativePath)}],
            ['meta', {property: 'og:type', content: 'article'}]
        )
    },
    themeConfig: {
        logo: '/hero.svg',
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Namasoft.com', link: 'https://namasoft.com'},
            {text: 'Data Model', link: 'https://dm.namasoft.com'}
        ],
        sidebar: SIDEBAR_CONFIG,
        editLink: {
            pattern: 'https://github.com/ahmedqasid/namaerp-docs/edit/master/docs/:path',
            text: 'Edit On github'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/ahmedqasid/namaerp-docs'}
        ],
        // Temporary built-in search until the custom full-text/AI search is ported (separate task)
        search: {provider: 'local'}
    },
    buildEnd: (siteConfig) => {
        writeRedirectsMap(siteConfig.outDir)
    }
})
