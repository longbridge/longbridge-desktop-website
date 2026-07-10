# Longbridge Pro 桌面端站点重构设计(1b 深色方向)

日期:2026-07-10
分支:`redesign-design-system`
状态:已与用户逐节确认

## 1. 背景与目标

按设计交接包(`specs/reference/HANDOFF.md` + 根目录 `DESIGN.md`)重构 https://longbridge.com/desktop/ 站点。视觉遵循 Longbridge Developers 设计系统,默认深色主题、支持浅色切换、三语(en / zh-CN / zh-HK)、按操作系统显示下载按钮。

保真度要求:**高保真**——颜色、字体、间距、圆角、阴影按 `DESIGN.md` 像素级还原。

参考材料:
- `DESIGN.md`(仓库根)——完整设计规范,实现时以它为准。
- `specs/reference/HANDOFF.md`——交接说明(页面结构、交互、资产清单)。
- `specs/reference/Longbridge Pro Desktop v2.dc.html`——可在浏览器直接打开的设计参考稿,内含三语 I18N 字典与两套主题 CSS 变量,可直接移植。
- 分区参考截图在原始压缩包 `~/Downloads/Longbridge 桌面端网页重构.zip` 的 `screenshots/` 内(924px 视口再渲染,仅作视觉对照,数值以 HANDOFF/DESIGN 为准)。

## 2. 范围与非目标

**范围(整站)**:
- 首页(落地页)按设计稿重建全部分区。
- 主题 token 应用到 VitePress 主题层,Release Notes 等文档页获得配套深色/浅色外观。
- 导航栏、Footer 重塑,全站生效。

**非目标**:
- 不迁移框架(保持 VitePress),不改动 release notes 内容与其 sidebar 生成逻辑(`.vitepress/config/utils.ts` 的 `getReleaseNotes`)。
- 不改动 CI(`.github/workflows/`)、`script/check-latest.ts`、GA 集成、medium-zoom 功能(仅适配深色遮罩颜色)。
- 不新增图片资产入库,继续引用现网线上素材。

## 3. 总体架构(已确认方案 A:扩展默认主题)

技术栈不变:VitePress 1.6 + `DefaultTheme`(theme-without-fonts)+ UnoCSS + `@vueuse/motion`。

- **深色模式**:`.vitepress/config/index.mts` 中 `appearance: false` → `appearance: 'dark'`。默认深色、导航原生切换开关、localStorage(`vitepress-theme-appearance`)持久化,均由 VitePress 原生提供。
- **导航**:沿用默认 `VPNav`,CSS 重塑 + `nav-bar-content-after` 插槽注入 Download 按钮;不自绘导航。
- **入场动效**:保留 `@vueuse/motion` 滚动入场动效(已确认),依赖不移除。
- **状态**:不自建状态管理。theme = VitePress 原生;lang = 现有 locale 路由 + 语言下拉;os = 现有 `getPlatform()`(mounted 检测,不持久化);App 内嵌 UA 跳转(`getLocaleByAppUA`)不动。

## 4. 主题 token 层

`.vitepress/theme/custom.css` 整体重写,按 `DESIGN.md` §13:

- `:root`(浅色)与 `.dark`(深色)两组语义变量,核心映射:

  | Token | 浅色 | 深色 |
  | --- | --- | --- |
  | `--vp-c-bg` | `#FFFFFF` | `#0A0E19` |
  | `--vp-c-bg-soft` | `#F6F6F7` | `#13182A` |
  | `--vp-c-bg-elv` | `#FFFFFF` | `#202127` |
  | `--vp-c-bg-alt` | `#F6F6F7` | `#161A26` |
  | `--vp-c-text-1` | `#3C3C43` | `#DFDFD6` |
  | `--vp-c-text-2` | `#67676C` | `#98989F` |
  | `--vp-c-text-3` | `#929295` | `#6A6A71` |
  | `--vp-c-border` | `#C2C2C4` | `#3C3F44` |
  | `--vp-c-divider` | `rgba(0,0,0,.06)` | `rgba(255,255,255,.06)` |
  | `--vp-c-brand-1` | `#00B8B8` | `#00F0C4` |
  | `--vp-c-brand-2` | `#1AC7C7` | `#32EADC` |
  | `--vp-c-brand-3` | `#33CDCD` | `#2ED4C7` |
  | `--vp-sidebar-bg-color` | `#FFFFFF` | `#0A0E19` |

