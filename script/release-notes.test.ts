import { expect, test } from "bun:test";
import { buildDownloadLinks} from "./release-notes";
import {
  filterSupersededPreviews,
  normalizeFileNames,
} from "../.vitepress/config/utils";

test("buildDownloadLinks", () => {
  let links = buildDownloadLinks("v0.2.0");
  expect(links).toEqual(
    `
- [Windows x86_64](https://assets.lbkrs.com/github/release/longbridge-desktop/stable/longbridge-v0.2.0-windows-x86_64.exe)
- [macOS ARM](https://assets.lbkrs.com/github/release/longbridge-desktop/stable/longbridge-v0.2.0-macos-aarch64.dmg)
- [macOS x86_64](https://assets.lbkrs.com/github/release/longbridge-desktop/stable/longbridge-v0.2.0-macos-x86_64.dmg)
- [Linux x64 (Debian)](https://assets.lbkrs.com/github/release/longbridge-desktop/stable/longbridge-v0.2.0-linux-x86_64.deb)
- [Linux x64 (AppImage)](https://assets.lbkrs.com/github/release/longbridge-desktop/stable/longbridge-v0.2.0-linux-x86_64.AppImage)
  `.trim(),
  );
});



test("filterSupersededPreviews hides previews superseded by any newer stable", () => {
  const previews = [
    "v0.15.0-preview.0",
    "v0.7.0-preview.0",
    "v0.7.0-preview.1",
    "v0.8.0-preview.4",
    "v0.16.0-preview.0",
  ];
  const stables = ["v0.15.0", "v0.7.1", "v0.8.0"];

  // v0.7.0-preview.* 被 v0.7.1 取代；v0.16.0-preview.0 没有 >= 自己的 stable，保留。
  expect(filterSupersededPreviews(previews, stables)).toEqual([
    "v0.16.0-preview.0",
  ]);
});

test("normalizeFileNames", () => {
  const testFileNames = [
    "v0.2.0",
    "v0.2.1",
    "v0.1.45",
  ];

  const sortedFileNames = normalizeFileNames([...testFileNames]);

  const expectedFileNames = [
    "v0.2.1",
    "v0.2.0",
    "v0.1.45",
  ];

  expect(sortedFileNames).toEqual(expectedFileNames);
});

