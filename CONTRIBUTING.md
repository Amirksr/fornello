# Contributing

## How the history is organised

The page is built **top to bottom**, one finished piece at a time:

1. Foundation: project setup, i18n, theme, design tokens
2. Header
3. Scene engine (scroll progress, `Scene`, `SceneText`)
4. Sections in page order: hero, signature, layers, oven, collection, craft, reserve
5. Page chrome (scene dots, floating reserve button) and footer
6. Tests that span the whole page, then docs

Rules:

- **One component or section per commit.** Finish it completely (copy in both languages, media, styles, tests)
  before starting the next one. No scattered "fix" commits for work that belongs to an earlier section:
  amend or fixup that section instead (`git commit --fixup <sha>`, then `git rebase -i --autosquash`).
- **Every commit must pass** `npm run typecheck` and `npm test`. Run `npm run build` when routes, layout or styles change.
- **Conventional Commits**: `type(scope): summary` in the imperative, at most 72 characters, with a short body that
  explains *why*. Types: `feat`, `fix`, `style`, `refactor`, `test`, `docs`, `chore`.
  Scopes: `i18n`, `theme`, `header`, `app`, `scenes`, `hero`, `signature`, `layers`, `oven`, `collection`, `craft`,
  `reserve`, `page`, `footer`, `landing`, `menu`, `nav`.

## Adding or changing a section

1. Copy for both languages in `src/lib/dictionaries.ts` (the types keep English and Persian in sync).
2. The scene block in `src/components/Landing.tsx`: video, then photo, then SVG artwork as fallbacks.
3. Media: files in `public/videos` and `public/images`, registered in `src/lib/images.ts`.
4. Styles only if something new is needed (`src/app/globals.css`).
5. Tests next to the logic they cover (`src/__tests__`).

## Menu items

Dishes and prices live in `src/lib/menu.ts` (Toman, both languages). Keep an item's `id` stable: other parts of the
site connect to it. A menu change is its own `feat(menu)` or `fix(menu)` commit; page copy is in the dictionary.

## Scroll videos

Trim leading frames that contain text or UI, encode for scrubbing (frequent keyframes, no B-frames, no audio) and
save a first-frame poster. The exact command is in the README.

## Checks before committing

```bash
npm run typecheck && npm test
npm run build   # when layout, routes or CSS changed
```
