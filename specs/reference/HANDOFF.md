# Handoff: Longbridge Pro 桌面端介绍/下载页重构（1b 深色方向）

## Overview
重构 https://longbridge.com/desktop/ 的产品介绍与下载页。视觉遵循 `DESIGN.md`（Longbridge Developers 设计系统），版式参考 https://open.longbridge.com/。默认深色主题，支持浅色切换、三语切换（English / 简体中文 / 繁體中文）、以及按操作系统自动显示下载按钮文案。

## About the Design Files
本包中的 `Longbridge Pro Desktop v2.dc.html` 是 **HTML 设计参考稿**（可直接在浏览器打开查看），不是生产代码。任务是在目标代码库的现有技术栈中**重新实现**该设计。现站为 VitePress（v1.6.4）；如沿用 VitePress，可实现为自定义主题的 Landing 布局；若迁移到 React/Vue 应用，按其组件规范重建。`DESIGN.md` 是完整设计规范，实现时以它为准。

## Fidelity
**High-fidelity**：颜色、字体、间距、圆角、阴影均为最终值，应像素级还原。所有具体数值见下文与 `DESIGN.md`。

## Page Structure（单页，自上而下）

### 1. Sticky Nav（60px）
- 背景 `rgba(10,14,25,0.8)` + `backdrop-filter: saturate(1.8) blur(20px)`，底边 `1px solid rgba(255,255,255,0.06)`（浅色：`rgba(255,255,255,0.85)` / `#EAEBEC`）
- 左：logo（`https://assets.wbrks.com/assets/logo/icon-full-radius.png`，28px 圆角 7px）+ "Longbridge Pro"（16px/700）
- 中：Home · Longbridge Pro（当前页，品牌色 700）· Release Notes（14px/500，hover 背景 `rgba(255,255,255,0.06)`）
- 右：语言下拉（EN/简/繁，13px，1px 边框圆角 8px）· GitHub 图标按钮（32×32）· 主题切换（☾/☀，32×32）· Download 药丸按钮

### 2. Hero（居中，点阵背景）
- 背景：`linear-gradient(to top, #0A0E19 0%, rgba(10,14,25,0.65) 50%, rgba(10,14,25,0.25) 100%), radial-gradient(rgba(223,223,214,0.18) 1px, transparent 1px)`，`background-size: auto, 16px 16px`；容器 `overflow:hidden`
- 眉标：`● LONGBRIDGE PRO · v0.17.1 BETA`（11px/700，letter-spacing 1px，品牌色）
- H1 64px/600/1.05：第一行主题色文字，第二行品牌色（深色 `#00F0C4`，浅色 `#00ADA2`）
- 描述 16px `#98989F`，旧版本提示行 13.5px（含链接到 /download）
- 按钮排：主按钮（深色：白底黑字；浅色：黑底白字；999px 药丸，12px 28px）"Download for {OS}" + 次按钮 "View all versions"
- 辅助行 12px："Also available for {其余两个平台}"
- 产品截图 `home.png`（1080px 宽，上圆角 16px，无底边框），后面有品牌色光晕 `radial-gradient(50% 100% at 50% 100%, rgba(0,240,196,0.14), transparent 70%)`（浅色 `rgba(0,173,162,0.10)`）

### 3. Upgraded Architecture（3 列卡片，1200px 容器）
- 眉标（11.5px/700 品牌标签色）+ H2 36px/600
- 卡片：`#13182A` 底、`1px solid #3C3F44`、16px 圆角、28px 24px 内边距（浅色：白底 `#EAEBEC` 边框）；hover 边框变亮 + `0 2px 8px rgba(0,240,196,0.06)`
- 每卡顶部为 JetBrains Mono 大数字（44px/600 品牌色）：`120FPS` / `<2s` / `-40%CPU`，下接标题 19px/700 与描述 14px

### 4. Real-Time Tracking（深青区块）
- 区块背景 `#09252A`（浅色模式 `#F5F6F6`）
- 左栏 380px：眉标 + H2 + 描述 + 三个 tab 卡（激活：`#203A3F` 底、`rgba(0,240,196,0.5)` 边框、品牌色文字、`0 0 0 3px rgba(0,240,196,0.10)` 外环；非激活：`rgba(32,58,63,0.5)`）
- 右栏：`market.png` 截图，16px 圆角
- Tabs：Smart Activity Monitoring / Intuitive Heatmap / Institutional Flow Tracking（设计稿为静态选中态，可实现为真实切换）

### 5. Smart Navigation（居中）
- 眉标 + H2 + 两个要点（• 品牌色圆点）
- 视频 `video.mp4`（autoplay muted loop playsinline，1000px 宽，16px 圆角）

