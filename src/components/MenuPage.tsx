import { getDictionary } from "@/lib/dictionaries";
import { getDirection, type Locale } from "@/lib/i18n";
import { menu, menuCategoryIds } from "@/lib/menu";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MenuEntry } from "./MenuEntry";
import { MenuNav } from "./MenuNav";

export function MenuPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <div dir={getDirection(locale)} lang={locale}>
      <Header locale={locale} t={t} path="/menu" />
      <main className="menu-glow pt-14">
        <header className="mx-auto max-w-5xl px-5 pt-16 pb-10 text-center md:px-10 md:pt-24">
          <h1 className="title font-display text-5xl text-fg uppercase md:text-7xl">{t.menu.title}</h1>
          <p className="mt-4 text-sm text-muted">{t.menu.note}</p>
        </header>
        <MenuNav label={t.menu.navLabel} categories={t.menu.categories} />
        <div className="mx-auto max-w-5xl px-5 pb-24 md:px-10">
          {menuCategoryIds.map((id) => (
            <section key={id} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 pt-14 md:pt-20">
              <h2 id={`${id}-title`} className="title mb-8 font-display text-3xl text-fg uppercase md:text-4xl">
                {t.menu.categories[id]}
              </h2>
              <ul className="grid gap-x-16 gap-y-9 md:grid-cols-2">
                {menu[id].map((item) => (
                  <MenuEntry key={item.id} item={item} locale={locale} t={t} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer locale={locale} t={t} />
    </div>
  );
}
