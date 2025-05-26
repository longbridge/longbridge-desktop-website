import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Footer from '../../docs/pages/Footer.vue'
import mediumZoom from "medium-zoom";
import { useRoute } from "vitepress";
import { onMounted, watch, nextTick } from "vue";
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null,
      {
        "layout-bottom": () => h(Footer)
      }
    )
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
