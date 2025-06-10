<script setup>
import { ref, computed, onMounted, shallowRef } from "vue";
import {
  useIntersectionObserver,
  useTransition,
  TransitionPresets,
} from "@vueuse/core";
import SmartTabsImage from "./SmartTabsImage.vue";
import { useLocale, motionVisible } from "./utils";

const { smartNav } = useLocale();
// Props 定义
const props = defineProps({
  stickyOffset: {
    type: Number,
    default: 64,
  },
});

const sections = shallowRef([
  {
    button: smartNav.button,
    id: "smart-nav",
    title: smartNav.title,
    description: smartNav.description,
    image:
      "https://assets.lbctrl.com/uploads/cf960036-39cc-4f6a-99d3-8397906af5c7/smart.png",
    alt: smartNav.alt || "Smart Navigation Interface",
  },
  {
    button: smartNav.button_2,
    id: "real-time-data",
    title: smartNav.title,
    description: smartNav.description,
    image:
      "https://assets.lbctrl.com/uploads/7c4b0de7-8850-4b5e-8831-0d7facd5a1ba/scr-20250502-mjmo.png",
    alt: smartNav.alt || "Real-Time Data Interface",
    renderImage: SmartTabsImage,
  },
]);
const currentSection = ref(0);
const stickyContent = ref(null);
const triggerRefs = ref([]);

const descriptionOffsetValue = ref(0);
const imageOpacityValue = ref(1);

const descriptionOffset = useTransition(descriptionOffsetValue, {
  duration: 700,
  transition: TransitionPresets.easeOutQuart,
});

const descriptionStyle = computed(() => {
  const offset = descriptionOffset.value;
  return {
    transform: `translateY(${offset}px)`,
    opacity: Math.max(0, 1 - Math.abs(offset) / 60),
  };
});

const imageOpacity = useTransition(imageOpacityValue, {
  duration: 300,
  transition: TransitionPresets.easeInOutQuad,
});

const setTriggerRef = (el, index) => {
  if (el) {
    triggerRefs.value[index] = el;
  }
};

const activeObservers = ref([]);

const setupObservers = () => {
  activeObservers.value.forEach((stop) => stop());
  activeObservers.value = [];

  triggerRefs.value.forEach((element, index) => {
    if (element) {
      const { stop } = useIntersectionObserver(
        element,
        ([{ isIntersecting, intersectionRatio }]) => {
          if (isIntersecting && intersectionRatio > 0.4) {
            updateCurrentSection(index);
          }
        },
        {
          threshold: [0.1, 0.3, 0.4, 0.6, 0.8],
          rootMargin: "-10% 0px -40% 0px",
        }
      );
      activeObservers.value.push(stop);
    }
  });
};

const updateCurrentSection = (newIndex) => {
  if (
    currentSection.value !== newIndex &&
    newIndex >= 0 &&
    newIndex < sections.value.length
  ) {
    const isForward = currentSection.value < newIndex;

    descriptionOffsetValue.value = isForward ? -30 : 30;
    imageOpacityValue.value = 0;

    setTimeout(() => {
      currentSection.value = newIndex;
      descriptionOffsetValue.value = 0;
      imageOpacityValue.value = 1;
    }, 200);
  }
};

const imageStyle = computed(() => {
  const opacity = imageOpacity.value;
  return {
    opacity,
  };
});

const currentContent = computed(() => {
  return sections.value[currentSection.value] || sections.value[0];
});

onMounted(() => {
  setupObservers();
});

const handleSectionClick = (index) => {
  //   updateCurrentSection(index);
  const targetElement = triggerRefs.value[index];
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
    });
  }
};
</script>

<template>
  <div class="relative">
    <div
      ref="stickyContent"
      class="sticky bg-gray-50 z-20"
      :style="{ top: `${stickyOffset}px` }"
    >
      <section class="py-16 px-6 h-screen bg-gray-50 flex items-center">
        <div class="max-w-6xl mx-auto w-full">
          <div class="grid lg:grid-cols-2 gap-12 items-center grid-cols-1">
            <div class="space-y-6">
              <div class="overflow-hidden">
                <h2 class="!text-3xl lg:!text-4xl font-bold text-black">
                  <span v-html="currentContent.title"></span>
                </h2>
              </div>

              <div class="overflow-hidden">
                <p class="text-gray-600 text-lg" :style="descriptionStyle">
                  {{ currentContent.description }}
                </p>
              </div>

              <div class="flex space-x-2">
                <div
                  v-for="(section, index) in sections"
                  :key="section.id"
                  class="h-1 flex-1 bg-gray-300 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full bg-black transition-all duration-500 ease-out"
                    :style="{
                      width: index <= currentSection ? '100%' : '0%',
                      opacity:
                        index === currentSection
                          ? 1
                          : index < currentSection
                          ? 0.5
                          : 0.2,
                    }"
                  ></div>
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <button
                  v-for="(section, index) in sections"
                  :key="section.id"
                  @click="handleSectionClick(index)"
                  class="cursor-pointer p-2 lg:p-3 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105 focus:outline-none"
                  :class="
                    index === currentSection
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  "
                >
                  {{ section.button }}
                </button>
              </div>
            </div>
            <div class="flex justify-center relative">
              <div class="relative w-full max-w-lg">
                <div>
                  <component
                    v-if="currentContent.renderImage"
                    :is="currentContent.renderImage"
                  />
                  <img
                    v-else
                    :src="currentContent.image"
                    :alt="currentContent.alt"
                    class="w-full h-auto rounded-lg transition-all duration-500"
                    :key="`image-${currentSection}`"
                  />
                </div>

                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg pointer-events-none"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="relative z-10">
      <div
        v-for="(section, index) in sections"
        :key="section.id"
        :ref="(el) => setTriggerRef(el, index)"
        class="h-screen"
        :data-section="index"
      ></div>
    </div>
  </div>
</template>
