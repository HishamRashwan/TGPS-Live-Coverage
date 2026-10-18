# TGPS Live — Agent Instructions

Live Coverage site for the **Global PropTech Summit 2026** (25–26 Oct 2026, Riyadh, theme "Scaling Intelligence").
Runs on its own subdomain (`live.globalproptechsummit.com`); the main site is Wix and links here. **English only, LTR.**
Must look and feel like https://globalproptechsummit.com. No live-feed/admin: content is schedule + stream + creative components.

## Stack
Astro 7 (static) · TypeScript strict · Tailwind v4 (`src/styles/global.css` `@theme`) · GSAP + ScrollTrigger · Lenis (optional) · Playwright · Vercel (static).
React only for stateful islands (not installed yet; `npx astro add react` when needed). No Three.js unless a design needs it.

## Commands
- `npm run dev` — dev server (:4321). Prefer `astro dev --background`; manage with `astro dev stop|status|logs`.
- `npm run build` / `npm run check` — must pass before any commit.
- `npm test` — Playwright desktop + mobile, saves screenshots to `tests/screenshots/`.
- Deploy: push to `main` on GitHub (HishamRashwan/TGPS-Live-Coverage) → Vercel auto-deploys production; other branches get preview URLs. Ask the user before pushing to `main`.

## Layout
`src/layouts` Base · `src/components` reusable UI · `src/sections` page sections · `src/animations` GSAP code ONLY · `src/data` schedule/speakers as typed TS · `public/brand|speakers` assets · `docs/` rules · `references/` screenshots of the live site · `tests/`.

## Rules
1. Read `docs/design-system.md` and `docs/motion.md` before UI work. Never invent colors, fonts, radii; use tokens.
2. Reuse components before creating new ones. One section/feature per change; don't rewrite unrelated files.
3. GSAP lives in `src/animations/`, never inline in components. Create inside `gsap.context()`, revert on cleanup, init on `astro:page-load`.
4. Respect `prefers-reduced-motion`. Design mobile separately; test on the Pixel 7 project.
5. Semantic HTML, alt text, visible focus, contrast AA on dark glass.
6. Content (sessions, speakers, stream URL) goes in `src/data/`, not hard-coded in markup.
7. Assets come from the live Wix site; save into `public/`, note the source in `docs/assets.md`. The hero video is 62 MB: do not self-host it as is.
8. Keep dependencies minimal. Report what changed and what is unverified.

## Skills (`.claude/skills/`)
`match-live-site` · `add-section` · `add-animation` · `visual-qa` · `deploy-vercel`

## Environment notes (Windows)
`curl` needs `--ssl-no-revoke`. Run `npx playwright install chromium` once before `npm test`.
