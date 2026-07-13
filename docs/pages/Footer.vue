<script setup>
import { computed } from "vue";
import { useReactiveLocale } from "./utils";

const t = useReactiveLocale();
const footer = computed(() => t.value.footer);
</script>

<template>
  <footer class="bg-[var(--lb-bg-3)] border-t border-[var(--vp-c-divider)] px-10 lt-sm:px-4 pt-12 pb-8">
    <div class="max-w-[1200px] mx-auto">
      <div class="flex justify-between items-start flex-wrap gap-6 mb-8">
        <div class="flex items-center gap-2">
          <img
            src="https://assets.wbrks.com/assets/logo/icon-full-radius.png"
            alt=""
            class="w-6 h-6 rounded-6px"
          />
          <span class="text-14px font-700 text-heading">Longbridge Pro</span>
        </div>
        <div class="text-12.5px leading-[1.8] text-faint text-right lt-sm:text-left">
          {{ footer.whatsapp_title }} · +65 6330 3033<br />
          {{ footer.dealing_title }} · +65 6330 3030<br />
          {{ footer.trading_days }}<br />
          {{ footer.email_title }} · contact@longbridge.sg
        </div>
      </div>
      <div class="border-t border-[var(--vp-c-divider)] pt-6">
        <div class="text-12px text-faint">{{ footer.copyright }}</div>
      </div>
    </div>
  </footer>
</template>
