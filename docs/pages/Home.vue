<script setup>
import { useLocale, motionVisible } from "./utils";
import DownloadInfo from "./home/DownloadInfo.vue";
import RealTimeTracking from "./home/RealTimeTracking.vue";
import SmartNav from "./home/SmartNav.vue";
import Upgrade from "./home/Upgrade.vue";
import Hero from "./home/Hero.vue";


const { multiPlatform } = useLocale();
</script>

<template>
  <div id="home-page" class="min-h-screen bg-white">
    <section class="py-16 text-center relative">
      <div>
        <Hero />
        <Upgrade />
      </div>
    </section>
    <div class="relative z-10 bg-white">
      <!-- Real-Time Tracking Section - Using Component -->
      <RealTimeTracking class="bg-gray-50" />

      <SmartNav v-motion="motionVisible()" />

      <!-- Multi-Platform Monitoring -->
      <section class="py-16 px-6">
        <div class="max-w-[1200px] mx-auto">
          <img src="https://assets.lbctrl.com/uploads/ea7c0629-92cd-4353-8df7-e0cb1eb795e2/multi.png" alt="Platform 6"
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
