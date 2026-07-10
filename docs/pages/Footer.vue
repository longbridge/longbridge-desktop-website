<script setup>
import { useLocale } from "./utils";
import { FOOTER_LINKS, SOCIAL_LINKS } from "./links";

const { footer } = useLocale();
const columns = [
  { title: footer.col_terms, labels: footer.terms, hrefs: FOOTER_LINKS.terms },
  { title: footer.col_about, labels: footer.about, hrefs: FOOTER_LINKS.about },
  { title: footer.col_more, labels: footer.more, hrefs: FOOTER_LINKS.more },
];
</script>

<template>
  <footer class="bg-[var(--lb-bg-3)] border-t border-[var(--vp-c-divider)] px-10 lt-sm:px-4 pt-14 pb-8">
    <div class="max-w-[1200px] mx-auto">
      <div class="grid lg:grid-cols-[1.2fr_1fr_1fr_1fr] sm:grid-cols-2 grid-cols-1 gap-8 mb-10">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <img
              src="https://assets.wbrks.com/assets/logo/icon-full-radius.png"
              alt=""
              class="w-6 h-6 rounded-6px"
            />
            <span class="text-14px font-700 text-heading">Longbridge Pro</span>
          </div>
          <div class="text-12.5px leading-1.8 text-faint">
            {{ footer.whatsapp_title }} ·
            <a href="https://wa.me/6563303033" class="lb-footer-link">+65 6330 3033</a><br />
            {{ footer.dealing_title }} ·
            <a href="https://wa.me/6563303030" class="lb-footer-link">+65 6330 3030</a><br />
            {{ footer.trading_days }}<br />
            {{ footer.email_title }} ·
            <a href="mailto:contact@longbridge.sg" class="lb-footer-link">contact@longbridge.sg</a>
          </div>
        </div>
        <div v-for="col in columns" :key="col.title">
          <div class="text-11px font-600 tracking-[1px] uppercase text-faint mb-3.5">
            {{ col.title }}
          </div>
          <div class="flex flex-col gap-2 text-13px">
            <a
              v-for="(label, i) in col.labels"
              :key="label"
              :href="col.hrefs[i]"
              target="_blank"
              rel="noopener"
              class="lb-footer-link !text-body"
            >{{ label }}</a>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center border-t border-[var(--vp-c-divider)] pt-6 flex-wrap gap-3">
        <div class="text-12px text-faint">{{ footer.copyright }}</div>
        <div class="flex gap-4 text-12px">
          <a
            v-for="s in SOCIAL_LINKS"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener"
            class="lb-footer-link !text-muted"
          >{{ s.label }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
