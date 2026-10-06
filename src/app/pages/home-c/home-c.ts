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
import { RESULTS, STOPS, StopId } from '../../content/journey';
import { CONTACT } from '../../content/site';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';
import { Parallax } from '../../ui/parallax';
import { SignOffForm } from '../home/sign-off-form';
import { LayerConsole } from './layer-console';

/** Licensed photographs (Unsplash licence), self-hosted in /public/photos. */
const PHOTO: Record<StopId, string> = {
  l7: 'photos/l7-desk.webp',
  l6: 'photos/l6-code.webp',
  l5: 'photos/l5-call.webp',
  l4: 'photos/l4-dock.webp',
  l3: 'photos/l3-routes.webp',
  l2: 'photos/l2-switch.webp',
  l1: 'photos/l1-cable.webp',
  travel: 'photos/travel-fibre.webp',
  arrive: 'photos/arrive-mumbai.webp',
};

const CASE_PHOTO: Record<string, string> = {
  campus: 'photos/case-campus.webp',
  turbine: 'photos/case-turbine.webp',
  factory: 'photos/case-factory.webp',
};

@Component({
  selector: 'app-home-c',
  imports: [RouterLink, Icon, InView, Parallax, SignOffForm, LayerConsole],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-c.html',
  styleUrl: './home-c.scss',
  host: { '(pointermove)': 'tilt($event)' },
})
export class HomeC {
  protected readonly contact = CONTACT;
  protected readonly stops = STOPS.map((s) => ({ ...s, photo: PHOTO[s.id] }));
  protected readonly results = RESULTS.map((r) => ({ ...r, photo: CASE_PHOTO[r.art] }));

  protected readonly active = signal(0);
  protected readonly activeStop = computed(() => this.stops[this.active()]);
  /** 0 at the first stop (night) → 1 on arrival (dawn) */
  protected readonly dawn = computed(() => this.active() / (this.stops.length - 1));
  private readonly stopEls = viewChildren<ElementRef<HTMLElement>>('stopEl');

  /** The four LAER steps, in the order the loop runs. */
  protected readonly laer = [
    { name: 'Land', does: 'Implement the solution to certified practice.' },
    { name: 'Adopt', does: 'Train your teams until it is theirs.' },
    { name: 'Expand', does: 'Maximise the value of the investment.' },
    { name: 'Renew', does: 'Refresh and renew, then start again.' },
  ];

  /** What the NOC sees when one stop falters, in order. Illustrative. */
  protected readonly incident = [
    { tone: 'warn', what: 'L3 · BLR–HYD link congested' },
    { tone: '', what: 'NOC alerted · engineer on it' },
    { tone: '', what: 'Traffic steered via Pune' },
    { tone: 'ok', what: 'Order moving again' },
  ];

  private readonly host = inject(ElementRef<HTMLElement>).nativeElement;
  private frame = 0;
  private reduced = false;

  constructor() {
    const destroy = inject(DestroyRef);
    const doc = inject(DOCUMENT);
    doc.body.classList.add('theme-dusk');
    destroy.onDestroy(() => doc.body.classList.remove('theme-dusk'));

    afterNextRender(() => {
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) this.active.set(Number((e.target as HTMLElement).dataset['i']));
          }
        },
        { rootMargin: '-50% 0px -50% 0px' },
      );
      this.stopEls().forEach((el) => io.observe(el.nativeElement));
      destroy.onDestroy(() => {
        io.disconnect();
        cancelAnimationFrame(this.frame);
      });
    });
  }

  /** Pointer position as -1…1 on both axes, for the 3D planes. Fine pointers only. */
  protected tilt(e: PointerEvent) {
    if (this.reduced || e.pointerType !== 'mouse') return;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = (e.clientY / innerHeight) * 2 - 1;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      this.host.style.setProperty('--mx', x.toFixed(3));
      this.host.style.setProperty('--my', y.toFixed(3));
    });
  }
}