- `--lb-*` 项目 token:品牌 scale(`--brand-5` 至 `--brand-100`)、主/次按钮(`--lb-btn-primary-bg` 等,深色主按钮白底黑字、浅色黑底白字)、AI 深青区块(`--lb-ai-brand-bg: #09252A`、`--lb-ai-card-bg: #203A3F`,仅深色;浅色对应区块用 `#F5F6F6`)、涨跌色(`--up-color: #00ADA2` / `--down-color: #FF3A75`,两主题相同)。
- 旧变量(`--vp-c-brand-1: #1b1912`、`--lb-gray-1`、`--text-color-*` 等)删除;组件引用处随组件重写迁移到新 token。
- 卡片眉标色:浅色 `#00B8B8` / 深色 `#00F0C4`(`DESIGN.md` §4 Badge Label)。

## 5. 字体

- 引入 **Inter**(400–800)与 **JetBrains Mono**(400/600),`config/index.mts` 的 `head` 中加 Google Fonts `<link>`(含 `preconnect`)。JetBrains Mono 仅用于卡片大数字。
- `--vp-font-family-base`:`"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`。
- **移除 Cera Pro**:custom.css 的 `@font-face`、`docs/public/Cera-Pro-Light.otf`、`config/index.mts` 里 `transformHead` 的字体 preload 逻辑一并删除。

## 6. 导航栏

沿用默认 `VPNav`,CSS 重塑(60px 高):

- 背景:深色 `rgba(10,14,25,0.8)` + `backdrop-filter: saturate(1.8) blur(20px)`,底边 `1px solid rgba(255,255,255,0.06)`;浅色 `rgba(255,255,255,0.85)`,底边 `#EAEBEC`。
- 左:logo 28px 圆角 7px(沿用现有 themeConfig.logo)+ 站名 "Longbridge Pro" 16px/700。
- 中:Home · Longbridge Pro · Release Notes,14px/500,hover 背景 `rgba(255,255,255,0.06)`(浅色 `rgba(0,0,0,0.04)`),当前页品牌色;`.VPNavBarMenu` 用 CSS 绝对定位水平居中。
- 右:语言下拉(13px、1px 边框、圆角 8px)· GitHub 图标(现 socialLinks)· 主题切换(原生开关重塑为 32×32 图标按钮)· **Download 药丸按钮**:新组件 `docs/pages/NavDownload.vue`,经 `Layout` 的 `nav-bar-content-after` 插槽注入(`.vitepress/theme/index.ts`),文案随语言("Download"/"下载"/"下載"),深色白底黑字、浅色黑底白字、999px、14px/500;首页内点击平滑滚动到 Hero 下载区,其他页面跳转到对应 locale 首页锚点。
- 移动端 ≤768px:默认汉堡菜单;Download 按钮保留在栏内。

## 7. Footer

重写 `docs/pages/Footer.vue`(继续经 `layout-bottom` 插槽挂载,全站生效):

- 4 栏:
  1. 联系方式:WhatsApp `+65 6330 3033`、Dealing Hotline `+65 6330 3030`、交易时段、`contact@longbridge.sg`;
  2. Terms & Conditions(6 链接);3. About(6 链接);4. More(4 链接)。
  全部链接 URL 与三语标题从设计稿 HTML 的 I18N 字典搬入 `.vitepress/locales/{en,zh-CN,zh-HK}.ts` 的 `footer` 字段。
- 底行:`© 2024 – Present Longbridge` + 社媒图标(Facebook / Instagram / X / TikTok / GitHub)。
- 背景:深色 `#0A0E19`、浅色 `#FAFAFA`;栏目标题 13px/600,链接 13.5px 次级文字色,hover 变主文字色。

## 8. 首页分区(`docs/pages/Home.vue` 骨架,自上而下)

所有分区保留 `v-motion` 入场动效;容器统一 `max-w-[1200px]`,分区间距遵循 §5 间距体系(主要 48px+)。

