import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

/** Link targets in the dictionary are written without the locale ("#craft", "/menu#desserts"). */
export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const { footer } = t;
  const to = (href: string) => `/${locale}${href}`;
  return (
    <footer className="relative z-10 bg-surface px-5 pt-16 pb-24 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="font-display text-3xl text-fg uppercase">{t.brand}</p>
          <p className="mt-1 text-xs text-accent">{t.tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{footer.about}</p>
        </div>
        {footer.columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-bold text-fg">{column.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={to(link.href)} className="transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted">
        <p>
          © {new Date().getFullYear()} {t.brand}. {footer.rights}
        </p>
        <ul className="flex gap-6">
          {footer.social.map((name) => (
            <li key={name}>
              <Link href={to("#hero")} className="transition-colors hover:text-accent">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
