import { getDirection, isLocale, otherLocale, resolveLocale } from "@/lib/i18n";

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

});
