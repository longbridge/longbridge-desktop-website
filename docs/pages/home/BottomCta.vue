<script setup>
import DownloadInfo from "./DownloadInfo.vue";
import { useLocale, motionVisible } from "../utils";

const t = useLocale();
const version = import.meta.env.VERSION || "v0.1.30";
</script>

<template>
  <section class="border-t border-[var(--vp-c-divider)] px-6 lt-sm:px-3 py-22 lt-sm:py-12 text-center">
    <div v-motion="motionVisible()">
      <h2 class="!text-28px lg:!text-36px !font-600 text-heading !mb-3">
        {{ t.bottomCta.title }}
      </h2>
      <p class="text-14px text-faint mb-7">
        {{ version }} Beta ·
        <a href="release-notes" class="font-700 text-brand !no-underline">{{ t.download_more }}</a>
      </p>
      <DownloadInfo />
    </div>
  </section>
</template>
