/**
 * Optional real photography. Files live in /public/images; set a path here to use it,
 * or leave a slot undefined to fall back to the built-in SVG artwork.
 * Photo scenes stay dark in both themes (cinematic look).
 * `craft` fades into `craftEnd` as the craft scene scrolls (dough ball → ingredients landing); used when there is no craft video.
 */
export type ImageSlot = "hero" | "signature" | "layers" | "oven" | "collection" | "craft" | "craftEnd" | "reserve";
export const sceneImages: Partial<Record<ImageSlot, string>> = {
  hero: "/images/hero-fire.jpg",
  signature: "/images/signature.jpg",
  layers: "/images/layers.jpg",
  oven: "/images/oven.jpg",
  collection: "/images/collection.jpg",
  craft: "/images/craft1.jpg",
  craftEnd: "/images/craft2.jpg",
};

/**
 * Optional scroll-scrubbed videos (muted, no audio). Scrolling through the scene plays the video forward.
 * Files live in /public/videos. `ox` / `oxMobile` are the horizontal crop focus (0-100%) on desktop / mobile:
 * it decides which part of the 16:9 frame stays visible. Remove a slot to fall back to the photo (or SVG).
 */
export type VideoSlot = "hero" | "signature" | "layers" | "oven" | "collection" | "craft" | "reserve";
export type SceneVideo = { src: string; poster: string; ox?: number; oxMobile?: number; /** width / height of the file; used by the full-width "band" layout (collection) */ ratio?: number };
export const sceneVideos: Partial<Record<VideoSlot, SceneVideo>> = {
  hero: { src: "/videos/hiro.mp4", poster: "/videos/hiro-poster.jpg", ox: 46, oxMobile: 48 },
  signature: { src: "/videos/signature.mp4", poster: "/videos/signature-poster.jpg", ox: 46, oxMobile: 48 },
  layers: { src: "/videos/layers.mp4", poster: "/videos/layers-poster.jpg", ox: 80, oxMobile: 70 },
  oven: { src: "/videos/oven.mp4", poster: "/videos/oven-poster.jpg", ox: 70, oxMobile: 62 },
  // Pizza names are printed inside this clip (English only), so no text overlay is added on top of it.
  collection: { src: "/videos/collection.mp4", poster: "/videos/collection-poster.jpg", ratio: 1280 / 720 },
  craft: { src: "/videos/craft.mp4", poster: "/videos/craft-poster.jpg", ox: 50, oxMobile: 45 },
};
