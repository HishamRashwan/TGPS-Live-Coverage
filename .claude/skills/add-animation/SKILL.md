---
name: add-animation
description: Use when adding GSAP, ScrollTrigger or Lenis animation to a section.
---

1. Read docs/motion.md.
2. Create src/animations/<name>.ts exporting init(root): () => void, using gsap.context and gsap.matchMedia (reduced motion, desktop, mobile).
3. Register plugins only in src/animations/gsap.ts.
4. Start it on astro:page-load and clean up on astro:before-swap.
5. Check there are no duplicate triggers after navigation and that it runs smoothly under mobile emulation.
