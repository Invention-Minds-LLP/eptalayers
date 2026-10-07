import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon';
import { Parallax } from '../parallax';

/**
 * Opening band for inner pages: navy, a photograph on the right that drifts slower than the page,
 * the title rising word by word with its last `accent` words in the brand gradient.
 * Project CTAs with [ctas]; anything else projected sits over the photograph (a live visual).
 */
@Component({
  selector: 'app-page-hero',
  imports: [RouterLink, Icon, Parallax],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="ph" [class.has-side]="side()" appParallax="0.3" [attr.aria-labelledby]="id()">
      @if (photo()) {
        <div class="ph-photo" aria-hidden="true"><img [src]="photo()" alt="" fetchpriority="high" /></div>
      }
      <span class="ph-scan" aria-hidden="true"></span>
      <div class="wrap ph-grid">
        <div class="ph-copy">
          @if (crumb(); as c) {
            <a class="ph-crumb" [routerLink]="c.link" [fragment]="c.fragment">
              <app-icon name="arrow" class="flip" />{{ c.label }}
            </a>
          }
          @if (eyebrow()) {
            <p class="d-eyebrow">{{ eyebrow() }}</p>
          }
          <h1 [id]="id()">
            @for (w of words(); track $index; let i = $index) {
              <span class="w" [style.--i]="i"><span [class.d-em]="i >= words().length - accent()">{{ w }}</span></span>{{ ' ' }}
            }
          </h1>
          @if (lede()) {
            <p class="ph-lede">{{ lede() }}</p>
          }
          <div class="ph-ctas"><ng-content select="[ctas]" /></div>
        </div>
        <div class="ph-side"><ng-content /></div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .ph {
      position: relative;
      isolation: isolate;
      overflow: clip;
      min-height: min(620px, calc(100svh - 72px));
      display: grid;
      align-items: center;
      background: var(--navy);
      color: #fff;
    }
    .ph-photo {
      position: absolute;
      inset: 0 0 0 36%;
      z-index: -1;
      overflow: hidden;
    }
    .ph-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(1.1) brightness(0.78) contrast(1.08);
      transform: translate3d(calc(var(--mx) * -12px), var(--py, 0px), 0) scale(1.08);
      animation: ph-in 2.2s cubic-bezier(0.2, 0.7, 0.2, 1) both;
    }
    @keyframes ph-in {
      from {
        opacity: 0;
        scale: 1.1;
      }
    }
    .ph-photo::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
      background: linear-gradient(180deg, rgb(40 90 230 / 0.5), rgb(20 50 160 / 0.55));
      mix-blend-mode: color;
    }
    .ph-photo::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
      background:
        linear-gradient(90deg, var(--navy) 0%, rgb(10 20 48 / 0.8) 22%, rgb(10 20 48 / 0.2) 60%, rgb(10 20 48 / 0.35) 100%),
        linear-gradient(0deg, var(--navy) 0%, rgb(10 20 48 / 0) 26%);
    }
    .ph-scan {
      position: absolute;
      z-index: 0;
      right: 0;
      width: 64%;
      height: 120px;
      background: linear-gradient(180deg, transparent, rgb(90 150 255 / 0.14), transparent);
      mix-blend-mode: screen;
      animation: ph-scan 7s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes ph-scan {
      from {
        top: -20%;
      }
      to {
        top: 110%;
      }
    }
    .ph-grid {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
      gap: 48px;
      align-items: center;
      padding-block: 80px;
    }
    .ph-crumb {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 26px;
      color: #c7cfe4;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      animation: ph-rise 0.9s var(--ease-out) both;
    }
    .ph-crumb app-icon {
      width: 16px;
      transition: transform 0.3s var(--ease-out);
    }
    .ph-crumb:hover {
      color: #fff;
    }
    .ph-crumb:hover app-icon {
      transform: scaleX(-1) translateX(4px);
    }
    .flip {
      transform: scaleX(-1);
    }
    .d-eyebrow {
      animation: ph-rise 0.9s var(--ease-out) 0.05s both;
    }
    h1 {
      margin: 20px 0 0;
      max-width: 17ch;
      font-size: clamp(2.3rem, 4.2vw, 3.7rem);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.025em;
    }
    .w {
      display: inline-block;
      overflow: hidden;
      vertical-align: top;
      padding-bottom: 0.08em;
    }
    .w > span {
      display: inline-block;
      animation: ph-word 0.9s var(--ease-out) both;
      animation-delay: calc(0.15s + var(--i) * 0.07s);
    }
    @keyframes ph-word {
      from {
        transform: translateY(105%);
      }
    }
    .ph-lede {
      margin: 22px 0 0;
      max-width: 50ch;
      font-size: 1.0625rem;
      line-height: 1.65;
      color: #d2d9ea;
      animation: ph-rise 1s var(--ease-out) 0.7s both;
    }
    .ph-ctas {
      display: flex;
      flex-wrap: wrap;
      gap: 16px 24px;
      margin-top: 30px;
      animation: ph-rise 1s var(--ease-out) 0.85s both;
    }
    .ph-ctas:empty {
      display: none;
    }
    .ph-side {
      perspective: 1200px;
      animation: ph-rise 1.2s var(--ease-out) 0.9s both;
    }
    @keyframes ph-rise {
      from {
        opacity: 0;
        transform: translateY(18px);
      }
    }
    @media (max-width: 900px) {
      .ph {
        align-items: end;
        min-height: 0;
      }
      .ph-photo {
        inset: 0 0 45% 0;
      }
      .ph-photo::after {
        background: linear-gradient(0deg, var(--navy) 0%, rgb(10 20 48 / 0.55) 40%, rgb(10 20 48 / 0.2) 100%);
      }
      .ph-grid {
        grid-template-columns: 1fr;
        padding-block: 200px 56px;
      }
      .ph-side:empty {
        display: none;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .ph-photo img,
      .ph-scan,
      .w > span,
      .ph-crumb,
      .d-eyebrow,
      .ph-lede,
      .ph-ctas,
      .ph-side {
        animation: none;
      }
    }
  `,
})
export class PageHero {
  readonly eyebrow = input('');
  readonly heading = input.required<string>();
  /** how many trailing words of the heading carry the accent */
  readonly accent = input(0);
  readonly lede = input('');
  readonly photo = input('');
  readonly crumb = input<{ label: string; link: string; fragment?: string } | null>(null);
  readonly side = input(false);
  readonly id = input('page-title');

  protected readonly words = computed(() => this.heading().split(' '));
}
