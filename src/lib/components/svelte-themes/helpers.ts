import { MEDIA } from "./constants";
import type { ThemeStore } from "./index";

export const getTheme = (
  key: string,
  fallback?: string
): string | undefined => {
  if (typeof window === "undefined") return undefined;
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return theme || fallback;
};

export const getResolvedTheme = (theme: string, themes: string[]): string => {
  if (theme === "system") {
    const systemTheme = getSystemTheme();
    return themes.includes(systemTheme) ? systemTheme : themes[0];
  }
  return theme;
};

export const disableAnimation = () => {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};

export const getSystemTheme = (
  e?: MediaQueryList
): ThemeStore["systemTheme"] => {
  if (!e) {
    e = window.matchMedia(MEDIA);
  }

  const isDark = e.matches;
  const systemTheme = isDark ? "dark" : "light";
  return systemTheme;
};
