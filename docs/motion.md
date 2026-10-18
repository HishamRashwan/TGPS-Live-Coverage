# Motion Guidelines
- Easing: `power3.out` entrances, `power2.inOut` transitions, `expo.out` hero reveals (`--ease-out-expo`).
- Durations: micro 0.2-0.3s, reveal 0.7-1s, hero/pinned 1.2s+. Stagger 0.06-0.1s.
- Patterns: text reveal by line/word, count-up stats, staggered card entrance, subtle hero parallax, glass hover lift.
- Lifecycle: every animation is exported as `init(root): () => void` from `src/animations/*`, created in `gsap.context(fn, root)`, returns `ctx.revert`. Call on `astro:page-load`, clean up on `astro:before-swap`.
- Use `gsap.matchMedia()`: reduced-motion shows the final state only; separate desktop and mobile timelines.
- Animate `transform` and `opacity` only. Register ScrollTrigger once in `src/animations/gsap.ts`.
- Lenis only if smooth scroll is wanted; sync it with `ScrollTrigger.update`.
