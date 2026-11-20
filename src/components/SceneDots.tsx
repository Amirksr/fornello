"use client";
import { useActiveScene, prefersReducedMotion } from "@/hooks";
import { sceneIds } from "@/lib/dictionaries";

export function SceneDots({ label }: { label: string }) {
  const active = useActiveScene(sceneIds);

  return (
    <nav
      aria-label={label}
      className="fixed inset-x-0 bottom-5 z-40 flex justify-center gap-2.5"
    >
      {sceneIds.map((id, index) => (
        <button
          key={id}
          type="button"
          aria-label={`${label} ${index + 1}`}
          aria-current={active === id ? "true" : undefined}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({
              behavior: prefersReducedMotion() ? "auto" : "smooth",
            })
          }
          className="group flex h-6 w-6 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span
            className={`h-2 rounded-full transition-all duration-300 ${
              active === id
                ? "w-6 bg-accent"
                : "w-2 bg-fg/40 group-hover:bg-fg/70"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
