import { defineConfig } from "vitepress";
import { getReleaseNotes } from "./utils";

const LOCALE = "zh-HK";

const stableItems = getReleaseNotes(LOCALE, "");
const previewItems = getReleaseNotes(LOCALE, "preview");

export default defineConfig({
  title: "Longbridge Pro",
  description: "全新長橋證券交易桌面用戶端。",
  titleTemplate: ":title - 長橋桌面客戶端 - Longbridge",
  themeConfig: {
    nav: [
      { text: "首頁", link: "https://longbridge.com" },
      { text: "桌面端介紹", link: `/${LOCALE}` },
      { text: "發布日誌", link: `/${LOCALE}/release-notes` },
    ],

    sidebar: [
      {
        text: "發布日誌",
        base: `/${LOCALE}/release-notes/`,
        items: stableItems,
      },
      {
        text: "預覽版本",
        base: `/${LOCALE}/release-notes/preview/`,
        items: previewItems,
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/longbridge" }],
  },
});
