import { mulberry32 } from "@/lib/random";

export type PizzaLayer = "crust" | "sauce" | "cheese" | "basil";
const ALL_LAYERS: PizzaLayer[] = ["crust", "sauce", "cheese", "basil"];

/**
 * Stylised top-down pizza. Placeholder artwork: drop real photos in /public/images
 * and swap the <PizzaArt /> usages in Landing.tsx for <Image /> when you have them.
 */
export function PizzaArt({ seed = 1, layers = ALL_LAYERS, className }: { seed?: number; layers?: PizzaLayer[]; className?: string }) {
  const rnd = mulberry32(seed);
  const at = (rMin: number, rMax: number) => {
    const angle = rnd() * Math.PI * 2;
    const r = rMin + rnd() * (rMax - rMin);
    return { x: 100 + Math.cos(angle) * r, y: 100 + Math.sin(angle) * r };
  };
  // Generate every random value up front so the artwork is stable whichever layers render.
  const chars = Array.from({ length: 26 }, () => ({ ...at(84, 94), r: 1.2 + rnd() * 2.6 }));
  const blobs = Array.from({ length: 8 }, () => ({ ...at(0, 58), rx: 10 + rnd() * 6, ry: 8 + rnd() * 5, rot: rnd() * 180 }));
  const leaves = Array.from({ length: 5 }, () => ({ ...at(8, 54), rot: rnd() * 180 }));
  const has = (layer: PizzaLayer) => layers.includes(layer);

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`crust-${seed}`} cx=".4" cy=".35" r=".85">
          <stop offset="0" stopColor="#f2bd6b" />
          <stop offset=".7" stopColor="#c47a2c" />
          <stop offset="1" stopColor="#8a4a1a" />
        </radialGradient>
        <radialGradient id={`sauce-${seed}`} cx=".45" cy=".4" r=".8">
          <stop offset="0" stopColor="#d9482f" />
          <stop offset="1" stopColor="#a3231a" />
        </radialGradient>
      </defs>
      {has("crust") && (
        <g>
          <circle cx="100" cy="100" r="97" fill={`url(#crust-${seed})`} />
          {chars.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="#2a1409" opacity=".7" />
          ))}
          <circle cx="100" cy="100" r="96" fill="none" stroke="#f8d894" strokeOpacity=".3" strokeWidth="2" />
        </g>
      )}
      {has("sauce") && <circle cx="100" cy="100" r={has("crust") ? 80 : 90} fill={`url(#sauce-${seed})`} />}
      {has("cheese") &&
        blobs.map((b, i) => (
          <ellipse key={i} cx={b.x} cy={b.y} rx={b.rx} ry={b.ry} transform={`rotate(${b.rot} ${b.x} ${b.y})`} fill="#f8eed6" stroke="#e3d0a2" strokeWidth="1" />
        ))}
      {has("basil") &&
        leaves.map((l, i) => (
          <g key={i} transform={`rotate(${l.rot} ${l.x} ${l.y})`}>
            <ellipse cx={l.x} cy={l.y} rx="10" ry="5" fill="#3f7d2c" />
            <line x1={l.x - 9} y1={l.y} x2={l.x + 9} y2={l.y} stroke="#2a5a1d" strokeWidth=".8" />
          </g>
        ))}
    </svg>
  );
}

export function OvenArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 320" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="oven-brick" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a4a30" />
          <stop offset="1" stopColor="#5a2a1a" />
        </linearGradient>
        <radialGradient id="oven-flame" cx=".5" cy=".85" r=".8">
          <stop offset="0" stopColor="#fff2b0" />
          <stop offset=".45" stopColor="#ff9d2e" />
          <stop offset="1" stopColor="#c4290f" />
        </radialGradient>
      </defs>
      <path d="M20 310 V170 C20 70 110 20 200 20 C290 20 380 70 380 170 V310 Z" fill="#3b3733" />
      <path d="M60 310 V180 C60 100 120 60 200 60 C280 60 340 100 340 180 V310 Z" fill="url(#oven-brick)" />
      <path d="M105 310 V200 C105 140 145 110 200 110 C255 110 295 140 295 200 V310 Z" fill="#150906" />
      <path className="flame" d="M200 300 C140 260 160 205 188 150 C196 185 218 188 212 130 C262 190 268 262 200 300Z" fill="url(#oven-flame)" />
      <ellipse cx="200" cy="288" rx="70" ry="14" fill="#b8742c" />
      <ellipse cx="200" cy="284" rx="62" ry="10" fill="#d9482f" />
    </svg>
  );
}

export type Ingredient = { kind: "tomato" | "olive" | "mozzarella" | "basil"; left: number; top: number; size: number; k: number };

const INGREDIENT_STYLE: Record<Ingredient["kind"], string> = {
  tomato: "rounded-full bg-[#d8402a]",
  olive: "rounded-full bg-[#2b1d2a]",
  mozzarella: "rounded-full bg-[#f6ecd5]",
  basil: "rounded-[100%_0] bg-[#4a8a32]",
};

/** Ingredients drop onto the dough as the scene's --p progresses (see .drop in globals.css). */
export function IngredientsArt({ items }: { items: Ingredient[] }) {
  return (
    <>
      {items.map((item, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`drop absolute ${INGREDIENT_STYLE[item.kind]}`}
          style={{ left: `${item.left}%`, top: `${item.top}%`, width: `${item.size}%`, aspectRatio: "1", ["--k" as string]: item.k }}
        />
      ))}
    </>
  );
}
