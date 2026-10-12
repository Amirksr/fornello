# Fornello — cinematic scroll site

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Jest + Testing Library

## Run
```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /fa or /en by Accept-Language
npm test           # unit + component tests
npm run build && npm start
```

## What's inside
- **Cinematic scroll**: each section is a tall scroll area with a pinned stage. Scroll progress is written to a `--p` CSS variable (no React re-renders) and `src/app/globals.css` animates from it.
- **Bilingual**: `/fa` (RTL) and `/en` (LTR). Copy lives in `src/lib/dictionaries.ts`; a shared type and a test keep both languages in sync.
- **Dark / light**: header toggle, saved in localStorage, applied before first paint. Dark is the default.
- **Accessibility**: visible focus styles; `prefers-reduced-motion` disables the pinned scroll effects.

## Videos (scroll-scrubbed) and photos
All seven scenes (hero, signature, layers, oven, collection, craft, reserve) play a muted video **as you scroll**: scrolling forward plays the clip forward, scrolling back
rewinds it (the video stays paused; the scroll position sets the frame). Files are in `public/videos/` and configured in
`src/lib/images.ts` (`sceneVideos`). Remove a slot there to fall back to the photo (or the built-in SVG artwork).
- `ox` / `oxMobile` set which part of the 16:9 frame stays visible on desktop / mobile (horizontal focus, 0-100%).
- In Persian (RTL) the footage is mirrored so the subject stays on the outer side, opposite the text (not the collection clip: it has text printed in it).
- The collection clip is a centred full-width band (`layout="band"`) and has the pizza names printed inside the video (English only, so they are not translated).
- The clip plays across the first 80% of the scene's scroll (`end` in `ScrubVideo`); the last frame holds while the text fades out.
- Reduced-motion users get a still frame instead of scrubbing.

Encode new clips for smooth scrubbing (frequent keyframes, no B-frames, no audio) and trim any leading frames that contain text:
```bash
ffmpeg -i in.mp4 -an -vf "select='gte(n,2)',setpts=N/(24*TB)" -c:v libx264 -preset slow -crf 24 -g 3 -bf 0 -pix_fmt yuv420p -movflags +faststart -r 24 out.mp4
```
(`gte(n,2)` drops the first 2 frames; if the clip starts with a text fade-out, measure when it is gone and trim past it, e.g. `gte(n,5)`.) Also save a first-frame poster (`-frames:v 1 poster.jpg`).

Photos in `public/images/` are the fallback for each scene when its video is removed; the hero photo (`hero-fire.jpg`) is the fallback
when the hero video is removed (with animated flame, smoke and sparks). Photo scenes stay dark in both themes.
- Without a craft video, `craft` (photo) cross-fades into `craftEnd` as you scroll (dough ball -> ingredients landing).
- Collection pizza names are real text over the image (translated in `dictionaries.ts`), not part of the photo.

The current photos are low-resolution video screenshots (cleaned of baked-in labels and UI), for development only.
Footer social links and the reserve CTA are placeholders; point them at your real URLs.
