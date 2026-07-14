<script setup>
import { computed } from "vue";
import { useData } from "vitepress";
import { data } from "./releases.data";

const { localeIndex } = useData();
const releases = computed(() => data[localeIndex.value] ?? data.root);
</script>

<template>
  <div class="lb-changelog">
    <section
      v-for="release in releases"
      :key="release.version"
      class="lb-changelog-item"
      v-html="release.html"
    ></section>
  </div>
</template>
