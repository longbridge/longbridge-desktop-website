<script setup>
import { onMounted } from "vue";
import { getLocale } from "./utils";

onMounted(() => {
    // Load Google Analytics script
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-P81Y8BDYYS";
    script.defer = true;
    document.head.appendChild(script);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-P81Y8BDYYS");
});

const locales = {
    en: {
        whatsapp_title: "WhatsApp Chat (For general enquiries)",
        trading_hours: "Trading days: 9a.m. – 12a.m. (GMT+8)",
        dealing_hotline: "Dealing Hotline",
        for_institutions: "For Institutions",
        corporate_services: "Corporate Services",
        email: "Email",
        terms_conditions: "Terms and Conditions",
        customer_agreement: "Customer Agreement",
        privacy_policy: "Privacy Policy",
        best_execution_policy: "Best Execution Policy",
        risk_disclosure: "Risk Disclosure Statement",
        account_opening: "Account Opening",
        about: "About",
        about_us: "About us",
        license_regulatory: "License & Regulatory",
        news_media: "News & Media",
        join_us: "Join us",
        column: "Column",
        blog: "Blog",
        promotions: "Promotions",
        welcome_rewards: "Welcome Rewards",
        referral_program: "Referral Program",
        copyright: "© 2024 - Present Longbridge",
    },
    "zh-CN": {
        whatsapp_title: "WhatsApp 客服（一般咨询）",
        trading_hours: "交易日：上午 9 点 - 凌晨 12 点（GMT+8）",
        dealing_hotline: "交易热线",
        for_institutions: "机构服务",
        corporate_services: "企业服务",
        email: "电子邮箱",
        terms_conditions: "条款与条件",
        customer_agreement: "客户协议",
        privacy_policy: "隐私政策",
        best_execution_policy: "最佳执行政策",
        risk_disclosure: "风险披露声明",
        account_opening: "开户",
        about: "关于",
        about_us: "关于我们",
        license_regulatory: "牌照与监管",
        news_media: "新闻媒体",
        join_us: "加入我们",
        column: "专栏",
        blog: "博客",
        promotions: "优惠活动",
        welcome_rewards: "开户奖励",
        referral_program: "推荐计划",
        copyright: "© 2024 - 至今 长桥",
    },
    "zh-HK": {
        whatsapp_title: "WhatsApp 客服（一般查詢）",
        trading_hours: "交易日：上午 9 點 - 凌晨 12 點（GMT+8）",
        dealing_hotline: "交易熱線",
        for_institutions: "機構服務",
        corporate_services: "企業服務",
        email: "電子郵箱",
        terms_conditions: "條款與條件",
        customer_agreement: "客戶協議",
        privacy_policy: "隱私政策",
        best_execution_policy: "最佳執行政策",
        risk_disclosure: "風險披露聲明",
        account_opening: "開戶",
        about: "關於",
        about_us: "關於我們",
        license_regulatory: "牌照與監管",
        news_media: "新聞媒體",
        join_us: "加入我們",
        column: "專欄",
        blog: "博客",
        promotions: "優惠活動",
        welcome_rewards: "開戶獎勵",
        referral_program: "推薦計劃",
        copyright: "© 2024 - 至今 長橋",
    },
};

const t = (key) => {
    let locale = getLocale();
    if (!Object.keys(locales).includes(locale)) {
        locale = "en";
    }

    return (locales[locale] || {})[key];
};
</script>

