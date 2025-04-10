import { test, expect, describe } from "bun:test";
import { createDownloadUrl, getDownloads, getPlatform } from "./utils";

describe("getPlatform", () => {
  test("should detect Windows", () => {
    global.navigator = {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    } as Navigator;
    expect(getPlatform()).toBe("windows");
  });

  test("should detect macOS", () => {
    global.navigator = {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
    } as Navigator;
    expect(getPlatform()).toBe("macos");
  });

  test("should detect Linux", () => {
    global.navigator = {
      userAgent: "Mozilla/5.0 (X11; Linux x86_64)"
    } as Navigator;
    expect(getPlatform()).toBe("linux");
  });

  test("should not detect Android as Linux", () => {
    global.navigator = {
      userAgent: "Mozilla/5.0 (Linux; Android 10)"
    } as Navigator;
    expect(getPlatform()).toBe("");
  });

  test("should return empty string for unknown platform", () => {
    global.navigator = {
      userAgent: "Unknown Platform"
    } as Navigator;
    expect(getPlatform()).toBe("");
  });
});

describe("createDownloadUrl", () => {
  test("should create Windows download URL", () => {
    expect(createDownloadUrl("1.0.0", "windows", "x86_64")).toBe(
      "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-windows-x86_64.exe"
    );
  });

  test("should create macOS download URL", () => {
    expect(createDownloadUrl("1.0.0", "macos", "aarch64")).toBe(
      "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-macos-aarch64.dmg"  
    );
  });

  test("should create Linux AppImage download URL", () => {
    expect(createDownloadUrl("1.0.0", "linux", "x86_64", "appimage")).toBe(
      "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-linux-x86_64.AppImage"
    );
  });

  test("should create Linux deb download URL", () => {
    expect(createDownloadUrl("1.0.0", "linux", "x86_64", "deb")).toBe(
      "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-linux-x86_64.deb"
    );
  });
});

describe("getDownloads", () => {
  test("all platform", () => {
    const downloads = getDownloads("1.0.0");
    expect(downloads).toHaveLength(5);
    expect(downloads[0]).toEqual({
      text: "Windows",
      suffix: "x86_64",
      url: "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-windows-x86_64.exe",
      platform: "windows",
    });
    expect(downloads[1]).toEqual({
      text: "macOS",
      suffix: "Apple Silicon",
      url: "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-macos-aarch64.dmg",
      platform: "macos",
    });
    expect(downloads[2]).toEqual({
      text: "macOS",
      suffix: "Intel",
      url: "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-macos-x86_64.dmg",
      platform: "macos",
    });
    expect(downloads[3]).toEqual({
      text: "Linux",
      suffix: "AppImage",
      url: "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-linux-x86_64.AppImage",
      platform: "linux",
    });
    expect(downloads[4]).toEqual({
      text: "Linux",
      suffix: "deb",
      url: "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-linux-x86_64.deb",
      platform: "linux",
    });
  });
});
