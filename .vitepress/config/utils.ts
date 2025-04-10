import fs from "fs";
import path from "path";
import { DefaultTheme } from "vitepress";

const MAX_ITEMS = 50;

// 版本号排序
export function normalizeFileNames(names: string[]): string[] {
  names.sort((a, b) => {
    // 自定义版本号比较函数
    const parseVersion = (ver: string) => {
      const parts = ver.split('-');
      const baseVersion = parts[0].replace('v', '').split('.').map(Number);
      const suffix = parts[1] || '';
      const isPreview = suffix.includes('preview');
      const previewNum = isPreview ? parseInt(suffix.split('.')[1] || '0') : 0;
      return { baseVersion, isPreview, previewNum };
    };

    const versionA = parseVersion(a);
    const versionB = parseVersion(b);

    // 比较基础版本号
    for (let i = 0; i < versionA.baseVersion.length; i++) {
      if (versionA.baseVersion[i] !== versionB.baseVersion[i]) {
        return versionB.baseVersion[i] - versionA.baseVersion[i];
      }
    }

    // 如果基础版本相同，正式版优先于预览版
    if (versionA.isPreview !== versionB.isPreview) {
      return versionA.isPreview ? 1 : -1;
    }

    // 如果都是预览版，比较预览版本号
    if (versionA.isPreview && versionB.isPreview) {
      return versionB.previewNum - versionA.previewNum;
    }

    return 0;
  });
  
  return names;
}

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

  names = normalizeFileNames(names);

  for (const name of names.slice(0, MAX_ITEMS)) {
    items.push({
      text: name,
      link: name,
    });
  }

  return items;
}
