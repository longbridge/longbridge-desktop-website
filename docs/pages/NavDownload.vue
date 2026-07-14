<script setup>
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import { useReactiveLocale } from "./utils";

const { localeIndex } = useData();
const t = useReactiveLocale();
const href = computed(() =>
  withBase(
    localeIndex.value === "root" ? "/#download" : `/${localeIndex.value}/#download`,
  ),
);
</script>

<template>
  <a class="LBNavDownload" :href="href">{{ t.nav_download }}</a>
</template>
