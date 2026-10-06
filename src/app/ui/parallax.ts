import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute } from '@angular/core';

/**
 * Scroll depth for photo planes. Writes two custom properties on the host every frame it moves:
 * `--py`: px to shift a background plane (positive input = the plane lags the page, so it reads as farther away);
 * `--pp`: where the host sits, -1 (below the viewport) through 0 (centred) to 1 (above).
 * Does nothing under reduced motion, so planes stay put.
 */
@Directive({ selector: '[appParallax]' })
export class Parallax {
  readonly appParallax = input(0.25, { transform: numberAttribute });

  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let frame = 0;
      const update = () => {
        frame = 0;
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        const off = r.top + r.height / 2 - innerHeight / 2;
        el.style.setProperty('--py', `${(-off * this.appParallax()).toFixed(1)}px`);
        el.style.setProperty('--pp', Math.max(-1, Math.min(1, -off / innerHeight)).toFixed(3));
      };
      const queue = () => (frame ||= requestAnimationFrame(update));
      update();
      addEventListener('scroll', queue, { passive: true });
      addEventListener('resize', queue);
      destroy.onDestroy(() => {
        removeEventListener('scroll', queue);
        removeEventListener('resize', queue);
        cancelAnimationFrame(frame);
      });
    });
  }
}
