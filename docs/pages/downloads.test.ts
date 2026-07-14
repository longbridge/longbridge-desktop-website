import { test, expect, describe } from "bun:test";
import {
  createDownloadUrl,
  getDownloads,
  getPlatform,
  splitDownloads,
} from "./downloads";

describe("getPlatform", () => {
  test("should detect Windows", () => {
    global.navigator = {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    } as Navigator;
    expect(getPlatform()).toBe("windows");
  });

  test("should detect macOS", () => {
    global.navigator = {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    } as Navigator;
    expect(getPlatform()).toBe("macos");
  });

  test("should detect Linux", () => {
    global.navigator = {
      userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
    } as Navigator;
    expect(getPlatform()).toBe("linux");
  });

  test("should not detect Android as Linux", () => {
    global.navigator = {
      userAgent: "Mozilla/5.0 (Linux; Android 10)",
    } as Navigator;
    expect(getPlatform()).toBe("");
  });

  test("should return empty string for unknown platform", () => {
    global.navigator = { userAgent: "Unknown Platform" } as Navigator;
    expect(getPlatform()).toBe("");
  });
});

describe("createDownloadUrl", () => {
  test("should create Windows download URL", () => {
    expect(createDownloadUrl("1.0.0", "windows", "x86_64")).toBe(
      "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-windows-x86_64.exe",
    );
  });

  test("should create macOS download URL", () => {
    expect(createDownloadUrl("1.0.0", "macos", "aarch64")).toBe(
      "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-macos-aarch64.dmg",
    );
  });

  test("should create Linux AppImage download URL", () => {
    expect(createDownloadUrl("1.0.0", "linux", "x86_64", "appimage")).toBe(
      "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-linux-x86_64.AppImage",
    );
  });

  test("should create Linux deb download URL", () => {
    expect(createDownloadUrl("1.0.0", "linux", "x86_64", "deb")).toBe(
      "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-linux-x86_64.deb",
    );
  });
});

describe("getDownloads", () => {
  test("returns 5 links in windows, macos×2, linux deb, linux AppImage order", () => {
    const downloads = getDownloads("1.0.0");
    expect(downloads).toHaveLength(5);
    expect(downloads.map((d) => `${d.platform}:${d.suffix}`)).toEqual([
      "windows:x86_64",
      "macos:Apple Silicon",
      "macos:Intel",
      "linux:deb",
      "linux:AppImage",
    ]);
  });
});

describe("splitDownloads", () => {
  test("macOS: primary is Apple Silicon, others keep Intel variant", () => {
    const { primary, others } = splitDownloads("1.0.0", "macos");
    expect(primary?.text).toBe("macOS");
    expect(primary?.suffix).toBe("Apple Silicon");
    expect(others).toHaveLength(4);
    expect(others.map((d) => `${d.platform}:${d.suffix}`)).toEqual([
      "windows:x86_64",
      "macos:Intel",
      "linux:deb",
      "linux:AppImage",
    ]);
  });

  test("windows: primary is the exe", () => {
    const { primary, others } = splitDownloads("1.0.0", "windows");
    expect(primary?.platform).toBe("windows");
    expect(others).toHaveLength(4);
  });

  test("linux: primary is deb", () => {
    const { primary } = splitDownloads("1.0.0", "linux");
    expect(primary?.suffix).toBe("deb");
  });

  test("unknown platform: primary null, others = all 5", () => {
    const { primary, others } = splitDownloads("1.0.0", "");
    expect(primary).toBeNull();
    expect(others).toHaveLength(5);
  });
});
