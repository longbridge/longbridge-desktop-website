import { defineConfig } from "vitepress";
import tailwindcss from '@tailwindcss/vite'

import en from "./en.mts";
import zh_cn from "./zh-CN.mts";
import zh_hk from "./zh-HK.mts";

export default defineConfig({
  base: "/desktop/",
  srcDir: "docs",
  outDir: "dist",
  lastUpdated: true,
  cleanUrls: true,
  appearance: false,
  vite: {
    plugins: [tailwindcss()],
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://pub.lbkrs.com/files/202107/35tULHe3n4Pp4EtA/logo.png",
      },
    ],
  ],
  themeConfig: {
    logo: "https://assets.lbctrl.com/uploads/1918a6d3-93d0-4c4f-95fc-a25c19e597bd/e19d0d3d0e85367309f4180194685f8a.png",
  },
  locales: {
    root: { label: "English", ...en },
    "zh-CN": { label: "简体中文", ...zh_cn },
    "zh-HK": { label: "繁體中文", ...zh_hk },
  },
});
