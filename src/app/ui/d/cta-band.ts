import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon';
import { InView } from '../in-view';

/** The closing call on every page: navy with two drifting warm glows and gradient curves that draw in. */
@Component({
  selector: 'app-cta-band',
  imports: [RouterLink, Icon, InView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta" appInView [attr.aria-label]="heading()">
      <svg class="curves" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ctab-g" x1="0" x2="1">
            <stop offset="0" stop-color="#ff5f27" />
            <stop offset="1" stop-color="#fe046f" />
          </linearGradient>
        </defs>
        <path d="M-20 200 C 120 40, 260 40, 300 120 S 420 230, 520 -10" />
        <path d="M60 240 C 180 110, 300 140, 360 60" />
        <path d="M1460 10 C 1300 120, 1200 60, 1120 180" />
      </svg>
      <div class="wrap row">
        <div>
          <h2>{{ heading() }}</h2>
          @if (text()) {
            <p>{{ text() }}</p>
          }
        </div>
        <a class="d-pill d-pill--line" [routerLink]="link()" [queryParams]="query()">{{ label() }} <app-icon name="arrow" /></a>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .cta {
      position: relative;
      overflow: clip;
      padding-block: 64px;
      background: var(--navy);
      color: #fff;
      border-top: 1px solid var(--navy-line);
    }
    .cta::before,
    .cta::after {
      content: '';
      position: absolute;
      width: 50%;
      height: 220%;
      top: -60%;
      border-radius: 50%;
      filter: blur(60px);
      opacity: 0.45;
    }
    .cta::before {
      left: -15%;
      background: radial-gradient(#ff5f27, transparent 65%);
      animation: drift 12s ease-in-out infinite alternate;
    }
    .cta::after {
      right: -15%;
      background: radial-gradient(#fe046f, transparent 65%);
      animation: drift 14s ease-in-out infinite alternate-reverse;
    }
    @keyframes drift {
      to {
        transform: translate(12%, 10%);
      }
    }
    .curves {
      position: absolute;
      z-index: 1;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    .curves path {
      fill: none;
      stroke: url(#ctab-g);
      stroke-width: 2;
      opacity: 0.7;
      stroke-dasharray: 1400;
      stroke-dashoffset: 1400;
    }
    .cta.is-in .curves path {
      animation: curve 2.4s var(--ease-out) forwards;
    }
    @keyframes curve {
      to {
        stroke-dashoffset: 0;
      }
    }
    .row {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 32px;
    }
    h2 {
      margin: 0;
      max-width: 22ch;
      font-size: clamp(1.5rem, 2.4vw, 2.1rem);
      font-weight: 600;
      line-height: 1.3;
    }
    p {
      margin: 12px 0 0;
      max-width: 56ch;
      color: #d2d9ea;
      line-height: 1.6;
    }
    a {
      flex: none;
    }
    @media (max-width: 760px) {
      .row {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .cta::before,
      .cta::after {
        animation: none;
      }
      .curves path {
        stroke-dashoffset: 0;
      }
      .cta.is-in .curves path {
        animation: none;
      }
    }
  `,
})
export class CtaBand {
  readonly heading = input('Let’s Build a Connected Future Together');
  readonly text = input('');
  readonly label = input('Talk to an Engineer');
  readonly link = input('/contact');
  readonly query = input<Record<string, string> | null>(null);
}
