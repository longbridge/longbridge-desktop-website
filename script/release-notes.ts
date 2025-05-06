#!/usr/bin/env bun
import { $ } from "bun";
import { randomUUID } from "crypto";
import { normalizeFileNames } from "../.vitepress/config/utils";
import path from "path";
import fs from "fs";
import process from "process";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "longbridge";
const REPO = process.env.REPO;

let TAG = process.env.TAG || "";
const DRY = !!process.env.DRY;
const CHANNEL = TAG.includes("preview") ? "preview" : "stable";

const CDN_URL = "https://assets.lbkrs.com";
const OSS_HOST = "oss-cn-hangzhou.aliyuncs.com";
const OSS_BUCKET = "lb-assets";
const OSS_PREFIX = `/github/release/longbridge-desktop/${CHANNEL}`;
const OSS_ACCESS_KEY_ID = process.env.FE_LB_ASSET_ACCESS_KEY_ID;
const OSS_ACCESS_KEY_SECRET = process.env.FE_LB_ASSET_ACCESS_KEY_SECRET;
const IS_PREVIEW = CHANNEL === "preview";

type Locale = "en" | "zh-CN" | "zh-HK";

const localePrefixes = {
  en: "docs/",
  "zh-CN": "docs/zh-CN/",
  "zh-HK": "docs/zh-HK/",
};

function docFileName(locale: Locale, filename: string): string {
  let localePrefix = localePrefixes[locale] + "release-notes/";
  if (IS_PREVIEW) {
    localePrefix += "preview/";
  }
  return `${localePrefix}${filename}.md`;
}

// Fetch GitHub latest release and create a markdown file to release-notes/${version}.md
async function fetchRelease() {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/releases/tags/${TAG}`;
  console.info("Fetching release from", url);
  let json = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      ContentType: "application/json",
    },
  })
    .then(async (res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        let text = await res.text();
        console.error(text);
        throw new Error(`fetch error status ${res.status}`);
      }
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  console.info("name", json.name);

  let notes = buildReleaseNotesJSON(json, json.body);
  Bun.write(docFileName("en", TAG), notes.en);
  Bun.write(docFileName("zh-CN", TAG), notes["zh-CN"]);
  Bun.write(docFileName("zh-HK", TAG), notes["zh-HK"]);

  generateIndex("en");
  generateIndex("zh-CN");
  generateIndex("zh-HK");

  console.log("Release notes generated successfully");
}

/**
 * Build Markdown download links
 * @param assets
 * @returns
 */
export function buildDownloadLinks(version: string): string {
  if (!version.startsWith("v")) {
    version = `v${version}`;
  }

  return `
- [Windows x86_64](${CDN_URL}${OSS_PREFIX}/longbridge-${version}-windows-x86_64.exe)
- [macOS ARM](${CDN_URL}${OSS_PREFIX}/longbridge-${version}-macos-aarch64.dmg)
- [macOS x86_64](${CDN_URL}${OSS_PREFIX}/longbridge-${version}-macos-x86_64.dmg)
  `.trim();
}

/**
 * Upload a local file to Aliyun OSS
 * @param filename
 * @param object_key
 * @param no_cache
 * @returns Return the remote url in CDN.
 */
async function uploadToOSS(
  filename: string,
  object_key: string,
  no_cache?: boolean,
): Promise<string> {
  let remoteURL = `${CDN_URL}${object_key}`;
  let cacheControl = no_cache ? "no-cache" : "max-age=31536000";
  await $`ossutil cp -f "${filename}" "oss://${OSS_BUCKET}${object_key}" -e "${OSS_HOST}" -i "${OSS_ACCESS_KEY_ID}" -k "${OSS_ACCESS_KEY_SECRET}" --meta=Cache-Control:${cacheControl}`;
  return remoteURL;
}

/**
 * Download file from GitHub URL with Authorization token
 * @param url
 * @param filename
 */
async function downloadFile(url: string, filename: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/octet-stream",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${url} status: ${response.status}`);
  }
  if (!response.body) {
    throw new Error("Response body is null");
  }

  const fileStream = Bun.file(filename).writer();
  const writableStream = new WritableStream({
    write(chunk) {
      fileStream.write(chunk);
    },
    close() {
      fileStream.end();
    },
    abort(err) {
      console.error("File writing aborted", err);
    },
  });

  await response.body.pipeTo(writableStream);
}

export function buildReleaseNotesJSON(
  json: any,
  body: string,
): {
  en: string;
  "zh-CN": string;
  "zh-HK": string;
} {
  let parts = body.split(/[\-]{3,}/);
  let [en = "", zhCN = "", zhHK = ""] = parts;

  let payload = {
    en: buildNotePage(json, en),
    "zh-CN": buildNotePage(json, zhCN),
    "zh-HK": buildNotePage(json, zhHK),
  };

  return payload;
}

function buildNotePage(json: any, body: string): string {
  // Remove heading 1
  body = body.replace(/^[#]{1}[^#].*$/gm, "");

  let downloads = buildDownloadLinks(TAG);
  let headingSuffix = "";
  if (IS_PREVIEW) {
    headingSuffix = ` <Badge type="warning" text="preview" />`;
  }

  return `
---
title: # ${json.name}
editLink: true
---

# ${json.name}${headingSuffix}

${body.trim()}

## Downloads

${downloads}
`.trim();
}

function generateIndex(locale: Locale) {
  let dir = "release-notes";
  if (locale != "en") {
    dir = `${locale}/release-notes`;
  }
  if (IS_PREVIEW) {
    dir += "/preview";
  }

  let root = path.join(process.cwd(), "docs", dir);
  if (!fs.existsSync(root)) {
    console.error(`Directory does not exist: ${root}`);
    return;
  }

  const files = fs.readdirSync(root).filter((file) => file.endsWith(".md"));

  let names: string[] = [];
  for (const file of files) {
    const name = path.basename(file, ".md");
    if (name == "index") {
      continue;
    }

    names.push(name);
  }
  names = normalizeFileNames(names);

  let links: string[] = [];
  for (const name of names.slice(0, 50)) {
    links.push(`- [${name}](${name})`);
  }

  let body = `
---
title: # Release Notes
editLink: true
---

# Release Notes

${links.join("\n")}`.trim();

  Bun.write(path.join("./docs", dir, "index.md"), body);
}

function main() {
  console.log("Fetching release...");
  console.log("Current dir:", process.cwd());

  if (!TAG) {
    console.error("TAG env is not set");
    process.exit(1);
  }

  fetchRelease();
}

if (require.main === module) {
  main();
}
