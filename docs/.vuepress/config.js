import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import {rtlPlugin} from "@vuepress/plugin-rtl";

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
    logo: 'https://vuejs.press/images/hero.png',
    locales: {
      '/': {
        selectLanguageName: 'English',
      },
      '/ar/': {
        selectLanguageName: 'العربية',
      },
    },
    navbar: ['/', '/get-started'],
  }),
  plugins: [
    rtlPlugin({
      locales: ['/ar/'],
    }),
  ],
  bundler: viteBundler(),
})
