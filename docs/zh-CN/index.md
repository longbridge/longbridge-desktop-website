---
layout: home
---

<script setup>
import Home from '../pages/Home.vue'
</script>

<Home 
    name="Longbridge Pro"
    tagline="全新的专业证券交易桌面端，为您带来极速流畅的投资体验，让交易更高效、更便捷。"
    download_more="查看更多版本"
    legacy_info='当前为全新一代版本，功能正在持续优化和完善中，如需更完整的功能，可选择 <a href="https://longbridge.com/download">下载上一代</a> 版本。'
    :features='[
        {
            "title": "全新架构，投资体验全面提升",
            "image": "https://assets.lbctrl.com/uploads/8c541832-5725-4844-ac80-156279a83144/output.png",
            "items": [
            "极速流畅：界面响应迅捷，操作无卡顿，稳定支持 60+ FPS，最高可达 120 FPS。",
            "高效低耗：深度优化资源占用，CPU 与内存消耗大幅降低，运行更轻快。",
            "秒启体验：轻量级设计，安装包小巧，2 秒内极速启动。"
            ]
        },
        {
            "title": "智能导航，一栏掌握市场动态",
            "image": "https://assets.lbctrl.com/uploads/69043ccc-cbbe-44e6-93c5-a37cd4829dd7/scr-20250502-kqry.png",
            "items": [
            "左侧导航栏全新设计，支持展开和收起，提升布局空间使用率。",
            "支持多个「个股」标签页切换，快速查看报价，掌握市场动态。",
            "一键唤出历史记录，重要信息随时回溯。"
            ]
        },
        {
            "title": "全球交易，满足多品种需求",
            "image": "https://assets.lbctrl.com/uploads/c2842fa5-f8ca-44e7-aad5-5b8a38f49dcb/scr-20250502-kiym.png",
            "items": [
            "支持港股、美股、新加坡股的行情盯盘和交易。",
            "美股支持双向交易，做多做空灵活选择。",
            "支持美股期权、窝轮牛熊等衍生品交易，覆盖更多品种。"
            ]
        },
        {
            "title": "多端支持，专业盯盘更高效",
            "image": "https://assets.lbctrl.com/uploads/982af099-639e-428c-b9dc-1881dc52921c/scr-20250502-krlh.png",
            "items": [
            "全新的跨平台原生版本，支持 macOS、Windows、Linux。",
            "支持扩展多屏幕，行情、图表、资讯分屏掌控。"
            ]
        }
    ]'
/>
