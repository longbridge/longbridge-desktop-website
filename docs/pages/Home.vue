<script setup>
import Hero from "./home/Hero.vue";
import Upgrade from "./home/Upgrade.vue";
import RealTimeTracking from "./home/RealTimeTracking.vue";
import SmartNav from "./home/SmartNav.vue";
import MultiPlatform from "./home/MultiPlatform.vue";
import BottomCta from "./home/BottomCta.vue";
</script>

<template>
  <div id="home-page" class="min-h-screen bg-[var(--vp-c-bg)] text-body">
    <Hero />
    <Upgrade />
    <RealTimeTracking />
    <SmartNav />
    <MultiPlatform />
    <BottomCta />
  </div>
</template>
