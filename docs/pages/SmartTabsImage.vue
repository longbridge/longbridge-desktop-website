<template>
  <div>
    <img
      src="https://assets.lbctrl.com/uploads/7841d876-63d3-491e-bd47-5938700a5300/smart-2.png"
      class="w-88 h-49 lg:w-172 lg:h-98 rounded-lg"
    />
    <img
      src="https://assets.lbctrl.com/uploads/564483d0-77cf-4999-857c-c0811507745e/smart-2-mask.png"
      class="absolute w-10 h-16.5 lg:w-21 lg:h-33 rounded-lg"
      :style="isMobile && { top: '-8px', left: '-100px' }"
      v-motion="
        !isMobile
          ? {
              initial: {
                opacity: 0,
                y: -430,
                x: 50,
              },
              visible: {
                opacity: 1,
                y: -414,
                x: 50,
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
