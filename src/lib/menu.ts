import type { Locale } from "./i18n";

export const menuCategoryIds = ["pizzas", "starters", "desserts", "drinks"] as const;
export type MenuCategoryId = (typeof menuCategoryIds)[number];
export type MenuTag = "vegetarian" | "spicy";
export type Localized = Record<Locale, string>;

export type MenuItem = {
  /** Stable key; also used to connect an item to other parts of the site (e.g. the collection video). */
  id: string;
  name: Localized;
  description: Localized;
  /** Price in Toman. */
  price: number;
  tags?: MenuTag[];
};

/**
 * Sample menu. Prices are Toman estimates for a wood-fired Italian restaurant in Tehran in autumn 2026
 * (a 32 cm Margherita at an Italian restaurant is listed at about 930,000); replace them with the real ones.
 * Meat items are beef, so the menu works for a halal kitchen.
 */
export const menu: Record<MenuCategoryId, MenuItem[]> = {
  pizzas: [
    {
      id: "margherita",
      name: { fa: "مارگاریتا", en: "Margherita" },
      description: { fa: "گوجه سن‌مارزانو، موتزارلای تازه، ریحان", en: "San Marzano tomato, fior di latte, basil" },
      price: 890_000,
      tags: ["vegetarian"],
    },
    {
      id: "marinara",
      name: { fa: "مارینارا", en: "Marinara" },
      description: { fa: "گوجه سن‌مارزانو، سیر، پونه کوهی، روغن زیتون", en: "San Marzano tomato, garlic, oregano, olive oil" },
      price: 780_000,
      tags: ["vegetarian"],
    },
    {
      id: "diavola",
      name: { fa: "دیاولا", en: "Diavola" },
      description: { fa: "سالامی گوشت تند، روغن فلفل، موتزارلا", en: "Spicy beef salami, chili oil, mozzarella" },
      price: 1_190_000,
      tags: ["spicy"],
    },
    {
      id: "quattro-formaggi",
      name: { fa: "کواترو فورماجی", en: "Quattro Formaggi" },
      description: { fa: "موتزارلا، گورگونزولا، پارمزان، ریکوتا", en: "Mozzarella, gorgonzola, parmesan, ricotta" },
      price: 1_290_000,
      tags: ["vegetarian"],
    },
    {
      id: "capricciosa",
      name: { fa: "کاپریچوزا", en: "Capricciosa" },
      description: { fa: "قارچ، ژامبون گوشت، آرتیشو، زیتون", en: "Mushrooms, beef ham, artichoke, olives" },
      price: 1_250_000,
    },
    {
      id: "fornello",
      name: { fa: "فورنلو (امضای ما)", en: "Fornello Signature" },
      description: { fa: "بوراتا، گوجه گیلاسی، ریحان، روغن زیتون بکر", en: "Burrata, cherry tomatoes, basil, extra virgin olive oil" },
      price: 1_590_000,
      tags: ["vegetarian"],
    },
  ],
  starters: [
    {
      id: "bruschetta",
      name: { fa: "بروسکتا", en: "Bruschetta" },
      description: { fa: "نان تفت‌داده، گوجه، سیر، ریحان، روغن زیتون", en: "Toasted bread, tomato, garlic, basil, olive oil" },
      price: 420_000,
      tags: ["vegetarian"],
    },
    {
      id: "caprese",
      name: { fa: "کاپرزه", en: "Caprese" },
      description: { fa: "موتزارلای تازه، گوجه، ریحان، سس بالزامیک", en: "Fresh mozzarella, tomato, basil, balsamic" },
      price: 690_000,
      tags: ["vegetarian"],
    },
    {
      id: "arancini",
      name: { fa: "آرانچینی", en: "Arancini" },
      description: { fa: "کروکت برنج با مغز موتزارلا و سس گوجه", en: "Crispy rice balls with a mozzarella heart and tomato sauce" },
      price: 520_000,
      tags: ["vegetarian"],
    },
    {
      id: "garlic-bread",
      name: { fa: "نان سیر و موتزارلا", en: "Garlic bread" },
      description: { fa: "خمیر کوره‌ای با سیر، موتزارلا و جعفری", en: "Oven-baked dough with garlic, mozzarella and parsley" },
      price: 380_000,
      tags: ["vegetarian"],
    },
  ],
  desserts: [
    {
      id: "tiramisu",
      name: { fa: "تیرامیسو", en: "Tiramisu" },
      description: { fa: "ماسکارپونه، بیسکویت ساوایاردی، اسپرسو، کاکائو", en: "Mascarpone, savoiardi, espresso, cocoa" },
      price: 480_000,
    },
    {
      id: "panna-cotta",
      name: { fa: "پاناکوتا", en: "Panna cotta" },
      description: { fa: "خامهٔ وانیلی با سس توت‌فرنگی", en: "Vanilla cream with strawberry sauce" },
      price: 450_000,
    },
    {
      id: "nutella-calzone",
      name: { fa: "کالزونهٔ نوتلا", en: "Nutella calzone" },
      description: { fa: "خمیر کوره‌ای با نوتلا و فندق", en: "Oven-baked dough filled with Nutella and hazelnuts" },
      price: 540_000,
    },
  ],
  drinks: [
    {
      id: "lemonade",
      name: { fa: "لیموناد", en: "Lemonade" },
      description: { fa: "لیمو تازه، نعنا، شربت ساده", en: "Fresh lemon, mint, simple syrup" },
      price: 240_000,
    },
    {
      id: "doogh",
      name: { fa: "دوغ", en: "Doogh" },
      description: { fa: "دوغ سنتی با نعنا", en: "Traditional yogurt drink with mint" },
      price: 190_000,
    },
    {
      id: "espresso",
      name: { fa: "اسپرسو", en: "Espresso" },
      description: { fa: "دبل شات، قهوهٔ تازه‌آسیاب", en: "Double shot, freshly ground" },
      price: 220_000,
    },
    {
      id: "sparkling-water",
      name: { fa: "آب گازدار", en: "Sparkling water" },
      description: { fa: "بطری ۳۳۰ میلی‌لیتری", en: "330 ml bottle" },
      price: 120_000,
    },
  ],
};

/** Formats a Toman amount with the digits and separators of the locale (۸۹۰٬۰۰۰ or 890,000). */
export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(amount);
}
