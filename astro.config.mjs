// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output; deployed on Vercel (zero-config Astro preset).
// ponytail: static only. Add @astrojs/cloudflare adapter when an SSR route/API is needed.
export default defineConfig({
  site: 'https://live.globalproptechsummit.com',
  vite: { plugins: [tailwindcss()] },
});
