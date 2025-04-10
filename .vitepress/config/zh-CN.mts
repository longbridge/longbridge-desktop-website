import { defineConfig } from "vitepress";
import { getReleaseNotes } from "./utils";

const LOCALE = "zh-HK";

const stableItems = getReleaseNotes(LOCALE, "");
const previewItems = getReleaseNotes(LOCALE, "/preview");

export default defineConfig({
  title: "Longbridge 桌面客户端",
  description: "Longbridge desktop application.",
  themeConfig: {
    nav: [
      { text: "首页", link: `/${LOCALE}` },
      { text: "发布日志", link: `/${LOCALE}/release-notes` },
    ],

    sidebar: [
      {
        text: "发布日志",
        items: [
          {
            text: "稳定版",
            base: `/${LOCALE}/release-notes/`,
            items: stableItems,
          },
          {
            text: "预览版",
            base: `/${LOCALE}/release-notes/preview/`,
            items: previewItems,
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/longbridge" }],
  },
});
