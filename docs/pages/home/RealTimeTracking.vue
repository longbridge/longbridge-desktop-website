<script setup>
import { ref, shallowRef } from "vue";
import { useLocale, motionVisible } from "../utils";

const { realTimeTracking } = useLocale();

const tabs = shallowRef([
    {
        title: realTimeTracking.tabs.tab_0.title,
        description: realTimeTracking.tabs.tab_0.description,
        image: realTimeTracking.tabs.tab_0.image,
    },
    {
        title: realTimeTracking.tabs.tab_1.title,
        description: realTimeTracking.tabs.tab_1.description,
        image: realTimeTracking.tabs.tab_1.image,
    },
    {
        title: realTimeTracking.tabs.tab_2.title,
        description: realTimeTracking.tabs.tab_2.description,
        image: realTimeTracking.tabs.tab_2.image,
    },
]);
// 响应式状态
const activeTab = ref(0);

// 方法
const previousTab = () => {
    activeTab.value =
        activeTab.value > 0 ? activeTab.value - 1 : tabs.value.length - 1;
};

const nextTab = () => {
    activeTab.value =
        activeTab.value < tabs.value.length - 1 ? activeTab.value + 1 : 0;
};

const setActiveTab = (index) => {
    activeTab.value = index;
};
</script>

<template>
    <section class="px-6 pb-18">
        <div class="max-w-[1200px] mx-auto pt-8 lg:pt-24">
            <h2
                class="!text-3xl lg:!text-4xl font-bold text-center !mb-10 text-black"
                v-motion="
                    motionVisible(300, 'visible', {
                        start: { y: 20 },
                        end: { y: 0 },
                    })
                "
            >
                <span v-html="realTimeTracking.title"></span>
            </h2>

            <!-- Main Content with Navigation -->
            <div class="relative">
                <!-- Left Arrow -->
                <button
                    @click="previousTab"
                    class="absolute z-10 flex items-center justify-center w-8 h-8 transition-colors -translate-y-1/2 bg-white rounded-full shadow-lg -left-2 md:left-5 lg:left-10 top-1/2 lg:w-10 lg:h-10 hover:bg-gray-50"
                >
                    <svg
                        class="w-4 h-4 text-gray-600 lg:w-5 lg:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                        ></path>
                    </svg>
                </button>
                <!-- Right Arrow -->
                <button
                    @click="nextTab"
                    class="absolute z-10 flex items-center justify-center w-8 h-8 transition-colors -translate-y-1/2 bg-white rounded-full shadow-lg -right-2 md:right-5 top-1/2 lg:right-10 lg:w-10 lg:h-10 hover:bg-gray-50"
                >
                    <svg
                        class="w-4 h-4 text-gray-600 lg:w-5 lg:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                        ></path>
                    </svg>
                </button>

                <!-- Content Area -->
                <div class="mx-4 lg:mx-12">
                    <!-- Screenshot -->
                    <div class="flex justify-center mb-8">
                        <template v-if="tabs[activeTab].renderImage">
                            <component :is="tabs[activeTab].renderImage" />
                        </template>
                        <img
                            v-else
                            :src="tabs[activeTab].image"
                            :alt="tabs[activeTab].title"
                            class="w-88 lg:w-172 rounded-lg"
                            v-motion="motionVisible(300)"
                        />
                    </div>

                    <!-- Tabs with underline style -->
                    <div
                        class="flex justify-center mb-6 border-b border-gray-200 border-b-solid"
                    >
                        <div
                            class="flex space-x-8 border-b border-gray-200 lg:space-x-12"
                        >
                            <button
                                v-for="(tab, index) in tabs"
                                :key="index"
                                @click="setActiveTab(index)"
                                class="relative flex items-center px-2 py-4 space-x-2 text-sm font-medium transition-all duration-300 lg:text-base whitespace-nowrap group"
                                :class="
                                    index === activeTab
                                        ? 'text-black'
                                        : 'text-[var(--lb-gray-1)]'
                                "
                            >
                                <svg
                                    class="flex-shrink-0 w-4 h-4 lg:w-5 lg:h-5"
                                    fill="currentColor"
                                    width="19"
                                    height="18"
                                    viewBox="0 0 19 18"
                                >
                                    <path
                                        v-if="index === 2"
                                        d="M9.73047 0.0117188C14.4881 0.252892 18.2715 4.1873 18.2715 9.00488L18.2598 9.46777C18.0186 14.2253 14.0849 18.0085 9.26758 18.0088L8.80371 17.9971C4.19954 17.7637 0.507807 14.0719 0.274414 9.46777L0.262695 9.00488C0.262695 4.03189 4.29459 0 9.26758 0L9.73047 0.0117188ZM10.2627 5.05176H8.2627V2.07227C5.19856 2.51257 2.7763 4.93589 2.33594 8H5.31445V10H2.33496C2.77178 13.0684 5.19556 15.4948 8.2627 15.9355V13H10.2627V15.9365C13.3341 15.4993 15.762 13.0714 16.1992 10H13.2627V8H16.1982C15.7575 4.93281 13.3311 2.50805 10.2627 2.07129V5.05176Z"
                                    />
                                    <template v-if="index === 1">
                                        <path
                                            d="M9.2627 0V8H0.262695V0H9.2627ZM2.2627 6H7.2627V2H2.2627V6Z"
                                        />
                                        <path
                                            d="M9.2627 10V16H0.262695V10H9.2627ZM2.2627 14H7.2627V12H2.2627V14Z"
                                        />
                                        <path
                                            d="M16.2627 0V16H10.7627V0H16.2627ZM12.7627 14H14.2627V2H12.7627V14Z"
                                        />
                                    </template>
                                    <path
                                        v-if="index === 0"
                                        d="M19.5166 1.30664L10.7754 11.4414L6.62402 7.33691L1.51953 13.3037L0 12.0029L6.50195 4.4043L10.6592 8.51367L18.0029 0L19.5166 1.30664Z"
                                    />
                                </svg>

                                <!-- Text -->
                                <span class="hidden sm:inline">{{
                                    tab.title
                                }}</span>
                                <span class="sm:hidden">{{
                                    tab.title.split(" ")[0]
                                }}</span>

                                <!-- Active underline -->
                                <div
                                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-black transition-all duration-300"
                                    :class="
                                        index === activeTab
                                            ? 'opacity-100 scale-x-100'
                                            : 'opacity-0 scale-x-0'
                                    "
                                ></div>

                                <!-- Hover underline -->
                                <div
                                    class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 transition-all duration-300 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                                    :class="index === activeTab ? 'hidden' : ''"
                                ></div>
                            </button>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="flex justify-center">
                        <p
                            class="max-w-2xl mx-auto !text-base text-black lg:text-lg"
                        >
                            {{ tabs[activeTab].description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* 确保下划线动画效果 */
.group:hover .group-hover\:scale-x-100 {
    transform: scaleX(1);
}

.group:hover .group-hover\:opacity-100 {
    opacity: 1;
}
</style>
