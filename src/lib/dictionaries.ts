import type { Locale } from "./i18n";

export type Dictionary = {
  brand: string;
  tagline: string;
  nav: { menu: string; pizza: string; story: string; reserve: string };
  controls: { language: string; theme: string; chat: string; scene: string };
};

const en: Dictionary = {
  brand: "Fornello",
  tagline: "Crafted by fire",
  nav: { menu: "Menu", pizza: "Our pizza", story: "Story", reserve: "Reserve" },
  controls: { language: "فارسی", theme: "Switch between dark and light theme", chat: "Reserve a table", scene: "Go to section" },
};

const fa: Dictionary = {
  brand: "فورنلو",
  tagline: "ساخته‌شده با آتش",
  nav: { menu: "منو", pizza: "پیتزاهای ما", story: "داستان ما", reserve: "رزرو" },
  controls: { language: "English", theme: "تغییر تم تیره و روشن", chat: "رزرو میز", scene: "رفتن به بخش" },
};

const dictionaries: Record<Locale, Dictionary> = { en, fa };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
