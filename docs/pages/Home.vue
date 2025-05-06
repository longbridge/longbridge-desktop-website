<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter, useData } from "vitepress";
import {
  getPlatform,
  getDownloads,
  createDownloadUrl,
  getLocale,
} from "./utils";

const version = import.meta.env.VERSION || "v0.1.30";
const router = useRouter();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  download_more: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
});

const downloads = computed(() => {
  return getDownloads(version);
});

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
  <div class="hero-section" :locale="getLocale()">
    <div class="hero-content">
      <h1 class="hero-name">
        {{ name }} <span class="hero-new-tag">New</span>
      </h1>
      <p class="hero-tagline">{{ tagline }}</p>
      <div class="hero-image">
        <div class="hero-image-grid">
          <img
            src="https://assets.lbctrl.com/uploads/06bfc425-8847-4bd4-a7e4-166e22f5a8c8/scr-20250502-mjor.png"
            :alt="name"
            class="hero-image-item"
          />
          <img
            src="https://assets.lbctrl.com/uploads/f9971b35-3172-40a6-b124-65aea2e597a5/scr-20250502-mjkc.png"
            :alt="name"
            class="hero-image-item"
          />
          <img
            src="https://assets.lbctrl.com/uploads/7c4b0de7-8850-4b5e-8831-0d7facd5a1ba/scr-20250502-mjmo.png"
            :alt="name"
            class="hero-image-item"
          />
        </div>
      </div>
      <div class="hero-buttons">
        <div class="hero-buttons-row">
          <template v-for="(link, index) in downloads" :key="index">
            <a
              :href="link.url"
              class="btn-download"
              target="_blank"
              :data-platform="link.platform"
              rel="noopener"
            >
              <template v-if="link.platform === 'macos'">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M11.6734 7.22198C10.7974 7.22198 9.44138 6.22598 8.01338 6.26198C6.12938 6.28598 4.40138 7.35397 3.42938 9.04597C1.47338 12.442 2.92538 17.458 4.83338 20.218C5.76938 21.562 6.87338 23.074 8.33738 23.026C9.74138 22.966 10.2694 22.114 11.9734 22.114C13.6654 22.114 14.1454 23.026 15.6334 22.99C17.1454 22.966 18.1054 21.622 19.0294 20.266C20.0974 18.706 20.5414 17.194 20.5654 17.11C20.5294 17.098 17.6254 15.982 17.5894 12.622C17.5654 9.81397 19.8814 8.46998 19.9894 8.40998C18.6694 6.47798 16.6414 6.26198 15.9334 6.21398C14.0854 6.06998 12.5374 7.22198 11.6734 7.22198ZM14.7934 4.38998C15.5734 3.45398 16.0894 2.14598 15.9454 0.849976C14.8294 0.897976 13.4854 1.59398 12.6814 2.52998C11.9614 3.35798 11.3374 4.68998 11.5054 5.96198C12.7414 6.05798 14.0134 5.32598 14.7934 4.38998Z"
                  ></path>
                </svg>
              </template>
              <template v-if="link.platform === 'windows'">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M11.501 3V11.5H3.00098V3H11.501ZM11.501 21H3.00098V12.5H11.501V21ZM12.501 3H21.001V11.5H12.501V3ZM21.001 12.5V21H12.501V12.5H21.001Z"
                  ></path>
                </svg>
              </template>
              <template v-if="link.platform === 'linux'">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.001 12C22.001 17.5224 17.524 22 12.001 22C6.47798 22 2.00098 17.5224 2.00098 12C2.00098 6.4771 6.47833 2 12.001 2C17.524 2 22.001 6.4771 22.001 12ZM5.20128 10.6642C4.46363 10.6642 3.86613 11.2623 3.86613 12C3.86613 12.7372 4.46363 13.3349 5.20128 13.3349C5.93848 13.3349 6.53628 12.7372 6.53628 12C6.53628 11.2622 5.93848 10.6642 5.20128 10.6642ZM14.7337 16.7325C14.0954 17.1015 13.8763 17.9175 14.2454 18.5558C14.6137 19.1942 15.4296 19.4137 16.0682 19.0448C16.7067 18.6759 16.9257 17.8595 16.5571 17.2208C16.1884 16.5832 15.3721 16.3644 14.7337 16.7325V16.7325ZM8.10133 12C8.10133 10.6808 8.75663 9.5152 9.75958 8.80915L8.78348 7.174C7.61518 7.955 6.74598 9.1485 6.38498 10.545C6.80648 10.8895 7.07613 11.4131 7.07613 12C7.07613 12.586 6.80643 13.1097 6.38493 13.4543C6.74583 14.8516 7.61503 16.0448 8.78343 16.826L9.75953 15.1903C8.75653 14.4848 8.10128 13.32 8.10128 12L8.10133 12ZM12.001 8.09975C14.0385 8.09975 15.7098 9.66175 15.8853 11.654L17.788 11.6261C17.6942 10.1551 17.0518 8.83495 16.0645 7.86435C15.5568 8.05565 14.9705 8.02685 14.4637 7.7342C13.9559 7.4412 13.6376 6.9472 13.5506 6.4104C13.0571 6.27455 12.538 6.2005 12.001 6.2005C11.0782 6.2005 10.2053 6.41685 9.43058 6.80035L10.3582 8.46275C10.8577 8.23045 11.4141 8.09975 12.001 8.09975ZM12.001 15.8995C11.4141 15.8995 10.8576 15.7691 10.3585 15.537L9.43063 17.1991C10.2055 17.5831 11.0782 17.8004 12.001 17.8004C12.538 17.8004 13.0575 17.7255 13.5506 17.5888C13.6376 17.0526 13.9561 16.5586 14.4638 16.2652C14.971 15.9726 15.5569 15.9435 16.0646 16.1349C17.0519 15.1642 17.6942 13.8441 17.7881 12.3732L15.8846 12.3456C15.7099 14.338 14.0386 15.8996 12.0011 15.8996L12.001 15.8995ZM14.7334 7.26675C15.372 7.6349 16.1883 7.4169 16.5566 6.77845C16.9257 6.1396 16.7071 5.32395 16.0683 4.95505C15.4296 4.58605 14.6138 4.8048 14.2447 5.44345C13.8763 6.08195 14.0954 6.89795 14.7334 7.2667V7.26675Z"
                  ></path>
                </svg>
              </template>
              <div class="flex flex-col text-left">
                <span class="label">{{ link.text }}</span>
                <span class="suffix">{{ link.suffix }}</span>
              </div>
            </a>
          </template>
        </div>
        <div class="release-notes">
          <div class="release-version flex items-center gap-1">
            <span>{{ version }}</span>
            <span class="bg-orange-500 text-white px-1 rounded-md text-xs"
              >Beta</span
            >
          </div>
          <a href="release-notes" class="release-notes-link">
            {{ download_more }}
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="features-container">
    <div
      v-for="(feature, index) in features"
      :key="index"
      class="feature-row"
      :class="{ reverse: index % 2 !== 0 }"
    >
      <div class="feature-content">
        <h3>{{ feature.title }}</h3>
        <ul>
          <li v-for="(item, idx) in feature.items" :key="idx">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="feature-image">
        <img v-if="feature.image" :src="feature.image" :alt="feature.title" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.hero-section {
  @apply flex flex-col items-center justify-center text-center py-16 px-8 max-w-[1200px] mx-auto gap-8;
}

