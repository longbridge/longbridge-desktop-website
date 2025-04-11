import { defineConfig } from "vitepress";
import en from "./en.mts";
import zh_cn from "./zh-CN.mts";
import zh_hk from "./zh-HK.mts";

export default defineConfig({
  base: "/",
  srcDir: "docs",
  outDir: "dist",
  lastUpdated: true,
  cleanUrls: true,
  locales: {
    root: { label: "English", ...en },
    "zh-CN": { label: "简体中文", ...zh_cn },
    "zh-HK": { label: "繁體中文", ...zh_hk },
  },
});
