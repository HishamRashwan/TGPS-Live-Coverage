import { gsap } from './gsap';

/** Hero entrance. Targets `[data-anim]` inside root. Returns cleanup. */
export function init(root: HTMLElement): () => void {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1024px)' },
      (c) => {
        const { motion, desktop } = c.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return; // reduced motion: final state only

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('[data-anim=title]', { y: 40, autoAlpha: 0, duration: 1, ease: 'expo.out' })
          .from('[data-anim=tagline]', { y: 20, autoAlpha: 0, duration: 0.7 }, '-=0.7')
          .from('[data-anim=meta]', { y: 20, autoAlpha: 0, duration: 0.7 }, '-=0.55')
          .from('[data-anim=player]', { y: 50, scale: 0.96, autoAlpha: 0, duration: 1.1, ease: 'expo.out' }, '-=0.5')
          .from('[data-anim=panel]', desktop ? { x: 50, autoAlpha: 0, duration: 0.9 } : { y: 40, autoAlpha: 0, duration: 0.9 }, '-=0.8')
          .from('[data-anim=row]:not([hidden])', { y: 20, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, '-=0.5');
      },
    );
  }, root);

  return () => ctx.revert();
}
