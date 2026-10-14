import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { formatPrice, type MenuItem } from "@/lib/menu";

/** One dish: name, dotted leader, price, description and tags. */
export function MenuEntry({ item, locale, t }: { item: MenuItem; locale: Locale; t: Dictionary }) {
  return (
    <li>
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-2xl font-semibold text-fg md:text-[1.7rem]">{item.name[locale]}</h3>
        <span aria-hidden="true" className="menu-leader" />
        <span className="font-bold text-accent">
          {formatPrice(item.price, locale)}
          <span className="sr-only"> {t.menu.currency}</span>
        </span>
      </div>
      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{item.description[locale]}</p>
      {item.tags && item.tags.length > 0 && (
        <ul className="mt-2.5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li key={tag} className="menu-tag text-fg">
              {t.menu.tags[tag]}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
