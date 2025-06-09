<script setup>
import DownloadInfo from "./DownloadInfo.vue";
import { useLocale, motionVisible } from "./utils";

const { name, tagline, download_more, legacy_info } = useLocale();
</script>
<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col items-center justify-center mb-8">
      <div class="relative" v-motion="motionVisible()">
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
        v-motion="motionVisible(750)"
        class="max-w-2xl mx-auto text-lg text-gray-600"
      >
        {{ tagline }}
      </p>
    </div>

    <!-- Download Buttons -->
    <DownloadInfo
      v-motion="motionVisible(1000)"
      class="mb-6.5"
      :download_more="download_more"
      :legacy_info="legacy_info"
    />

    <!-- Main App Screenshot -->
    <div
      class="w-auto mx-auto max-w-672xl lg:w-72rem"
      id="hero-image"
      v-motion="motionVisible()"
    >
      <img
        src="https://assets.lbctrl.com/uploads/255864fe-b73c-4fb9-9910-71eb07f9a557/hero-image.png"
        alt="Longbridge Pro Interface"
        class="w-full h-auto rounded-lg"
      />
    </div>
  </div>
</template>
