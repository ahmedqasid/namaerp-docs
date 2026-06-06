import {defineConfig} from 'vitepress'
import container from 'markdown-it-container'
import {transliterate} from 'transliteration'
import postcssRTLCSS from 'postcss-rtlcss'
import {Mode} from 'postcss-rtlcss/options'
import {SIDEBAR_CONFIG} from './sidebar.js'
import {collectPageForSearchIndex, devSearchIndexPlugin, writeSearchIndexJSON} from './search-index-builder.mts'
import {normalizeArabic} from './theme/arabic-normalization'
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
                // Legacy basename short-links always point at the Arabic (root) pages;
                // the /en/ mirror would otherwise collide with every translated page
                if (dir === destDir && entry.name === 'en') continue
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
    locales: {
        root: {
            label: 'العربية',
            lang: 'ar',
            dir: 'rtl',
            themeConfig: {
                nav: [
                    {text: 'الرئيسية', link: '/'},
                    {text: 'Q&A', link: 'https://ask.namasoft.com'},
                    {text: 'Namasoft.com', link: 'https://namasoft.com'},
                    {text: 'Data Model', link: 'https://dm.namasoft.com'}
                ]
            }
        },
        en: {
            label: 'English',
            lang: 'en',
            dir: 'ltr',
            link: '/en/',
            themeConfig: {
                nav: [
                    {text: 'Home', link: '/en/'},
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
                // so the whole layout flips for Arabic. The original (LTR) rules stay untouched —
                // ready for the /en/ locale later.
                plugins: [postcssRTLCSS({mode: Mode.override})]
            }
        },
        plugins: [devSearchIndexPlugin(SEARCH_INDEX_STABLE_PATH)]
    },
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
        sidebar: SIDEBAR_CONFIG,
        editLink: {
            pattern: 'https://github.com/ahmedqasid/namaerp-docs/edit/master/docs/:path',
            text: 'Edit On github'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/ahmedqasid/namaerp-docs'}
        ],
        // Built-in minisearch handles quick keyword search; the AI/advanced search
        // (semantic / fuzzy / exact substring via the nlm servlet) lives in
        // EmbeddableSearchBox (navbar button + /full-search.html pages).
        search: {
            provider: 'local',
            options: {
                detailedView: true,
                miniSearch: {
                    options: {
                        // minisearch's default processTerm only lowercases; add Arabic
                        // folding so hamza/taa-marbuta variants match. Search-time terms
                        // go through the same function (minisearch reuses it by default).
                        processTerm: (term) => normalizeArabic(term.toLowerCase())
                    }
                },
                locales: {
                    root: {
                        translations: {
                            button: {buttonText: 'بحث', buttonAriaLabel: 'بحث'},
                            modal: {
                                displayDetails: 'عرض التفاصيل',
                                resetButtonTitle: 'مسح البحث',
                                backButtonTitle: 'إغلاق',
                                noResultsText: 'لا توجد نتائج عن',
                                footer: {
                                    selectText: 'اختيار',
                                    navigateText: 'تنقل',
                                    closeText: 'إغلاق'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    transformHtml: (html, id, ctx) => {
        collectPageForSearchIndex(html, ctx.page, ctx.pageData.title)
    },
    buildEnd: (siteConfig) => {
        writeRedirectsMap(siteConfig.outDir)
        writeSearchIndexJSON(siteConfig.outDir, SEARCH_INDEX_STABLE_PATH)
    }
})
