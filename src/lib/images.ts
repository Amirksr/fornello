/**
 * Optional real photography. Files live in /public/images; set a path here to use it,
 * or leave a slot undefined to fall back to the built-in SVG artwork.
 * Photo scenes stay dark in both themes (cinematic look).
 * `craft` fades into `craftEnd` as the craft scene scrolls (dough ball → ingredients landing); used when there is no craft video.
 */
export type ImageSlot = "hero" | "signature" | "layers" | "oven" | "collection" | "craft" | "craftEnd" | "reserve";
export const sceneImages: Partial<Record<ImageSlot, string>> = {
  hero: "/images/hero-fire.jpg",
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
};
