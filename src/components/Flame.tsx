import type { CSSProperties } from "react";

const tongues = [
  { w: 9, h: 34, x: 0, d: 1.3, delay: -0.2, skew: 5 },
  { w: 12, h: 42, x: 7, d: 1.8, delay: -0.9, skew: -4 },
  { w: 8, h: 30, x: 15, d: 1.1, delay: -0.5, skew: 6 },
  { w: 10, h: 36, x: 22, d: 2.1, delay: -1.4, skew: -5 },
  { w: 7, h: 26, x: 29, d: 1.5, delay: -0.7, skew: 4 },
];

/** Animated oven fire behind the hero pizza (CSS only). Used when the hero has a photo but no video. */
export function Flame() {
  return (
    <div aria-hidden="true" className="flame-wrap">
      <span className="flame-glow" />
      {tongues.map((t, i) => (
        <span
          key={i}
          className="tongue"
          style={{ ["--w" as string]: `${t.w}vmin`, ["--h" as string]: `${t.h}vmin`, ["--x" as string]: `${t.x}vmin`, ["--d" as string]: `${t.d}s`, ["--delay" as string]: `${t.delay}s`, ["--skew" as string]: `${t.skew}deg` } as CSSProperties}
        />
      ))}
    </div>
  );
}
