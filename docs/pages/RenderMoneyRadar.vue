<template>
  <div>
    <img
      src="https://assets.lbctrl.com/uploads/422bc401-c665-459a-b976-cd13dc957612/real-time-3.png"
      class="relative w-88 h-49 lg:w-172 lg:h-98 rounded-lg"
    />
    <img
      src="https://assets.lbctrl.com/uploads/d7d96d53-dd4e-40f9-8f71-75e92c3bf487/real-time-3-mask.png"
      class="absolute w-25 h-45 lg:w-50 lg:h-91 rounded-lg"
      :style="isMobile && { top: '-22px', right: '-10px' }"
      v-motion="
        !isMobile
          ? {
              initial: {
                opacity: 0,
                y: -420,
                x: 600,
              },
              visible: {
                opacity: 1,
                y: -420,
                x: 530,
                transition: {
                  duration: 500,
                },
              },
            }
          : {
              initial: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  duration: 500,
                },
              },
            }
      "
    />
  </div>
</template>
<script setup>
import { useDetectMobile } from "./utils";
const isMobile = useDetectMobile();
</script>
