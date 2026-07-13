<script setup>
import { ref } from "vue";
import { useLocale, motionVisible } from "../utils";

const { realTimeTracking } = useLocale();
const activeTab = ref(0);
</script>

<template>
  <section class="bg-[var(--lb-track-bg)] border-t border-[var(--vp-c-divider)] px-6 lt-sm:px-3 py-20 lt-sm:py-10">
    <div class="max-w-[1200px] mx-auto grid lg:grid-cols-[380px_1fr] grid-cols-1 gap-12 lt-sm:gap-6 items-center">
      <div v-motion="motionVisible()">
        <div class="lb-eyebrow">{{ realTimeTracking.label }}</div>
        <h2 class="!text-28px lg:!text-36px !font-600 !leading-[1.15] text-heading !mb-5">
          {{ realTimeTracking.title }}
        </h2>
        <p class="!text-15px !leading-[1.7] text-muted !mb-7">
          {{ realTimeTracking.description }}
        </p>
        <div class="flex flex-col gap-2">
          <button
            v-for="(tab, i) in realTimeTracking.tabs"
            :key="tab.title"
            @click="activeTab = i"
            class="text-left border border-solid rounded-12px py-3.5 px-4 text-14px cursor-pointer transition-all duration-200"
            :class="
              i === activeTab
                ? 'bg-[var(--lb-tab-active-bg)] border-[var(--lb-tab-active-border)] font-600 text-[var(--lb-tab-active-fg)] shadow-[0_0_0_3px_var(--lb-tab-ring)]'
                : 'bg-[var(--lb-tab-bg)] border-edge font-500 text-body hover:border-[var(--lb-card-hover-border)]'
            "
          >
            {{ tab.title }}
          </button>
        </div>
      </div>
      <div v-motion="motionVisible(300)">
        <Transition name="lb-fade" mode="out-in">
          <img
            :key="activeTab"
            :src="realTimeTracking.tabs[activeTab].image"
            :alt="realTimeTracking.tabs[activeTab].title"
            class="w-full border border-edge rounded-16px bg-surface"
          />
        </Transition>
      </div>
    </div>
  </section>
</template>
