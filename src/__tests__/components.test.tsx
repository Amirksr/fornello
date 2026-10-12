import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Landing } from "@/components/Landing";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getDictionary, sceneIds } from "@/lib/dictionaries";
import { sceneImages, sceneVideos } from "@/lib/images";
import { THEME_KEY } from "@/lib/theme";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = "dark";
  });

  it("switches between dark and light and remembers the choice", async () => {
    render(<ThemeToggle label="toggle" />);
    const button = screen.getByRole("button", { name: "toggle" });
    await userEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem(THEME_KEY)).toBe("light");
    await userEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});

describe.each(["en", "fa"] as const)("Landing (%s)", (locale) => {
  const t = getDictionary(locale);

  it("renders one heading per scene with the localized hero as the only h1", () => {
    render(<Landing locale={locale} />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(t.scenes.hero.title);
    expect(screen.getByRole("heading", { name: t.scenes.collection.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: t.scenes.reserve.title })).toBeInTheDocument();
  });

  it("sets direction and language on the wrapper", () => {
    const { container } = render(<Landing locale={locale} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("lang", locale);
    expect(root).toHaveAttribute("dir", locale === "fa" ? "rtl" : "ltr");
  });

  it("has a section for every scene id and a dot per scene", () => {
    const { container } = render(<Landing locale={locale} />);
    for (const id of sceneIds) expect(container.querySelector(`section#${id}`)).not.toBeNull();
    const dots = within(screen.getByRole("navigation", { name: t.controls.scene })).getAllByRole("button");
    expect(dots).toHaveLength(sceneIds.length);
  });

  it("links the language switch to the other locale", () => {
    render(<Landing locale={locale} />);
    const link = screen.getByRole("link", { name: t.controls.language });
    expect(link).toHaveAttribute("href", locale === "fa" ? "/en" : "/fa");
  });
});

describe("Photo and video scenes", () => {
  const stages = (c: HTMLElement, ids: string[]) => ids.map((id) => c.querySelector(`section#${id} .stage`) as HTMLElement);

  it("keeps photo and video scenes dark and renders scrubbed videos for every scene", () => {
    const { container } = render(<Landing locale="en" />);
    for (const stage of stages(container, ["hero", "signature", "layers", "oven", "collection", "craft", "reserve"])) expect(stage).toHaveClass("scene-dark");
    for (const id of ["hero", "signature", "layers", "oven", "craft", "reserve"] as const) {
      const video = container.querySelector(`section#${id} .scrub-wrap video`) as HTMLVideoElement;
      expect(video).toHaveAttribute("src", sceneVideos[id]!.src);
      expect(video).toHaveAttribute("poster", sceneVideos[id]!.poster);
      expect(video.muted).toBe(true);
      expect(video).not.toHaveAttribute("autoplay");
      expect(video).not.toHaveAttribute("controls");
      expect(video).toHaveAttribute("aria-hidden", "true");
      expect(container.querySelector(`section#${id} .photo-wrap img`)).toBeNull();
    }
    // only the first scene preloads the whole file
    const preloads = ["hero", "signature", "layers", "oven", "collection", "craft", "reserve"].map((id) => container.querySelector(`section#${id} video`)!.getAttribute("preload"));
    expect(preloads).toEqual(["auto", "metadata", "metadata", "metadata", "metadata", "metadata", "metadata"]);
  });

  it("falls back to the photo, with flame, smoke and deterministic embers, when the hero has no video", () => {
    const saved = sceneVideos.hero;
    delete sceneVideos.hero;
    const { container, rerender } = render(<Landing locale="en" />);
    const wrap = container.querySelector("section#hero .photo-wrap");
    expect(wrap).toHaveClass("photo-blend", "photo-drift");
    expect(wrap).not.toHaveClass("photo-spin");
    expect(container.querySelectorAll("section#hero .tongue")).toHaveLength(5);
    expect(container.querySelectorAll("section#hero .smoke")).toHaveLength(5);
    const embers = Array.from(container.querySelectorAll("section#hero .ember"));
    expect(embers).toHaveLength(26);
    const lefts = embers.map((e) => (e as HTMLElement).style.left);
    rerender(<Landing locale="fa" />);
    expect(Array.from(container.querySelectorAll("section#hero .ember")).map((e) => (e as HTMLElement).style.left)).toEqual(lefts);
    sceneVideos.hero = saved;
  });

  it("falls back to the reserve photo when there is no reserve video", () => {
    const saved = sceneVideos.reserve;
    delete sceneVideos.reserve;
    const { container } = render(<Landing locale="en" />);
    expect(container.querySelector("section#reserve video")).toBeNull();
    expect(container.querySelector("section#reserve .photo-wrap img")).toHaveAttribute("alt");
    expect(container.querySelector("section#reserve .stage")).toHaveClass("scene-dark");
    sceneVideos.reserve = saved;
  });

  it("cross-fades the two craft photos when there is no craft video", () => {
    const saved = sceneVideos.craft;
    delete sceneVideos.craft;
    const { container } = render(<Landing locale="en" />);
    const wraps = container.querySelectorAll("section#craft .photo-wrap");
    expect(wraps).toHaveLength(2);
    expect(wraps[0]).toHaveClass("photo-fade-out");
    expect(wraps[1]).toHaveClass("photo-fade-in");
    for (const wrap of wraps) expect(wrap).toHaveClass("fit-ratio");
    sceneVideos.craft = saved;
  });

  it("renders the collection as a full-width scrubbed video band, with no text overlay and never mirrored", () => {
    const { container } = render(<Landing locale="fa" />);
    const band = container.querySelector("section#collection .collection-band");
    expect(band?.querySelector("video")).toHaveAttribute("src", sceneVideos.collection!.src);
    expect(band?.querySelector(".collection-inner")).toHaveClass("scrub-band");
    expect(container.querySelector("section#collection .scrub-wrap")).toBeNull(); // frame layout is the one mirrored in RTL
    expect(container.querySelector("section#collection .collection-label")).toBeNull();
    expect(container.querySelector("section#collection .stage")).toHaveClass("scene-dark");
  });

  it.each(["en", "fa"] as const)("labels the collection photo in %s without baked-in text when there is no video", (locale) => {
    const saved = sceneVideos.collection;
    delete sceneVideos.collection;
    const { container } = render(<Landing locale={locale} />);
    const t = getDictionary(locale).scenes.collection;
    const labels = Array.from(container.querySelectorAll("section#collection .collection-label")).map((n) => n.textContent);
    expect(labels).toEqual([t.items[0], t.items[2]]);
    expect(container.querySelector("section#collection .stage")).toHaveClass("scene-dark");
    sceneVideos.collection = saved;
  });

  it("falls back to SVG artwork for slots without a photo", () => {
    const saved = { ...sceneImages };
    const savedVideos = { ...sceneVideos };
    for (const key of Object.keys(sceneImages) as (keyof typeof sceneImages)[]) delete sceneImages[key];
    for (const key of Object.keys(sceneVideos) as (keyof typeof sceneVideos)[]) delete sceneVideos[key];
    const { container } = render(<Landing locale="en" />);
    expect(container.querySelector(".photo-wrap, .collection-band, video")).toBeNull();
    expect(container.querySelectorAll("svg.tilt, svg.tilt-low").length).toBe(3);
    expect(container.querySelector("section#hero .stage")).not.toHaveClass("scene-dark");
    Object.assign(sceneImages, saved);
    Object.assign(sceneVideos, savedVideos);
  });
});
