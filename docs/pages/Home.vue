<script setup>
import RealTimeTracking from "./RealTimeTracking.vue";
import SmartNav from "./SmartNav.vue";
import Upgrade from "./Upgrade.vue";
import { useScroll } from "@vueuse/core";
import { watch, useTemplateRef, ref } from "vue";
import Hero from "./Hero.vue";
import { useDetectMobile, motionVisible, useLocale } from "./utils";
import DownloadInfo from "./DownloadInfo.vue";

const isMobile = useDetectMobile();
const { multiPlatform, globalTrade } = useLocale();
const { y } = useScroll(window);

const easedTranslateY = ref(0);
const upgrade = useTemplateRef("upgrade");
watch(y, () => {
  if (isMobile.value) return;
  const heroImage = document.getElementById("hero-image");
  if (!heroImage || !upgrade.value) return;

  const upgradeRect = upgrade.value.getBoundingClientRect();
  const heroRect = heroImage.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportCenter = viewportHeight / 2;

  // 计算 hero 元素中心点相对于视口的位置
  const heroCenter = heroRect.top;

  // 距离顶部小于 64px(header 高度) 时，不进行移动
  if (upgradeRect.top <= 64) {
    return;
  }

  // 计算滚动进度：当 hero 中心在视口中心时为 0.5
  const scrollProgress = (viewportCenter - heroCenter) / viewportHeight;
  // 根据滚动进度计算 translateY
  // 当 scrollProgress = 0 时（hero 在视口底部），translateY 应该让 Upgrade 完全显示
  // 当 scrollProgress = 1 时（hero 在视口顶部），translateY 应该让 Upgrade 完全遮住 hero
  let translateY = scrollProgress * viewportHeight;

  // 平滑限制范围，避免突兀的移动
  const maxTranslate = viewportHeight * 2.2;
  const minTranslate = -viewportHeight * 0.2;

  translateY = Math.max(minTranslate, Math.min(maxTranslate, translateY));

  // 添加缓动效果
  const y = translateY * 2; // 缓动系数
  const easedY = Number(y.toFixed(2));
  if (easedY > 600) {
    easedTranslateY.value = easedY;
  } else {
    easedTranslateY.value = 0;
  }
});
</script>

<template>
  <div class="min-h-screen bg-white" ref="container">
    <section class="py-16 text-center min-h-600px relative">
      <template v-if="isMobile">
        <Hero />
        <Upgrade />
      </template>
      <template v-else>
        <Hero />
        <div class="relative z-11 transition-opacity duration-300 will-change-transform backdrop-blur-30px bg-white/80"
          ref="upgrade" :style="{
            transform: `translateY(-${easedTranslateY}px)`,
            marginBottom: `-${easedTranslateY}px`,
          }">
          <Upgrade class="absolute top-0 left-0 w-full h-[calc(100vh-64px+5rem)]" />
        </div>
        <div v-if="!isMobile && easedTranslateY > 600"
          class="absolute top-0 left-0 w-full h-full z-10 opacity-0 backdrop-blur-30px bg-white/80" :style="{
            opacity: easedTranslateY > 600 ? easedTranslateY / 100 : 0,
          }">
        </div>
      </template>
    </section>

    <div class="relative z-10 bg-white">
      <!-- Real-Time Tracking Section - Using Component -->
      <RealTimeTracking class="bg-gray-50" />

      <!-- Global Trading Section -->
      <section class="px-6 py-8 lg:py-18">
        <div class="max-w-[1200px] mx-auto space-y-8">
          <h2 class="!text-3xl font-bold text-black lg:!text-4xl" v-motion="motionVisible(300, 'visible', { start: { y: 20 }, end: { y: 0 } })
            ">
            <span v-html="globalTrade.title"></span>
          </h2>
          <div
            class="flex flex-col-reverse items-center gap-12 px-6 py-8 lg:justify-between lg:flex-row bg-gray-50 lg:py-16 rounded-xl">
            <ul class="space-y-10 lt-sm:(space-y-4) text-black list-none w-75 lg:text-xl">
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 font-bold">✓</span>
                <span v-html="globalTrade.items[0]"></span>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 font-bold">✓</span>
                <span v-html="globalTrade.items[1]"></span>
              </li>
              <li class="flex items-start gap-3">
                <span class="flex-shrink-0 font-bold">✓</span>
                <span v-html="globalTrade.items[2]"></span>
              </li>
            </ul>
            <div class="relative flex justify-center">
              <img src="https://assets.lbctrl.com/uploads/4afae8f6-0ae0-42e2-9ada-d90fb8ecbc3b/global.png"
                alt="Global Trading Interface" class="rounded-lg w-83 lg:w-160" />
              <img v-if="!isMobile"
                src="https://assets.lbctrl.com/uploads/3dfc6dbf-2b0a-4c91-80d6-4f021c20bed2/global-mask.png"
                alt="Global Trading Interface" class="absolute top-0 left-0 rounded-lg w-60 md:w-100 lg:w-141" v-motion="{
                  visible: {
                    y: 145,
                    x: -100,
                    transition: {
                      duration: 500,
                    },
                  },
                  initial: {
                    y: 0,
                    x: 0,
                  },
                }" />
            </div>
          </div>
        </div>
      </section>

      <SmartNav v-motion="motionVisible()" />

      <!-- Multi-Platform Monitoring -->
      <section class="py-16 px-6">
        <div class="max-w-[1200px] mx-auto">
          <img src="https://assets.lbctrl.com/uploads/2d66f21e-86b5-4b79-aef3-32bfa7d6a6c3/multi.png" alt="Platform 6"
            class="w-full h-auto rounded max-w-full" />
          <h2 class="!text-3xl lg:!text-4xl font-bold text-center mb-12 text-black">
            <span v-motion="motionVisible()" v-html="multiPlatform.title"></span>
          </h2>
          <div class="text-center text-sm lg:text-xl my-5">
            <span v-motion="motionVisible()" v-html="multiPlatform.description"></span>
          </div>
        </div>
        <div class="mt-8">
          <DownloadInfo />
        </div>
      </section>
    </div>
  </div>
</template>
