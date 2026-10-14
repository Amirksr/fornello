import Link from "next/link";
import type { ComponentProps } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { otherLocale, type Locale } from "@/lib/i18n";
import { ThemeToggle } from "./ThemeToggle";

/** Plain anchor for same-page hashes, client-side Link for paths (hashes on other pages lead back to the landing page). */
function SiteLink({ href, children, ...rest }: ComponentProps<"a">) {
  return href?.startsWith("/") ? (
    <Link href={href} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

/** `path` is the current page below the locale ("" for the landing page, "/menu" for the menu). */
export function Header({ locale, t, path = "" }: { locale: Locale; t: Dictionary; path?: string }) {
  const home = path === "" ? "" : `/${locale}`;
  const links = [
    { href: `${home}#collection`, label: t.nav.menu },
    { href: `${home}#signature`, label: t.nav.pizza },
    { href: `${home}#craft`, label: t.nav.story },
    { href: `${home}#reserve`, label: t.nav.reserve },
  ];
  const other = otherLocale(locale);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/60 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:px-10">
        <SiteLink href={`${home}#hero`} className="flex items-center gap-2 font-display text-lg tracking-wide text-fg">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="text-ember" fill="currentColor">
            <path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10Z" />
          </svg>
          {t.brand}
        </SiteLink>
        <nav className="hidden items-center gap-8 text-xs tracking-wider text-fg/80 uppercase md:flex" aria-label="Primary">
          {links.map((link) => (
            <SiteLink key={link.href} href={link.href} className="transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              {link.label}
            </SiteLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={`/${other}${path}`}
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
