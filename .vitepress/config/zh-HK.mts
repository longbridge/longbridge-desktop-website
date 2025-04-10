import { defineConfig } from "vitepress";
import { getReleaseNotes } from "./utils";

const LOCALE = "zh-HK";

const stableItems = getReleaseNotes(LOCALE, "");
const previewItems = getReleaseNotes(LOCALE, "/preview");

export default defineConfig({
  title: "Longbridge 桌面客戶端",
  description: "Longbridge desktop application.",
  themeConfig: {
    nav: [
      { text: "首頁", link: `/${LOCALE}` },
      { text: "發布日誌", link: `/${LOCALE}/release-notes` },
    ],

    sidebar: [
      {
        text: "發布日誌",
        items: [
          {
            text: "穩定版",
            base: `/${LOCALE}/release-notes/`,
            items: stableItems,
          },
          {
            text: "預覽版",
            base: `/${LOCALE}/release-notes/preview/`,
            items: previewItems,
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/longbridge" }],
  },
});
