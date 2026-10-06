import { ChangeDetectionStrategy, Component, signal, afterNextRender } from '@angular/core';

interface Bldg {
  x: number;
  w: number;
  h: number;
}

/** Deterministic pseudo-random so the skyline draws the same every visit. */
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

const r1 = rng(7);
const FAR: Bldg[] = [];
for (let x = -20; x < 1620; ) {
  const w = 50 + Math.round(r1() * 90);
  FAR.push({ x, w, h: 120 + Math.round(r1() * 200) });
  x += w + 6;
}

/** Mid skyline, kept clear of the HQ tower; only about one window in ten is lit at this hour. */
const r2 = rng(19);
const MID: (Bldg & { lit: number[] })[] = [];
for (let x = -10; x < 1620; ) {
  const w = 70 + Math.round(r2() * 110);
  const h = 110 + Math.round(r2() * 170);
  if (x > 600 && x < 1000) {
    x = 1000;
    continue;
  }
  const lit: number[] = [];
  for (let k = 0; k < 12; k++) lit.push(r2() > 0.9 ? 1 : 0);
  MID.push({ x, w, h, lit });
  x += w + 10;
}

/** HQ tower: 6 columns × 9 floors. Only the sales floor (row 1) is fully lit. */
const COLS = 6;
const ROWS = 9;
const SALES = 1;
const r3 = rng(41);
const TOWER = Array.from({ length: ROWS }, (_, row) =>
  Array.from({ length: COLS }, (_, col) => ({ row, col, on: row !== SALES && r3() > 0.9 })),
);

