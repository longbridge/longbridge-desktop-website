<script setup>
import { useLocale, motionVisible } from "../utils";

const { multiPlatform } = useLocale();
const platforms = ["macOS", "Windows", "Linux"];
</script>

<template>
  <section class="bg-[var(--lb-bg-2)] border-t border-[var(--vp-c-divider)] px-6 lt-sm:px-3 py-20 lt-sm:py-10">
    <div class="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_420px] grid-cols-1 gap-12 lt-sm:gap-6 items-center">
      <img
        src="https://assets.lbctrl.com/uploads/78728886-0410-429c-ba4a-db2a6ea4911e/multi.webp"
        alt="Multi-platform support"
        class="w-full h-auto"
        v-motion="motionVisible()"
      />
      <div v-motion="motionVisible(150)">
        <div class="lb-eyebrow">{{ multiPlatform.label }}</div>
        <h2 class="!text-28px lg:!text-36px !font-600 !leading-[1.15] text-heading !mb-5">
          {{ multiPlatform.title }}
        </h2>
        <p class="!text-15px !leading-[1.7] text-muted !mb-6">
          {{ multiPlatform.description }}
        </p>
        <div class="flex gap-2">
          <span
            v-for="p in platforms"
            :key="p"
            class="text-12px font-600 text-[var(--lb-chip-fg)] bg-[var(--lb-chip-bg)] border border-edge py-1.5 px-3 rounded-4px"
          >{{ p }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
