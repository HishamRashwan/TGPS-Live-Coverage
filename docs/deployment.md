# Deployment (Cloudflare Workers, static assets)
1. One-time: `npx wrangler login` (interactive, user does this).
2. Preview: `npm run deploy:preview`, then share the version URL.
3. Production: `npm run deploy` gives `tgps-live.<account>.workers.dev`.
4. Custom domain: Cloudflare dashboard, Workers, tgps-live, Domains, add `live.globalproptechsummit.com`. If the main domain's DNS is not on Cloudflare, add a CNAME for `live` at the DNS provider.
5. Add a "Live" link in the Wix nav pointing to the subdomain.
Before deploy: `npm run check && npm run build && npm test`.
SSR/APIs later: `npx astro add cloudflare`.
