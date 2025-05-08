---
layout: home
---

<script setup>
import Home from './pages/Home.vue'
</script>

<Home
  name="Longbridge Pro"
  tagline="A new professional securities trading desktop application, delivering an ultra-smooth investment experience for more efficient and convenient trading."
  legacy_info='This brand new version is continuously being optimized and improved. <br />For a more complete feature set, you can download the <a href="https://longbridge.com/download">previous generation</a>.'
  download_more="View all versions"
  :features='[
    {
      "title": "New Architecture, Enhanced Investment Experience",
      "image": "https://assets.lbctrl.com/uploads/8c541832-5725-4844-ac80-156279a83144/output.png",
      "items": [
        "Ultra-Smooth Performance: Highly responsive interface with zero lag, stable 60+ FPS with peaks up to 120 FPS.",
        "Resource-Efficient: Optimized performance with minimal CPU and memory footprint for seamless operation.",
        "Instant Launch: Lightweight design with a compact installation package—launches in under 2 seconds."
      ]
    },
    {
      "title": "Navigation, Market Insights at a Glance",
      "image": "https://assets.lbctrl.com/uploads/69043ccc-cbbe-44e6-93c5-a37cd4829dd7/scr-20250502-kqry.png",
      "items": [
        "Redesigned collapsible left-side navigation bar for better layout efficiency.",
        "Support for multiple stock tabs, enabling quick price checks and market tracking.",
        "One-click access to transaction history for easy reference."
      ]
    },
    {
      "title": "Global Trading, Multi-Asset Support",
      "image": "https://assets.lbctrl.com/uploads/c2842fa5-f8ca-44e7-aad5-5b8a38f49dcb/scr-20250502-kiym.png",
      "items": [
        "Real-time quotes and trading for HK, US, and SG stocks.",
        "US stocks support two-way trading (long/short) for flexible strategies.",
        "Derivatives trading including US options, warrants, and bull/bear contracts."
      ]
    },
    {
      "title": "Cross Platform, Professional Market Monitoring",
      "image": "https://assets.lbctrl.com/uploads/982af099-639e-428c-b9dc-1881dc52921c/scr-20250502-krlh.png",
      "items": [
        "Cross-platform native support for macOS, Windows, and Linux.",
        "Multi-screen support for split-view tracking of quotes, charts, and news."
      ]
    }
  ]'
/>
