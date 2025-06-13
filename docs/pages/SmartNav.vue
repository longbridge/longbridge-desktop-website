<script setup>
import { ref, useTemplateRef } from "vue";
import { useLocale } from "./utils";
import { useIntersectionObserver } from "@vueuse/core";

const { smartNav } = useLocale();
const video = useTemplateRef('video');
useIntersectionObserver(video, ([{ isIntersecting }]) => {
  if (isIntersecting && video.value.paused) {
    video.value.play();
  } else {
    video.value.pause();
  }
});
// Props 定义
const props = defineProps({
  stickyOffset: {
    type: Number,
    default: 64,
  },
});

const activeTab = ref(0);
// 简化的内容配置
const content = {
  title: smartNav.title,
  features: [
    smartNav.description,
    smartNav.description_2
  ],
}
const handleTabClick = (index) => {
  activeTab.value = index;
  if (video.value && video.value.paused) {
    video.value.play();
  }
}
</script>

<template>
  <div class="bg-gray-50">
    <section class="py-16 lg:py-24 px-8">
      <div class="max-w-[1200px] mx-auto">
        <div class="flex lt-sm:(flex-col) flex-row justify-between items-center bg-white rounded-xl">
          <!-- 左侧内容 -->
          <div class="space-y-8 flex flex-col justify-between h-full">
            <div class="pt-12 px-12 lt-sm:(px-8 pt-4)">
              <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight">
                <span v-html="content.title"></span>
              </h1>
            </div>

            <!-- 特性列表 -->
            <div class="space-y-6 pb-12 lt-sm:(pb-4)">
              <div v-for="(feature, index) in content.features" :key="index" :data-active="activeTab === index"
                class="space-y-1 pl-8 lg:pl-12 relative hover:cursor-pointer data-[active='true']:(after:bg-black) after:(content-[''] w-3px h-full bg-[var(--lb-gray-1)] absolute left-0 top-0)"
                @click="handleTabClick(index)">
                <div :data-active="activeTab === index"
                  class="text-xl lt-sm:(text-sm) text-[var(--lb-gray-1)] data-[active='true']:(text-black font-bold)"
                  v-html="feature"></div>
              </div>
            </div>
          </div>

          <!-- 右侧图片 -->
          <div class="flex justify-center lg:justify-end py-4 px-4 lg:pl-0">
            <div class="relative max-w-3xl w-full">
              <video ref="video" playsinline="true" webkit-playsinline="true" muted="true"
                src="https://assets.lbctrl.com/uploads/7f24579e-1c9c-4958-8af5-c2aa294d9498/desktop_en.mp4"
                class="rounded-lg w-83 h-46 lg:w-160 lg:h-90"></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
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
