# Longbridge 桌面端站点重构实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按 `specs/2026-07-10-desktop-redesign-design.md` 重构整站:默认深色主题 + 浅色切换、新设计 token 层、导航/Footer/首页 7 分区重建、Release Notes 配套适配。

**Architecture:** 扩展 VitePress 默认主题(方案 A)。`appearance: 'dark'` 提供原生深色默认与切换;`custom.css` 承载 `:root`/`.dark` 两组设计 token 与主题级重塑(导航、侧边栏);首页分区为 `docs/pages/home/` 下的 Vue 组件,用 UnoCSS utility + token 变量实现;三语文案集中在 `.vitepress/locales/*.ts`。

**Tech Stack:** VitePress 1.6(DefaultTheme, theme-without-fonts)、UnoCSS(presetWind3 + variantGroup)、@vueuse/motion、@vueuse/core、bun(runtime + test)。

## Global Constraints

- 视觉数值(颜色/字号/间距/圆角/阴影)以仓库根 `DESIGN.md` 与 `specs/reference/HANDOFF.md` 为准,像素级还原;设计参考稿可用浏览器打开 `specs/reference/Longbridge Pro Desktop v2.dc.html` 对照(右上角可切换主题/语言)。
- 不新增 npm 依赖;保留 `@vueuse/motion` 入场动效。
- 三语 locale 路由不变:`/`(en)、`/zh-CN/`、`/zh-HK/`;站点 `base: '/desktop/'`。
- 不改动:`docs/release-notes/**` 内容、`.vitepress/config/utils.ts`(`getReleaseNotes`)、`.github/workflows/`、`script/check-latest.ts`、GA 插件注册(`.vitepress/theme/index.ts` 中 `googleAnalytics({ id: 'G-P81Y8BDYYS' })`)。
- 资产全部线上引用(assets.lbctrl.com / assets.wbrks.com),不入库。
- 下载按钮必须用真实平台直链(`getDownloads(version)`),不用设计稿占位链接 `https://longbridge.com/download`(该链接仅用于"旧版本"文案)。
- 组件样式不写裸十六进制颜色:用 UnoCSS 注册的语义色(`brand`/`heading`/`muted` 等,见 Task 1)或 `var(--…)` 引用。
- 版本号一律取 `import.meta.env.VERSION || 'v0.1.30'`。
- 命令均在仓库根执行:`bun run dev`(dev server,访问 `http://localhost:5173/desktop/`)、`bun run build`、`bun test`。
- 每个含视觉变更的任务,验证需覆盖 **深/浅两主题**(导航右侧切换开关)。

---

### Task 1: 主题基建 —— appearance/字体/token 层/基础组件类

**Files:**
- Modify: `.vitepress/config/index.mts`
- Modify: `.vitepress/theme/custom.css`(整体重写)
- Modify: `.vitepress/theme/index.ts`(仅 medium-zoom 背景一处)
- Modify: `unocss.config.ts`
- Delete: `docs/public/Cera-Pro-Light.otf`

**Interfaces:**
- Consumes: 无(首个任务)。
- Produces(后续所有任务依赖):
  - CSS 变量:`--lb-h`、`--lb-surface`、`--lb-border`、`--lb-brand`、`--lb-brand-label`、`--lb-bg-2`、`--lb-bg-3`、`--lb-btn-bg/fg/hover`、`--lb-btn2-bg/fg/border/hover`、`--lb-chip-bg/fg`、`--lb-tab-bg`、`--lb-tab-active-bg/border/fg`、`--lb-tab-ring`、`--lb-hover-wash`、`--lb-hero-bg`、`--lb-shot-shadow`、`--lb-card-hover-border/shadow`、`--lb-track-bg`、`--lb-glow`、`--lb-sidebar-active-bg`、`--up-color`、`--down-color`,以及全套 `--vp-c-*` 覆写。
  - CSS 类:`.lb-btn-primary`、`.lb-btn-secondary`、`.lb-eyebrow`、`.lb-card`、`.lb-hero`。
  - UnoCSS 语义色:`brand`、`label`、`heading`、`body`、`muted`、`faint`、`surface`、`edge`、`up`、`down`(用法如 `text-heading`、`border-edge`)。

- [ ] **Step 1: 修改 `.vitepress/config/index.mts`**

三处改动:① `appearance: false` → `appearance: 'dark'`;② `head` 增加 Google Fonts;③ 删除整个 `transformHead` 块(Cera Pro preload)。改后完整文件:

```ts
import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'

import en from './en.mts'
import zh_cn from './zh-CN.mts'
import zh_hk from './zh-HK.mts'

export default defineConfig({
  base: '/desktop/',
  srcDir: 'docs',
  outDir: 'dist',
  lastUpdated: true,
  cleanUrls: true,
  appearance: 'dark',
  vite: {
    plugins: [
      Unocss({
        configFile: '../../unocss.config.ts'
      })
    ],
    define: {
      'import.meta.env.VERSION': JSON.stringify(
        process.env.VERSION || 'v0.1.30'
      )
    }
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://assets.wbrks.com/assets/logo/logo1.png'
      }
    ],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap'
      }
    ]
  ],
  themeConfig: {
    logo: 'https://assets.wbrks.com/assets/logo/icon-full-radius.png'
  },
  locales: {
    root: { label: 'English', ...en },
    'zh-CN': { label: '简体中文', ...zh_cn },
    'zh-HK': { label: '繁體中文', ...zh_hk }
  }
})
```

- [ ] **Step 2: 整体重写 `.vitepress/theme/custom.css`**

