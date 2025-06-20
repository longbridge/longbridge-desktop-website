<script setup lang="ts">
import { useLocale, motionVisible } from "../utils";

type UpgradeItem = {
    title: string;
    class?: string;
    description: {
        style: string;
        text: string;
        class?: string;
        children?: { style: string; text: string }[];
    }[];
    image: string;
    img_class?: string;
};
const { upgrade } = useLocale();
const items: UpgradeItem[] = [
    {
        title: upgrade.tab1.title,
        description: [
            { style: "text-lg lg:text-xl font-bold", text: upgrade.tab1.description_1 },
            {
                style: "text-10 leading-8 lg:text-17.5 lg:leading-15 font-bold font-[var(--lb-font)]",
                text: upgrade.tab1.description_2,
                children: [
                    { style: "ml-1 self-end", text: upgrade.tab1.description_3 },
                ],
            },
            { style: "mt-2 lg:mt-0", text: upgrade.tab1.description_4 },
            { style: "", text: upgrade.tab1.description_5 },
        ],
        image:
            "https://assets.lbctrl.com/uploads/0f2ea591-c73c-41f7-8f71-276df926007a/flag-1.png",
    },
    {
        title: upgrade.tab2.title,
        description: [
            { style: "text-lg lg:text-xl font-bold", text: upgrade.tab2.description_1 },
            {
                style: "text-10 leading-8 lg:text-17.5 lg:leading-15 font-bold mb-4 lt-sm:(mb-1) font-[var(--lb-font)]",
                text: upgrade.tab2.description_2,
            },
            { style: "mt-2 lg:mt-0", text: upgrade.tab2.description_3 },
            { style: "", text: upgrade.tab2.description_4 },
        ],
        image:
            "https://assets.lbctrl.com/uploads/581199f5-90c6-48b1-98fc-6fd8b626ffb9/flag-2.png",
    },
    {
        title: upgrade.tab3.title,
        class: "lt-sm:(flex-row items-end gap-4)",
        description: [
            {
                style: "text-10 font-bold font-[var(--lb-font)]",
                text: upgrade.tab3.description_1,
                class: "flex flex-col lt-sm:(text-left)",
                children: [
                    { style: "mb-1 lg:mb-4 ", text: upgrade.tab3.description_2 },
                ]
            },
            {
                style: "text-10 font-bold font-[var(--lb-font)]",
                text: upgrade.tab3.description_3,
                class: "flex-col",
                children: [
                    { style: "", text: upgrade.tab3.description_4 },
                ],
            },
        ],
        image:
            "https://assets.lbctrl.com/uploads/4332bbcc-c031-4ae3-a1ae-7006a05cca83/flag-3.png",
        img_class: "!object-cover",
    },
];
</script>
<template>
    <section class="relative flex items-center px-6" ref="flow">
        <div class="w-auto mx-auto md:w-5xl">
            <div class="mb-12 text-3xl font-bold text-left text-black lg:text-4xl"
                v-motion="motionVisible(300, 'visible')">
                <span v-html="upgrade.title"></span>
            </div>

            <div
                class="grid md:grid-cols-3 gap-8 grid-cols-1 [&>div]:(bg-gray-50 rounded-xl p-3 lg:p-6 shadow-lg border border-gray-200 md:h-97 h-45)">
                <div v-for="(item, index) in items" :key="item.title" class="relative"
                    v-motion="motionVisible(100 * index + 300, 'visible')">
                    <img :src="item.image" alt="flag image" :class="[
                        'absolute top-0 right-0 object-contain w-24 h-36 lg:w-37 lg:h-54',
                        item.img_class,
                    ]" />
                    <div class="flex flex-col items-start justify-between h-full">
                        <p class="text-16px font-semibold text-left text-black lg:text-6.5">
                            <span v-html="item.title"></span>
                        </p>
                        <div
                            :class="['z-10 flex-1 flex flex-col justify-end space-y-0.5 lg:space-y-2 text-left text-black', item.class]">
                            <p :class="['flex text-14px lg:text-16px', desc.class]"
                                v-for="desc in item.description.filter(desc => desc.text)" :key="desc.text">
                                <span :class="desc.style">{{ desc.text }}</span>
                                <span v-for="child in desc.children" :key="child.text" :class="child.style">{{
                                    child.text }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
