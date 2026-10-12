import type { Locale } from "./i18n";

export const sceneIds = ["hero", "signature", "layers"] as const;
export type SceneId = (typeof sceneIds)[number];

type Story = { title: string; body: string; cta: string };

export type Dictionary = {
  brand: string;
  tagline: string;
  nav: { menu: string; pizza: string; story: string; reserve: string };
  controls: { language: string; theme: string; chat: string; scene: string };
  scenes: {
    hero: Story;
    signature: Story;
    layers: Story & { eyebrow: string };
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
    signature: {
      title: "The Fornello Signature",
      body: "San Marzano tomato, fior di latte and basil picked this morning. One pie we have not changed since opening night.",
      cta: "Explore the menu",
    },
    layers: {
      eyebrow: "Ingredients",
      title: "Every layer matters",
      body: "A slow-risen base, a bright tomato sauce and cheese that stretches. Each layer is made in-house every day.",
      cta: "Explore more",
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
    signature: {
      title: "پیتزای امضای فورنلو",
      body: "گوجه سن‌مارزانو، موتزارلای تازه و ریحانی که همان صبح چیده شده. پیتزایی که از شب افتتاحیه تغییرش نداده‌ایم.",
      cta: "دیدن منو",
    },
    layers: {
      eyebrow: "مواد اولیه",
      title: "هر لایه اهمیت دارد",
      body: "خمیری که آرام ور آمده، سس گوجهٔ شاداب و پنیری که کش می‌آید. همهٔ لایه‌ها هر روز در همین آشپزخانه تهیه می‌شوند.",
      cta: "بیشتر بدانید",
    },
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, fa };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
