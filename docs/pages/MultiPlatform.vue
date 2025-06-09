<template>
  <!-- Multi-Platform Monitoring -->
  <section class="py-16 px-6">
    <div class="max-w-6xl mx-auto">
      <img
        src="https://assets.lbctrl.com/uploads/2d66f21e-86b5-4b79-aef3-32bfa7d6a6c3/multi.png"
        alt="Platform 6"
        class="w-full h-auto rounded max-w-6xl"
      />
      <h2 class="!text-3xl lg:!text-4xl font-bold text-center mb-12 text-black">
        <span v-motion="motionVisible()" v-html="multiPlatform.title"></span>
      </h2>
      <div class="text-center text-xl my-5">
        <span
          v-motion="motionVisible()"
          v-html="multiPlatform.description"
        ></span>
      </div>
    </div>
    <div class="mt-8">
      <DownloadInfo />
    </div>
  </section>
</template>
<script setup>
import DownloadInfo from "./DownloadInfo.vue";
import { useLocale, motionVisible } from "./utils";

const { multiPlatform } = useLocale();
</script>
