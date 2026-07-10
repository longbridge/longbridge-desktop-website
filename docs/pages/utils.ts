import { useWindowSize } from "@vueuse/core";
import { useRouter } from "vitepress";
import { computed } from "vue";
import en from "../../.vitepress/locales/en";
import zh_cn from "../../.vitepress/locales/zh-CN";
import zh_hk from "../../.vitepress/locales/zh-HK";

export * from "./downloads";

/**
 * Get the locale from the URL.
 */
export const getLocale = () => {
  const router = useRouter();
  const locale = router.route.path.split("/")[2] || "en";
  return locale;
};

export const easeOutCubic = (t: number) => {
  return 1 - Math.pow(1 - t, 3);
};

export const easeInOutCubic = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const useDetectMobile = () => {
  const { width } = useWindowSize();
  const isMobile = computed(() => width.value < 1024);
  const isMedium = computed(() => width.value < 1280);
  return { isMobile, isMedium };
};

export const motionVisible = (time = 500, type = 'enter', options = {
  start: {
    opacity: 0,
  }, end: {
    opacity: 1,
  }
}) => ({
  [`${type}`]: {
    transition: {
      delay: time,
    },
    ...options.end,
  },
  initial: {
    ...options.start,
  },
})

export const useLocale = () => {
  const lang = getLocale()
  const locales = {
    en,
    'zh-CN': zh_cn,
    'zh-HK': zh_hk
  }
  if (locales[lang]) {
    return locales[lang]
  }
  return locales['en']
}

export const getLocaleByAppUA = () => {
  if (typeof navigator === 'undefined') return ''
  const ua = navigator?.userAgent || ''
  const lang = ua.match(/lblang\/(\S+)/) || []
  return lang[1]
}

