"use client";
import { useRef, type ReactNode } from "react";
import { useSceneProgress } from "@/hooks";

/** A tall scroll area with a pinned full-screen stage; children react to the --p variable. */
export function Scene({ id, glow = "75% 30%", dark = false, children }: { id: string; glow?: string; dark?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useSceneProgress(ref);
  return (
    <section ref={ref} id={id} className="scene">
      <div className={dark ? "stage scene-dark" : "stage"} style={{ ["--glow" as string]: glow }}>
        {children}
      </div>
    </section>
  );
}
