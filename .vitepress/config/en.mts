import { defineConfig } from "vitepress";
import { getReleaseNotes } from "./utils";

const LOCALE = "en";

const stableItems = getReleaseNotes(LOCALE, "");
const previewItems = getReleaseNotes(LOCALE, "preview");

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Longbridge Pro",
  description:
    "Brand new trading desktop application of Longbridge Securities.",
  titleTemplate: ":title - Longbridge Desktop",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "https://longbridge.com" },
      { text: "Longbridge Pro", link: "/" },
      { text: "Release Notes", link: "/release-notes" },
    ],

    sidebar: [
      {
        text: "Release Notes",
        base: "/release-notes/",
        items: stableItems,
      },
      {
        text: "Preview",
        base: "/release-notes/preview/",
        items: previewItems,
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/longbridge" }],
  },
});
