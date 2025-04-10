import { expect, test } from "bun:test";
import { buildDownloadLinks } from "./release-notes";

test("buildDownloadLinks", () => {
  let links = buildDownloadLinks("v0.1.31-preview.6");
  expect(links).toEqual(
    `
- [Windows x86_64](https://assets.lbkrs.com/github/release/longbridge-desktop/preview/longbridge-0.1.31-preview.6-windows-x86_64.zip)
- [macOS ARM](https://assets.lbkrs.com/github/release/longbridge-desktop/preview/longbridge-0.1.31-preview.6-macos-aarch64.dmg)
- [macOS x86_64](https://assets.lbkrs.com/github/release/longbridge-desktop/preview/longbridge-0.1.31-preview.6-macos-x86_64.dmg)
- [Linux x64 (Debian)](https://assets.lbkrs.com/github/release/longbridge-desktop/preview/longbridge-0.1.31-preview.6-linux-x86_64.deb)
- [Linux x64 (AppImage)](https://assets.lbkrs.com/github/release/longbridge-desktop/preview/longbridge-0.1.31-preview.6-linux-x86_64.AppImage)
  `.trim(),
  );
});
