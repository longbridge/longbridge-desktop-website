#!/usr/bin/env bun
import { $ } from "bun";

async function main() {
  // If VERSION is already set, exit
  if (process.env.VERSION) {
    console.error(`VERSION is already set to: ${process.env.VERSION}`);
    process.exit(1);
  }

  try {
    // Fetch the latest.json file
    const response = await fetch("https://assets.lbctrl.com/github/release/longbridge-desktop/stable/latest.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch latest.json: ${response.statusText}`);
    }

    const data = await response.json();
    let version = data.version;

    if (!version) {
      throw new Error("Version not found in latest.json");
    }

    // Add v prefix to the version if it doesn't have it
    if (!version.startsWith("v")) {
      version = `v${version}`;
    }

    // Set the VERSION environment variable
    process.env.VERSION = version;
    console.log(`${version}`);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
