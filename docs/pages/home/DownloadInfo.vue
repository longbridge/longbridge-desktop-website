<script setup>
import { computed, onMounted, ref } from "vue";
import { useLocale } from "../utils";
import { getDownloads, getPlatform, splitDownloads } from "../downloads";

const t = useLocale();
const version = import.meta.env.VERSION || "v0.1.30";

const platform = ref("");
const mounted = ref(false);
onMounted(() => {
  platform.value = getPlatform();
  mounted.value = true;
});

const split = computed(() => splitDownloads(version, platform.value));
const primary = computed(() => split.value.primary);
const others = computed(() => split.value.others);
const all = computed(() => getDownloads(version));
</script>

<template>
  <div class="text-center">
    <div class="flex justify-center items-center gap-3 mb-4 flex-wrap">
      <template v-if="primary">
        <a :href="primary.url" class="lb-btn-primary">
          {{ t.download_for.replace("{os}", primary.text) }}
        </a>
      </template>
      <template v-else-if="mounted">
        <a
          v-for="link in all"
          :key="link.url"
          :href="link.url"
          class="lb-btn-primary"
        >
          {{ link.text }}
          <span class="text-12px opacity-60">{{ link.suffix }}</span>
        </a>
      </template>
      <a href="release-notes" class="lb-btn-secondary">{{ t.download_more }}</a>
    </div>
    <div v-if="primary" class="text-12px text-faint">
      {{ t.also_available }}
      <template v-for="(link, i) in others" :key="link.url">
        <a
          :href="link.url"
          class="!text-muted hover:!text-brand !no-underline"
        >{{ link.text }} ({{ link.suffix }})</a><span v-if="i < others.length - 1"> · </span>
      </template>
    </div>
  </div>
</template>
