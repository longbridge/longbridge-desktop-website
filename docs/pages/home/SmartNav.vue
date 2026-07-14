<script setup>
import { useTemplateRef } from "vue";
import { useLocale, motionVisible } from "../utils";
import { useIntersectionObserver } from "@vueuse/core";

const { smartNav } = useLocale();
const video = useTemplateRef("video");
useIntersectionObserver(video, ([{ isIntersecting }]) => {
  if (!video.value) return;
  if (isIntersecting && video.value.paused) {
    video.value.play();
  } else if (!isIntersecting) {
    video.value.pause();
  }
});
</script>

<template>
  <section class="border-t border-[var(--vp-c-divider)] px-6 lt-sm:px-3 py-20 lt-sm:py-10">
    <div class="max-w-[1200px] mx-auto text-center" v-motion="motionVisible()">
      <div class="lb-eyebrow">{{ smartNav.label }}</div>
      <h2 class="!text-28px lg:!text-36px !font-600 text-heading !mb-4">
        {{ smartNav.title }}
      </h2>
      <div class="flex justify-center flex-wrap gap-x-8 gap-y-3 mb-9 text-14px text-muted">
        <div v-for="point in smartNav.points" :key="point">
          <span class="text-brand font-700">•</span> {{ point }}
        </div>
      </div>
      <video
        ref="video"
        src="https://assets.lbctrl.com/uploads/f3161729-43d6-42e7-9a11-0408882ea933/video.mp4"
        autoplay
        muted
        loop
        playsinline
        webkit-playsinline
        class="w-250 max-w-full border border-edge rounded-16px block mx-auto"
      ></video>
    </div>
  </section>
</template>

<style scoped>
video::-webkit-media-controls-play-button {
  display: none;
  -webkit-appearance: none;
}

video::-webkit-media-controls-panel {
  display: none;
  -webkit-appearance: none;
}
</style>
