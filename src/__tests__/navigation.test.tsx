import { render, screen, within } from "@testing-library/react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/lib/dictionaries";

const hrefs = (el: HTMLElement) => within(el).getAllByRole("link").map((a) => a.getAttribute("href"));

describe("Header", () => {
  it("uses same-page anchors on the landing page and offers the other language", () => {
    render(<Header locale="fa" t={getDictionary("fa")} />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(hrefs(nav)).toEqual(["#collection", "#signature", "#craft", "#reserve"]);
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en");
    expect(screen.getAllByRole("link")[0]).toHaveAttribute("href", "#hero");
  });

  it("leads back to the landing page from other pages and keeps the page when switching language", () => {
    render(<Header locale="en" t={getDictionary("en")} path="/menu" />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(hrefs(nav)).toEqual(["/en#collection", "/en#signature", "/en#craft", "/en#reserve"]);
    expect(screen.getByRole("link", { name: "فارسی" })).toHaveAttribute("href", "/fa/menu");
    expect(screen.getAllByRole("link")[0]).toHaveAttribute("href", "/en#hero");
  });
});

describe("Footer", () => {
  it.each(["en", "fa"] as const)("prefixes every link with the locale (%s)", (locale) => {
    const { container } = render(<Footer locale={locale} t={getDictionary(locale)} />);
    const links = Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href") ?? "");
    expect(links.length).toBeGreaterThan(8);
    for (const href of links) expect(href.startsWith(`/${locale}`)).toBe(true);
    expect(links).toContain(`/${locale}#craft`);
  });
});
