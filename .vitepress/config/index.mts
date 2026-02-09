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
  appearance: false,
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
    ]
  ],
  themeConfig: {
    logo: 'https://assets.wbrks.com/assets/logo/icon-full-radius.png'
  },
  locales: {
    root: { label: 'English', ...en },
    'zh-CN': { label: '简体中文', ...zh_cn },
    'zh-HK': { label: '繁體中文', ...zh_hk }
  },
  transformHead({ assets }) {
    const h1Font = assets.find(asset =>
      /Cera-Pro-Light\.[\w-]+\.otf/.test(asset)
    )
    if (!h1Font) return []
    return [
      [
        'link',
        {
          rel: 'preload',
          href: h1Font,
          as: 'font',
          type: 'font/otf',
          crossorigin: ''
        }
      ]
    ]
  }
})
