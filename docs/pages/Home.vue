<script setup>
import Upgrade from "./home/Upgrade.vue";
import DownloadInfo from "./home/DownloadInfo.vue";
import RealTimeTracking from "./home/RealTimeTracking.vue";
import SmartNav from "./home/SmartNav.vue";
import Hero from "./home/Hero.vue";

import { useScroll } from "@vueuse/core";
import { watch, useTemplateRef, ref, onMounted } from "vue";
import {
    useDetectMobile,
    easeOutCubic,
    useLocale,
    motionVisible,
} from "./utils";

const { isMobile, isMedium } = useDetectMobile();
const { name, tagline, multiPlatform, globalTrade } = useLocale();

const section1 = useTemplateRef("section1");
const upgrade = useTemplateRef("upgrade");
const img = useTemplateRef("hero-image");

const imgEased = ref(0);
const upgradeEased = ref(0);
const updateSectionAnimations = (scrollTop) => {
    const section1Height = section1.value.offsetHeight;
    const section1Progress = Math.max(
        0,
        Math.min(1, scrollTop / section1Height),
    );
    animateSection(section1Progress);
};
const animateSection = (progress) => {
    const imgProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.4));
    const upgradeProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.3));

    if (img.value) {
        imgEased.value = easeOutCubic(imgProgress);
    }
    if (upgrade.value) {
        upgradeEased.value = upgradeProgress;
    }
};
onMounted(() => {
    if (typeof window === "undefined") {
        return;
    }
    const { y } = useScroll(window);
    watch(y, (y) => {
        updateSectionAnimations(y);
    });
});
</script>

<template>
    <div class="min-h-screen bg-white">
        <section class="py-16 text-center relative" ref="section1">
            <Hero />
        </section>
        <section class="py-16 relative">
            <Upgrade />
        </section>
        <div class="relative z-10 bg-white">
            <!-- Real-Time Tracking Section - Using Component -->
            <RealTimeTracking class="bg-gray-50" />

            <!-- Global Trading Section -->
            <section class="px-6 py-8 lg:py-18">
                <div class="max-w-[1200px] mx-auto space-y-8">
                    <h2
                        class="!text-3xl font-bold text-black lg:!text-4xl lt-sm:(text-center)"
                        v-motion="
                            motionVisible(300, 'visible', {
                                start: { y: 20 },
                                end: { y: 0 },
                            })
                        "
                    >
                        <span v-html="globalTrade.title"></span>
                    </h2>
                    <div
                        class="lt-md:(flex-col-reverse items-center py-8 gap-6) flex justify-between flex-row gap-12 px-6 bg-gray-50 py-16 rounded-xl"
                    >
                        <ul
                            class="space-y-10 lt-sm:(space-y-4 !p-0) text-black list-none w-75 lg:text-xl"
                        >
                            <li class="flex items-start gap-3">
                                <span class="flex-shrink-0 font-bold">✓</span>
                                <span v-html="globalTrade.items[0]"></span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="flex-shrink-0 font-bold">✓</span>
                                <span v-html="globalTrade.items[1]"></span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="flex-shrink-0 font-bold">✓</span>
                                <span v-html="globalTrade.items[2]"></span>
                            </li>
                        </ul>
                        <div class="relative flex justify-center">
                            <img
                                src="https://assets.lbctrl.com/uploads/4afae8f6-0ae0-42e2-9ada-d90fb8ecbc3b/global.png"
                                alt="Global Trading Interface"
                                class="rounded-lg w-160 lt-sm:(w-83)"
                            />
                            <img
                                v-if="!isMobile"
                                src="https://assets.lbctrl.com/uploads/3dfc6dbf-2b0a-4c91-80d6-4f021c20bed2/global-mask.png"
                                alt="Global Trading Interface"
                                class="absolute top-0 left-0 rounded-lg w-60 md:w-100 lg:w-141"
                                v-motion="{
                                    visible: {
                                        y: 145,
                                        x: -100,
                                        transition: {
                                            duration: 500,
                                        },
                                    },
                                    initial: {
                                        y: 0,
                                        x: 0,
                                    },
                                }"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <SmartNav v-motion="motionVisible()" />

            <!-- Multi-Platform Monitoring -->
            <section class="py-16 px-6">
                <div class="max-w-[1200px] mx-auto">
                    <img
                        src="https://assets.lbctrl.com/uploads/2d66f21e-86b5-4b79-aef3-32bfa7d6a6c3/multi.png"
                        alt="Platform 6"
                        class="w-full h-auto rounded max-w-full"
                    />
                    <h2
                        class="!text-3xl lg:!text-4xl font-bold text-center mb-12 text-black"
                    >
                        <span
                            v-motion="motionVisible()"
                            v-html="multiPlatform.title"
                        ></span>
                    </h2>
                    <div class="text-center text-sm lg:text-xl my-5">
                        <span
                            v-motion="motionVisible()"
                            v-html="multiPlatform.description"
                        ></span>
                    </div>
                </div>
                <div class="mt-8">
                    <DownloadInfo />
                </div>
            </section>
        </div>
    </div>
</template>
