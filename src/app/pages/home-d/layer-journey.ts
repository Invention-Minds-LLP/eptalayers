import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LAYERS } from '../../content/layers';
import { Icon } from '../../ui/icon';
import { LayerConsole } from '../home-c/layer-console';

/**
 * The home page's OSI section. It pins while you scroll; each step brings in one layer, foundation first.
 * The layer flies onto the isometric stack from alternating sides, and a detail card for that layer
 * (plain-language explanation, what Epta Layers does there, and a live console of the layer at work)
 * swings in beside it. After L7 the card sums up all seven.
 */
@Component({
  selector: 'app-layer-journey',
  imports: [RouterLink, Icon, LayerConsole],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './layer-journey.html',
  styleUrl: './layer-journey.scss',
})
export class LayerJourney {
  protected readonly layers = LAYERS;
  /** top of the stack first, for the labels */
  protected readonly top = [...LAYERS].reverse();
  /** 0–6: the layer being shown (L1…L7); 7: all seven complete */
  protected readonly stage = signal(0);
  protected readonly layer = computed(() => LAYERS[Math.min(6, this.stage())]);
  protected readonly done = computed(() => this.stage() >= 7);

  private readonly sec = viewChild.required<ElementRef<HTMLElement>>('sec');

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.sec().nativeElement;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.style.setProperty('--p', '1');
        this.stage.set(7);
        return;
      }
      let frame = 0;
      const update = () => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const travel = r.height - (innerHeight - 72);
        const p = Math.max(0, Math.min(1, (72 - r.top) / Math.max(1, travel)));
        el.style.setProperty('--p', p.toFixed(4));
        this.stage.set(Math.min(7, Math.floor(p * 8)));
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

  /** jump the page to a layer's step */
  protected go(k: number) {
    const el = this.sec().nativeElement;
    const travel = el.offsetHeight - (innerHeight - 72);
    const top = el.getBoundingClientRect().top + scrollY - 72;
    scrollTo({ top: top + travel * ((k + 0.35) / 8), behavior: 'smooth' });
  }
}
