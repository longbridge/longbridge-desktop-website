<script setup>
import DefaultTheme from "vitepress/theme-without-fonts";
import { useData } from "vitepress";
import { nextTick, provide } from "vue";
import Footer from "../../docs/pages/Footer.vue";
import NavDownload from "../../docs/pages/NavDownload.vue";

const { isDark } = useData();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

// circular reveal from the appearance switch (VPSwitchAppearance
// injects this handler); falls back to an instant toggle
provide("toggle-appearance", async ({ clientX: x, clientY: y }) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 350,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    },
  );
});
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-bottom><Footer /></template>
    <template #nav-bar-content-after><NavDownload /></template>
  </DefaultTheme.Layout>
</template>