.hero-content {
  @apply max-w-[1200px] mx-auto;
}

.hero-name {
  @apply block text-center text-6xl font-bold mb-4 text-[var(--vp-c-text-1)];
  background: linear-gradient(
    120deg,
    var(--vp-c-brand) 0%,
    var(--vp-c-brand-dark) 100%
  );
  line-height: 1.2;
}

.hero-new-tag {
  @apply inline-block text-xs font-medium bg-[var(--vp-c-brand-3)] text-white px-2 py-0.5 rounded-md align-top -ml-2 relative -top-3;
}

.hero-tagline {
  @apply text-xl text-[var(--vp-c-text-2)] mb-10 leading-relaxed;
}

.hero-buttons {
  @apply flex flex-col items-center gap-4;
}

.hero-buttons-row {
  @apply flex flex-wrap gap-3 justify-center;
}

.btn-download {
  @apply flex-row gap-x-4 items-center justify-center px-7 py-2 rounded-md font-medium no-underline transition-all duration-300 whitespace-nowrap text-base hidden;
  @apply bg-[var(--vp-c-brand)] text-white shadow-md hover:text-white;
}

.btn-download svg {
  @apply w-7 h-7;
}

.btn-download.active {
  @apply inline-flex;
}

.btn-download .suffix {
  @apply text-xs text-gray-400;
}

