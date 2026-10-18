# Deployment (Vercel, static Astro)
- Repo: https://github.com/HishamRashwan/TGPS-Live-Coverage (branch `main`).
- Vercel project `tgps-live-coverage` (Hobby team), Astro preset: build `npm run build`, output `dist`, no env vars.
- Production: every push to `main` deploys automatically. Preview: push any other branch / open a PR and use its preview URL.
- Custom domain (planned): Vercel project, Settings, Domains, add `live.globalproptechsummit.com`, then add the CNAME shown there at the current DNS provider. No need to move the domain's DNS; the main Wix site is untouched.
- Before pushing: `npm run check && npm run build && npm test`.
- Live data: `index.astro` is SSR (`prerender = false`) via `@astrojs/vercel`. Env var `WIX_BASE_URL` optional. See docs/content-model.md.
