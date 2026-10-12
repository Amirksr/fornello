import { getDictionary } from "@/lib/dictionaries";
import { getDirection, isLocale, otherLocale, resolveLocale } from "@/lib/i18n";
import { mulberry32 } from "@/lib/random";
import { clamp, sceneProgress, videoTime } from "@/lib/scroll";
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

describe("scroll", () => {
  it("clamps", () => {
    expect(clamp(-1)).toBe(0);
    expect(clamp(2)).toBe(1);
    expect(clamp(0.4)).toBe(0.4);
  });

  it("computes pinned-scene progress", () => {
    expect(sceneProgress(100, 2000, 800)).toBe(0); // not reached yet
    expect(sceneProgress(0, 2000, 800)).toBe(0);
    expect(sceneProgress(-600, 2000, 800)).toBe(0.5);
    expect(sceneProgress(-5000, 2000, 800)).toBe(1); // scrolled past
    expect(sceneProgress(-10, 800, 800)).toBe(0); // no travel distance: avoids divide by zero
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

describe("random", () => {
  it("is deterministic and within [0,1)", () => {
    const a = mulberry32(7);
    const b = mulberry32(7);
    const seq = Array.from({ length: 50 }, () => a());
    expect(seq).toEqual(Array.from({ length: 50 }, () => b()));
    expect(seq.every((n) => n >= 0 && n < 1)).toBe(true);
    expect(mulberry32(8)()).not.toBe(seq[0]);
  });
});

describe("videoTime", () => {
  // 4s clip, plays across scene progress 0..0.8
  it("maps progress linearly and holds the last frame", () => {
    expect(videoTime(0, 4)).toBe(0);
    expect(videoTime(0.4, 4)).toBeCloseTo(2, 5);
    expect(videoTime(0.8, 4)).toBeCloseTo(4 - 1 / 24, 5); // one frame short of the end
    expect(videoTime(1, 4)).toBeCloseTo(4 - 1 / 24, 5);
    expect(videoTime(-0.2, 4)).toBe(0);
  });

  it("respects a custom range and guards bad input", () => {
    expect(videoTime(0.3, 4, 0.2, 0.6)).toBeCloseTo(1, 5);
    expect(videoTime(0.5, NaN)).toBe(0);
    expect(videoTime(0.5, 0)).toBe(0);
    expect(videoTime(0.5, 4, 0.6, 0.6)).toBe(0);
    expect(videoTime(0.5, 0.01)).toBe(0); // clip shorter than one frame
  });
});

describe("scene transitions (CSS)", () => {
  // jsdom doesn't apply stylesheets, so guard the rules in the source: scenes must not fade to an empty stage at their end.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const css = (require("fs") as typeof import("fs")).readFileSync(`${process.cwd()}/src/app/globals.css`, "utf8");
  const block = (selector: string) => css.match(new RegExp(`\\n${selector.replace(/[.]/g, "\\.")}\\s*\\{([^}]*)\\}`))?.[1] ?? "";

  it("does not fade scene text, photos or artwork out near the end of the scroll", () => {
    expect(block(".copy")).not.toMatch(/opacity/);
    expect(block(".art")).not.toMatch(/opacity/);
    expect(block(".photo-wrap")).not.toMatch(/opacity/);
    expect(block(".photo-fade-in")).not.toMatch(/max\(/);
    expect(block(".photo-fade-in")).toMatch(/opacity/); // the craft cross-fade itself still works
  });

  it("softens the leading edge of each scene only at the start of its scroll", () => {
    const edge = block(".stage::after");
    expect(edge).toMatch(/linear-gradient\(to bottom, var\(--bg\), transparent\)/);
    expect(edge).toMatch(/opacity:\s*clamp\(0, calc\(1 - var\(--p\) \* 8\), 1\)/);
  });
});
