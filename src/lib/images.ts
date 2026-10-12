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
