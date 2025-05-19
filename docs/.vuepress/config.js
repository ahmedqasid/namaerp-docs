import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import {SIDEBAR_CONFIG} from "./sidebar.js";
import {slimsearchPlugin} from "@vuepress/plugin-slimsearch";

export default defineUserConfig({
  title: 'Nama ERP Docs',
  description: 'Nama ERP Documentation',

  theme: defaultTheme({
    sidebar: SIDEBAR_CONFIG,
    navbar: ['/', '/guide/','/examples/'],
    contributors: false,
    sidebarDepth: 2,
  }),
  plugins: [
    slimsearchPlugin({indexContent: true, indexOptions: {}})
  ],
  bundler: viteBundler(),
})
