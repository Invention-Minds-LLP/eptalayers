import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InView } from '../../ui/in-view';
import { CtaBand } from '../../ui/d/cta-band';
import { PageHero } from '../../ui/d/page-hero';
import { useThemeD } from '../../ui/d/theme';

/** Vision & mission (content section 3), with the content's own analogy drawn: the satellite's chief engineer. */
@Component({
  selector: 'app-vision',
  imports: [InView, PageHero, CtaBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      eyebrow="Vision & mission"
      heading="Business Continuity is at Our Core"
      [accent]="3"
      photo="photos/mumbai-sea.webp"
      lede="Your business should never have to stop because of IT. That one idea shapes everything Epta Layers designs, supplies, installs and supports."
    />

    <section class="d-band d-band--light" aria-label="Our approach">
      <div class="wrap">
        <div class="d-prose d-reveal wide" appInView>
          <p>
            Business continuity means your operations keep running, whatever happens. It is the reason Epta Layers
            exists. We aim to provide the best IT infrastructure and help our customers become more resilient, so their
            business never meets a “stop sign”.
          </p>
          <p>
            The name Epta means ‘seven’ in Greek, after the seven layers of the OSI model. Looking at all seven helps us
            understand your business first, then design a solution that fixes the real problem while keeping your goals
            in sight.
          </p>
          <p>
            We work closely with the world’s leading IT brands to deliver solutions across networking, security,
            collaboration and data centers, and we keep improving them. Our goal is to be the most reliable technology
            partner your business has.
          </p>
        </div>
      </div>
    </section>

    <!-- the analogy, drawn: a satellite held in orbit, signal never dark -->
    <section class="d-band sat-band" aria-labelledby="sat-title">
      <div class="wrap d-split sat-grid">
        <div class="d-reveal" appInView>
          <p class="d-eyebrow">Our approach</p>
          <h2 id="sat-title" class="d-h2">The chief engineer of a <span class="d-em">global communications satellite</span></h2>
          <p class="d-lede">
            Think of Epta Layers as the chief engineer of a communications satellite. We don’t just write the plan. We
            connect every part, then stay at the controls 24/7* so your signal, and your business, never goes dark.
          </p>
        </div>
        <svg class="sat" viewBox="0 0 420 360" aria-hidden="true">
          <defs>
            <radialGradient id="vs-earth" cx="0.4" cy="0.35">
              <stop offset="0" stop-color="#2f5bea" />
              <stop offset="1" stop-color="#0a1430" />
            </radialGradient>
            <linearGradient id="vs-hot" x1="0" x2="1">
              <stop offset="0" stop-color="#ff5f27" />
              <stop offset="1" stop-color="#fe046f" />
            </linearGradient>
          </defs>
          <circle cx="210" cy="190" r="86" fill="url(#vs-earth)" />
          <circle cx="210" cy="190" r="86" fill="none" stroke="rgb(150 175 235 / 0.3)" />
          <ellipse cx="210" cy="190" rx="170" ry="70" class="orbit" transform="rotate(-18 210 190)" />
          <g class="beams">
            @for (b of [0, 1, 2]; track b) {
              <circle cx="210" cy="190" r="10" class="pulse" [style.--b]="b" />
            }
          </g>
          <g class="craft">
            <rect x="-14" y="-9" width="28" height="18" rx="3" fill="url(#vs-hot)" />
            <rect x="-40" y="-5" width="22" height="10" rx="1.5" class="panel" />
            <rect x="18" y="-5" width="22" height="10" rx="1.5" class="panel" />
            <animateMotion dur="14s" repeatCount="indefinite" path="M371.7 137.5 A170 70 -18 1 1 48.3 242.5 A170 70 -18 1 1 371.7 137.5 Z" />
          </g>
        </svg>
      </div>
    </section>

    <section class="d-band d-band--light" aria-labelledby="gp-title">
      <div class="wrap">
        <div class="d-head d-reveal" appInView>
          <div>
            <p class="d-eyebrow">Our Guiding Principles</p>
            <h2 id="gp-title" class="d-h2">Vision and Mission</h2>
          </div>
        </div>
        <ul class="d-cards pair d-stagger" appInView>
          <li class="d-card">
            <span class="d-num">Vision</span>
            <p class="big">
              To provide the best IT infrastructure solutions and help our customers keep their business running. We aim
              to be the most reliable technology partner for enterprises.
            </p>
          </li>
          <li class="d-card">
            <span class="d-num">Mission</span>
            <p class="big">
              To be the one team you call for all your IT infrastructure needs. From installation to keeping you running,
              we deliver the best possible experience and keep improving what we offer.
            </p>
          </li>
        </ul>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: `
    .wide {
      max-width: 78ch;
      columns: 2 340px;
      column-gap: 48px;
      display: block;
    }
    .wide p + p {
      margin-top: 18px;
    }
    .sat-band {
      overflow: clip;
    }
    .sat-grid {
      align-items: center;
    }
    .sat {
      width: 100%;
      max-width: 480px;
      justify-self: center;
      overflow: visible;
    }
    .orbit {
      fill: none;
      stroke: rgb(150 175 235 / 0.35);
      stroke-dasharray: 4 6;
    }
    .panel {
      fill: #2c3c78;
      stroke: #6a85d8;
      stroke-width: 0.8;
    }
    .pulse {
      fill: none;
      stroke: #3ddc97;
      stroke-width: 1.5;
      opacity: 0;
      transform-origin: 210px 190px;
      animation: sig 3.6s ease-out infinite;
      animation-delay: calc(var(--b) * 1.2s);
    }
    @keyframes sig {
      0% {
        transform: scale(1);
        opacity: 0.9;
      }
      100% {
        transform: scale(13);
        opacity: 0;
      }
    }
    .pair {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .big {
      font-size: 1.1875rem;
      line-height: 1.6 !important;
      color: var(--ink-l) !important;
    }
    @media (max-width: 760px) {
      .pair {
        grid-template-columns: 1fr;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .pulse {
        animation: none;
      }
    }
  `,
})
export class Vision {
  constructor() {
    useThemeD();
  }
}
