import { h } from "vue";
import DefaultTheme from "vitepress/theme-without-fonts";
import Footer from "../../docs/pages/Footer.vue";
import NavDownload from "../../docs/pages/NavDownload.vue";
import mediumZoom from "medium-zoom";
import { useRoute, useRouter } from "vitepress";
import { onMounted, watch, nextTick } from "vue";
import "./custom.css";
import "virtual:uno.css";
import { MotionPlugin } from "@vueuse/motion";
import { getLocaleByAppUA } from "../../docs/pages/utils";
import googleAnalytics from "vitepress-plugin-google-analytics";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(Footer),
      "nav-bar-content-after": () => h(NavDownload),
    });
  },
  enhanceApp({ app }) {
    app.use(MotionPlugin);
    googleAnalytics({
      id: "G-P81Y8BDYYS",
    });
  },
  setup() {
    // Support zooming images
    const route = useRoute();
    const router = useRouter();
    const initZoom = () => {
      new mediumZoom(".content-container .main img", {
        background: "var(--lb-zoom-bg)",
      });
    };
    onMounted(() => {
      initZoom();

      // smooth-scroll same-page anchor jumps (outline, #download) without
      // slowing down route-change scroll restoration
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.addEventListener(
          "click",
          (e) => {
            const a = (e.target as Element)?.closest?.("a");
            if (!a || !(a instanceof HTMLAnchorElement)) return;
            const url = new URL(a.href, location.href);
            if (url.pathname === location.pathname && url.hash) {
              const html = document.documentElement;
              html.style.scrollBehavior = "smooth";
              setTimeout(() => {
                html.style.scrollBehavior = "";
              }, 1000);
            }
          },
          { capture: true },
        );
      }
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    );

    const lang = getLocaleByAppUA();
    if (lang) {
      router.go(`/desktop/${lang}/`);
    }
  },
};
