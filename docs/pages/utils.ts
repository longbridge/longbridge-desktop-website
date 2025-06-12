import { useWindowSize } from "@vueuse/core";
import { useRouter } from "vitepress";
import { computed } from "vue";
import en from "../../.vitepress/locales/en";
import zh_cn from "../../.vitepress/locales/zh-CN";
import zh_hk from "../../.vitepress/locales/zh-HK";

/**
 * Get the locale from the URL.
 */
export const getLocale = () => {
  const router = useRouter();
  const locale = router.route.path.split("/")[2] || "en";
  return locale;
};

/**
* Get the platform of the user
* @returns {string} The platform of the user
*/
export const getPlatform = () => {
  const ua = navigator.userAgent.toLowerCase();

  if (
    ua.includes("windows nt") ||
    ua.includes("win64") ||
    ua.includes("wow64")
  ) {
    return "windows";
  } else if (ua.includes("macintosh") || ua.includes("mac os x")) {
    return "macos";
  } else if (ua.includes("linux")) {
    // Exclude Android
    if (!ua.includes("android")) {
      return "linux";
    }
  }

  return "";
};

/**
 * Create a download URL for the given version, OS, and architecture
 * @param version The version of the software
 * @param os The operating system
 * @param arch The architecture
 * @param suffix The suffix of the file
 * @returns The download URL
 */
export const createDownloadUrl = (
  version: string,
  os: "windows" | "macos" | "linux",
  arch: 'x86_64' | 'aarch64' | 'arm64',
  suffix: "appimage" | "deb" | "" = ""
) => {
  const baseUrl =
    "https://assets.lbctrl.com/github/release/longbridge-desktop/stable";

  const osMap = {
    windows: `windows-${arch}.exe`,
    macos: `macos-${arch}.dmg`,
    linux: {
      appimage: `linux-${arch}.AppImage`,
      deb: `linux-${arch}.deb`,
    },
  };

  const osPath = typeof osMap[os] === "string" ? osMap[os] : osMap[os][suffix];
  return `${baseUrl}/longbridge-${version}-${osPath}`;
};

/**
 * Get the downloads for the given platform and version
 * @param platform The platform of the user
 * @param version The version of the software
 * @returns The downloads
 */
export const getDownloads = (version: string) => {
  const commonDownloads = {
    windows: [
      {
        text: "Windows",
        suffix: "x86_64",
        url: createDownloadUrl(version, "windows", "x86_64"),
        platform: "windows",
      },
    ],
    linux: [
      {
        text: "Linux",
        suffix: "AppImage",
        url: createDownloadUrl(version, "linux", "x86_64", "appimage"),
        platform: "linux",
      },
      {
        text: "Linux",
        suffix: "deb",
        url: createDownloadUrl(version, "linux", "x86_64", "deb"),
        platform: "linux",
      },
    ],
    macos: [
      {
        text: "macOS",
        suffix: "Apple Silicon",
        url: createDownloadUrl(version, "macos", "aarch64"),
        platform: "macos",
      },
      {
        text: "macOS",
        suffix: "Intel",
        url: createDownloadUrl(version, "macos", "x86_64"),
        platform: "macos",
      },
    ],
  };

  return [
    ...commonDownloads.windows,
    ...commonDownloads.macos,
    ...commonDownloads.linux,
  ];
};

export const easeOutCubic = (t: number) => {
  return 1 - Math.pow(1 - t, 3);
};

export const easeInOutCubic = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const useDetectMobile = () => {
  const { width } = useWindowSize();
  const isMobile = computed(() => width.value < 1024);
  return isMobile;
};



export const motionVisible = (time = 500, type = 'enter', options = {
  start: {
    opacity: 0,
  }, end: {
    opacity: 1,
  }
}) => ({
  [`${type}`]: {
    transition: {
      delay: time,
    },
    ...options.end,
  },
  initial: {
    ...options.start,
  },
})

export const useLocale = () => {
  const lang = getLocale()
  const locales = {
    en,
    'zh-CN': zh_cn,
    'zh-HK': zh_hk
  }
  if (locales[lang]) {
    return locales[lang]
  }
  return locales['en']
}