### 8.1 Hero(重写 `home/Hero.vue`)
- 背景:`linear-gradient(to top, #0A0E19 0%, rgba(10,14,25,0.65) 50%, rgba(10,14,25,0.25) 100%), radial-gradient(rgba(223,223,214,0.18) 1px, transparent 1px)`,`background-size: auto, 16px 16px`,容器 `overflow:hidden`;浅色模式点阵用深色点(参考设计稿 `:root` 变量)。
- 眉标:`● LONGBRIDGE PRO · v{VERSION} BETA`,11px/700,letter-spacing 1px,品牌色;版本取 `import.meta.env.VERSION`。
- H1 64px/600/1.05 两行:第一行主题文字色,第二行品牌色(深 `#00F0C4` / 浅 `#00ADA2`);两行标题与描述文案取设计稿 HTML I18N 字典(三语),locale 文件相应新增/替换字段。
- 描述 16px `#98989F`;旧版本提示行 13.5px(保留现有 `legacy_info`,含链接)。
- 按钮排 + 辅助行:见 8.2。
- 产品截图 `home.png`:1080px 宽、上圆角 16px、无底边框;身后品牌色光晕 `radial-gradient(50% 100% at 50% 100%, rgba(0,240,196,0.14), transparent 70%)`(浅色 `rgba(0,173,162,0.10)`)。

### 8.2 下载按钮排(重写 `home/DownloadInfo.vue`,Hero 与 Bottom CTA 复用)
- **已确认:用现有 `getDownloads(version)` / `getPlatform()` 的真实平台直链,不用设计稿占位链接。**
- 主按钮:999px 药丸、12px 28px 内边距,"Download for {当前 OS}"(随语言),深色白底黑字(hover `#E8E8E8`)、浅色黑底白字(hover `rgb(40,40,40)`);OS 检测不到时显示三个平台按钮(沿用现有 fallback 行为)。
- 次按钮:"View all versions" 链到 `release-notes`,999px、深色 `rgba(80,80,80,0.5)` 底 `#D1D5DB` 字 / 浅色 `#F3F5F6` 底。
- 辅助行 12px:"Also available for {其余两平台}",两平台名为各自直链。

### 8.3 Upgraded Architecture(重写 `home/Upgrade.vue`)
- 眉标(11.5px/700 眉标色)+ H2 36px/600。
- 3 列卡片:深色 `#13182A` 底 `1px solid #3C3F44` / 浅色白底 `#EAEBEC` 边框,16px 圆角、28px 24px 内边距;hover 边框变亮(深色 `#4F5260`)+ `0 2px 8px rgba(0,240,196,0.06)`。
- 卡片内容:顶部 JetBrains Mono 44px/600 品牌色大数字 `120FPS` / `<2s` / `-40%CPU`(复用现有 locale `upgrade.tab*` 文案,结构可整理),下接标题 19px/700 与描述 14px。现有 flag 装饰图移除。

### 8.4 Real-Time Tracking(重写 `home/RealTimeTracking.vue`)
- 区块背景:深色 `#09252A` / 浅色 `#F5F6F6`。
- 左栏 380px:眉标 + H2 + 描述 + 3 个 tab 卡。激活:`#203A3F` 底、`rgba(0,240,196,0.5)` 边框、品牌色文字、`0 0 0 3px rgba(0,240,196,0.10)` 外环;非激活 `rgba(32,58,63,0.5)`;浅色模式的 tab 卡样式取设计稿 HTML `:root` 浅色变量为准。
- 右栏:当前 tab 对应截图,16px 圆角。
- **已确认:保留真实 tab 切换与现有 per-tab 图片(locale `realTimeTracking.tabs.tab_*.image`)**;移除现有左右轮播箭头。

### 8.5 Smart Navigation(重写 `home/SmartNav.vue`)
- 居中布局:眉标 + H2 + 两个要点(• 品牌色圆点,即现有 `smartNav.description` / `description_2` 文案)。
- 视频 `video.mp4`:1000px 宽、16px 圆角,`autoplay muted loop playsinline`;保留 IntersectionObserver 进视口播放控制。移除现有双栏 tab 切换与 `history.png`。

### 8.6 Multi-Platform(新组件 `home/MultiPlatform.vue`,从 Home.vue 内联抽出)
- 背景:深色 `#161A26` / 浅色 `#F5F6F6`。
- 左图 `multi.webp`;右文:眉标 + H2 + 描述 + 平台 chips(macOS / Windows / Linux,12px/600、4px 圆角,Badge/Inline 样式)。

### 8.7 Bottom CTA(新组件 `home/BottomCta.vue`)
- 居中:H2 + "v{VERSION} Beta · View all versions" 行 + 复用 8.2 下载按钮排。

## 9. 文档页(Release Notes)适配

- 换 token 后自动双主题;custom.css 补充(按 `DESIGN.md` §10):
  - 侧边栏:深色底 `#0A0E19`,激活项 `rgba(0,240,196,0.08)` 底 + `#00F0C4` 文字,非激活 `#98989F`,分组标题 11px/600 大写 `#6A6A71`。
  - 正文/代码块/表格颜色全部走 `--vp-c-*`;代码块底深色用 `--vp-c-bg-soft`。
  - medium-zoom 遮罩:深色 `#0A0E19` 系、浅色保持 `#dddde3`(跟随主题)。
