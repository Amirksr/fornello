import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource-variable/vazirmatn/index.css";
import "../globals.css";
import { getDictionary } from "@/lib/dictionaries";
import { getDirection, isLocale, locales } from "@/lib/i18n";
import { themeInitScript } from "@/lib/theme";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: `${t.brand} — ${t.tagline}`, description: t.scenes.hero.body };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={getDirection(locale)} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
