"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion, useActiveScene } from "@/hooks";
import { menuCategoryIds, type MenuCategoryId } from "@/lib/menu";

/** Sticky category bar: plain anchors (work without JavaScript) that also highlight the category being read. */
export function MenuNav({ label, categories }: { label: string; categories: Record<MenuCategoryId, string> }) {
  const active = useActiveScene(menuCategoryIds);
  const links = useRef<Partial<Record<MenuCategoryId, HTMLAnchorElement | null>>>({});

  // Keep the active tab visible when the bar scrolls sideways (small screens).
  useEffect(() => {
    const id = menuCategoryIds.find((candidate) => candidate === active);
    if (id) links.current[id]?.scrollIntoView?.({ inline: "center", block: "nearest", behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav aria-label={label} className="sticky top-14 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <ul className="mx-auto flex max-w-5xl gap-8 overflow-x-auto px-5 md:justify-center md:gap-12 md:px-10">
        {menuCategoryIds.map((id) => (
          <li key={id}>
            <a
              ref={(el) => {
                links.current[id] = el;
              }}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className="menu-tab"
            >
              {categories[id]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