@Component({
  selector: 'app-hero-scene',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.viewBox]="narrow() ? '470 -380 660 1280' : '0 0 1600 900'"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="Illustration: Bangalore at dusk; in an office tower, one floor is lit where a sales manager sends an order, shown as a glowing card"
    >
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#090f2a" />
          <stop offset="0.5" stop-color="#16224c" />
          <stop offset="0.82" stop-color="#33295a" />
          <stop offset="1" stop-color="#5a3a62" />
        </linearGradient>
        <radialGradient id="hs-ember" cx="0.5" cy="1" r="0.7">
          <stop offset="0" stop-color="#d9785a" stop-opacity="0.5" />
          <stop offset="0.5" stop-color="#7a4a70" stop-opacity="0.18" />
          <stop offset="1" stop-color="#7a4a70" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="hs-tower" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#26346a" />
          <stop offset="0.6" stop-color="#1f2b59" />
          <stop offset="0.6" stop-color="#18224a" />
          <stop offset="1" stop-color="#141c3e" />
        </linearGradient>
        <linearGradient id="hs-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ff5f27" />
          <stop offset="1" stop-color="#fe046f" />
        </linearGradient>
        <radialGradient id="hs-glow">
          <stop offset="0" stop-color="#ff6a3d" stop-opacity="0.75" />
          <stop offset="1" stop-color="#ff6a3d" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="hs-floor">
          <stop offset="0" stop-color="#ffd27a" stop-opacity="0.45" />
          <stop offset="1" stop-color="#ffd27a" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="hs-lampcone" cx="0.5" cy="0" r="1">
          <stop offset="0" stop-color="#ffd27a" stop-opacity="0.42" />
          <stop offset="1" stop-color="#ffd27a" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect y="-600" width="1600" height="1500" fill="#090f2a" />
      <rect width="1600" height="900" fill="url(#hs-sky)" />
      <rect width="1600" height="900" fill="url(#hs-ember)" />

      <g class="cloud" opacity="0.3">
        <path d="M 1120 420 q 40 -34 90 -12 q 30 -30 80 -6 q 50 -6 60 30 z" fill="#3b2d5c" />
        <path d="M 140 470 q 50 -28 100 -6 q 40 -24 90 4 q 30 2 34 20 z" fill="#2c2350" />
      </g>

      <!-- an aircraft, high and to the right, clear of the headline -->
      <g class="plane">
        <circle cx="0" cy="0" r="2.4" fill="#e9eef6" />
        <circle cx="10" cy="0" r="2.4" fill="#ff5f27" class="blink" />
      </g>

      <g fill="#18204a" opacity="0.9">
        @for (b of far; track $index) {
          <rect [attr.x]="b.x" [attr.y]="900 - b.h" [attr.width]="b.w" [attr.height]="b.h" />
        }
      </g>

      <g>
        @for (b of mid; track $index) {
          <rect [attr.x]="b.x" [attr.y]="900 - b.h" [attr.width]="b.w" [attr.height]="b.h" fill="#121a3c" />
          @for (l of b.lit; track $index; let k = $index) {
            @if (l) {
              <rect
                [attr.x]="b.x + 12 + (k % 3) * ((b.w - 30) / 3)"
                [attr.y]="900 - b.h + 18 + Math.floor(k / 3) * 22"
                width="9"
                height="11"
                fill="#f2a93b"
                opacity="0.5"
              />
            }
          }
        }
      </g>

      <!-- the HQ tower, centre stage -->
      <g class="tower">
        <circle cx="800" cy="560" r="280" fill="url(#hs-floor)" />
        <rect x="670" y="480" width="260" height="420" fill="url(#hs-tower)" />
        <rect x="670" y="468" width="260" height="14" fill="#2e3d78" />
        <rect x="770" y="430" width="60" height="40" fill="#1f2b59" />
        <rect x="797" y="392" width="6" height="40" fill="#2e3d78" />
        <circle cx="800" cy="390" r="4" fill="#fe046f" class="blink" />
        @for (row of tower; track $index) {
          @for (w of row; track w.col) {
            <rect
              [attr.x]="688 + w.col * 40"
              [attr.y]="506 + w.row * 44"
              width="28"
              height="28"
              [attr.class]="w.row === sales ? 'win sales' : w.on ? 'win on' : 'win'"
            />
          }
        }
        <!-- the sales floor: a person at the window, the order leaving -->
        <rect x="682" y="546" width="236" height="40" fill="#ffd27a" opacity="0.22" />
        <g>
          <circle cx="772" cy="562" r="7" fill="#0e1530" />
          <path d="M 760 586 q 0 -16 12 -18 q 12 2 12 18 z" fill="#0e1530" />
          <rect x="786" y="568" width="22" height="14" rx="2" fill="#0e1530" />
        </g>
        <g class="order">
          <circle cx="878" cy="520" r="74" fill="url(#hs-glow)" />
          <g transform="translate(854 502) rotate(-8)">
            <rect width="48" height="34" rx="4" fill="url(#hs-card)" />
            <rect x="7" y="8" width="22" height="3" rx="1.5" fill="#fff" opacity="0.9" />
            <rect x="7" y="15" width="32" height="3" rx="1.5" fill="#fff" opacity="0.6" />
            <rect x="7" y="22" width="16" height="3" rx="1.5" fill="#fff" opacity="0.6" />
          </g>
        </g>
      </g>

      <!-- the garden city's trees and streetlamps -->
      <g>
        <rect x="0" y="860" width="1600" height="40" fill="#0a1029" />
        @for (l of lamps; track l) {
          <path [attr.d]="'M ' + (l - 70) + ' 900 L ' + l + ' 770 L ' + (l + 70) + ' 900 Z'" fill="url(#hs-lampcone)" />
          <rect [attr.x]="l - 2" y="770" width="4" height="100" fill="#0e1530" />
          <rect [attr.x]="l - 10" y="766" width="20" height="6" rx="3" fill="#ffd27a" />
        }
        @for (t of trees; track $index) {
          <rect [attr.x]="t.x - 5" [attr.y]="900 - t.h" width="10" [attr.height]="t.h" fill="#0b1230" />
          <circle [attr.cx]="t.x" [attr.cy]="900 - t.h - t.r * 0.4" [attr.r]="t.r" fill="#0d1534" />
          <circle [attr.cx]="t.x - t.r * 0.6" [attr.cy]="900 - t.h + t.r * 0.1" [attr.r]="t.r * 0.7" fill="#0d1534" />
          <circle [attr.cx]="t.x + t.r * 0.6" [attr.cy]="900 - t.h + t.r * 0.2" [attr.r]="t.r * 0.65" fill="#0d1534" />
        }
      </g>
    </svg>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
    .win {
      fill: #222d5c;
    }
    .win.on {
      fill: #f2a93b;
      opacity: 0.6;
    }
    .win.sales {
      fill: #ffd27a;
    }
    .order {
      animation: order-glow 3.2s ease-in-out infinite;
    }
    @keyframes order-glow {
      50% {
        opacity: 0.75;
      }
    }
    .blink {
      animation: blink 1.6s steps(1) infinite;
    }
    @keyframes blink {
      50% {
        opacity: 0;
      }
    }
    .plane {
      animation: fly 40s linear infinite;
    }
    @keyframes fly {
      from {
        transform: translate(1100px, 70px);
      }
      to {
        transform: translate(1660px, 30px);
      }
    }
    .cloud {
      animation: drift 60s linear infinite alternate;
    }
    @keyframes drift {
      to {
        transform: translateX(60px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .order,
      .blink,
      .plane,
      .cloud {
        animation: none;
      }
      .plane {
        transform: translate(1300px, 60px);
      }
    }
  `,
})
export class HeroScene {
  protected readonly Math = Math;
  protected readonly far = FAR;
  protected readonly mid = MID;
  protected readonly tower = TOWER;
  protected readonly sales = SALES;
  protected readonly lamps = [180, 520, 1080, 1420];
  protected readonly trees = [
    { x: 60, h: 70, r: 46 },
    { x: 330, h: 60, r: 38 },
    { x: 600, h: 74, r: 50 },
    { x: 1010, h: 58, r: 34 },
    { x: 1290, h: 66, r: 44 },
    { x: 1540, h: 72, r: 52 },
  ];
  protected readonly narrow = signal(false);

  constructor() {
    afterNextRender(() => {
      const mq = matchMedia('(max-width: 760px)');
      this.narrow.set(mq.matches);
      mq.addEventListener('change', (e) => this.narrow.set(e.matches));
    });
  }
}