```css
/* ============================================================
 * Design tokens — DESIGN.md §13 + specs/reference stub
 * ============================================================ */
:root {
  /* VitePress semantic (light) */
  --vp-c-bg: #ffffff;
  --vp-c-bg-soft: #f6f6f7;
  --vp-c-bg-elv: #ffffff;
  --vp-c-bg-alt: #f6f6f7;
  --vp-c-text-1: #3c3c43;
  --vp-c-text-2: #67676c;
  --vp-c-text-3: #929295;
  --vp-c-border: #c2c2c4;
  --vp-c-divider: rgba(0, 0, 0, 0.06);
  --vp-c-brand-1: #00b8b8;
  --vp-c-brand-2: #1ac7c7;
  --vp-c-brand-3: #33cdcd;
  --vp-c-brand: var(--vp-c-brand-1);
  --vp-sidebar-bg-color: #ffffff;
  --vp-nav-bg-color: rgba(255, 255, 255, 0.85);
  --vp-nav-height: 60px;
  --vp-layout-max-width: 1280px;
  --vp-font-family-base: 'Inter', -apple-system, BlinkMacSystemFont,
    'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif;
  --vp-font-family-mono: 'JetBrains Mono', ui-monospace, Menlo, Monaco,
    'Courier New', monospace;

  /* Longbridge tokens (light) */
  --lb-h: #0a0e19;
  --lb-surface: #ffffff;
  --lb-border: #eaebec;
  --lb-brand: #00ada2;
  --lb-brand-label: #00b8b8;
  --lb-bg-2: #f5f6f6;
  --lb-bg-3: #fafafa;
  --lb-btn-bg: #000000;
  --lb-btn-fg: #ffffff;
  --lb-btn-hover: #282828;
  --lb-btn2-bg: #f3f5f6;
  --lb-btn2-fg: #3c3c43;
  --lb-btn2-border: #eaebec;
  --lb-btn2-hover: #ebedee;
  --lb-chip-bg: #ffffff;
  --lb-chip-fg: #52585d;
  --lb-tab-bg: #ffffff;
  --lb-tab-active-bg: #ffffff;
  --lb-tab-active-border: #00ada2;
  --lb-tab-active-fg: #0a0e19;
  --lb-tab-ring: rgba(0, 173, 162, 0.1);
  --lb-hover-wash: rgba(0, 0, 0, 0.04);
  --lb-hero-bg: linear-gradient(
      to top,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.75) 45%,
      rgba(255, 255, 255, 0.35) 100%
    ),
    radial-gradient(rgba(10, 14, 25, 0.22) 1px, transparent 1px);
  --lb-shot-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  --lb-card-hover-border: #dcdee0;
  --lb-card-hover-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
  --lb-track-bg: #f5f6f6;
  --lb-glow: rgba(0, 173, 162, 0.1);
  --lb-sidebar-active-bg: rgba(0, 173, 162, 0.08);

  /* Financial semantic colors — identical in both themes */
  --up-color: #00ada2;
  --down-color: #ff3a75;
}

.dark {
  --vp-c-bg: #0a0e19;
  --vp-c-bg-soft: #13182a;
  --vp-c-bg-elv: #202127;
  --vp-c-bg-alt: #161a26;
  --vp-c-text-1: #dfdfd6;
  --vp-c-text-2: #98989f;
  --vp-c-text-3: #6a6a71;
  --vp-c-border: #3c3f44;
  --vp-c-divider: rgba(255, 255, 255, 0.06);
  --vp-c-brand-1: #00f0c4;
  --vp-c-brand-2: #32eadc;
  --vp-c-brand-3: #2ed4c7;
  --vp-sidebar-bg-color: #0a0e19;
  --vp-nav-bg-color: rgba(10, 14, 25, 0.8);

  --lb-h: #ffffff;
  --lb-surface: #13182a;
  --lb-border: #3c3f44;
  --lb-brand: #00f0c4;
  --lb-brand-label: #00f0c4;
  --lb-bg-2: #161a26;
  --lb-bg-3: #0a0e19;
  --lb-btn-bg: #ffffff;
  --lb-btn-fg: #000000;
  --lb-btn-hover: #e8e8e8;
  --lb-btn2-bg: rgba(80, 80, 80, 0.5);
  --lb-btn2-fg: #d1d5db;
  --lb-btn2-border: rgba(255, 255, 255, 0.12);
  --lb-btn2-hover: rgba(80, 80, 80, 0.7);
  --lb-chip-bg: rgba(80, 80, 80, 0.5);
  --lb-chip-fg: #d1d5db;
  --lb-tab-bg: rgba(32, 58, 63, 0.5);
  --lb-tab-active-bg: #203a3f;
  --lb-tab-active-border: rgba(0, 240, 196, 0.5);
  --lb-tab-active-fg: #00f0c4;
  --lb-tab-ring: rgba(0, 240, 196, 0.1);
  --lb-hover-wash: rgba(255, 255, 255, 0.06);
  --lb-hero-bg: linear-gradient(
      to top,
      rgba(10, 14, 25, 1) 0%,
      rgba(10, 14, 25, 0.65) 50%,
      rgba(10, 14, 25, 0.25) 100%
    ),
    radial-gradient(rgba(223, 223, 214, 0.18) 1px, transparent 1px);
  --lb-shot-shadow: 0px 4px 24px rgba(0, 0, 0, 0.4);
  --lb-card-hover-border: #4f5260;
  --lb-card-hover-shadow: 0px 2px 8px rgba(0, 240, 196, 0.06);
  --lb-track-bg: #09252a;
  --lb-glow: rgba(0, 240, 196, 0.14);
  --lb-sidebar-active-bg: rgba(0, 240, 196, 0.08);
}

/* ============================================================
 * Shared component classes
 * ============================================================ */
.lb-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--lb-btn-bg);
  color: var(--lb-btn-fg) !important;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  padding: 12px 28px;
  border-radius: 999px;
  box-shadow: rgba(15, 17, 21, 0.04) 0px 1px 2px 0px;
  text-decoration: none !important;
  transition: background 0.2s;
}
.lb-btn-primary:hover {
  background: var(--lb-btn-hover);
}

.lb-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--lb-btn2-bg);
  border: 1px solid var(--lb-btn2-border);
  color: var(--lb-btn2-fg) !important;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding: 12px 24px;
  border-radius: 999px;
  text-decoration: none !important;
  transition: background 0.2s;
}
.lb-btn-secondary:hover {
  background: var(--lb-btn2-hover);
}

.lb-eyebrow {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--lb-brand-label);
  margin-bottom: 14px;
}

.lb-card {
  background: var(--lb-surface);
  border: 1px solid var(--lb-border);
  border-radius: 16px;
  padding: 28px 24px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.lb-card:hover {
  border-color: var(--lb-card-hover-border);
  box-shadow: var(--lb-card-hover-shadow);
}

.lb-hero {
  background-image: var(--lb-hero-bg);
  background-size: auto, 16px 16px;
}

/* ============================================================
 * Home page resets (layout: home renders inside .vp-doc)
 * ============================================================ */
.VPHome {
  margin: 0 !important;
}

.vp-doc #home-page h1,
.vp-doc #home-page h2,
.vp-doc #home-page h3 {
  border: 0;
  margin: 0;
  padding: 0;
  letter-spacing: 0;
}

.vp-doc #home-page p {
  margin: 0;
}

/* reset preset vitepress padding */
.vp-doc.container {
  padding: 0px !important;
  margin: 0px !important;
  max-width: 100% !important;
}

/* medium plugin styles */
.medium-zoom-overlay {
  z-index: 9998;
}

.medium-zoom-image {
  z-index: 9999;
}
```

- [ ] **Step 3: 修改 `unocss.config.ts` 注册语义色**

```ts
import { defineConfig, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [presetWind3()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      brand: 'var(--lb-brand)',
      label: 'var(--lb-brand-label)',
      heading: 'var(--lb-h)',
      body: 'var(--vp-c-text-1)',
      muted: 'var(--vp-c-text-2)',
      faint: 'var(--vp-c-text-3)',
      surface: 'var(--lb-surface)',
      edge: 'var(--lb-border)',
      up: 'var(--up-color)',
      down: 'var(--down-color)'
    }
  }
})
```

- [ ] **Step 4: 修改 `.vitepress/theme/index.ts` 的 medium-zoom 背景**

将 `new mediumZoom(".content-container .main img", { background: "#dddde3" });` 改为:

```ts
new mediumZoom(".content-container .main img", {
  background: "var(--vp-c-bg)",
});
```

- [ ] **Step 5: 删除 Cera Pro 字体文件**

```bash
git rm docs/public/Cera-Pro-Light.otf
```

同时确认 custom.css 重写后已无 `Cera Pro` 与 `--lb-font` 引用:

```bash
grep -rn "Cera" .vitepress docs --include='*.css' --include='*.ts' --include='*.mts' --include='*.vue'
```

预期:只剩 `docs/pages/home/Upgrade.vue` 里的 `--lb-font` 引用(Task 6 重写时移除),无其他匹配。

- [ ] **Step 6: dev 验证**

Run: `bun run dev`,打开 `http://localhost:5173/desktop/` 与 `http://localhost:5173/desktop/release-notes`。
预期:
- 默认即深色(`<html class="dark">`),页面底色 `#0A0E19`;导航右侧出现主题切换开关,切浅色后刷新仍保持浅色(localStorage 持久化)。
- 正文字体为 Inter(DevTools 检查 computed font-family)。
- Release Notes 深色下正文 `#DFDFD6`、链接品牌色 `#00F0C4`,无白底残留块。
- 首页此时视觉尚未重构、部分区域样式可能过渡异常(旧组件引用了已删除的旧变量)——允许,后续任务逐区修复;但不允许构建报错。

- [ ] **Step 7: 构建验证**

Run: `bun run build`
预期:三 locale 构建成功,无 SSR/CSS 报错。

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "theme: Apply design-system tokens, dark default and Inter fonts"
```

---

### Task 2: 导航栏重塑 + `NavDownload` 药丸按钮

**Files:**
- Create: `docs/pages/NavDownload.vue`
- Modify: `.vitepress/theme/index.ts`
- Modify: `.vitepress/theme/custom.css`(追加导航段)
- Modify: `.vitepress/locales/en.ts`、`.vitepress/locales/zh-CN.ts`、`.vitepress/locales/zh-HK.ts`(各加 `nav_download` 字段)

**Interfaces:**
- Consumes: Task 1 的 token(`--lb-btn-bg` 等)与 `--vp-nav-*`。
- Produces: locale 字段 `nav_download: string`;CSS 类 `.LBNavDownload`。

- [ ] **Step 1: locale 增加 `nav_download`**

`en.ts` 顶层(`download_more` 旁)加:

```ts
  nav_download: 'Download',
```

`zh-CN.ts` 加:

```ts
  nav_download: '下载',
```

`zh-HK.ts` 加:

```ts
  nav_download: '下載',
```

- [ ] **Step 2: 新建 `docs/pages/NavDownload.vue`**

用 `useData().localeIndex` 取语言(在 release-notes 等任意页面都可靠),链接到对应 locale 首页的 `#download` 锚点(Hero 下载区,Task 5 设置该 id):

```vue
<script setup>
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import en from "../../.vitepress/locales/en";
import zhCN from "../../.vitepress/locales/zh-CN";
import zhHK from "../../.vitepress/locales/zh-HK";

const { localeIndex } = useData();
const locales = { root: en, "zh-CN": zhCN, "zh-HK": zhHK };
const t = computed(() => locales[localeIndex.value] ?? en);
const href = computed(() =>
  withBase(
    localeIndex.value === "root" ? "/#download" : `/${localeIndex.value}/#download`,
  ),
);
</script>

