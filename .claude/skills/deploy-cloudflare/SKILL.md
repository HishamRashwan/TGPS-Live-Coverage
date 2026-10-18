---
name: deploy-cloudflare
description: Use when deploying or previewing the site on Cloudflare Workers.
---

Follow docs/deployment.md. Always run npm run check and npm run build first. Use deploy:preview for review. Ask the user before npm run deploy (production) or any domain change. Never commit tokens. wrangler login is interactive and belongs to the user.
