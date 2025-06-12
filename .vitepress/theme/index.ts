import { h } from 'vue'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Footer from '../../docs/pages/Footer.vue'
import mediumZoom from "medium-zoom";
import { useRoute } from "vitepress";
import { onMounted, watch, nextTick } from "vue";
import './custom.css'
import 'virtual:uno.css'
import { MotionPlugin } from "@vueuse/motion";


export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null,
      {
        "layout-bottom": () => h(Footer)
      }
    )
  },
  enhanceApp({ app }) {
    app.use(MotionPlugin);
  },
  setup() {
    // Support zooming images
    const route = useRoute();
    const initZoom = () => {
      new mediumZoom(".content-container .main img", { background: "#dddde3" });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    );

  }
}
