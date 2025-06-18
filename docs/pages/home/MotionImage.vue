<template>
  <div>
    <img :src="image_url" :class="image_class" />
    <img :src="image_mask_url" :class="image_mask_class" :style="image_mask_position" ref="mask" />
  </div>
</template>
<script setup>
import { useTemplateRef } from "vue";
import { useMotion } from "@vueuse/motion";
const props = defineProps({
  image_url: String,
  image_class: String,
  image_mask_url: String,
  image_mask_class: String,
  image_mask_position: Object,
  vMotion: Object,
});
const mask = useTemplateRef("mask");
useMotion(mask, props.vMotion);
</script>