<template>
  <a class="LBNavDownload" :href="href">{{ t.nav_download }}</a>
</template>
```

- [ ] **Step 3: `.vitepress/theme/index.ts` 注入插槽**

顶部加 import,`Layout()` 增加插槽:

```ts
import NavDownload from "../../docs/pages/NavDownload.vue";
```

```ts
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(Footer),
      "nav-bar-content-after": () => h(NavDownload),
    });
  },
```

- [ ] **Step 4: custom.css 追加导航段**

追加到文件末尾:

```css
/* ============================================================
 * Navbar — 60px, translucent + blur, centered menu
 * ============================================================ */
.VPNavBar,
.VPNavBar.home.top,
.VPNavBar:not(.home) {
  background-color: var(--vp-nav-bg-color);
  backdrop-filter: saturate(1.8) blur(20px);
  -webkit-backdrop-filter: saturate(1.8) blur(20px);
  border-bottom: 1px solid var(--vp-c-divider);
}
.VPNavBar .content-body {
  background-color: transparent !important;
}
.VPNavBar .divider {
  display: none;
}

.VPNavBarTitle .title {
  font-size: 16px;
  font-weight: 700;
  color: var(--lb-h);
}
.VPNavBarTitle .logo {
  height: 28px;
  border-radius: 7px;
}

/* center the menu links (desktop only) */
@media (min-width: 960px) {
  .VPNavBar .container {
    position: relative;
  }
  .VPNavBar .VPNavBarMenu {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    transform: translateX(-50%);
  }
}

.VPNavBarMenuLink {
  font-size: 14px !important;
  font-weight: 500 !important;
  color: var(--lb-h) !important;
  padding: 0 12px !important;
  margin: 14px 2px;
  height: 32px !important;
  line-height: 32px !important;
  border-radius: 6px;
  transition: background 0.2s;
}
.VPNavBarMenuLink:hover {
  background: var(--lb-hover-wash);
}
.VPNavBarMenuLink.active {
  color: var(--lb-brand) !important;
  font-weight: 700 !important;
}

/* language dropdown */
.VPNavBarTranslations .button {
  height: 32px;
  border: 1px solid var(--lb-border);
  border-radius: 8px;
  padding: 0 10px;
  font-size: 13px;
}
.VPNavBarTranslations .button:hover {
  background: var(--lb-hover-wash);
}

/* GitHub icon button */
.VPSocialLink {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  transition: background 0.2s;
}
.VPSocialLink:hover {
  background: var(--lb-hover-wash);
}

/* appearance switch → compact icon-like toggle */
.VPNavBarAppearance .VPSwitchAppearance {
  border-color: var(--lb-border);
}

/* download pill (slot component) */
.LBNavDownload {
  display: inline-flex;
  align-items: center;
  height: 32px;
  background: var(--lb-btn-bg);
  color: var(--lb-btn-fg) !important;
  font-size: 14px;
  font-weight: 500;
  padding: 0 20px;
  border-radius: 999px;
  margin-left: 12px;
  white-space: nowrap;
  text-decoration: none !important;
  transition: background 0.2s;
}
.LBNavDownload:hover {
  background: var(--lb-btn-hover);
}
```

- [ ] **Step 5: dev 验证**

Run: `bun run dev`
预期(深/浅两主题都检查):
- 导航 60px 高、半透明模糊背景(滚动首页 Hero 时能透出内容)、底部 1px 分隔线;首页与 release-notes 页表现一致,无双重背景块。
- 桌面宽度下 Home / Longbridge Pro / Release Notes 三链接水平居中;当前页链接为品牌色;hover 有背景 wash。
- 右侧依次:语言下拉(带边框圆角 8px)、GitHub 图标(32×32 hover wash)、主题开关、Download 药丸(深色白底黑字/浅色黑底白字)。
- 三个语言下 Download 文案分别为 Download / 下载 / 下載;在 release-notes 页点击 Download 跳到对应语言首页(`#download` 锚点,Hero 未重构前跳到页顶即可)。
- 窗口缩到 <768px:出现汉堡菜单,Download 按钮仍在栏内且不换行溢出。

