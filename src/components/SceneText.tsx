import type { ReactNode } from "react";

type Props = { title: string; body?: string; eyebrow?: string; level?: 1 | 2; children?: ReactNode };

export function SceneText({ title, body, eyebrow, level = 2, children }: Props) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className="copy max-w-[34rem]">
      {eyebrow && <p className="mb-3 text-sm text-muted">{eyebrow}</p>}
      <Heading className="title font-display text-5xl leading-[1.05] text-fg uppercase md:text-7xl">{title}</Heading>
      {body && <p className="mt-6 max-w-[28rem] text-base leading-relaxed text-muted">{body}</p>}
      {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
    </div>
  );
}
