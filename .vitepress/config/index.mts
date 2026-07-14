import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'

import en from './en.mts'
import zh_cn from './zh-CN.mts'
import zh_hk from './zh-HK.mts'

export default defineConfig({
  base: '/desktop/',
  srcDir: 'docs',
  outDir: 'dist',
  lastUpdated: true,
  cleanUrls: true,
  appearance: 'dark',
  vite: {
    plugins: [
      Unocss({
        configFile: '../../unocss.config.ts'
      })
    ],
    define: {
      'import.meta.env.VERSION': JSON.stringify(
        process.env.VERSION || 'v0.1.30'
      )
    }
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://assets.wbrks.com/assets/logo/logo1.png'
      }
    ],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap'
      }
    ]
  ],
  themeConfig: {
    logo: 'https://assets.wbrks.com/assets/logo/icon-full-radius.png'
  },
  locales: {
    root: { label: 'English', ...en },
    'zh-CN': { label: '简体中文', ...zh_cn },
    'zh-HK': { label: '繁體中文', ...zh_hk }
  }
})