若某选择器未命中(VitePress 内部类名差异),用 DevTools 找到实际类名修正 CSS,直至达到上述预期。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "nav: Restyle navbar and add \`NavDownload\` pill button"
```

---

### Task 3: Footer 重写(4 栏 + 社媒底行)

**Files:**
- Create: `docs/pages/links.ts`
- Modify: `docs/pages/Footer.vue`(整体重写)
- Modify: `.vitepress/locales/en.ts`、`zh-CN.ts`、`zh-HK.ts`(各加 `footer` 对象)
- Modify: `.vitepress/theme/custom.css`(追加 `.lb-footer-link`)

**Interfaces:**
- Consumes: Task 1 token;`useLocale()`(`docs/pages/utils.ts`,已存在)。
- Produces: locale 字段 `footer: { whatsapp_title, dealing_title, trading_days, email_title, col_terms, col_about, col_more, terms: string[6], about: string[6], more: string[4], copyright }`;`docs/pages/links.ts` 导出 `FOOTER_LINKS = { terms: string[6], about: string[6], more: string[4] }` 与 `SOCIAL_LINKS: { label, href }[]`。

注意:旧 Footer.vue 里 `onMounted` 手动注入 gtag 的逻辑**删除**(GA 已由 theme/index.ts 的 `googleAnalytics` 插件负责,现状是重复注入);旧 Footer 内联的 locales 字典删除,文案迁入 `.vitepress/locales/*.ts`。

- [ ] **Step 1: 新建 `docs/pages/links.ts`**

```ts
// Footer link URLs are locale-independent (per design handoff).
export const FOOTER_LINKS = {
  terms: [
    "https://assets.lbctrl.com/uploads/a19e3990-7050-492f-bf02-d00d50c64ff1/318525f18a3242980632ee890c3fed66.pdf",
    "https://support.longbridge.sg/topics/Other/privacy-policy",
    "https://pub.lbkrs.com/files/202211/yyY2XRM5auoPCXfy/LBPL-Platform_TnCs__31_Oct_2022-FINAL_.pdf",
    "https://pub.lbkrs.com/files/202211/gPW5qDbnsJtgzDbN/LBS_Best_Execution_Policy_V1_10-2022__4_Oct-PM_.pdf",
    "https://pub.lbkrs.com/static/offline/202211/mM2JzzWCgmuHXRqb/1-LBS_Risk_Disclosures_and_Warning_Statement__for_main_website_upload_.pdf",
    "https://longbridge.com/sg/support/topics/accountopening/safe?locale=en",
  ],
  about: [
    "https://longbridge.com/sg/about",
    "https://longbridge.com/sg/about/license-regulatory",
    "https://longbridge.com/sg/reports",
    "https://longbridge.com/sg/jobs",
    "https://longbridge.com/sg/articles",
    "https://longbridge.com/sg/blog",
  ],
  more: [
    "https://longbridge.com/sg/promotions/welcome-rewards",
    "https://activity.longbridge.sg/pages/longbridge_sg/8651/index.html?app_id=longbridge_sg&org_id=1&channel=SHMS00001&account_channel=lb_sg",
    "https://longbridge.com/sg/institutions",
    "https://open.longportapp.com",
  ],
};

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/SGLongbridge" },
  { label: "Instagram", href: "https://www.instagram.com/longbridge.sg" },
  { label: "X", href: "https://x.com/sg_longbridge" },
  { label: "TikTok", href: "https://www.tiktok.com/@longbridge.sg" },
  { label: "GitHub", href: "https://github.com/longbridge" },
];
```

- [ ] **Step 2: 三个 locale 文件各加 `footer` 对象**

`en.ts`:

```ts
  footer: {
    whatsapp_title: 'WhatsApp Chat (general enquiries)',
    dealing_title: 'Dealing Hotline',
    trading_days: 'Trading days: 9a.m. – 12a.m. (GMT+8)',
    email_title: 'Email',
    col_terms: 'Terms & Conditions',
    col_about: 'About',
    col_more: 'More',
    terms: [
      'Customer Agreement',
      'Privacy Policy',
      'Terms and Conditions',
      'Best Execution Policy',
      'Risk Disclosure Statement',
      'Account Opening'
    ],
    about: [
      'About us',
      'License & Regulatory',
      'News & Media',
      'Join us',
      'Column',
      'Blog'
    ],
    more: ['Welcome Rewards', 'Referral Program', 'Corporate Services', 'OpenAPI'],
    copyright: '© 2024 – Present Longbridge'
  },
```

`zh-CN.ts`:

```ts
  footer: {
    whatsapp_title: 'WhatsApp 咨询（一般查询）',
    dealing_title: '交易热线',
    trading_days: '交易日：9:00 – 24:00 (GMT+8)',
    email_title: '邮箱',
    col_terms: '条款与条件',
    col_about: '关于',
    col_more: '更多',
    terms: ['客户协议', '隐私政策', '条款与条件', '最佳执行政策', '风险披露声明', '开户'],
    about: ['关于我们', '牌照与监管', '新闻与媒体', '加入我们', '专栏', '博客'],
    more: ['新人奖励', '邀请好友', '企业服务', 'OpenAPI'],
    copyright: '© 2024 – Present Longbridge'
  },
```

`zh-HK.ts`:

```ts
  footer: {
    whatsapp_title: 'WhatsApp 諮詢（一般查詢）',
    dealing_title: '交易熱線',
    trading_days: '交易日：9:00 – 24:00 (GMT+8)',
    email_title: '電郵',
    col_terms: '條款與條件',
    col_about: '關於',
    col_more: '更多',
    terms: ['客戶協議', '私隱政策', '條款與條件', '最佳執行政策', '風險披露聲明', '開戶'],
    about: ['關於我們', '牌照與監管', '新聞與媒體', '加入我們', '專欄', '網誌'],
    more: ['新人獎賞', '邀請好友', '企業服務', 'OpenAPI'],
    copyright: '© 2024 – Present Longbridge'
  },
```

- [ ] **Step 3: 重写 `docs/pages/Footer.vue`**

```vue
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
```

- [ ] **Step 4: custom.css 追加**

```css
/* footer links */
.lb-footer-link {
  color: var(--lb-brand);
  text-decoration: none !important;
  transition: color 0.2s;
}
.lb-footer-link:hover {
  color: var(--lb-brand);
  opacity: 0.85;
}
a.lb-footer-link.\!text-body:hover,
a.lb-footer-link.\!text-muted:hover {
  color: var(--lb-brand) !important;
  opacity: 1;
}
```

- [ ] **Step 5: dev 验证**

Run: `bun run dev`
预期(深/浅 × 三语):
- 首页与 release-notes 底部均出现 4 栏 Footer;深色底 `#0A0E19`、浅色 `#FAFAFA`。
- 第一栏联系方式 4 行(WhatsApp / Dealing Hotline / 交易时段 / Email),号码与邮箱为品牌色链接。
- 三个栏目链接文案随语言切换;栏目链接 hover 变品牌色;全部外链新标签打开。
- 底行左 `© 2024 – Present Longbridge`,右 5 个社媒文字链接。
- 窗口 <640px:栏目纵向堆叠无横向滚动。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "footer: Rebuild 4-column footer per design"
```

---

### Task 4: 下载模块抽取 + `DownloadInfo` 重写(TDD)

**Files:**
- Create: `docs/pages/downloads.ts`
- Create: `docs/pages/downloads.test.ts`
- Delete: `docs/pages/utils.test.ts`
- Modify: `docs/pages/utils.ts`
- Modify: `docs/pages/home/DownloadInfo.vue`(整体重写)
- Modify: `.vitepress/locales/en.ts`、`zh-CN.ts`、`zh-HK.ts`

**Interfaces:**
- Consumes: Task 1 的 `.lb-btn-primary`/`.lb-btn-secondary`;locale `download_more`(已存在)。
- Produces:
  - `docs/pages/downloads.ts` 导出:`getPlatform(): '' | 'windows' | 'macos' | 'linux'`、`createDownloadUrl(version, os, arch, suffix?)`、`getDownloads(version): DownloadLink[]`(顺序:windows ×1、macos ×2、linux deb、linux AppImage)、`splitDownloads(version, platform): { primary: DownloadLink | null, others: DownloadLink[] }`、`type DownloadLink = { text; suffix; url; platform }`。
  - locale 字段:`download_for: string`(含 `{os}` 占位)、`also_available: string`。
  - 组件 `DownloadInfo.vue`:无 props,自带主/次按钮 + 辅助行;Hero(Task 5)与 BottomCta(Task 9)直接 `<DownloadInfo />` 复用。

背景:现有 `utils.test.ts` 在 bun 下无法运行——`utils.ts` 顶层 `import { useRouter } from "vitepress"` 在 bun 环境解析失败。方案:把纯函数(`getPlatform`/`createDownloadUrl`/`getDownloads` + 新增 `splitDownloads`)移入无 vitepress 依赖的 `downloads.ts`,`utils.ts` 通过 `export * from './downloads'` 保持旧导入路径兼容,测试改为针对 `downloads.ts`。旧测试中 Linux 顺序期望(`[3]`=AppImage、`[4]`=deb)与实现(deb 在前)不符,新测试以实现顺序为准。

- [ ] **Step 1: 新建 `docs/pages/downloads.ts`(仅平移现有函数)**

将 `utils.ts` 中的 `getPlatform`、`createDownloadUrl`、`getDownloads` 三个函数(含各自注释)**原样剪切**到新文件 `docs/pages/downloads.ts`(实现不改,暂不加 `splitDownloads`)。`utils.ts` 中删除这三个函数定义,在其顶部加一行保持旧导入路径兼容:

```ts
export * from "./downloads";
```

(`utils.ts` 其余内容不动:`getLocale`、`easeOutCubic`、`easeInOutCubic`、`useDetectMobile`、`motionVisible`、`useLocale`、`getLocaleByAppUA`。)

- [ ] **Step 2: 写测试 `docs/pages/downloads.test.ts`(含尚未实现的 `splitDownloads` 用例)**

```ts
import { test, expect, describe } from "bun:test";
import {
  createDownloadUrl,
  getDownloads,
  getPlatform,
  splitDownloads,
} from "./downloads";

describe("getPlatform", () => {
  test("should detect Windows", () => {
    global.navigator = {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    } as Navigator;
    expect(getPlatform()).toBe("windows");
  });

  test("should detect macOS", () => {
    global.navigator = {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    } as Navigator;
    expect(getPlatform()).toBe("macos");
  });

  test("should detect Linux", () => {
    global.navigator = {
      userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
    } as Navigator;
    expect(getPlatform()).toBe("linux");
  });

  test("should not detect Android as Linux", () => {
    global.navigator = {
      userAgent: "Mozilla/5.0 (Linux; Android 10)",
    } as Navigator;
    expect(getPlatform()).toBe("");
  });

  test("should return empty string for unknown platform", () => {
    global.navigator = { userAgent: "Unknown Platform" } as Navigator;
    expect(getPlatform()).toBe("");
  });
});

describe("createDownloadUrl", () => {
  test("should create Windows download URL", () => {
    expect(createDownloadUrl("1.0.0", "windows", "x86_64")).toBe(
      "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-windows-x86_64.exe",
    );
  });

  test("should create macOS download URL", () => {
    expect(createDownloadUrl("1.0.0", "macos", "aarch64")).toBe(
      "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-macos-aarch64.dmg",
    );
  });

  test("should create Linux AppImage download URL", () => {
    expect(createDownloadUrl("1.0.0", "linux", "x86_64", "appimage")).toBe(
      "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-linux-x86_64.AppImage",
    );
  });

  test("should create Linux deb download URL", () => {
    expect(createDownloadUrl("1.0.0", "linux", "x86_64", "deb")).toBe(
      "https://assets.lbctrl.com/github/release/longbridge-desktop/stable/longbridge-1.0.0-linux-x86_64.deb",
    );
  });
});

describe("getDownloads", () => {
  test("returns 5 links in windows, macos×2, linux deb, linux AppImage order", () => {
    const downloads = getDownloads("1.0.0");
    expect(downloads).toHaveLength(5);
    expect(downloads.map((d) => `${d.platform}:${d.suffix}`)).toEqual([
      "windows:x86_64",
      "macos:Apple Silicon",
      "macos:Intel",
      "linux:deb",
      "linux:AppImage",
    ]);
  });
});

