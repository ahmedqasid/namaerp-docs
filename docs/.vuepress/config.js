import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import {SIDEBAR_CONFIG} from "./sidebar.js";

import {markdownContainerPlugin} from "@vuepress/plugin-markdown-container";
import {sitemapPlugin} from "@vuepress/plugin-sitemap";
import {seoPlugin} from "@vuepress/plugin-seo";
import {transliterate} from 'transliteration'
import fullTextSearchPlugin from "./full-text-search/index.js";

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
      searchIndexPathPrefixes: {"videos": "/videos", "ai-docs-entity-flows": "/entity-flows"},
      searchIndexTitles: {"videos": "Videos", "ai-docs-entity-flows": "Entity Flows"},
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
  bundler: viteBundler(),
  markdown: {
    slugify: (str) => {
      return transliterate(str).replace(/\s+/g, '-') // replace spaces with dash
          .replace(/[^a-zA-Z0-9\-]/g, '');
    }
  }
})
