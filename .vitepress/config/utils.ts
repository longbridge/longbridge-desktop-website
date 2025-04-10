import fs from "fs";
import path from "path";
import { DefaultTheme } from "vitepress";

const MAX_ITEMS = 50;

export function getReleaseNotes(
  locale: "en" | "zh-CN" | "zh-HK",
  prefix: string,
): DefaultTheme.SidebarItem[] {
  let dir = "release-notes";
  if (locale != "en") {
    dir = `${locale}/release-notes`;
  }
  const directoryPath = path.join("docs", dir, prefix);
  let items: DefaultTheme.SidebarItem[] = [];

  const files = fs
    .readdirSync(directoryPath)
    .filter((file) => file.endsWith(".md"));

  let names: string[] = [];
  for (const file of files) {
    const name = path.basename(file, ".md");
    if (name == "index") {
      continue;
    }

    names.push(name);
  }

  names.sort((a, b) => b.localeCompare(a));

  for (const name of names.slice(0, MAX_ITEMS)) {
    items.push({
      text: name,
      link: name,
    });
  }

  return items;
}
