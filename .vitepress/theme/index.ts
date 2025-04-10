import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Footer from '../../docs/pages/Footer.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null,
      {
        "layout-bottom": () => h(Footer)
      }
    )
  }
}
