import { defineConfig } from "vitepress";
import { getReleaseNotes } from "./utils";

const LOCALE = "zh-CN";

const stableItems = getReleaseNotes(LOCALE, "");

export default defineConfig({
  title: "Longbridge Pro",
  description: "全新长桥证券交易桌面客户端。",
  titleTemplate: ":title - 长桥桌面客户端 - Longbridge",
  themeConfig: {
    nav: [
      { text: "首页", link: "https://longbridge.com" },
      { text: "桌面端介绍", link: `/${LOCALE}` },
      { text: "发布日志", link: `/${LOCALE}/release-notes` },
    ],

    sidebar: [
      {
        text: "发布日志",
        base: `/${LOCALE}/release-notes/`,
        items: stableItems,
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/longbridge" }],
  },
});
