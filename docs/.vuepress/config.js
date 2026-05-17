import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import {SIDEBAR_CONFIG} from "./sidebar.js";

import {markdownContainerPlugin} from "@vuepress/plugin-markdown-container";
import {sitemapPlugin} from "@vuepress/plugin-sitemap";
import {seoPlugin} from "@vuepress/plugin-seo";
import {transliterate} from 'transliteration'
import fullTextSearchPlugin from "./full-text-search/index.js";
import fs from 'node:fs'
import path from 'node:path'

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

export default defineUserConfig({
  title: 'Nama ERP Docs',
  description: 'Nama ERP Documentation',
  head: [
    ['link', { rel: 'shortcut icon', type: 'image/png', href: '/namasoft.png' }]
  ],
  theme: defaultTheme({
    sidebar: SIDEBAR_CONFIG,
    navbar: ['/', {text: 'Namasoft.com', link: "https://namasoft.com"}, {text: 'Data Model', link: "https://dm.namasoft.com"}],
    contributors: false,
    sidebarDepth: 0,
    logo: '/hero.svg',
    repo: 'ahmedqasid/namaerp-docs',
    docsDir: 'docs',
    docsBranch: 'master',
    editLink:true,
    editLinkText: 'Edit On github',
  }),
  plugins: [
    // slimsearchPlugin({indexContent: true, indexOptions: {}})
    fullTextSearchPlugin({
      searchIndexPathPrefixes: {"videos": "/videos", "ai-docs-entity-flows": "/entity-flows", "release-notes": "/release-notes"},
      searchIndexTitles: {"videos": "Videos", "ai-docs-entity-flows": "Entity Flows", "release-notes": "Release Notes"},
    }),
    markdownContainerPlugin({
      type: 'rtl',
      before: ()=> `<div dir="rtl" class="rtl-block">`,
      after: () => `</div>`
    }),
    markdownContainerPlugin({
      type: 'ltr',
      before: ()=> `<div dir="ltr" class="ltr-block">`,
      after: () => `</div>`
    })
    , sitemapPlugin({hostname: "https://docs.namasoft.com/"}),
    seoPlugin({hostname: "https://docs.namasoft.com/"})
  ],
  onGenerated: (app) => {
    writeRedirectsMap(app.dir.dest())
  },
  bundler: viteBundler(),
  markdown: {
    slugify: (str) => {
      return transliterate(str).replace(/\s+/g, '-') // replace spaces with dash
          .replace(/[^a-zA-Z0-9\-]/g, '');
    }
  }
})
