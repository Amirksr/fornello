import { getDictionary } from "@/lib/dictionaries";
import { getDirection, isLocale, otherLocale, resolveLocale } from "@/lib/i18n";
import { THEME_KEY, applyTheme, nextTheme, parseTheme } from "@/lib/theme";

const keysOf = (value: unknown, prefix = ""): string[] =>
  Array.isArray(value)
    ? [`${prefix}[${value.length}]`, ...value.flatMap((v, i) => keysOf(v, `${prefix}[${i}]`))]
    : value && typeof value === "object"
      ? Object.entries(value).flatMap(([k, v]) => keysOf(v, `${prefix}.${k}`))
      : [prefix];

describe("i18n", () => {
  it("validates locales and directions", () => {
    expect(isLocale("fa")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(getDirection("fa")).toBe("rtl");
    expect(getDirection("en")).toBe("ltr");
    expect(otherLocale("fa")).toBe("en");
  });

  it("resolves Accept-Language with quality values and falls back to Persian", () => {
    expect(resolveLocale(null)).toBe("fa");
    expect(resolveLocale("en-US,en;q=0.9")).toBe("en");
    expect(resolveLocale("de,fa;q=0.5,en;q=0.8")).toBe("en");
    expect(resolveLocale("en;q=0,fa;q=0.1")).toBe("fa");
    expect(resolveLocale("fr-FR")).toBe("fa");
    expect(resolveLocale("en;q=abc")).toBe("fa");
  });

  it("keeps both dictionaries structurally identical", () => {
    expect(keysOf(getDictionary("fa")).sort()).toEqual(keysOf(getDictionary("en")).sort());
  });
});

describe("theme", () => {
  beforeEach(() => localStorage.clear());

  it("parses unknown values as dark and toggles", () => {
    expect(parseTheme("sepia")).toBe("dark");
    expect(parseTheme(undefined)).toBe("dark");
    expect(nextTheme("dark")).toBe("light");
    expect(nextTheme("light")).toBe("dark");
    expect(nextTheme(undefined)).toBe("light");
  });

  it("applies and persists the theme", () => {
    applyTheme("light");
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem(THEME_KEY)).toBe("light");
  });

  it("still applies the theme when storage throws", () => {
    const spy = jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => applyTheme("dark")).not.toThrow();
    expect(document.documentElement.dataset.theme).toBe("dark");
    spy.mockRestore();
  });
});