### 6. Multi-Platform（左图右文，背景 `#161A26` / 浅色 `#F5F6F6`）
- 左：`multi.webp`；右：眉标 + H2 + 描述 + 平台 chips（macOS/Windows/Linux，12px/600，4px 圆角）

### 7. Bottom CTA（居中）
- H2 + "v0.17.1 Beta · View all versions" + 主/次下载按钮（同 Hero）

### 8. Footer（背景深色同页面底 / 浅色 `#FAFAFA`）
- 4 列：联系方式（WhatsApp +65 6330 3033、Dealing Hotline +65 6330 3030、交易时段、contact@longbridge.sg）、Terms & Conditions（6 链接）、About（6 链接）、More（4 链接）——全部链接 URL 已写在 HTML 内
- 底行：© 2024 – Present Longbridge + 社媒链接（Facebook/Instagram/X/TikTok/GitHub）

## Interactions & Behavior
- **主题切换**：整页 CSS 变量换肤（见 HTML 中 `:root` 与 `[data-theme="dark"]` 两组变量）；选择持久化到 localStorage；默认深色
- **语言切换**：EN / zh-CN / zh-HK 三套文案（全部译文在 HTML 逻辑内的 I18N 字典中，可直接搬用）；持久化 localStorage；建议实现为 VitePress locales 或路由 `/`、`/zh-CN/`、`/zh-HK/`
- **OS 识别**：userAgent 含 Mac→macOS、Win→Windows、否则 Linux；主按钮文案 "Download for macOS" / "下载 macOS 版"；下载链接现指向 https://longbridge.com/download（有平台直链后替换）
- Hover：按钮换背景色；卡片边框变亮 + 微阴影；导航链接加 `hover-wash` 背景
- 响应式：≤1023px 卡片 3→2 列、双栏区块改上下堆叠；≤639px 单列，容器边距 12px（详见 DESIGN.md §8）

## State Management
- `theme: 'dark' | 'light'`（默认 dark，localStorage 持久化）
- `lang: 'en' | 'zh-CN' | 'zh-HK'`（默认 en，localStorage 持久化）
- `os: 'macOS' | 'Windows' | 'Linux'`（加载时检测，不持久化）
- `langOpen: boolean`（语言下拉开合）

## Design Tokens
完整 token 表见 `DESIGN.md` §13。页面实际使用的映射（dark / light）：
- 页面底 `#0A0E19` / `#FFFFFF`；交替区 `#161A26` / `#F5F6F6`；卡片 `#13182A` / `#FFFFFF`
- 边框 `#3C3F44` / `#EAEBEC`；分隔线 `rgba(255,255,255,0.06)` / `#EAEBEC`
- 标题 `#FFFFFF` / `#0A0E19`；正文 `#DFDFD6` / `#3C3C43`；次级 `#98989F` / `#67676C`；三级 `#6A6A71` / `#9D9FA3`
- 品牌色 `#00F0C4` / `#00ADA2`；眉标色 `#00F0C4` / `#00B8B8`
- 主按钮 白底黑字 / 黑底白字，999px；次按钮 `rgba(80,80,80,0.5)` / `#F3F5F6`，999px
- 深青区块 `#09252A`、`#203A3F`（仅深色模式）
- 字体：Inter（UI 全部）+ JetBrains Mono（大数字）；H1 64px、H2 36px、卡片标题 19px、正文 16px、按钮 14–15px/500

## Assets（均为现网线上素材，可直接引用或下载入库）
- Logo: https://assets.wbrks.com/assets/logo/icon-full-radius.png
- Hero 截图: https://assets.lbctrl.com/uploads/f4da8c9b-cd12-4a4d-804c-f850d326ca21/home.png
- 盯盘截图: https://assets.lbctrl.com/uploads/019b7300-18da-4428-abe9-e7f438ad827b/market.png
- 导航视频: https://assets.lbctrl.com/uploads/f3161729-43d6-42e7-9a11-0408882ea933/video.mp4
- 多端图: https://assets.lbctrl.com/uploads/78728886-0410-429c-ba4a-db2a6ea4911e/multi.webp
- Google Fonts: Inter (400–800), JetBrains Mono (400/600)

## Files
- `Longbridge Pro Desktop v2.dc.html` — 设计参考稿（浏览器直接打开；顶部 `<style>` 为两套主题变量；`class Component` 内含全部三语文案、OS 检测与交互逻辑，可直接移植）
- `DESIGN.md` — 完整设计规范（颜色/字体/组件/间距/深色模式/响应式）
- `screenshots/` — 分区块参考截图，`dark-*`（默认深色主题，7 张）与 `light-*`（浅色主题，5 张）。注意：截图为 ~924px 视口下的再渲染，仅作视觉对照；Smart Navigation 区的视频帧未能截入（跨域），以线上 video.mp4 为准；精确数值一律以本 README 与 DESIGN.md 为准
