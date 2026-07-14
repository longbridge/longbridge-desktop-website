<script setup>
import { onMounted, ref } from "vue";
import { useLocale, motionVisible } from "../utils";

const { upgrade } = useLocale();

// count the big metric values up from 0 once the cards scroll into
// view; SSR renders the final values, reduced-motion keeps them
const displays = ref(upgrade.cards.map((c) => c.value));
const grid = ref(null);

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const targets = upgrade.cards.map((c) => {
    const m = c.value.match(/^(\D*)(\d+)$/);
    return m ? { prefix: m[1], num: Number(m[2]) } : null;
  });
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      targets.forEach((t, i) => {
        if (!t) return;
        const start = performance.now();
        const duration = 1200;
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          displays.value[i] = t.prefix + Math.round(eased * t.num);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.3 },
  );
  if (grid.value) io.observe(grid.value);
});
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
      <div ref="grid" class="grid md:grid-cols-3 grid-cols-1 gap-8 lt-sm:gap-4">
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
            {{ displays[i] }}<span class="text-20px text-muted">{{ card.unit }}</span>
          </div>
          <div class="text-19px font-700 text-heading mb-2">{{ card.title }}</div>
          <p class="!text-14px !leading-[1.6] text-muted">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
