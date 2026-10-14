import { act, render, screen, within } from "@testing-library/react";
import { MenuPage } from "@/components/MenuPage";
import { getDictionary } from "@/lib/dictionaries";
import { menu, menuCategoryIds } from "@/lib/menu";

describe.each(["en", "fa"] as const)("MenuPage (%s)", (locale) => {
  const t = getDictionary(locale);

  it("sets direction and language and has one h1", () => {
    const { container } = render(<MenuPage locale={locale} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("lang", locale);
    expect(root).toHaveAttribute("dir", locale === "fa" ? "rtl" : "ltr");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(t.menu.title);
  });

  it("renders a labelled section with every dish for each category", () => {
    const { container } = render(<MenuPage locale={locale} />);
    for (const id of menuCategoryIds) {
      const section = container.querySelector(`section#${id}`) as HTMLElement;
      expect(section).not.toBeNull();
      expect(within(section).getByRole("heading", { level: 2 })).toHaveTextContent(t.menu.categories[id]);
      expect(within(section).getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual(menu[id].map((item) => item.name[locale]));
    }
  });

  it("shows prices with the digits of the language and an accessible currency", () => {
    const { container } = render(<MenuPage locale={locale} />);
    const margherita = Array.from(container.querySelectorAll("li")).find((li) => li.querySelector("h3")?.textContent === menu.pizzas[0]!.name[locale])!;
    expect(margherita).toHaveTextContent(locale === "fa" ? "۸۹۰٬۰۰۰" : "890,000");
    expect(margherita.querySelector(".sr-only")).toHaveTextContent(t.menu.currency);
  });

  it("shows translated tags", () => {
    render(<MenuPage locale={locale} />);
    expect(screen.getAllByText(t.menu.tags.vegetarian).length).toBeGreaterThan(0);
    expect(screen.getAllByText(t.menu.tags.spicy)).toHaveLength(1);
  });

  it("has a category bar of anchors and keeps the language switch on the menu", () => {
    render(<MenuPage locale={locale} />);
    const bar = screen.getByRole("navigation", { name: t.menu.navLabel });
    expect(within(bar).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(menuCategoryIds.map((id) => `#${id}`));
    expect(screen.getByRole("link", { name: t.controls.language })).toHaveAttribute("href", locale === "fa" ? "/en/menu" : "/fa/menu");
  });
});

describe("MenuNav highlighting", () => {
  it("marks the first category first and follows the category in the middle of the screen", () => {
    let callback: IntersectionObserverCallback = () => {};
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
      constructor(cb: IntersectionObserverCallback) {
        callback = cb;
      }
      observe = jest.fn();
      disconnect = jest.fn();
    };
    const { container } = render(<MenuPage locale="en" />);
    const bar = screen.getByRole("navigation", { name: "Menu categories" });
    const current = () => within(bar).getAllByRole("link").filter((a) => a.getAttribute("aria-current") === "true").map((a) => a.textContent);
    expect(current()).toEqual(["Pizzas"]);
    const entry = (id: string) => ({ isIntersecting: true, target: container.querySelector(`section#${id}`)! }) as unknown as IntersectionObserverEntry;
    act(() => callback([entry("desserts")], {} as IntersectionObserver));
    expect(current()).toEqual(["Desserts"]);
  });
});