describe("splitDownloads", () => {
  test("macOS: primary is Apple Silicon, others keep Intel variant", () => {
    const { primary, others } = splitDownloads("1.0.0", "macos");
    expect(primary?.text).toBe("macOS");
    expect(primary?.suffix).toBe("Apple Silicon");
    expect(others).toHaveLength(4);
    expect(others.map((d) => `${d.platform}:${d.suffix}`)).toEqual([
      "windows:x86_64",
      "macos:Intel",
      "linux:deb",
      "linux:AppImage",
    ]);
  });

  test("windows: primary is the exe", () => {
    const { primary, others } = splitDownloads("1.0.0", "windows");
    expect(primary?.platform).toBe("windows");
    expect(others).toHaveLength(4);
  });

  test("linux: primary is deb", () => {
    const { primary } = splitDownloads("1.0.0", "linux");
    expect(primary?.suffix).toBe("deb");
  });

  test("unknown platform: primary null, others = all 5", () => {
    const { primary, others } = splitDownloads("1.0.0", "");
    expect(primary).toBeNull();
    expect(others).toHaveLength(5);
  });
});
```

- [ ] **Step 3: 运行测试,确认 `splitDownloads` 用例失败**

```bash
bun test docs/pages/downloads.test.ts
```

预期:`getPlatform`/`createDownloadUrl`/`getDownloads` 三组 PASS;`splitDownloads` 四个用例 FAIL(`splitDownloads is not a function` 或导入错误)。

- [ ] **Step 4: 在 `downloads.ts` 末尾实现 `splitDownloads`**

```ts
export type DownloadLink = {
  text: string;
  suffix: string;
  url: string;
  platform: string;
};

/**
 * Split downloads into the primary link for the detected platform
 * and the remaining alternative links.
 * Returns { primary: null, others: all } when platform is unknown.
 */
export const splitDownloads = (version: string, platform: string) => {
  const all = getDownloads(version) as DownloadLink[];
  const primary = all.find((d) => d.platform === platform) ?? null;
  const others = primary ? all.filter((d) => d !== primary) : all;
  return { primary, others };
};
```

- [ ] **Step 5: 测试全绿后删除旧测试文件**

```bash
bun test docs/pages/downloads.test.ts
```

预期:全部 PASS(14 个用例)。然后:

```bash
git rm docs/pages/utils.test.ts
bun test
```

预期:仅剩 downloads.test.ts,全绿。

- [ ] **Step 6: locale 增加 `download_for` 与 `also_available`**

`en.ts`:

```ts
  download_for: 'Download for {os}',
  also_available: 'Also available for',
```

`zh-CN.ts`:

```ts
  download_for: '下载 {os} 版',
  also_available: '同时支持',
```

`zh-HK.ts`:

```ts
  download_for: '下載 {os} 版',
  also_available: '同時支援',
```

- [ ] **Step 7: 重写 `docs/pages/home/DownloadInfo.vue`**

要点:平台检测放 `onMounted`(SSR 安全);检测到平台 → 一个主按钮 + 次按钮 + 辅助行(其余变体直链);检测不到 → 5 个变体全部以主按钮样式展示。

```vue
<script setup>
import { computed, onMounted, ref } from "vue";
import { useLocale } from "../utils";
import { getDownloads, getPlatform, splitDownloads } from "../downloads";

const t = useLocale();
const version = import.meta.env.VERSION || "v0.1.30";

const platform = ref("");
const mounted = ref(false);
onMounted(() => {
  platform.value = getPlatform();
  mounted.value = true;
});

const split = computed(() => splitDownloads(version, platform.value));
const primary = computed(() => split.value.primary);
const others = computed(() => split.value.others);
const all = computed(() => getDownloads(version));
</script>

<template>
  <div class="text-center">
    <div class="flex justify-center items-center gap-3 mb-4 flex-wrap">
      <template v-if="primary">
        <a :href="primary.url" class="lb-btn-primary">
          {{ t.download_for.replace("{os}", primary.text) }}
        </a>
      </template>
      <template v-else-if="mounted">
        <a
          v-for="link in all"
          :key="link.url"
          :href="link.url"
          class="lb-btn-primary"
        >
          {{ link.text }}
          <span class="text-12px opacity-60">{{ link.suffix }}</span>
        </a>
      </template>
      <a href="release-notes" class="lb-btn-secondary">{{ t.download_more }}</a>
    </div>
    <div v-if="primary" class="text-12px text-faint">
      {{ t.also_available }}
      <template v-for="(link, i) in others" :key="link.url">
        <a
          :href="link.url"
          class="!text-muted hover:!text-brand !no-underline"
        >{{ link.text }} ({{ link.suffix }})</a><span v-if="i < others.length - 1"> · </span>
      </template>
    </div>
  </div>
</template>
```

- [ ] **Step 8: dev 验证**

Run: `bun run dev`(macOS 上开发)
预期(深/浅 × 三语,首页 Hero 区域——Hero 本体 Task 5 才重构,此处只看按钮排):
- 主按钮药丸:"Download for macOS" / "下载 macOS 版" / "下載 macOS 版",链接为 `…-macos-aarch64.dmg` 直链;深色白底黑字,浅色黑底白字。
- 次按钮 "View all versions / 查看全部版本" 链到 release-notes。
- 辅助行:"Also available for macOS (Intel) · Windows (x86_64) · Linux (deb) · Linux (AppImage)" 四个直链。
- DevTools 把 UA 改为不认识的字符串刷新:显示 5 个主样式按钮(fallback)。

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "download: Extract \`downloads\` module and redesign \`DownloadInfo\`"
```

---

### Task 5: Hero 重写

**Files:**
- Modify: `docs/pages/home/Hero.vue`(整体重写)
- Modify: `.vitepress/locales/en.ts`、`zh-CN.ts`、`zh-HK.ts`(各加 `hero` 对象)

**Interfaces:**
- Consumes: `.lb-hero`/`.lb-eyebrow` 类、`<DownloadInfo />`(Task 4)、`motionVisible`(utils,已存在)。
- Produces: locale 字段 `hero: { title_1, title_2, description, legacy }`;Hero 根节点 `id="download"`(NavDownload 锚点目标)。

- [ ] **Step 1: locale 增加 `hero` 对象**

`en.ts`:

```ts
  hero: {
    title_1: 'Faster, smoother,',
    title_2: 'more efficient.',
    description:
      "Brand new trading desktop application of Longbridge Securities. We're constantly improving and optimizing the features in this latest version.",
    legacy:
      'For access to more complete functionality, feel free to <a href="https://longbridge.com/download" target="_blank" rel="noopener">download the previous version.</a>'
  },
```

`zh-CN.ts`:

```ts
  hero: {
    title_1: '更快、更流畅、',
    title_2: '更高效。',
    description: '长桥证券全新交易桌面端应用。我们正在持续改进和优化最新版本的功能。',
    legacy:
      '如需更完整的功能，欢迎 <a href="https://longbridge.com/download" target="_blank" rel="noopener">下载旧版本。</a>'
  },
```

`zh-HK.ts`:

```ts
  hero: {
    title_1: '更快、更流暢、',
    title_2: '更高效。',
    description: '長橋證券全新交易桌面端應用。我們正在持續改進和優化最新版本的功能。',
    legacy:
      '如需更完整的功能，歡迎 <a href="https://longbridge.com/download" target="_blank" rel="noopener">下載舊版本。</a>'
  },
```

- [ ] **Step 2: 重写 `docs/pages/home/Hero.vue`**

