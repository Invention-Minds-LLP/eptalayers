import { DestroyRef, Directive, ElementRef, afterNextRender, inject, signal } from '@angular/core';

/** Sets `is-in` once the host scrolls into view. Content stays visible without it. */
@Directive({
  selector: '[appInView]',
  exportAs: 'inView',
  host: { '[class.is-in]': 'seen()' },
})
export class InView {
  readonly seen = signal(false);

  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        this.seen.set(true);
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.seen.set(true);
            io.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      io.observe(el);
      destroy.onDestroy(() => io.disconnect());
    });
  }
}
