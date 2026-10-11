export type Theme = "dark" | "light";
export const THEME_KEY = "fornello-theme";

export function parseTheme(value: unknown): Theme {
  return value === "light" ? "light" : "dark";
}

export function nextTheme(current: unknown): Theme {
  return parseTheme(current) === "dark" ? "light" : "dark";
}

export function applyTheme(theme: Theme, doc: Document = document): void {
  doc.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* storage can be blocked (private mode); the attribute still applies for this visit */
  }
}

/** Runs before hydration to avoid a flash of the wrong theme. Dark is the default. */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_KEY}");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;
