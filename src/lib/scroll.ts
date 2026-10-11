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
