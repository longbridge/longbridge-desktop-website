import { defineConfig } from "vitepress";
import { getReleaseNotes } from "./utils";

const LOCALE = "en";

const stableItems = getReleaseNotes(LOCALE, "");

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Longbridge Pro",
  description:
    "Brand new trading desktop application of Longbridge Securities.",
  titleTemplate: ":title - Longbridge Desktop",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Release Notes", link: "/release-notes" },
    ],

    sidebar: [
      {
        text: "Release Notes",
        base: "/release-notes/",
        items: stableItems,
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/longbridge" }],
  },
});
