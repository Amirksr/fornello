import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { otherLocale, type Locale } from "@/lib/i18n";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const links = [
    { href: "#collection", label: t.nav.menu },
    { href: "#signature", label: t.nav.pizza },
    { href: "#craft", label: t.nav.story },
    { href: "#reserve", label: t.nav.reserve },
  ];
  const other = otherLocale(locale);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/60 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#hero" className="flex items-center gap-2 font-display text-lg tracking-wide text-fg">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="text-ember" fill="currentColor">
            <path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10Z" />
          </svg>
          {t.brand}
        </a>
        <nav className="hidden items-center gap-8 text-xs tracking-wider text-fg/80 uppercase md:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={`/${other}`}
            hrefLang={other}
            lang={other}
            className="rounded-full border border-line px-3 py-1.5 text-xs text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t.controls.language}
          </Link>
          <ThemeToggle label={t.controls.theme} />
        </div>
      </div>
    </header>
  );
}
