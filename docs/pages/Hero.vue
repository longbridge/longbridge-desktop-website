<script setup>
import DownloadInfo from "./DownloadInfo.vue";
import { useLocale, motionVisible } from "./utils";

const { name, tagline } = useLocale();
</script>
<template>
  <div class="max-w-[1200px] mx-auto">
    <div class="flex flex-col items-center justify-center mb-8">
      <div class="relative">
        <h1
          class="sm:!text-4xl md:!text-5xl lg:!text-6xl font-bold text-black mb-4 flex !items-baseline justify-center gap-4"
        >
          {{ name }}
        </h1>
        <span
          class="absolute top-[16px] -right-[calc(3rem+12px)] lg:-right-[calc(5.25rem+12px)] flex items-center justify-center w-12 h-5 lg:w-21 lg:h-8 bg-black text-white px-3 py-1 rounded-full text-xs md:text-sm lg:text-lg font-bold"
          >NEW</span
        >
      </div>
      <p
        class="max-w-2xl mx-auto text-lg text-[var(--lb-gray-1)]"
      >
        {{ tagline }}
      </p>
    </div>

    <!-- Download Buttons -->
    <DownloadInfo class="mb-6.5" />

    <!-- Main App Screenshot -->
    <div
      class="w-auto mx-auto lg:w-5xl"
      id="hero-image"
      v-motion="motionVisible(300, 'visible')"
    >
      <img
        src="https://assets.lbctrl.com/uploads/92a6beb3-72c5-48d3-83c2-ad5d6306598b/hero-image.png"
        alt="Longbridge Pro Interface"
        class="w-full h-auto rounded-lg"
      />
    </div>
  </div>
</template>