- `docs/index.md` 挂载方式、`vp-doc` reset、release notes 侧边栏生成逻辑不动。

## 10. 响应式(按 `DESIGN.md` §8)

- ≤1023px:卡片 3→2 列;盯盘区、多端区双栏改上下堆叠;容器边距 16px。
- ≤639px:全部单列;容器边距 12px;字号按 `DESIGN.md` §8 降档(平板 90%、手机 85%);触控目标 ≥44px。
- 导航:移动端走 VitePress 默认汉堡菜单。

## 11. 内容与 i18n

- 结构:继续用 `.vitepress/locales/{en,zh-CN,zh-HK}.ts` + `useLocale()`。
- 现有文案(`upgrade`、`realTimeTracking`、`smartNav`、`legacy_info` 等)保留复用;新增字段:眉标文案、hero 两行标题(如需)、`also_available_for`、nav 下载按钮、footer 全部栏目与链接、bottom CTA 标题——三语译文优先从设计稿 HTML 的 I18N 字典搬运。
- 设计稿 I18N 与现有 locale 冲突时,以设计稿为准(其为最终文案)。

## 12. 资产(全部线上引用,不入库)

- Logo:`https://assets.wbrks.com/assets/logo/icon-full-radius.png`
- Hero 截图:`https://assets.lbctrl.com/uploads/f4da8c9b-cd12-4a4d-804c-f850d326ca21/home.png`
- 盯盘截图:现有 locale 中 per-tab 图片(tab_0 即 `market.png`)
- 导航视频:`https://assets.lbctrl.com/uploads/f3161729-43d6-42e7-9a11-0408882ea933/video.mp4`
- 多端图:`https://assets.lbctrl.com/uploads/78728886-0410-429c-ba4a-db2a6ea4911e/multi.webp`
- 字体:Google Fonts(Inter 400–800、JetBrains Mono 400/600)

## 13. 错误处理与兜底

- OS 检测失败:下载区显示全部三个平台按钮(现有行为)。
- SSR 兼容:新组件不在 setup 顶层访问 `window`/`navigator`,沿用 `onMounted` 模式(VitePress 构建期 SSR)。
- 媒体加载:线上素材,保持现有加载行为,不加骨架屏。

## 14. 验证与验收

- `bun run dev`:深/浅两主题 × 三语言逐区块与设计参考稿(浏览器打开 `specs/reference/*.dc.html`)及压缩包截图比对;检查 hover、tab 切换、语言/主题持久化、OS 按钮文案。
- `bun run build`:三 locale 构建通过、无 SSR 错误;`bun run preview` 抽查。
- 现有 `docs/pages/utils.test.ts` 通过。
- 响应式:1440 / 1024 / 768 / 375 四档宽度检查布局坍缩符合 §10。

## 15. 预计文件变更

| 文件 | 动作 |
| --- | --- |
| `.vitepress/config/index.mts` | `appearance: 'dark'`;Google Fonts head;移除 Cera Pro preload |
| `.vitepress/theme/custom.css` | 整体重写(token 层 + 导航/侧边栏/文档重塑) |
| `.vitepress/theme/index.ts` | `nav-bar-content-after` 插槽注入 NavDownload |
| `.vitepress/locales/*.ts` | 新增眉标/footer/CTA 等字段 |
| `docs/pages/Home.vue` | 重排分区骨架;Multi-Platform 抽出 |
| `docs/pages/Footer.vue` | 重写为 4 栏 |
| `docs/pages/NavDownload.vue` | 新增 |
| `docs/pages/home/Hero.vue` | 重写 |
| `docs/pages/home/DownloadInfo.vue` | 重写 |
| `docs/pages/home/Upgrade.vue` | 重写 |
| `docs/pages/home/RealTimeTracking.vue` | 重写 |
| `docs/pages/home/SmartNav.vue` | 重写 |
| `docs/pages/home/MultiPlatform.vue` | 新增 |
| `docs/pages/home/BottomCta.vue` | 新增 |
| `docs/public/Cera-Pro-Light.otf` | 删除 |
| `unocss.config.ts` | 注册语义色(`brand`、`up`、`down` 等)指向 CSS 变量,组件内不写裸十六进制 |
