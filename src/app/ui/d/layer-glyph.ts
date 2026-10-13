import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * A small looping drawing of one OSI layer at work (1 = Physical … 7 = Application). Decorative.
 * L1 light pulses along a cable · L2 switch ports blink · L3 a packet takes the best route ·
 * L4 numbered segments arrive and tick · L5 two ends hold a heartbeat · L6 text locks into cipher ·
 * L7 an app window loads.
 */
@Component({
  selector: 'app-layer-glyph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 160 100">
      @switch (n()) {
        @case (1) {
          <path d="M8 70 C 40 70, 50 30, 80 30 S 120 70, 152 70" class="cable" />
          <path d="M8 70 C 40 70, 50 30, 80 30 S 120 70, 152 70" class="light" pathLength="1" />
          <rect x="2" y="62" width="12" height="16" rx="2" class="plug" />
          <rect x="146" y="62" width="12" height="16" rx="2" class="plug" />
        }
        @case (2) {
          <rect x="10" y="26" width="140" height="48" rx="5" class="box" />
          @for (k of [0, 1, 2, 3, 4, 5, 6, 7]; track k) {
            <rect [attr.x]="20 + k * 16" y="44" width="11" height="10" rx="1.5" class="port" />
            <rect [attr.x]="21 + k * 16" y="36" width="5" height="3" class="led" [style.--d]="(k * 0.17) + 's'" />
          }
        }
        @case (3) {
          <path d="M20 70 L80 22 L140 60" class="route dim" />
          <path d="M20 70 L80 80 L140 60" class="route" />
          @for (p of [[20, 70], [80, 22], [80, 80], [140, 60]]; track $index) {
            <circle [attr.cx]="p[0]" [attr.cy]="p[1]" r="6" class="node" />
          }
          <circle r="5" class="pkt">
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M20 70 L80 80 L140 60" />
          </circle>
        }
        @case (4) {
          @for (k of [0, 1, 2, 3, 4, 5]; track k) {
            <g class="seg" [style.--d]="(k * 0.3) + 's'">
              <rect [attr.x]="12 + k * 24" y="34" width="18" height="30" rx="3" />
              <path [attr.d]="'M' + (16 + k * 24) + ' 50 l3 3 l6 -7'" class="tick" />
            </g>
          }
        }
        @case (5) {
          <circle cx="24" cy="50" r="14" class="end" />
          <circle cx="136" cy="50" r="14" class="end" />
          <path d="M38 50 H122" class="wire" />
          <path d="M44 50 h14 l5 -12 l7 24 l6 -18 l5 6 h41" class="beat" pathLength="1" />
        }
        @case (6) {
          <rect x="16" y="28" width="128" height="44" rx="6" class="box" />
          <text x="30" y="56" class="plain">PO-4471</text>
          <text x="30" y="56" class="ciph">9f3a·c21e</text>
          <g class="lock">
            <rect x="118" y="44" width="16" height="13" rx="2" />
            <path d="M121 44 v-4 a5 5 0 0 1 10 0 v4" />
          </g>
        }
        @case (7) {
          <rect x="14" y="16" width="132" height="70" rx="6" class="box" />
          <rect x="14" y="16" width="132" height="12" rx="6" class="bar" />
          <rect x="26" y="40" width="0" height="6" rx="3" class="load" />
          <rect x="26" y="54" width="70" height="5" rx="2.5" class="ln" />
          <rect x="26" y="64" width="50" height="5" rx="2.5" class="ln" />
          <circle cx="126" cy="64" r="9" class="ok" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: block;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }
    .cable {
      fill: none;
      stroke: #2c3c78;
      stroke-width: 6;
      stroke-linecap: round;
    }
    .light {
      fill: none;
      stroke: #ffb27a;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-dasharray: 0.18 0.82;
      filter: drop-shadow(0 0 4px #ff6a3d);
      animation: run 1.6s linear infinite;
    }
    @keyframes run {
      from {
        stroke-dashoffset: 1;
      }
      to {
        stroke-dashoffset: 0;
      }
    }
    .plug {
      fill: #3b4a86;
    }
    .box {
      fill: #121a3a;
      stroke: #3b4a86;
      stroke-width: 1.2;
    }
    .port {
      fill: #05070f;
      stroke: #4a5a8c;
      stroke-width: 0.8;
    }
    .led {
      fill: #1d4a35;
      animation: led 1s steps(1) infinite;
      animation-delay: var(--d);
    }
    @keyframes led {
      0%,
      50% {
        fill: #3ddc97;
      }
      51% {
        fill: #1d4a35;
      }
    }
    .route {
      fill: none;
      stroke: #ff5f27;
      stroke-width: 2.5;
    }
    .route.dim {
      stroke: #f5b301;
      stroke-dasharray: 5 5;
      opacity: 0.6;
    }
    .node {
      fill: #0f1426;
      stroke: #c7cfe4;
      stroke-width: 2;
    }
    .pkt {
      fill: #fe046f;
      filter: drop-shadow(0 0 5px #fe046f);
    }
    .seg rect {
      fill: #1a2448;
      stroke: #3b4a86;
      animation: ack 2.4s ease infinite;
      animation-delay: var(--d);
    }
    .seg .tick {
      fill: none;
      stroke: #3ddc97;
      stroke-width: 2;
      stroke-linecap: round;
      opacity: 0;
      animation: tk 2.4s ease infinite;
      animation-delay: var(--d);
    }
    @keyframes ack {
      0%,
      15% {
        transform: translateY(-14px);
        opacity: 0;
      }
      30%,
      100% {
        transform: none;
        opacity: 1;
        stroke: #3ddc97;
      }
    }
    @keyframes tk {
      0%,
      30% {
        opacity: 0;
      }
      40%,
      100% {
        opacity: 1;
      }
    }
    .end {
      fill: #1a2448;
      stroke: #c7cfe4;
      stroke-width: 2;
    }
    .wire {
      stroke: #2c3c78;
      stroke-width: 3;
    }
    .beat {
      fill: none;
      stroke: #5fe0c8;
      stroke-width: 2.4;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      filter: drop-shadow(0 0 4px rgb(95 224 200 / 0.7));
      animation: draw 1.8s ease-in-out infinite;
    }
    @keyframes draw {
      60%,
      100% {
        stroke-dashoffset: 0;
      }
    }
    .plain,
    .ciph {
      font: 600 15px var(--font-data, monospace);
    }
    .plain {
      fill: #e9ecf5;
      animation: fade-out 3s ease infinite;
    }
    .ciph {
      fill: #ff9a6e;
      opacity: 0;
      animation: fade-in 3s ease infinite;
    }
    @keyframes fade-out {
      0%,
      35% {
        opacity: 1;
      }
      50%,
      90% {
        opacity: 0;
      }
    }
    @keyframes fade-in {
      0%,
      40% {
        opacity: 0;
      }
      55%,
      90% {
        opacity: 1;
      }
    }
    .lock rect {
      fill: #ff5f27;
    }
    .lock path {
      fill: none;
      stroke: #ff5f27;
      stroke-width: 2.2;
      transform-origin: 131px 44px;
      animation: shut 3s ease infinite;
    }
    @keyframes shut {
      0%,
      35% {
        transform: translateY(-4px);
      }
      45%,
      100% {
        transform: none;
      }
    }
    .bar {
      fill: #26335e;
    }
    .load {
      fill: #ff5f27;
      animation: load 2.4s ease infinite;
    }
    @keyframes load {
      0% {
        width: 0;
      }
      60%,
      100% {
        width: 108px;
      }
    }
    .ln {
      fill: #2c3c78;
    }
    .ok {
      fill: #3ddc97;
      opacity: 0;
      animation: tk 2.4s ease infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
      }
    }
  `,
})
export class LayerGlyph {
  readonly n = input.required<number>();
}
