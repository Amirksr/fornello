import Image from "next/image";
import type React from "react";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  fade?: "out" | "in";
  ratio?: number;
  /** Photo on a near-black background: blend it into the stage so no rectangle shows. */
  blend?: boolean;
  /** Gentle parallax while scrolling plus a slow idle float (no rotation). */
  drift?: boolean;
  /** Starting zoom (default 1.1). */
  zoom?: number;
  /** Extra layers drawn inside the photo frame (e.g. embers), masked and faded with it. */
  children?: React.ReactNode;
};

/**
 * Full-bleed scene photo, anchored to the end side and faded into the stage towards the text.
 * `ratio` (width / height of the file) sizes the frame to the photo on desktop, so near-square photos show whole
 * at full stage height and the edge fade lands on the real photo edge.
 * `fade` cross-fades two stacked photos over the scene's scroll progress ("out" = first, "in" = second).
 */
export function Photo({ src, alt, priority = false, fade, ratio, blend, drift, zoom, children }: Props) {
  const style: Record<string, number> = {};
  if (ratio) style["--ar"] = ratio;
  if (zoom) style["--zoom"] = zoom;
  return (
    <div
      className={["photo-wrap", fade && `photo-fade-${fade}`, ratio && "fit-ratio", blend && "photo-blend", drift && "photo-drift"].filter(Boolean).join(" ")}
      style={Object.keys(style).length ? (style as React.CSSProperties) : undefined}
    >
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 768px) 75vw, 100vw" className="object-cover" />
      {children}
    </div>
  );
}
