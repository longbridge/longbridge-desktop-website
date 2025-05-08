---
layout: home
---

<script setup>
import Home from '../pages/Home.vue'
</script>

<Home 
    name="Longbridge Pro"
    tagline="全新的專業證券交易桌面端，為您帶來極速流暢的投資體驗，讓交易更高效、更便捷。"
    download_more="查看更多版本"
    legacy_info='當前為全新一代版本，功能正在持續優化和完善中，如需更完整的功能，可選擇 <a href="https://longbridge.com/download">下載上一代</a> 版本。'
    :features='[
        {
            "title": "全新架構，投資體驗全面提升",
            "image": "https://assets.lbctrl.com/uploads/8c541832-5725-4844-ac80-156279a83144/output.png",
            "items": [
            "極速流暢：界面反應迅捷，操作無卡頓，穩定支援 60+ FPS，最高可達 120 FPS。",
            "高效低耗：深度優化資源佔用，CPU 與記憶體消耗大幅降低，運行更輕快。",
            "秒開體驗：輕量級設計，安裝包小巧，2 秒內極速啟動。"
            ]
        },
        {
            "title": "智能導航，一欄掌握市場動態",
            "image": "https://assets.lbctrl.com/uploads/69043ccc-cbbe-44e6-93c5-a37cd4829dd7/scr-20250502-kqry.png",
            "items": [
            "左側導航欄全新設計，支援展開和收起，提升版面空間使用率。",
            "支援多個「個股」分頁切換，快速查看報價，掌握市場動態。",
            "一鍵喚出歷史記錄，重要資訊隨時回溯。"
            ]
        },
        {
            "title": "環球交易，滿足多品種需求",
            "image": "https://assets.lbctrl.com/uploads/c2842fa5-f8ca-44e7-aad5-5b8a38f49dcb/scr-20250502-kiym.png",
            "items": [
            "支援港股、美股、新加坡股的行情盯盤和交易。",
            "美股支援雙向交易，做多做空靈活選擇。",
            "支援美股期權、窩輪牛熊等衍生品交易，覆蓋更多品種。"
            ]
        },
        {
            "title": "多端支援，專業盯盤更高效",
            "image": "https://assets.lbctrl.com/uploads/982af099-639e-428c-b9dc-1881dc52921c/scr-20250502-krlh.png",
            "items": [
            "全新的跨平台原生版本，支援 macOS、Windows、Linux。",
            "支援擴展多螢幕，行情、圖表、資訊分屏掌控。"
            ]
        }
    ]'
/>
