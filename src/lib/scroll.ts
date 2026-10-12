export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Progress (0..1) through a tall scene whose inner stage is pinned (sticky).
 * `top` is the scene's bounding-rect top, `height` its height, `viewport` the window height.
 */
export function sceneProgress(top: number, height: number, viewport: number): number {
  const travel = height - viewport;
  if (travel <= 0) return 0;
  return clamp(-top / travel);
}

/**
 * Maps scene progress to a video timestamp. The video plays across progress [start, end] and holds its
 * last frame afterwards; it stops one frame short of the end because some browsers show black at exactly `duration`.
 */
export function videoTime(progress: number, duration: number, start = 0, end = 0.8, fps = 24): number {
  if (!Number.isFinite(duration) || duration <= 0 || end <= start) return 0;
  const t = clamp((progress - start) / (end - start));
  return Math.min(t * duration, Math.max(0, duration - 1 / fps));
}
