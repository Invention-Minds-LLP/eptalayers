import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal, viewChild } from '@angular/core';
import { OsiRack } from '../../pages/home-d/osi-rack';
import { InView } from '../in-view';

/**
 * The home page's assembling rack, for inner pages: instead of being driven by a pinned scroll,
 * it builds itself over a few seconds the first time it comes into view, then lights up and
 * the units take turns sliding out.
 */
@Component({
  selector: 'app-rack-show',
  imports: [OsiRack, InView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="show" appInView [class.go]="seen()">
      <app-osi-rack [lit]="lit()" [live]="live()" />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .show {
      --p: 0;
      --f: clamp(0, (var(--p) - 0.85) / 0.12, 1);
      transition: --p 6s cubic-bezier(0.3, 0.05, 0.3, 1);
    }
    .show.go {
      --p: 1;
    }
    @media (prefers-reduced-motion: reduce) {
      .show {
        --p: 1;
        transition: none;
      }
    }
  `,
})
export class RackShow {
  private readonly view = viewChild.required(InView);
  protected readonly seen = () => this.view().seen();
  protected readonly live = signal(false);
  protected readonly lit = signal(-1);

  constructor() {
    let tick: ReturnType<typeof setInterval> | undefined;
    let wait: ReturnType<typeof setTimeout> | undefined;
    effect(() => {
      if (!this.view().seen() || wait) return;
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      wait = setTimeout(
        () => {
          this.live.set(true);
          tick = setInterval(() => this.lit.update((i) => (i + 1) % 7), 1700);
        },
        reduce ? 0 : 5800,
      );
    });
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(wait);
      clearInterval(tick);
    });
  }
}
