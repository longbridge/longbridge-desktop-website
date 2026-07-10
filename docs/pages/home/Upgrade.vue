<script setup>
import { useLocale, motionVisible } from "../utils";

const { upgrade } = useLocale();
</script>

<template>
  <section class="border-t border-[var(--vp-c-divider)] px-6 lt-sm:px-3 py-20 lt-sm:py-10">
    <div class="max-w-[1200px] mx-auto">
      <div class="lb-eyebrow" v-motion="motionVisible()">{{ upgrade.label }}</div>
      <h2
        class="!text-28px lg:!text-36px !font-600 !leading-[1.15] text-heading max-w-[560px] !mb-10"
        v-motion="motionVisible()"
      >
        {{ upgrade.title }}
      </h2>
      <div class="grid md:grid-cols-3 grid-cols-1 gap-8 lt-sm:gap-4">
        <div
          v-for="(card, i) in upgrade.cards"
          :key="card.title"
          class="lb-card"
          v-motion="motionVisible(100 * i + 300, 'visible')"
        >
          <div
            class="text-44px font-600 leading-none text-brand mb-4"
            style="font-family: var(--vp-font-family-mono)"
          >
            {{ card.value }}<span class="text-20px text-muted">{{ card.unit }}</span>
          </div>
          <div class="text-19px font-700 text-heading mb-2">{{ card.title }}</div>
          <p class="!text-14px !leading-1.6 text-muted">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
