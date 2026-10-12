import { getDictionary } from "@/lib/dictionaries";
import { getDirection, type Locale } from "@/lib/i18n";
import { sceneImages } from "@/lib/images";
import { PizzaArt } from "./Art";
import { Header } from "./Header";
import { Photo } from "./Photo";
import { Scene } from "./Scene";
import { SceneText } from "./SceneText";

const grid = "relative mx-auto grid h-full max-w-7xl content-center items-center gap-4 px-5 pt-14 pb-10 max-md:content-start max-md:pt-24 md:grid-cols-[1fr_1.15fr] md:px-10";

const art = "art relative mx-auto aspect-square w-full max-w-[42svh] md:max-w-none";

export function Landing({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { scenes } = t;
  const toMenu = <a href="#collection" className="btn-outline">{scenes.hero.cta}</a>;

  return (
    <div dir={getDirection(locale)} lang={locale}>
      <Header locale={locale} t={t} />
      <main>
        <Scene id="hero" glow="82% 22%" dark={!!sceneImages.hero}>
          {sceneImages.hero && <Photo src={sceneImages.hero} alt={scenes.hero.title} priority ratio={1} zoom={1.02} />}
          <div className={grid}>
            <SceneText level={1} title={scenes.hero.title} body={scenes.hero.body}>{toMenu}</SceneText>
            {!sceneImages.hero && <div className={art}><PizzaArt seed={11} className="tilt absolute inset-0 size-full" /></div>}
          </div>
        </Scene>
      </main>
    </div>
  );
}
