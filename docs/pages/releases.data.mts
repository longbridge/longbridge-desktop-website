import { createContentLoader } from "vitepress";
import { normalizeFileNames } from "../../.vitepress/config/utils";

const MAX_ITEMS = 50;

export interface ReleaseEntry {
  version: string;
  html: string;
}

export type ReleasesByLocale = Record<"root" | "zh-CN" | "zh-HK", ReleaseEntry[]>;

declare const data: ReleasesByLocale;
export { data };

/**
 * Aggregates every stable release note (all locales) into a single
 * changelog dataset, rendered to HTML at build time.
 *
 * Headings are demoted one level (version h1 -> h2, Downloads h2 -> h3,
 * Improvements h3 -> h4) so the combined page's outline lists versions
 * only. Inner headings lose their ids/anchors to avoid duplicate ids
 * across versions; the version h2 keeps its id for deep links.
 */
export default createContentLoader(
  [
    "release-notes/*.md",
    "zh-CN/release-notes/*.md",
    "zh-HK/release-notes/*.md",
  ],
  {
    render: true,
    transform(raw): ReleasesByLocale {
      const releases: ReleasesByLocale = { root: [], "zh-CN": [], "zh-HK": [] };

      for (const page of raw) {
        const m = page.url.match(
          /^\/(?:(zh-CN|zh-HK)\/)?release-notes\/(v[^/]+?)(?:\.html)?$/,
        );
        if (!m) continue; // index pages
        const locale = (m[1] ?? "root") as keyof ReleasesByLocale;
        const version = m[2];

        let html = page.html ?? "";
        // demote headings (deepest first so replacements don't cascade)
        html = html
          .replace(/<h3(\s|>)/g, "<h4$1")
          .replace(/<\/h3>/g, "</h4>")
          .replace(/<h2(\s|>)/g, "<h3$1")
          .replace(/<\/h2>/g, "</h3>")
          .replace(/<h1(\s|>)/g, "<h2$1")
          .replace(/<\/h1>/g, "</h2>");
        // strip ids + permalink anchors from inner headings (h3/h4)
        html = html
          .replace(/<(h[34]) id="[^"]*"/g, "<$1")
          .replace(
            /(<h[34][^>]*>)([\s\S]*?)<a class="header-anchor"[^>]*>[\s\S]*?<\/a>/g,
            "$1$2",
          );

        releases[locale].push({ version, html });
      }

      for (const key of Object.keys(releases) as (keyof ReleasesByLocale)[]) {
        const order = normalizeFileNames(releases[key].map((r) => r.version));
        releases[key].sort(
          (a, b) => order.indexOf(a.version) - order.indexOf(b.version),
        );
        releases[key] = releases[key].slice(0, MAX_ITEMS);
      }

      return releases;
    },
  },
);
