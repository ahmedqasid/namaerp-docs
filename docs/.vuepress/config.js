import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import {SIDEBAR_CONFIG} from "./sidebar.js";
import {slimsearchPlugin} from "@vuepress/plugin-slimsearch";

export default defineUserConfig({
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Nama ERP Docs',
      description: 'Nama ERP Documentation',
    },
    '/ar/': {
      lang: 'ar-EG',
      title: 'Nama ERP Docs',
      description: 'Nama ERP Documentation',
    },
  },
  title: 'Nama ERP Docs',
  description: 'Nama ERP Documentation',

  theme: defaultTheme({
    locales: {
      '/': {
        selectLanguageName: 'English',
      },
      '/ar/': {
        selectLanguageName: 'العربية',
      },
    },
    sidebar: SIDEBAR_CONFIG,
    navbar: ['/', '/guide/','/examples/'],
  }),
  plugins: [
    slimsearchPlugin({indexContent: true, indexOptions: {}})
  ],
  bundler: viteBundler(),
})
