<script setup>
import { useDetectMobile, useLocale, motionVisible } from "./utils";

const { globalTrade } = useLocale();
const isMobile = useDetectMobile();
</script>
<template>
  <!-- Global Trading Section -->
  <section class="px-6 py-16">
    <div class="max-w-6xl mx-auto space-y-8">
      <h2
        class="text-3xl font-bold text-black lg:text-4xl"
        v-motion="
          motionVisible(300, 'visible', { start: { y: -50 }, end: { y: 0 } })
        "
      >
        <span v-html="globalTrade.title"></span>
      </h2>
      <div
        class="flex flex-col-reverse items-center gap-12 px-4 py-8 lg:justify-between lg:flex-row bg-gray-50 lg:py-16 rounded-xl"
      >
        <ul class="space-y-10 text-black list-none w-75 lg:text-xl">
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
          <img
            src="https://assets.lbctrl.com/uploads/2ab5532e-1d1f-4a0a-bb3a-e6a6a6db784a/global.png"
            alt="Global Trading Interface"
            class="rounded-lg w-83 h-46 lg:w-160 lg:h-90"
          />
          <img
            src="https://assets.lbctrl.com/uploads/44fb4de5-1e6a-4ca7-b02c-2cde9ff96972/global-mask.png"
            alt="Global Trading Interface"
            class="absolute top-0 left-0 rounded-lg w-60 h-30 md:w-100 md:h-50 lg:w-141 lg:h-66"
            v-motion="{
              visible: {
                y: !isMobile ? 145 : 104,
                x: !isMobile ? -100 : -33,
                transition: {
                  duration: 500,
                },
              },
              initial: {
                y: 0,
                x: 0,
              },
            }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
