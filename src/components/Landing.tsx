import type { CSSProperties } from "react";
import { getDictionary } from "@/lib/dictionaries";
import { getDirection, type Locale } from "@/lib/i18n";
import { sceneImages, sceneVideos, type SceneVideo } from "@/lib/images";
import { OvenArt, PizzaArt } from "./Art";
import { CollectionPhoto } from "./CollectionPhoto";
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

const spread = (direction: 1 | -1): CSSProperties => ({ transform: `translateY(calc(${direction} * (var(--p) * 34% + 4%)))` });

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

        <Scene id="layers" glow="65% 50%" dark={!!(sceneVideos.layers || sceneImages.layers)}>
          {sceneVideos.layers ? scrub(sceneVideos.layers) : sceneImages.layers && <Photo src={sceneImages.layers} alt={scenes.layers.title} ratio={870 / 695} />}
          <div className={grid}>
            <SceneText eyebrow={scenes.layers.eyebrow} title={scenes.layers.title} body={scenes.layers.body}>
              <a href="#collection" className="btn-outline">{scenes.layers.cta}</a>
            </SceneText>
            {!sceneVideos.layers && !sceneImages.layers && (
              <div className={art}>
                <div className="absolute inset-x-[8%] top-[26%] aspect-square" style={spread(1)}><PizzaArt seed={31} layers={["crust"]} className="squash size-full" /></div>
                <div className="absolute inset-x-[8%] top-[26%] aspect-square"><PizzaArt seed={32} layers={["sauce"]} className="squash size-full" /></div>
                <div className="absolute inset-x-[8%] top-[26%] aspect-square" style={spread(-1)}><PizzaArt seed={33} layers={["cheese", "basil"]} className="squash size-full" /></div>
              </div>
            )}
          </div>
        </Scene>

        <Scene id="oven" glow="70% 55%" dark={!!(sceneVideos.oven || sceneImages.oven)}>
          {sceneVideos.oven ? scrub(sceneVideos.oven) : sceneImages.oven && <Photo src={sceneImages.oven} alt={scenes.oven.title} />}
          <div className={grid}>
            <SceneText title={scenes.oven.title} body={scenes.oven.body}>{toMenu}</SceneText>
            {!sceneVideos.oven && !sceneImages.oven && <div className={art}><OvenArt className="oven absolute inset-0 m-auto h-full w-full" /></div>}
          </div>
        </Scene>

        <Scene id="collection" glow="50% 70%" dark={!!(sceneVideos.collection || sceneImages.collection)}>
          {sceneVideos.collection
            ? scrub(sceneVideos.collection, false, "band")
            : sceneImages.collection && (
                <CollectionPhoto src={sceneImages.collection} alt={scenes.collection.title} labels={[scenes.collection.items[0], scenes.collection.items[2]]} />
              )}
          <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center px-5 pt-24 md:px-10">
            <h2 className="title text-center font-display text-4xl text-fg uppercase md:text-6xl">{scenes.collection.title}</h2>
            {!sceneVideos.collection && !sceneImages.collection && (
              <div className="relative mt-6 w-full flex-1">
                {[
                  { name: scenes.collection.items[0], seed: 41, cls: "start-0 top-[10%] w-[34%]", rot: -14 },
                  { name: scenes.collection.items[1], seed: 42, cls: "start-[28%] top-[18%] w-[44%]", rot: 0 },
                  { name: scenes.collection.items[2], seed: 43, cls: "end-0 top-[10%] w-[34%]", rot: 14 },
                ].map((item) => (
                  <figure key={item.seed} className={`absolute ${item.cls}`}>
                    <figcaption className="mb-1 text-center font-display text-lg text-fg md:text-2xl">{item.name}</figcaption>
                    <div className="float" style={{ ["--rot" as string]: `${item.rot}deg` }}>
                      <PizzaArt seed={item.seed} className="squash-soft w-full" />
                    </div>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </Scene>
      </main>
    </div>
  );
}
