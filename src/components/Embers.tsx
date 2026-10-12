import type { CSSProperties } from "react";
import { mulberry32 } from "@/lib/random";

const COLORS = ["#ffd27a", "#ffb45e", "#ff9a3c", "#ff6a1a"];

/** Sparks that rise, sway and fade, in varied sizes and warmth. Seeded: identical on server and client. */
export function Embers({ count = 26, seed = 7 }: { count?: number; seed?: number }) {
  const rnd = mulberry32(seed);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {Array.from({ length: count }, (_, i) => {
        const big = rnd() > 0.75;
        const size = big ? 4 + rnd() * 3 : 1.5 + rnd() * 2.5;
        const style = {
          left: `${6 + rnd() * 88}%`,
          bottom: `${2 + rnd() * 30}%`,
          width: `${size}px`,
          height: `${size}px`,
          background: COLORS[Math.floor(rnd() * COLORS.length)],
          ["--s" as string]: `${size}px`,
          ["--blur" as string]: big ? "1.2px" : "0px",
          ["--dur" as string]: `${7 + rnd() * 8}s`,
          ["--delay" as string]: `-${(rnd() * 14).toFixed(2)}s`,
          ["--dx" as string]: `${Math.round(-20 + rnd() * 90)}px`,
          ["--rise" as string]: `${30 + rnd() * 30}svh`,
          ["--sway" as string]: `${6 + Math.round(rnd() * 16)}px`,
        } as CSSProperties;
        return <span key={i} className="ember" style={style} />;
      })}
    </div>
  );
}

/** Soft smoke blobs drifting up above the pizza. */
export function Smoke({ count = 5, seed = 3 }: { count?: number; seed?: number }) {
  const rnd = mulberry32(seed);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="smoke"
          style={
            {
              left: `${15 + rnd() * 55}%`,
              bottom: `${48 + rnd() * 10}%`,
              width: `${22 + rnd() * 14}%`,
              ["--dur" as string]: `${14 + rnd() * 8}s`,
              ["--delay" as string]: `-${(rnd() * 18).toFixed(2)}s`,
              ["--dx" as string]: `${Math.round(-30 + rnd() * 80)}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