.btn-download:hover {
  @apply -translate-y-0.5 shadow-lg;
}

.btn-download:active {
  @apply translate-y-0;
}

.release-notes {
  @apply items-center justify-center flex flex-row gap-x-8 text-base text-[var(--vp-c-text-2)];
}

.release-notes-link {
  @apply no-underline inline-flex items-center gap-2 transition-all duration-300;
}

.release-notes-link:hover {
  @apply text-[var(--vp-c-brand)];
}

.release-notes-link:hover::after {
  @apply translate-x-1;
}

.release-notes-link::after {
  content: "→";
  @apply transition-transform duration-200;
}

.hero-image {
  @apply w-full max-w-[1200px] mx-auto mb-8 relative h-[450px] flex justify-center items-center;
}

.hero-image-grid {
  @apply relative w-full h-full flex justify-center items-center;
}

.hero-image-item {
  @apply absolute w-2/3 h-auto rounded-lg transition-all duration-300;
}

.hero-image-item:nth-child(2) {
  @apply w-[65%] scale-100 z-[2] brightness-100;
  transform-origin: center center;
}

.hero-image-item:nth-child(3) {
  @apply right-0 scale-[0.80] z-[1] brightness-90;
  transform-origin: right center;
}

.hero-image-item:nth-child(1) {
  @apply left-0 scale-[0.80] z-[1] brightness-90;
  transform-origin: left center;
}

.features-container {
  @apply flex flex-col max-w-[1200px] mx-auto py-16 px-8 gap-16;
}

.feature-row {
  @apply flex items-start gap-16;
}

.feature-row.reverse {
  @apply flex-row-reverse;
}

.feature-content {
  @apply flex-[6] pl-3;
}

.feature-row.reverse .feature-content {
  @apply pl-0 pr-3;
}

.feature-image {
  @apply flex-[4] flex justify-end items-start;
}

.feature-image img {
  @apply max-w-full h-auto transition-transform duration-300;
}

.feature-content h3 {
  @apply text-3xl font-semibold mb-8 mt-3;
  background: linear-gradient(
    120deg,
    var(--vp-c-brand) 0%,
    var(--vp-c-brand-dark) 100%
  );
}

.feature-content ul {
  @apply list-none p-0 m-0;
}

.feature-content li {
  @apply mb-5 text-base leading-relaxed text-[var(--vp-c-text-1)] relative list-disc ml-6;
}

@media (max-width: 1200px) {
  .hero-section {
    @apply py-12 px-6;
  }

  .hero-image {
    @apply max-w-[1000px] h-[450px];
  }

  .hero-name {
    @apply text-[3.5rem];
  }

  .features-container {
    @apply pt-12 px-6;
  }

  .feature-row {
    @apply gap-12;
  }
}

@media (max-width: 960px) {
  .hero-section {
    @apply py-10 px-5;
  }

  .hero-image {
    @apply max-w-[800px] h-[400px];
  }

  .hero-name {
    @apply text-5xl;
  }

  .hero-tagline {
    @apply text-xl mb-8;
  }

  .feature-row {
    @apply gap-10 mb-20;
  }
}

@media (max-width: 768px) {
  .hero-section {
    @apply py-8 px-4 gap-6;
  }

  .hero-image {
    @apply max-w-full h-[300px] mb-6;
  }

  .hero-name {
    @apply text-4xl;
  }

  .hero-tagline {
    @apply text-lg mb-6;
  }

  .hero-buttons-row {
    @apply flex-col w-full;
  }

  .btn-download {
    @apply w-full text-sm;
  }

  .feature-row {
    @apply !flex-col gap-8 mb-4 min-h-0;
  }

  .hero-image-item {
    @apply w-[70%];
  }

  .hero-image-item:nth-child(2) {
    @apply w-[85%];
  }

  .hero-image-item:hover {
    @apply !w-[85%];
  }
}

@media (max-width: 480px) {
  .hero-section {
    @apply py-6 px-3;
  }

  .hero-image {
    @apply h-[240px] mb-4 -mt-2;
  }

  .hero-name {
    @apply text-3xl mb-3;
  }

  .hero-tagline {
    @apply text-base mb-4;
  }

  .hero-image-item {
    @apply w-[75%];
  }

  .hero-image-item:nth-child(2) {
    @apply w-[90%];
  }

  .hero-image-item:hover {
    @apply !w-[90%];
  }

  .feature-content h3 {
    @apply text-2xl;
  }
}
</style>