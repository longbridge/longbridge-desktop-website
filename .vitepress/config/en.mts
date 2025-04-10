import { defineConfig } from "vitepress";
import { getReleaseNotes } from "./utils";

const LOCALE = "en";

const stableItems = getReleaseNotes(LOCALE, "");
const previewItems = getReleaseNotes(LOCALE, "/preview");

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Longbridge Desktop",
  description: "Longbridge desktop application.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Release Notes", link: "/release-notes" },
    ],

    sidebar: [
      {
        text: "Release Notes",
        items: [
          { text: "Stable", base: "/release-notes/", items: stableItems },
          {
            text: "Preview",
            base: "/release-notes/preview/",
            items: previewItems,
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/longbridge" }],
  },
});
