import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Counts every number in a figure up from zero the first time it scrolls into view,
 * keeping the figure's own punctuation ("90–95%", "1500+", "2 & 3"). Shows the final text without motion.
 */
@Directive({ selector: '[appCountUp]' })
export class CountUp {
  readonly appCountUp = input.required<string>();

  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const final = this.appCountUp();
      el.textContent = final;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const nums = [...final.matchAll(/\d[\d,]*/g)].map((m) => Number(m[0].replace(/,/g, '')));
      if (!nums.length) return;
      let frame = 0;
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io.disconnect();
          const t0 = performance.now();
          const run = (t: number) => {
            const k = Math.min(1, (t - t0) / 1400);
            const e = 1 - Math.pow(1 - k, 3);
            let n = 0;
            el.textContent = final.replace(/\d[\d,]*/g, () => String(Math.round(nums[n++] * e)));
            if (k < 1) frame = requestAnimationFrame(run);
            else el.textContent = final;
          };
          frame = requestAnimationFrame(run);
        },
        { threshold: 0.5 },
      );
      io.observe(el);
      destroy.onDestroy(() => {
        io.disconnect();
        cancelAnimationFrame(frame);
      });
    });
  }
}
