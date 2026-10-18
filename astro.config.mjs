// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// Static by default; pages that read live Wix data opt out with `export const prerender = false`.
export default defineConfig({
  site: 'https://live.globalproptechsummit.com',
  adapter: vercel(),
  vite: { plugins: [tailwindcss()] },
});
