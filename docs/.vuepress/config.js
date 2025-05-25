import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import {SIDEBAR_CONFIG} from "./sidebar.js";
import fullTextSearchPlugin from "vuepress-plugin-full-text-search2";
import {markdownContainerPlugin} from "@vuepress/plugin-markdown-container";

export default defineUserConfig({
  title: 'Nama ERP Docs',
  description: 'Nama ERP Documentation',
  head: [
    ['link', { rel: 'shortcut icon', type: 'image/png', href: '/namasoft.png' }]
  ],
  theme: defaultTheme({
    sidebar: SIDEBAR_CONFIG,
    navbar: ['/', '/guide/','/examples/'],
    contributors: false,
    sidebarDepth: 2,
    logo: '/hero.svg',
  }),
  plugins: [
    // slimsearchPlugin({indexContent: true, indexOptions: {}})
    fullTextSearchPlugin(),
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

  ],
  bundler: viteBundler(),
})
