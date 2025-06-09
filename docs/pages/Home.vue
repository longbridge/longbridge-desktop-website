<script setup>
import RealTimeTracking from "./RealTimeTracking.vue";
import SmartNav from "./SmartNav.vue";
import MultiPlatform from "./MultiPlatform.vue";
import Upgrade from "./Upgrade.vue";
import GlobalTrade from "./GlobalTrade.vue";
import { useScroll } from "@vueuse/core";
import { watch, useTemplateRef, ref } from "vue";
import Hero from "./Hero.vue";
import { useDetectMobile, motionVisible } from "./utils";

const isMobile = useDetectMobile();

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
  easedTranslateY.value = Number(y.toFixed(2));
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
        <div
          class="will-change-transform backdrop-blur-30px bg-white/80"
          ref="upgrade"
          :style="{
            transform: `translateY(-${easedTranslateY}px)`,
            marginBottom: `-${easedTranslateY}px`,
          }"
        >
          <Upgrade
            class="absolute top-0 left-0 w-full z-11 h-[calc(100vh-64px+5rem)]"
          />
        </div>
        <div class="absolute bottom-0 left-0 w-full h-20 z-10 bg-gray-50"></div>
      </template>
    </section>

    <div class="relative z-10 bg-white">
      <!-- Real-Time Tracking Section - Using Component -->
      <RealTimeTracking class="bg-gray-50" />

      <GlobalTrade v-motion="motionVisible()" />
      <SmartNav v-motion="motionVisible()" />

      <MultiPlatform v-motion="motionVisible()" />
    </div>
  </div>
</template>
