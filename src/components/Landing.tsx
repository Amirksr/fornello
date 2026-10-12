import { getDictionary } from "@/lib/dictionaries";
import { getDirection, type Locale } from "@/lib/i18n";
import { sceneImages, sceneVideos, type SceneVideo } from "@/lib/images";
import { PizzaArt } from "./Art";
import { Embers, Smoke } from "./Embers";
import { Flame } from "./Flame";
import { Header } from "./Header";
import { Photo } from "./Photo";
import { Scene } from "./Scene";
import { SceneText } from "./SceneText";
import { ScrubVideo } from "./ScrubVideo";

const grid = "relative mx-auto grid h-full max-w-7xl content-center items-center gap-4 px-5 pt-14 pb-10 max-md:content-start max-md:pt-24 md:grid-cols-[1fr_1.15fr] md:px-10";

const art = "art relative mx-auto aspect-square w-full max-w-[42svh] md:max-w-none";

const scrub = (video: SceneVideo, eager = false, layout: "frame" | "band" = "frame") => (
  <ScrubVideo src={video.src} poster={video.poster} ox={video.ox} oxMobile={video.oxMobile} eager={eager} layout={layout} ratio={video.ratio} />
);

export function Landing({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { scenes } = t;
  const toMenu = <a href="#collection" className="btn-outline">{scenes.hero.cta}</a>;

  return (
    <div dir={getDirection(locale)} lang={locale}>
      <Header locale={locale} t={t} />
      <main>
        <Scene id="hero" glow="82% 22%" dark={!!(sceneVideos.hero || sceneImages.hero)}>
          {sceneVideos.hero
            ? scrub(sceneVideos.hero, true)
            : sceneImages.hero && (
                <>
                  <Flame />
                  <Photo src={sceneImages.hero} alt={scenes.hero.title} priority blend drift ratio={1} zoom={1.02}>
                    <Smoke />
                    <Embers />
                  </Photo>
                </>
              )}
          <div className={grid}>
            <SceneText level={1} title={scenes.hero.title} body={scenes.hero.body}>{toMenu}</SceneText>
            {!sceneVideos.hero && !sceneImages.hero && <div className={art}><PizzaArt seed={11} className="tilt absolute inset-0 size-full" /></div>}
          </div>
        </Scene>

        <Scene id="signature" glow="70% 40%" dark={!!(sceneVideos.signature || sceneImages.signature)}>
          {sceneVideos.signature ? scrub(sceneVideos.signature) : sceneImages.signature && <Photo src={sceneImages.signature} alt={scenes.signature.title} />}
          <div className={grid}>
            <SceneText title={scenes.signature.title} body={scenes.signature.body}>{toMenu}</SceneText>
            {!sceneVideos.signature && !sceneImages.signature && <div className={art}><PizzaArt seed={23} className="tilt absolute inset-0 size-full" /></div>}
          </div>
        </Scene>
      </main>
    </div>
  );
}
