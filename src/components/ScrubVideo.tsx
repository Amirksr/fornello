"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/hooks";
import { sceneProgress, videoTime } from "@/lib/scroll";

type Props = {
  src: string;
  poster?: string;
  /** Horizontal crop focus (%) on desktop / mobile. */
  ox?: number;
  oxMobile?: number;
  /** Scene progress range over which the video plays. */
  start?: number;
  end?: number;
  /** Load the whole file right away (use for the first scene); others load when the scene is near. */
  eager?: boolean;
  /** "frame": anchored to the end side with a fade towards the text (default). "band": centred, fading into the stage on all sides. */
  layout?: "frame" | "band";
  /** width / height of the file (band layout only). */
  ratio?: number;
};

/** Plays a muted video forward as the surrounding scene scrolls (scroll-scrubbing), with light easing. */
export function ScrubVideo({ src, poster, ox = 50, oxMobile = ox, start = 0, end = 0.8, eager = false, layout = "frame", ratio }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const section = video?.closest("section");
    if (!video || !section) return;
    const reduced = prefersReducedMotion();
    let frame = 0;
    let shown = 0;
    let started = false;

    const apply = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      if (video.preload !== "auto" && rect.top < window.innerHeight * 2) video.preload = "auto";
      if (!(video.duration > 0)) return; // metadata not loaded yet; "loadedmetadata" re-runs this
      // Reduced motion: no scrubbing, show a representative still from the middle of the clip.
      const target = reduced ? video.duration / 2 : videoTime(sceneProgress(rect.top, rect.height, window.innerHeight), video.duration, start, end);
      shown = started && !reduced ? shown + (target - shown) * 0.25 : target;
      started = true;
      if (Math.abs(target - shown) < 0.004) shown = target;
      // Never queue seeks on top of each other: wait for "seeked", which re-runs this.
      if (!video.seeking && Math.abs(video.currentTime - shown) > 0.001) video.currentTime = shown;
      if (shown !== target) schedule();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    video.addEventListener("loadedmetadata", schedule);
    video.addEventListener("seeked", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      video.removeEventListener("loadedmetadata", schedule);
      video.removeEventListener("seeked", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [start, end]);

  const video = (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      preload={eager ? "auto" : "metadata"}
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      style={{ ["--ox" as string]: `${ox}%`, ["--oxm" as string]: `${oxMobile}%` } as CSSProperties}
    />
  );

  if (layout === "band") {
    return (
      <div className="collection-band">
        <div className="collection-inner scrub-band" style={ratio ? ({ ["--band-ar" as string]: ratio } as CSSProperties) : undefined}>
          {video}
        </div>
      </div>
    );
  }
  return <div className="photo-wrap scrub-wrap">{video}</div>;
}
