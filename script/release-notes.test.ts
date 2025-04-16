import { expect, test } from "bun:test";
import { buildDownloadLinks, normalizeFileNames } from "./release-notes";

test("buildDownloadLinks", () => {
  // 设置环境变量 TAG 用于测试
  let links = buildDownloadLinks("v0.1.31");
  expect(links).toEqual(
    `
- [Windows x86_64](https://assets.lbkrs.com/github/release/longbridge-desktop/stable/longbridge-v0.1.31-windows-x86_64.zip)
- [macOS ARM](https://assets.lbkrs.com/github/release/longbridge-desktop/stable/longbridge-v0.1.31-macos-aarch64.dmg)
- [macOS x86_64](https://assets.lbkrs.com/github/release/longbridge-desktop/stable/longbridge-v0.1.31-macos-x86_64.dmg)
- [Linux x64 (Debian)](https://assets.lbkrs.com/github/release/longbridge-desktop/stable/longbridge-v0.1.31-linux-x86_64.deb)
- [Linux x64 (AppImage)](https://assets.lbkrs.com/github/release/longbridge-desktop/stable/longbridge-v0.1.31-linux-x86_64.AppImage)
  `.trim(),
  );
});



test("normalizeFileNames", () => {
  const testFileNames = [
    "v0.1.31-preview.9",
    "v0.1.31-preview.8",
    "v0.1.31-preview.7",
    "v0.1.31-preview.12",
    "v0.1.31-preview.6",
    "v0.1.34-preview.34",
    "v0.1.31-preview.5",
    "v0.1.31-preview.4",
    "v0.1.31-preview.10",
    "v0.1.31",
    "v0.1.33",
    "v0.1.30",
  ];

  const sortedFileNames = normalizeFileNames([...testFileNames]);

  const expectedFileNames = [
    "v0.1.34-preview.34",
    "v0.1.33",
    "v0.1.31",
    "v0.1.31-preview.12",
    "v0.1.31-preview.10",
    "v0.1.31-preview.9",
    "v0.1.31-preview.8",
    "v0.1.31-preview.7",
    "v0.1.31-preview.6",
    "v0.1.31-preview.5",
    "v0.1.31-preview.4",
    "v0.1.30",
  ];

  expect(sortedFileNames).toEqual(expectedFileNames);
});

