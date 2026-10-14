import { formatPrice, menu, menuCategoryIds, type MenuItem } from "@/lib/menu";

const allItems = menuCategoryIds.flatMap((id) => menu[id]);
const persianScript = /[\u0600-\u06FF]/;

describe("menu data", () => {
  it("has a non-empty list for every category", () => {
    expect(Object.keys(menu).sort()).toEqual([...menuCategoryIds].sort());
    for (const id of menuCategoryIds) expect(menu[id].length).toBeGreaterThan(0);
  });

  it("uses unique ids", () => {
    const ids = allItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has both languages for every item, with the right script", () => {
    for (const item of allItems) {
      for (const field of [item.name, item.description]) {
        expect(field.en.trim()).not.toBe("");
        expect(field.fa.trim()).not.toBe("");
        expect(persianScript.test(field.fa)).toBe(true);
        expect(persianScript.test(field.en)).toBe(false);
      }
    }
  });

  it("has positive whole prices in steps of 5,000 Toman", () => {
    for (const item of allItems) {
      expect(Number.isInteger(item.price)).toBe(true);
      expect(item.price).toBeGreaterThan(0);
      expect(item.price % 5_000).toBe(0);
    }
  });

  it("keeps tags sensible: a spicy item is not vegetarian and none is repeated", () => {
    for (const item of allItems as MenuItem[]) {
      const tags = item.tags ?? [];
      expect(new Set(tags).size).toBe(tags.length);
      expect(tags.includes("spicy") && tags.includes("vegetarian")).toBe(false);
    }
  });

  it("contains the pizzas shown in the collection video, so their names can be shared later", () => {
    const pizzaIds = menu.pizzas.map((item) => item.id);
    for (const id of ["margherita", "marinara", "diavola", "quattro-formaggi", "capricciosa"]) expect(pizzaIds).toContain(id);
  });
});

describe("formatPrice", () => {
  it("uses Persian digits and separators for fa", () => {
    expect(formatPrice(890_000, "fa")).toBe("۸۹۰٬۰۰۰");
    expect(formatPrice(1_590_000, "fa")).toBe("۱٬۵۹۰٬۰۰۰");
  });

  it("uses Latin digits and commas for en", () => {
    expect(formatPrice(890_000, "en")).toBe("890,000");
    expect(formatPrice(1_590_000, "en")).toBe("1,590,000");
  });

  it("handles small and zero amounts", () => {
    expect(formatPrice(0, "en")).toBe("0");
    expect(formatPrice(5_000, "fa")).toBe("۵٬۰۰۰");
  });
});
