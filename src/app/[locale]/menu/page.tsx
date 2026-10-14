import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuPage } from "@/components/MenuPage";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: `${t.menu.title} — ${t.brand}`, description: t.menu.description };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <MenuPage locale={locale} />;
}
