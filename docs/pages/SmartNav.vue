<script setup>
import { computed, ref } from "vue";
import { useLocale, useDetectMobile } from "./utils";

const { smartNav } = useLocale();
const isMobile = useDetectMobile();

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
  image: "https://assets.lbctrl.com/uploads/7c4b0de7-8850-4b5e-8831-0d7facd5a1ba/scr-20250502-mjmo.png",
  alt: "Smart Navigation Interface"
}
</script>

<template>
  <div class="bg-gray-50">
    <section class="py-16 lg:py-24 px-12">
      <div class="max-w-[1240px] mx-auto">
        <div class="flex flex-col lg:flex-row justify-between items-center bg-white rounded-xl">
          <!-- 左侧内容 -->
          <div class="space-y-8 flex flex-col justify-between h-full">
            <div class="pt-12 px-12">
              <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight">
                <span v-html="content.title"></span>
              </h1>
            </div>

            <!-- 特性列表 -->
            <div class="space-y-6 pb-12">
              <div v-for="(feature, index) in content.features" :key="index" :data-active="activeTab === index"
                class="space-y-1 pl-12 relative hover:cursor-pointer data-[active='true']:(after:bg-black) after:(content-[''] w-3px h-full bg-[var(--lb-gray-1)] absolute left-0 top-0)"
                @click="activeTab = index"
                >
                <div :data-active="activeTab === index" class="text-lg lg:text-xl text-[var(--lb-gray-1)] data-[active='true']:(text-black font-bold)" v-html="feature"></div>
              </div>
            </div>
          </div>

          <!-- 右侧图片 -->
          <div class="flex justify-center lg:justify-end py-4">
            <div class="relative max-w-3xl w-full">
              <!-- <img :src="content.image" :alt="content.alt" class="rounded-lg w-83 h-46 lg:w-160 lg:h-90" /> -->
               <video src="https://assets.lbctrl.com/uploads/7c4b0de7-8850-4b5e-8831-0d7facd5a1ba/scr-20250502-mjmo.mp4" class="rounded-lg w-83 h-46 lg:w-160 lg:h-90" :controls="false"></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