```vue
<script setup>
import DownloadInfo from "./DownloadInfo.vue";
import { useLocale, motionVisible } from "../utils";

const { hero } = useLocale();
const version = import.meta.env.VERSION || "v0.1.30";
</script>

<template>
  <section id="download" class="lb-hero relative overflow-hidden px-6 lt-sm:px-3 pt-22 lt-sm:pt-12 text-center">
    <div class="max-w-[1200px] mx-auto">
      <div
        class="inline-flex items-center gap-2 text-11px font-700 tracking-[1px] text-label mb-5"
        v-motion="motionVisible()"
      >
        <span class="w-6px h-6px rounded-full bg-label"></span>
        LONGBRIDGE PRO · {{ version.toUpperCase() }} BETA
      </div>
      <h1
        class="!text-40px lg:!text-64px !leading-[1.05] !font-600 text-heading mb-5"
        v-motion="motionVisible()"
      >
        {{ hero.title_1 }}<br />
        <span class="text-brand">{{ hero.title_2 }}</span>
      </h1>
      <p class="max-w-[580px] mx-auto !text-16px !leading-1.7 text-muted mb-3">
        {{ hero.description }}
      </p>
      <div
        class="text-13.5px text-faint mb-8 [&_a]:(text-brand font-700 !no-underline)"
        v-html="hero.legacy"
      ></div>

      <DownloadInfo class="mb-14" />

      <div
        class="relative max-w-[1080px] mx-auto"
        id="hero-image"
        v-motion="motionVisible(300, 'visible')"
      >
        <div
          class="absolute -left-15 -right-15 -top-10 h-70 pointer-events-none"
          style="background: radial-gradient(50% 100% at 50% 100%, var(--lb-glow) 0%, transparent 70%)"
        ></div>
        <img
          src="https://assets.lbctrl.com/uploads/f4da8c9b-cd12-4a4d-804c-f850d326ca21/home.png"
          alt="Longbridge Pro - Watchlist"
          class="relative block w-full border border-edge !border-b-0 rounded-t-16px"
          style="box-shadow: var(--lb-shot-shadow)"
        />
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: dev 验证**

Run: `bun run dev`
预期(深/浅 × 三语):
- Hero 区可见 16px 点阵背景,向上渐隐(深色:点阵亮点,底部融入 `#0A0E19`;浅色:暗点,底部融入白)。
- 眉标 `● LONGBRIDGE PRO · V0.1.30 BETA`(本地无 VERSION 环境变量时)品牌色。
- H1 两行:第一行标题色,第二行品牌色(深 `#00F0C4` / 浅 `#00ADA2`),64px(桌面)。
- 描述、旧版本提示行(链接品牌色)、按钮排、辅助行、截图依序排列;截图上圆角 16px、无底边框、身后有品牌色光晕。
- 从 release-notes 点导航 Download 回到首页 `#download`,落到 Hero。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "home: Rebuild \`Hero\` section"
```

---

### Task 6: Upgraded Architecture 卡片重写

**Files:**
- Modify: `docs/pages/home/Upgrade.vue`(整体重写)
- Modify: `.vitepress/locales/en.ts`、`zh-CN.ts`、`zh-HK.ts`(重构 `upgrade` 对象)

**Interfaces:**
- Consumes: `.lb-card`/`.lb-eyebrow` 类、`--vp-font-family-mono`。
- Produces: locale `upgrade: { label, title, cards: { value, unit, title, description }[3] }`(**替换**旧的 `upgrade.tab1/tab2/tab3` 结构)。

- [ ] **Step 1: 三个 locale 重构 `upgrade`(整体替换旧对象)**

`en.ts`:

```ts
  upgrade: {
    label: 'Upgraded Architecture',
    title: 'Upgraded architecture, enhanced experience.',
    cards: [
      {
        value: '120',
        unit: 'FPS',
        title: 'Lightning Speed',
        description: 'Up to 120 FPS — seamless trading, setting a new speed benchmark.'
      },
      {
        value: '<2',
        unit: 's',
        title: 'Instant Launch',
        description: 'Ready in under 2 seconds — seize every investment opportunity.'
      },
      {
        value: '-40',
        unit: '%CPU',
        title: 'Featherlight Installation',
        description: '-40% CPU usage, -70% memory consumption.'
      }
    ]
  },
```

`zh-CN.ts`:

```ts
  upgrade: {
    label: '全新架构',
    title: '全新架构，体验升级。',
    cards: [
      { value: '120', unit: 'FPS', title: '极速渲染', description: '高达 120 FPS，交易丝滑流畅，树立速度新标杆。' },
      { value: '<2', unit: 's', title: '秒级启动', description: '2 秒内即刻就绪，把握每一个投资机会。' },
      { value: '-40', unit: '%CPU', title: '轻若无物', description: 'CPU 占用降低 40%，内存占用降低 70%。' }
    ]
  },
```

`zh-HK.ts`:

```ts
  upgrade: {
    label: '全新架構',
    title: '全新架構，體驗升級。',
    cards: [
      { value: '120', unit: 'FPS', title: '極速渲染', description: '高達 120 FPS，交易絲滑流暢，樹立速度新標杆。' },
      { value: '<2', unit: 's', title: '秒級啟動', description: '2 秒內即刻就緒，把握每一個投資機會。' },
      { value: '-40', unit: '%CPU', title: '輕若無物', description: 'CPU 佔用降低 40%，記憶體佔用降低 70%。' }
    ]
  },
```

- [ ] **Step 2: 重写 `docs/pages/home/Upgrade.vue`**

```vue
<script setup>
import { useLocale, motionVisible } from "../utils";

const { upgrade } = useLocale();
</script>

<template>
  <section class="border-t border-[var(--vp-c-divider)] px-6 lt-sm:px-3 py-20 lt-sm:py-10">
    <div class="max-w-[1200px] mx-auto">
      <div class="lb-eyebrow" v-motion="motionVisible()">{{ upgrade.label }}</div>
      <h2
        class="!text-28px lg:!text-36px !font-600 !leading-[1.15] text-heading max-w-[560px] !mb-10"
        v-motion="motionVisible()"
      >
        {{ upgrade.title }}
      </h2>
      <div class="grid md:grid-cols-3 grid-cols-1 gap-8 lt-sm:gap-4">
        <div
          v-for="(card, i) in upgrade.cards"
          :key="card.title"
          class="lb-card"
          v-motion="motionVisible(100 * i + 300, 'visible')"
        >
          <div
            class="text-44px font-600 leading-none text-brand mb-4"
            style="font-family: var(--vp-font-family-mono)"
          >
            {{ card.value }}<span class="text-20px text-muted">{{ card.unit }}</span>
          </div>
          <div class="text-19px font-700 text-heading mb-2">{{ card.title }}</div>
          <p class="!text-14px !leading-1.6 text-muted">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: dev 验证**

Run: `bun run dev`
预期(深/浅 × 三语):
- 眉标 + 36px 标题左对齐;3 列卡片(深色 `#13182A` 底 `#3C3F44` 边框 / 浅色白底浅边框),16px 圆角。
- 大数字 `120FPS`、`<2s`、`-40%CPU` 为 JetBrains Mono、44px、品牌色,单位小一号灰色。
- hover 卡片边框变亮 + 微光阴影;旧版的 flag 装饰图已不存在。
- <768px 单列。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "home: Rebuild \`Upgrade\` architecture cards"
```

---

### Task 7: Real-Time Tracking 重写

**Files:**
- Modify: `docs/pages/home/RealTimeTracking.vue`(整体重写)
- Modify: `.vitepress/locales/en.ts`、`zh-CN.ts`、`zh-HK.ts`(重构 `realTimeTracking`)

**Interfaces:**
- Consumes: `--lb-track-bg`/`--lb-tab-*` token、`.lb-eyebrow`。
- Produces: locale `realTimeTracking: { label, title, description, tabs: { title, image }[3] }`(**替换**旧的 `tabs.tab_0/1/2` 结构;图片 URL 沿用现值)。

- [ ] **Step 1: 三个 locale 重构 `realTimeTracking`(整体替换)**

`en.ts`:

```ts
  realTimeTracking: {
    label: 'Real-Time Tracking',
    title: 'Seizing the trading edge.',
    description:
      "Get millisecond alerts on your watchlist, so you'll always catch key stock moves.",
    tabs: [
      {
        title: 'Smart Activity Monitoring',
        image:
          'https://assets.lbctrl.com/uploads/019b7300-18da-4428-abe9-e7f438ad827b/market.png'
      },
      {
        title: 'Intuitive Heatmap',
        image:
          'https://assets.lbctrl.com/uploads/c67dcfba-bc16-4b16-b43b-70f4d7fa54b8/heatmap.png'
      },
      {
        title: 'Institutional Flow Tracking',
        image:
          'https://assets.lbctrl.com/uploads/63c75cb2-cd57-4fd8-86d1-366be8b57192/detail.png'
      }
    ]
  },
```

`zh-CN.ts`(三个 locale 的截图 URL 相同):

```ts
  realTimeTracking: {
    label: '实时盯盘',
    title: '把握交易先机。',
    description: '自选股异动毫秒级提醒，关键行情尽在掌握。',
    tabs: [
      {
        title: '智能监控异动',
        image:
          'https://assets.lbctrl.com/uploads/019b7300-18da-4428-abe9-e7f438ad827b/market.png'
      },
      {
        title: '直观热力图',
        image:
          'https://assets.lbctrl.com/uploads/c67dcfba-bc16-4b16-b43b-70f4d7fa54b8/heatmap.png'
      },
      {
        title: '机构资金追踪',
        image:
          'https://assets.lbctrl.com/uploads/63c75cb2-cd57-4fd8-86d1-366be8b57192/detail.png'
      }
    ]
  },
```

`zh-HK.ts`:

```ts
  realTimeTracking: {
    label: '實時盯盤',
    title: '把握交易先機。',
    description: '自選股異動毫秒級提醒，關鍵行情盡在掌握。',
    tabs: [
      {
        title: '智能監控異動',
        image:
          'https://assets.lbctrl.com/uploads/019b7300-18da-4428-abe9-e7f438ad827b/market.png'
      },
      {
        title: '直觀熱力圖',
        image:
          'https://assets.lbctrl.com/uploads/c67dcfba-bc16-4b16-b43b-70f4d7fa54b8/heatmap.png'
      },
      {
        title: '機構資金追蹤',
        image:
          'https://assets.lbctrl.com/uploads/63c75cb2-cd57-4fd8-86d1-366be8b57192/detail.png'
      }
    ]
  },
