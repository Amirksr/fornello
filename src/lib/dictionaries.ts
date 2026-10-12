import type { Locale } from "./i18n";

export const sceneIds = ["hero"] as const;
export type SceneId = (typeof sceneIds)[number];

type Story = { title: string; body: string; cta: string };

export type Dictionary = {
  brand: string;
  tagline: string;
  nav: { menu: string; pizza: string; story: string; reserve: string };
  controls: { language: string; theme: string; chat: string; scene: string };
  scenes: {
    hero: Story;
  };
};

const en: Dictionary = {
  brand: "Fornello",
  tagline: "Crafted by fire",
  nav: { menu: "Menu", pizza: "Our pizza", story: "Story", reserve: "Reserve" },
  controls: { language: "فارسی", theme: "Switch between dark and light theme", chat: "Reserve a table", scene: "Go to section" },
  scenes: {
    hero: {
      title: "Crafted by fire.",
      body: "Authentic Italian pizza, naturally leavened, hand-stretched and baked in under ninety seconds in a wood-fired oven.",
      cta: "Explore the menu",
    },
  },
};

const fa: Dictionary = {
  brand: "فورنلو",
  tagline: "ساخته‌شده با آتش",
  nav: { menu: "منو", pizza: "پیتزاهای ما", story: "داستان ما", reserve: "رزرو" },
  controls: { language: "English", theme: "تغییر تم تیره و روشن", chat: "رزرو میز", scene: "رفتن به بخش" },
  scenes: {
    hero: {
      title: "ساخته‌شده با آتش.",
      body: "پیتزای اصیل ایتالیایی با خمیر طبیعی، کشیده‌شده با دست و پخته‌شده در کمتر از نود ثانیه در کوره هیزمی.",
      cta: "دیدن منو",
    },
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, fa };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
