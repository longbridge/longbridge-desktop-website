<script setup>
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import en from "../../.vitepress/locales/en";
import zhCN from "../../.vitepress/locales/zh-CN";
import zhHK from "../../.vitepress/locales/zh-HK";

const { localeIndex } = useData();
const locales = { root: en, "zh-CN": zhCN, "zh-HK": zhHK };
const t = computed(() => locales[localeIndex.value] ?? en);
const href = computed(() =>
  withBase(
    localeIndex.value === "root" ? "/#download" : `/${localeIndex.value}/#download`,
  ),
);
</script>

<template>
  <a class="LBNavDownload" :href="href">{{ t.nav_download }}</a>
</template>
