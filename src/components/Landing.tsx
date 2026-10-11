import { getDictionary } from "@/lib/dictionaries";
import { getDirection, type Locale } from "@/lib/i18n";
import { Header } from "./Header";

export function Landing({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <div dir={getDirection(locale)} lang={locale}>
      <Header locale={locale} t={t} />
    </div>
  );
}
