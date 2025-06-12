<script setup>
import { computed, onMounted } from "vue";
import { getDownloads, getPlatform } from "./utils";
import { useLocale } from "./utils";

const { download_more, legacy_info } = useLocale();

const version = import.meta.env.VERSION || "v0.1.30";

const downloads = computed(() => getDownloads(version));

onMounted(() => {
  const platform = getPlatform();
  if (platform) {
    document
      .querySelectorAll(`[data-platform="${platform}"]`)
      .forEach((btn) => {
        btn.classList.add("active");
      });
  } else {
    document.querySelectorAll(".btn-download").forEach((btn) => {
      btn.classList.add("active");
    });
  }
});
</script>
<template>
  <div>
    <div class="flex flex-wrap items-center gap-4 justify-center mb-4 flex-col sm:flex-row">
      <template v-for="link in downloads">
        <a :href="link.url"
          class="btn-download rounded-md min-w-35 hidden items-center gap-3 whitespace-nowrap text-base bg-[var(--vp-c-brand)] !text-white shadow-md py-2 px-4 font-medium hover:!-translate-y-0.5 !transition-all !duration-300 hover:shadow-lg !no-underline"
          target="_blank" :data-platform="link.platform" rel="noopener">
          <div class="w-8 h-8" v-if="link.platform === 'macos'">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path
                d="M11.6734 7.22198C10.7974 7.22198 9.44138 6.22598 8.01338 6.26198C6.12938 6.28598 4.40138 7.35397 3.42938 9.04597C1.47338 12.442 2.92538 17.458 4.83338 20.218C5.76938 21.562 6.87338 23.074 8.33738 23.026C9.74138 22.966 10.2694 22.114 11.9734 22.114C13.6654 22.114 14.1454 23.026 15.6334 22.99C17.1454 22.966 18.1054 21.622 19.0294 20.266C20.0974 18.706 20.5414 17.194 20.5654 17.11C20.5294 17.098 17.6254 15.982 17.5894 12.622C17.5654 9.81397 19.8814 8.46998 19.9894 8.40998C18.6694 6.47798 16.6414 6.26198 15.9334 6.21398C14.0854 6.06998 12.5374 7.22198 11.6734 7.22198ZM14.7934 4.38998C15.5734 3.45398 16.0894 2.14598 15.9454 0.849976C14.8294 0.897976 13.4854 1.59398 12.6814 2.52998C11.9614 3.35798 11.3374 4.68998 11.5054 5.96198C12.7414 6.05798 14.0134 5.32598 14.7934 4.38998Z">
              </path>
            </svg>
          </div>
          <div class="w-8 h-8" v-if="link.platform === 'windows'">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path
                d="M11.501 3V11.5H3.00098V3H11.501ZM11.501 21H3.00098V12.5H11.501V21ZM12.501 3H21.001V11.5H12.501V3ZM21.001 12.5V21H12.501V12.5H21.001Z">
              </path>
            </svg>
          </div>
          <div class="flex flex-col text-left leading-1.2em">
            <span class="label">{{ link.text }}</span>
            <span class="text-xs text-gray-400">{{ link.suffix }}</span>
          </div>
        </a>
      </template>
    </div>
    <div class="text-sm font-medium flex flex-col items-center">
      <p>
        <span class="version">{{ version }}</span>
        <a class="group cursor-pointer ml-2 !no-underline !text-[var(--vp-c-brand-3)] relative hover:animate-pulse">
          <span class="inline-block group-hover:translate-x-1 transition-transform duration-300 vp-external-link-icon">
            {{ download_more }}
          </span>
        </a>
      </p>
      <div class="text-sm text-[var(--lb-gray-1)] mt-4 py-1 px-4 [&_a]:(text-[var(--vp-c-brand-3)] !no-underline)"
        v-html="legacy_info">
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-download.active {
  display: flex;
  align-items: center;
}
</style>