```

- [ ] **Step 2: 重写 `docs/pages/home/RealTimeTracking.vue`**

```vue
<script setup>
import { ref } from "vue";
import { useLocale, motionVisible } from "../utils";

const { realTimeTracking } = useLocale();
const activeTab = ref(0);
</script>

<template>
  <section class="bg-[var(--lb-track-bg)] border-t border-[var(--vp-c-divider)] px-6 lt-sm:px-3 py-20 lt-sm:py-10">
    <div class="max-w-[1200px] mx-auto grid lg:grid-cols-[380px_1fr] grid-cols-1 gap-12 lt-sm:gap-6 items-center">
      <div v-motion="motionVisible()">
        <div class="lb-eyebrow">{{ realTimeTracking.label }}</div>
        <h2 class="!text-28px lg:!text-36px !font-600 !leading-[1.15] text-heading !mb-5">
          {{ realTimeTracking.title }}
        </h2>
        <p class="!text-15px !leading-1.7 text-muted !mb-7">
          {{ realTimeTracking.description }}
        </p>
        <div class="flex flex-col gap-2">
          <button
            v-for="(tab, i) in realTimeTracking.tabs"
            :key="tab.title"
            @click="activeTab = i"
            class="text-left border border-solid rounded-12px py-3.5 px-4 text-14px cursor-pointer transition-all duration-200"
            :class="
              i === activeTab
                ? 'bg-[var(--lb-tab-active-bg)] border-[var(--lb-tab-active-border)] font-600 text-[var(--lb-tab-active-fg)] shadow-[0_0_0_3px_var(--lb-tab-ring)]'
                : 'bg-[var(--lb-tab-bg)] border-edge font-500 text-body hover:border-[var(--lb-card-hover-border)]'
            "
          >
            {{ tab.title }}
          </button>
        </div>
      </div>
      <img
        :src="realTimeTracking.tabs[activeTab].image"
        :alt="realTimeTracking.tabs[activeTab].title"
        class="w-full border border-edge rounded-16px bg-surface"
        v-motion="motionVisible(300)"
      />
    </div>
  </section>
</template>
```

- [ ] **Step 3: dev 验证**

Run: `bun run dev`
预期(深/浅 × 三语):
- 区块通栏背景:深色深青 `#09252A`、浅色 `#F5F6F6`。
- 左栏 380px:眉标、标题、描述、3 个 tab 卡;激活卡深青 `#203A3F` 底 + 品牌色边框/文字 + 3px 外环,非激活半透明,hover 边框变亮。
- 点击 tab 右侧截图切换(3 张不同图),16px 圆角。
- <1024px:左右栏改上下堆叠。
- 旧版左右轮播箭头已不存在。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "home: Rebuild \`RealTimeTracking\` section"
```

---

### Task 8: Smart Navigation 重写

**Files:**
- Modify: `docs/pages/home/SmartNav.vue`(整体重写)
- Modify: `.vitepress/locales/en.ts`、`zh-CN.ts`、`zh-HK.ts`(重构 `smartNav`)

**Interfaces:**
- Consumes: `.lb-eyebrow`;`useIntersectionObserver`(@vueuse/core,已有)。
- Produces: locale `smartNav: { label, title, points: string[2] }`(**替换**旧的 `button/button_2/title/description/description_2` 结构)。

- [ ] **Step 1: 三个 locale 重构 `smartNav`(整体替换)**

`en.ts`:

```ts
  smartNav: {
    label: 'Smart Navigation',
    title: 'Smart navigation, instant insights.',
    points: [
      'Customizable tabbed navigation for instant stock quotes',
      'One-click access to historical records'
    ]
  },
```

`zh-CN.ts`:

```ts
  smartNav: {
    label: '智能导航',
    title: '智能导航，即刻洞察。',
    points: ['自定义标签页导航，行情即点即达', '一键直达历史记录']
  },
```

`zh-HK.ts`:

```ts
  smartNav: {
    label: '智能導航',
    title: '智能導航，即刻洞察。',
    points: ['自訂標籤頁導航，行情即點即達', '一鍵直達歷史記錄']
  },
```

- [ ] **Step 2: 重写 `docs/pages/home/SmartNav.vue`**

```vue
<script setup>
import { useTemplateRef } from "vue";
import { useLocale, motionVisible } from "../utils";
import { useIntersectionObserver } from "@vueuse/core";

const { smartNav } = useLocale();
const video = useTemplateRef("video");
useIntersectionObserver(video, ([{ isIntersecting }]) => {
  if (!video.value) return;
  if (isIntersecting && video.value.paused) {
    video.value.play();
  } else if (!isIntersecting) {
    video.value.pause();
  }
});
</script>

<template>
  <section class="border-t border-[var(--vp-c-divider)] px-6 lt-sm:px-3 py-20 lt-sm:py-10">
    <div class="max-w-[1200px] mx-auto text-center" v-motion="motionVisible()">
      <div class="lb-eyebrow">{{ smartNav.label }}</div>
      <h2 class="!text-28px lg:!text-36px !font-600 text-heading !mb-4">
        {{ smartNav.title }}
      </h2>
      <div class="flex justify-center flex-wrap gap-x-8 gap-y-3 mb-9 text-14px text-muted">
        <div v-for="point in smartNav.points" :key="point">
          <span class="text-brand font-700">•</span> {{ point }}
        </div>
      </div>
      <video
        ref="video"
        src="https://assets.lbctrl.com/uploads/f3161729-43d6-42e7-9a11-0408882ea933/video.mp4"
        autoplay
        muted
        loop
        playsinline
        webkit-playsinline
        class="w-250 max-w-full border border-edge rounded-16px block mx-auto"
      ></video>
    </div>
  </section>
</template>

<style scoped>
video::-webkit-media-controls-play-button {
  display: none;
  -webkit-appearance: none;
}

video::-webkit-media-controls-panel {
  display: none;
  -webkit-appearance: none;
}
</style>
```

- [ ] **Step 3: dev 验证**

Run: `bun run dev`
预期(深/浅 × 三语):
- 居中布局:眉标、36px 标题、两个品牌色圆点要点一行(窄屏换行)。
- 视频 1000px 宽、16px 圆角、1px 边框;滚出视口暂停、滚回播放;无控制条。
- 旧版双栏布局与 history.png 切换已不存在。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "home: Rebuild \`SmartNav\` section"
```

---

### Task 9: MultiPlatform + BottomCta 新增 + Home 骨架重排

**Files:**
- Create: `docs/pages/home/MultiPlatform.vue`
- Create: `docs/pages/home/BottomCta.vue`
- Modify: `docs/pages/Home.vue`(整体重写)
- Modify: `.vitepress/locales/en.ts`、`zh-CN.ts`、`zh-HK.ts`(重构 `multiPlatform`、新增 `bottomCta`)
- Delete: `docs/pages/home/MotionImage.vue`(全库无引用)

**Interfaces:**
- Consumes: `<DownloadInfo />`(Task 4)、`.lb-eyebrow`、`--lb-bg-2`/`--lb-chip-*` token、`download_more`(locale 既有)。
- Produces: locale `multiPlatform: { label, title, description }`(**替换**旧结构)、`bottomCta: { title }`;`Home.vue` 新骨架(Hero → Upgrade → RealTimeTracking → SmartNav → MultiPlatform → BottomCta)。

- [ ] **Step 1: 三个 locale 重构 `multiPlatform` + 新增 `bottomCta`**

`en.ts`:

```ts
  multiPlatform: {
    label: 'Multi-Platform',
    title: 'Professional market monitoring, everywhere.',
    description:
      'Native versions for Windows, Mac, and Linux. Multi-screen support for full control of market data, charts, and news.'
  },
  bottomCta: {
    title: 'Start trading faster today.'
  },
```

`zh-CN.ts`:

```ts
  multiPlatform: {
    label: '多端支持',
    title: '多屏协同，专业看盘。',
    description: 'Windows、Mac、Linux 原生版本。多屏协同，全面掌控行情、图表与资讯。'
  },
  bottomCta: {
    title: '即刻下载，更快开始交易。'
  },
```

`zh-HK.ts`:

```ts
  multiPlatform: {
    label: '多端支援',
    title: '多屏協同，專業看盤。',
    description: 'Windows、Mac、Linux 原生版本。多屏協同，全面掌控行情、圖表與資訊。'
  },
  bottomCta: {
    title: '即刻下載，更快開始交易。'
  },
```

