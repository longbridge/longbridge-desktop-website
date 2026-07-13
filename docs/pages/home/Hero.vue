<script setup>
import DownloadInfo from "./DownloadInfo.vue";
import { useLocale, motionVisible } from "../utils";

const { hero } = useLocale();
const version = import.meta.env.VERSION || "v0.1.30";
</script>

<template>
  <section id="download" class="lb-hero relative overflow-hidden px-6 lt-sm:px-3 pt-22 lt-sm:(pt-12 pb-8) pb-16 text-center">
    <div class="max-w-[1200px] mx-auto">
      <div
        class="inline-flex items-center gap-2 text-11px font-700 tracking-[1px] text-label mb-5"
        v-motion="motionVisible()"
      >
        <span class="w-6px h-6px rounded-full bg-label"></span>
        LONGBRIDGE PRO · {{ version.toUpperCase() }} BETA
      </div>
      <h1
        class="!text-40px lg:!text-64px !leading-[1.05] !font-600 text-heading mb-5"
        v-motion="motionVisible()"
      >
        {{ hero.title_1 }}<br />
        <span class="text-brand">{{ hero.title_2 }}</span>
      </h1>
      <p class="max-w-[580px] !mx-auto !text-16px !leading-[1.7] text-muted !mb-3">
        {{ hero.description }}
      </p>
      <div
        class="text-13.5px text-faint mb-8 [&_a]:(text-brand font-700 !no-underline)"
        v-html="hero.legacy"
      ></div>

      <DownloadInfo class="mb-14" />

      <div
        class="relative max-w-[1080px] mx-auto"
        id="hero-image"
        v-motion="motionVisible(300, 'visible')"
      >
        <div
          class="absolute -left-15 -right-15 -top-10 h-70 pointer-events-none"
          style="background: radial-gradient(50% 100% at 50% 100%, var(--lb-glow) 0%, transparent 70%)"
        ></div>
        <!-- home.png bakes in uneven transparent padding (window at
             x 112-3464, y 76-2174 of 3578x2324: top 76 / sides ~113 /
             bottom 150); crop the excess so all four gaps match the top -->
        <div
          class="relative overflow-hidden border border-edge rounded-16px"
          style="box-shadow: var(--lb-shot-shadow)"
        >
          <img
            src="https://assets.lbctrl.com/uploads/f4da8c9b-cd12-4a4d-804c-f850d326ca21/home.png"
            alt="Longbridge Pro - Watchlist"
            class="block"
            style="width: 102.112%; max-width: none; margin: 0 -1.084% -2.112% -1.027%"
          />
        </div>
      </div>
    </div>
  </section>
</template>
