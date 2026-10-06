import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { RESULTS, STOPS } from '../../content/journey';
import { CONTACT } from '../../content/site';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';
import { HeroScene } from './hero-scene';
import { JourneyScene } from './journey-scene';
import { SignOffForm } from './sign-off-form';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, InView, HeroScene, JourneyScene, SignOffForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly contact = CONTACT;
  protected readonly Math = Math;

  /* ---------- one order, seven stops ---------- */
  protected readonly stops = STOPS;
  protected readonly layerStops = this.stops.slice(0, 7);

  protected readonly active = signal(0);
  protected readonly activeStop = computed(() => this.stops[this.active()]);
  /** 0 at the first stop (night) → 1 on arrival (dawn) */
  protected readonly dawn = computed(() => this.active() / (this.stops.length - 1));
  private readonly stopEls = viewChildren<ElementRef<HTMLElement>>('stopEl');

  /* ---------- proof ---------- */
  protected readonly results = RESULTS;

  /** LAER milestones on the loop track. */
  protected readonly laer = [
    { name: 'Land', does: 'Implement', x: 130, y: 60, tx: 38, ty: -34, anchor: 'start' },
    { name: 'Adopt', does: 'Train your teams', x: 390, y: 60, tx: 38, ty: -34, anchor: 'start' },
    { name: 'Expand', does: 'Maximise value', x: 390, y: 240, tx: 0, ty: 40, anchor: 'start' },
    { name: 'Renew', does: 'Refresh & renew', x: 130, y: 240, tx: 0, ty: 40, anchor: 'start' },
  ];

  /** Low dawn skyline closing the page: [x, height, width]; the sun sits in a gap at the centre. */
  protected readonly dawnSkyline = (() => {
    const out: number[][] = [];
    let s = 11;
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let x = 0; x < 1600; ) {
      const w = 40 + Math.round(r() * 80);
      if (x > 680 && x < 900) {
        x = 900;
        continue;
      }
      out.push([x, 30 + Math.round(r() * 110), w]);
      x += w + 4;
    }
    return out;
  })();

  constructor() {
    const destroy = inject(DestroyRef);
    const doc = inject(DOCUMENT);
    doc.body.classList.add('theme-dusk');
    destroy.onDestroy(() => doc.body.classList.remove('theme-dusk'));

    afterNextRender(() => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) this.active.set(Number((e.target as HTMLElement).dataset['i']));
          }
        },
        { rootMargin: innerWidth < 900 ? '-55% 0px -25% 0px' : '-45% 0px -45% 0px' },
      );
      this.stopEls().forEach((el) => io.observe(el.nativeElement));
      destroy.onDestroy(() => io.disconnect());
    });
  }
}