<template>
    <footer
        class="bg-[#F8F9FA] text-sm z-[var(--vp-z-index-sidebar)] border-t border-solid border-[#E5E7EB]"
    >
        <div class="max-w-[1200px] px-5 md:px-0 mx-auto">
            <div class="px-5 pw xl:px-0 pt-10 pb-5 md:py-10">
                <div
                    class="flex-col items-start md:flex-row md:justify-between hidden"
                >
                    <div class="contact-item">
                        <div class="flex flex-col mb-10">
                            <div class="item-title">
                                {{ t("whatsapp_title") }}
                            </div>
                            <div class="links">
                                <a
                                    href="https://wa.me/6563303033"
                                    target="_blank"
                                    >+65 6330 3033</a
                                >
                                <div class="item-remark">
                                    {{ t("trading_hours") }}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="item-title">
                                {{ t("dealing_hotline") }}
                            </div>
                            <div class="links">
                                <a
                                    href="https://wa.me/6563303030"
                                    target="_blank"
                                    >+65 6330 3030</a
                                >
                                <div class="item-remark">
                                    {{ t("trading_hours") }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="item-title">
                            {{ t("for_institutions") }}
                        </div>
                        <div class="links">
                            <a href="https://longbridge.com/sg/institutions">{{
                                t("corporate_services")
                            }}</a>
                            <a
                                href="https://open.longportapp.com"
                                target="_blank"
                                >OpenAPI</a
                            >
                        </div>

                        <div class="item-title">{{ t("email") }}</div>
                        <div class="links">
                            <a href="mailto:contact@longbridge.sg"
                                >contact@longbridge.sg</a
                            >
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="item-title">
                            {{ t("terms_conditions") }}
                        </div>
                        <div class="links">
                            <a
                                href="https://assets.lbctrl.com/uploads/a19e3990-7050-492f-bf02-d00d50c64ff1/318525f18a3242980632ee890c3fed66.pdf"
                                target="_blank"
                                class="col-link"
                                >{{ t("customer_agreement") }}</a
                            >
                            <a
                                href="https://support.longbridge.sg/topics/Other/privacy-policy"
                                target="_blank"
                                class="col-link"
                                >{{ t("privacy_policy") }}</a
                            >
                            <a
                                href="https://pub.lbkrs.com/files/202211/yyY2XRM5auoPCXfy/LBPL-Platform_TnCs__31_Oct_2022-FINAL_.pdf"
                                target="_blank"
                                class="col-link"
                                >{{ t("terms_conditions") }}</a
                            >
                            <a
                                href="https://pub.lbkrs.com/files/202211/gPW5qDbnsJtgzDbN/LBS_Best_Execution_Policy_V1_10-2022__4_Oct-PM_.pdf"
                                target="_blank"
                                class="col-link"
                                >{{ t("best_execution_policy") }}</a
                            >
                            <a
                                href="https://pub.lbkrs.com/static/offline/202211/mM2JzzWCgmuHXRqb/1-LBS_Risk_Disclosures_and_Warning_Statement__for_main_website_upload_.pdf"
                                target="_blank"
                                class="col-link"
                                >{{ t("risk_disclosure") }}</a
                            >
                            <a
                                href="https://longbridge.com/sg/support/topics/accountopening/safe?locale=en"
                                target="_blank"
                                class="opacity-0 col-link"
                                >{{ t("account_opening") }}</a
                            >
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="item-title">{{ t("about") }}</div>
                        <div class="links">
                            <a href="https://longbridge.com/sg/about">{{
                                t("about_us")
                            }}</a>
                            <a
                                href="https://longbridge.com/sg/about/license-regulatory"
                                >{{ t("license_regulatory") }}</a
                            >
                            <a href="https://longbridge.com/sg/reports">{{
                                t("news_media")
                            }}</a>
                            <a href="https://longbridge.com/sg/jobs">{{
                                t("join_us")
                            }}</a>
                            <a href="https://longbridge.com/sg/articles">{{
                                t("column")
                            }}</a>
                            <a href="https://longbridge.com/sg/blog">{{
                                t("blog")
                            }}</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="item-title">{{ t("promotions") }}</div>
                        <div class="links">
                            <a
                                href="https://longbridge.com/sg/promotions/welcome-rewards"
                                >{{ t("welcome_rewards") }}</a
                            >
                            <a
                                target="_blank"
                                href="https://activity.longbridge.sg/pages/longbridge_sg/8651/index.html?app_id=longbridge_sg&org_id=1&channel=SHMS00001&account_channel=lb_sg"
                                class="rawLink-item"
                                >{{ t("referral_program") }}</a
                            >
                        </div>
                    </div>
                </div>
                <hr class="my-5 border-gray-200 md:my-8 hidden" />
                <div
                    class="flex flex-col items-baseline justify-between md:items-center md:flex-row"
                >
                    <div class="leading-[14px] text-text_color_3 mb-3 md:mb-0">
                        {{ t("copyright") }}
                    </div>
                    <div class="social-links">
                        <span class="hidden">
                            <a
                                target="_blank"
                                href="https://www.facebook.com/SGLongbridge"
                                class="social-item facebook"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z"
                                    ></path>
                                </svg>
                            </a>
                            <a
                                target="_blank"
                                href="https://www.instagram.com/longbridge.sg?igsh=amZhano5cWl3bndk"
                                class="social-item instagram"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M13.0281 2.00073C14.1535 2.00259 14.7238 2.00855 15.2166 2.02322L15.4107 2.02956C15.6349 2.03753 15.8561 2.04753 16.1228 2.06003C17.1869 2.1092 17.9128 2.27753 18.5503 2.52503C19.2094 2.7792 19.7661 3.12253 20.3219 3.67837C20.8769 4.2342 21.2203 4.79253 21.4753 5.45003C21.7219 6.0867 21.8903 6.81337 21.9403 7.87753C21.9522 8.1442 21.9618 8.3654 21.9697 8.58964L21.976 8.78373C21.9906 9.27647 21.9973 9.84686 21.9994 10.9723L22.0002 11.7179C22.0003 11.809 22.0003 11.903 22.0003 12L22.0002 12.2821L21.9996 13.0278C21.9977 14.1532 21.9918 14.7236 21.9771 15.2163L21.9707 15.4104C21.9628 15.6347 21.9528 15.8559 21.9403 16.1225C21.8911 17.1867 21.7219 17.9125 21.4753 18.55C21.2211 19.2092 20.8769 19.7659 20.3219 20.3217C19.7661 20.8767 19.2069 21.22 18.5503 21.475C17.9128 21.7217 17.1869 21.89 16.1228 21.94C15.8561 21.9519 15.6349 21.9616 15.4107 21.9694L15.2166 21.9757C14.7238 21.9904 14.1535 21.997 13.0281 21.9992L12.2824 22C12.1913 22 12.0973 22 12.0003 22L11.7182 22L10.9725 21.9993C9.8471 21.9975 9.27672 21.9915 8.78397 21.9768L8.58989 21.9705C8.36564 21.9625 8.14444 21.9525 7.87778 21.94C6.81361 21.8909 6.08861 21.7217 5.45028 21.475C4.79194 21.2209 4.23444 20.8767 3.67861 20.3217C3.12278 19.7659 2.78028 19.2067 2.52528 18.55C2.27778 17.9125 2.11028 17.1867 2.06028 16.1225C2.0484 15.8559 2.03871 15.6347 2.03086 15.4104L2.02457 15.2163C2.00994 14.7236 2.00327 14.1532 2.00111 13.0278L2.00098 10.9723C2.00284 9.84686 2.00879 9.27647 2.02346 8.78373L2.02981 8.58964C2.03778 8.3654 2.04778 8.1442 2.06028 7.87753C2.10944 6.81253 2.27778 6.08753 2.52528 5.45003C2.77944 4.7917 3.12278 4.2342 3.67861 3.67837C4.23444 3.12253 4.79278 2.78003 5.45028 2.52503C6.08778 2.27753 6.81278 2.11003 7.87778 2.06003C8.14444 2.04816 8.36564 2.03847 8.58989 2.03062L8.78397 2.02433C9.27672 2.00969 9.8471 2.00302 10.9725 2.00086L13.0281 2.00073ZM12.0003 7.00003C9.23738 7.00003 7.00028 9.23956 7.00028 12C7.00028 14.7629 9.23981 17 12.0003 17C14.7632 17 17.0003 14.7605 17.0003 12C17.0003 9.23713 14.7607 7.00003 12.0003 7.00003ZM12.0003 9.00003C13.6572 9.00003 15.0003 10.3427 15.0003 12C15.0003 13.6569 13.6576 15 12.0003 15C10.3434 15 9.00028 13.6574 9.00028 12C9.00028 10.3431 10.3429 9.00003 12.0003 9.00003ZM17.2503 5.50003C16.561 5.50003 16.0003 6.05994 16.0003 6.74918C16.0003 7.43843 16.5602 7.9992 17.2503 7.9992C17.9395 7.9992 18.5003 7.4393 18.5003 6.74918C18.5003 6.05994 17.9386 5.49917 17.2503 5.50003Z"
                                    ></path>
                                </svg>
                            </a>
                            <a
                                target="_blank"
                                href="https://x.com/sg_longbridge"
                                class="social-item x"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M17.6874 3.0625L12.6907 8.77425L8.37045 3.0625H2.11328L9.58961 12.8387L2.50378 20.9375H5.53795L11.0068 14.6886L15.7863 20.9375H21.8885L14.095 10.6342L20.7198 3.0625H17.6874ZM16.6232 19.1225L5.65436 4.78217H7.45745L18.3034 19.1225H16.6232Z"
                                    ></path>
                                </svg>
                            </a>
                            <a
                                target="_blank"
                                href="https://www.tiktok.com/@longbridge.sg"
                                class="social-item tiktok"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M16 8.24537V15.5C16 19.0899 13.0899 22 9.5 22C5.91015 22 3 19.0899 3 15.5C3 11.9101 5.91015 9 9.5 9C10.0163 9 10.5185 9.06019 11 9.17393V12.3368C10.5454 12.1208 10.0368 12 9.5 12C7.567 12 6 13.567 6 15.5C6 17.433 7.567 19 9.5 19C11.433 19 13 17.433 13 15.5V2H16C16 4.76142 18.2386 7 21 7V10C19.1081 10 17.3696 9.34328 16 8.24537Z"
                                    ></path>
                                </svg>
                            </a>
                        </span>
                        <a
                            target="_blank"
                            href="https://github.com/longbridge"
                            class="social-item github"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
@reference "tailwindcss";

.contact-item .links {
    @apply flex flex-col gap-3 mt-3 mb-5;
}

.item-title {
    @apply text-gray-600;
}

.social-links {
    @apply flex flex-row items-center justify-end gap-2 text-gray-600;
}

.social-item {
    @apply text-gray-600;
}
.social-item svg {
    @apply w-5 h-5;
}
</style>
