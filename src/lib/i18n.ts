export const locales = ["fa", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fa";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "fa" ? "rtl" : "ltr";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "fa" ? "en" : "fa";
}

/** Picks a locale from an Accept-Language header; falls back to the default (Persian). */
export function resolveLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", q] = part.trim().split(";q=");
      const quality = q === undefined ? 1 : Number(q);
      return { base: tag.toLowerCase().split("-")[0] ?? "", quality: Number.isNaN(quality) ? 0 : quality };
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);
  for (const { base } of ranked) if (isLocale(base)) return base;
  return defaultLocale;
}