- [ ] **Step 2: 新建 `docs/pages/home/MultiPlatform.vue`**

```vue
<script setup>
import { useLocale, motionVisible } from "../utils";

const { multiPlatform } = useLocale();
const platforms = ["macOS", "Windows", "Linux"];
</script>

<template>
  <section class="bg-[var(--lb-bg-2)] border-t border-[var(--vp-c-divider)] px-6 lt-sm:px-3 py-20 lt-sm:py-10">
    <div class="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_420px] grid-cols-1 gap-12 lt-sm:gap-6 items-center">
      <img
        src="https://assets.lbctrl.com/uploads/78728886-0410-429c-ba4a-db2a6ea4911e/multi.webp"
        alt="Multi-platform support"
        class="w-full h-auto"
        v-motion="motionVisible()"
      />
      <div v-motion="motionVisible(150)">
        <div class="lb-eyebrow">{{ multiPlatform.label }}</div>
        <h2 class="!text-28px lg:!text-36px !font-600 !leading-[1.15] text-heading !mb-5">
          {{ multiPlatform.title }}
        </h2>
        <p class="!text-15px !leading-1.7 text-muted !mb-6">
          {{ multiPlatform.description }}
        </p>
        <div class="flex gap-2">
          <span
            v-for="p in platforms"
            :key="p"
            class="text-12px font-600 text-[var(--lb-chip-fg)] bg-[var(--lb-chip-bg)] border border-edge py-1.5 px-3 rounded-4px"
          >{{ p }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: 新建 `docs/pages/home/BottomCta.vue`**

```vue
<script setup>
import DownloadInfo from "./DownloadInfo.vue";
import { useLocale, motionVisible } from "../utils";

const t = useLocale();
const version = import.meta.env.VERSION || "v0.1.30";
</script>

<template>
  <section class="border-t border-[var(--vp-c-divider)] px-6 lt-sm:px-3 py-22 lt-sm:py-12 text-center">
    <div v-motion="motionVisible()">
      <h2 class="!text-28px lg:!text-36px !font-600 text-heading !mb-3">
        {{ t.bottomCta.title }}
      </h2>
      <p class="text-14px text-faint mb-7">
        {{ version }} Beta ·
        <a href="release-notes" class="font-700 text-brand !no-underline">{{ t.download_more }}</a>
      </p>
      <DownloadInfo />
    </div>
  </section>
</template>
```

- [ ] **Step 4: 重写 `docs/pages/Home.vue` + 删除 MotionImage**

```vue
<script setup>
import Hero from "./home/Hero.vue";
import Upgrade from "./home/Upgrade.vue";
import RealTimeTracking from "./home/RealTimeTracking.vue";
import SmartNav from "./home/SmartNav.vue";
import MultiPlatform from "./home/MultiPlatform.vue";
import BottomCta from "./home/BottomCta.vue";
</script>

<template>
  <div id="home-page" class="min-h-screen bg-[var(--vp-c-bg)] text-body">
    <Hero />
    <Upgrade />
    <RealTimeTracking />
    <SmartNav />
    <MultiPlatform />
    <BottomCta />
  </div>
</template>
```

```bash
grep -rn "MotionImage" docs .vitepress --include='*.vue' --include='*.ts' --include='*.md'
```

预期:只有 `MotionImage.vue` 自身。然后:

```bash
git rm docs/pages/home/MotionImage.vue
```

- [ ] **Step 5: dev 验证**

Run: `bun run dev`
预期(深/浅 × 三语):
- 首页自上而下:Hero → 3 卡片 → 深青盯盘 → 智能导航 → 多端(左图右文,深色 `#161A26` / 浅色 `#F5F6F6` 底,3 个平台 chips)→ 底部 CTA(标题 + `v… Beta · View all versions` + 下载按钮排)→ Footer。
- 各分区间由 1px divider 分隔,滚动有入场动效。
- <1024px 多端区上下堆叠;<640px 无横向滚动条。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "home: Add \`MultiPlatform\`/\`BottomCta\` and new page skeleton"
```

---

### Task 10: 文档页(Release Notes)细化

**Files:**
- Modify: `.vitepress/theme/custom.css`(追加文档段)

**Interfaces:**
- Consumes: Task 1 token(`--lb-sidebar-active-bg` 等)。
- Produces: 无(纯样式收尾)。

- [ ] **Step 1: custom.css 追加文档页段**

```css
/* ============================================================
 * Docs (release notes) — sidebar & content polish
 * ============================================================ */
.VPSidebar {
  background-color: var(--vp-sidebar-bg-color) !important;
  border-right: 1px solid var(--vp-c-divider);
}

/* section headings: 11px uppercase */
.VPSidebarItem.level-0 > .item > .text {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

/* items */
.VPSidebarItem.level-1 > .item > .link > .text {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
}
.VPSidebarItem.level-1 > .item > .link:hover > .text {
  color: var(--vp-c-text-1);
}

/* active item: tinted pill + brand text */
.VPSidebarItem.level-1.is-active > .item {
  background: var(--lb-sidebar-active-bg);
  border-radius: 6px;
  margin: 0 -8px;
  padding: 0 8px;
}
.VPSidebarItem.level-1.is-active > .item > .link > .text {
  color: var(--vp-c-brand-1) !important;
  font-weight: 600;
}

/* doc content */
.vp-doc h1,
.vp-doc h2,
.vp-doc h3 {
  color: var(--lb-h);
}
.vp-doc a {
  color: var(--vp-c-brand-1);
}
.vp-doc div[class*="language-"] {
  background: var(--vp-c-bg-soft);
}
```

- [ ] **Step 2: dev 验证**

Run: `bun run dev`,打开 `/desktop/release-notes` 与任一版本页、`/desktop/zh-CN/release-notes`。
预期(深/浅):
- 侧边栏与页面同底色;分组标题("Release Notes"/"发布日志")11px 大写灰;当前版本项有品牌色文字 + 淡品牌底 pill。
- 正文标题、链接、代码块、表格颜色协调;图片点击 medium-zoom 遮罩颜色与主题一致。
- 移动端(<960px)左上角 Menu 抽屉打开正常、可切换版本。

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "docs: Restyle release notes sidebar and doc pages"
```

---

### Task 11: locale 清理 + 全站验收

**Files:**
- Modify: `.vitepress/locales/en.ts`、`zh-CN.ts`、`zh-HK.ts`(删除死字段)

**Interfaces:**
- Consumes: Tasks 1–10 全部完成。
- Produces: 最终可交付分支。

- [ ] **Step 1: 删除不再使用的 locale 字段**

先逐一确认无引用(每个 key 都执行,`features` 与 `globalTrade` 现状已无引用;`name`/`tagline`/`legacy_info` 在 Task 4/5 重写后应已无引用):

```bash
grep -rn "\.name\b\|tagline\|legacy_info\|features\|globalTrade" docs/pages .vitepress/theme --include='*.vue' --include='*.ts'
```

对确认无引用的字段,在三个 locale 文件中删除:`name`、`tagline`、`legacy_info`、`features`、`globalTrade`。若 grep 仍有引用(说明前面任务有遗漏),先修复引用再删。

- [ ] **Step 2: 单测与构建**

```bash
bun test
bun run build
```

预期:测试全绿;三 locale 构建成功无告警级错误。

- [ ] **Step 3: preview 全站走查**

```bash
bun run preview
```

按下列矩阵走查(对照 `specs/reference/Longbridge Pro Desktop v2.dc.html` 在浏览器中的呈现,以及原始压缩包 `screenshots/`):
- **主题 × 语言**:深/浅 × en / zh-CN / zh-HK 的首页 7 分区、release-notes 列表页与详情页。
- **交互**:主题切换持久化(刷新保持)、语言切换路由正确、盯盘 tab 切换、视频进出视口播放/暂停、导航 Download 锚点、下载直链 URL 正确(悬停看状态栏)。
- **断点**:1440 / 1024 / 768 / 375 四档宽度,重点检查卡片列数(3→1)、双栏堆叠、导航汉堡、无横向滚动。
- **对照差异**:颜色、字号、圆角、间距与设计参考稿逐区块目测一致;发现偏差回到对应任务的文件修正。

- [ ] **Step 4: Commit(如有修正)**

```bash
git add -A
git commit -m "cleanup: Remove unused locale keys and \`MotionImage\`"
```

(若 Step 3 走查产生修正,包含在本次提交;`MotionImage` 已在 Task 9 删除,此处提交信息覆盖 locale 清理。)
