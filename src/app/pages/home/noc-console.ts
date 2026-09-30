import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InView } from '../../ui/in-view';

interface Channel {
  id: string;
  name: string;
  readout: string;
  path: string;
  alert?: string;
  target?: boolean;
}

/** Deterministic pseudo-random walk so the illustrative feed renders the same every visit. */
function trace(
  seed: number,
  amp: number,
  spikeAt?: number,
  base = 20,
  lo = 6,
  hi = 34,
): { path: string; alert?: string } {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647) - 0.5;
  const pts: string[] = [];
  let alert: string | undefined;
  let y = base;
  const period: number[] = [];
  for (let x = 0; x <= 400; x += 8) {
    y = Math.max(lo, Math.min(hi, y + rand() * amp));
    period.push(y);
  }
  // close the loop so two periods tile seamlessly
  period[period.length - 1] = period[0];
  for (let rep = 0; rep < 2; rep++) {
    period.forEach((py, i) => {
      const x = rep * 400 + i * 8;
      pts.push(`${i === 0 && rep === 0 ? 'M' : 'L'}${x} ${py.toFixed(1)}`);
    });
  }
  if (spikeAt !== undefined) {
    const a: string[] = [];
    for (let rep = 0; rep < 2; rep++) {
      const x = rep * 400 + spikeAt;
      a.push(`M${x - 8} 20 L${x} 3 L${x + 8} 20`);
    }
    alert = a.join(' ');
  }
  return { path: pts.join(' '), alert };
}

@Component({
  selector: 'app-noc-console',
  hostDirectives: [InView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="console" role="img" aria-label="Illustration of four NOC monitoring channels">
      <div class="top">
        <span class="label">NOC · 24x7</span>
        <span class="live"><i></i>Illustrative feed, not live data</span>
      </div>
      @for (c of channels; track c.id) {
        <div class="ch">
          <div class="who">
            <span class="id data">{{ c.id }}</span>
            <span class="name">{{ c.name }}</span>
          </div>
          <div class="scope">
            <div class="roll">
              <svg viewBox="0 0 800 40" preserveAspectRatio="none">
                @if (c.target) {
                  <line x1="0" x2="800" y1="20" y2="20" class="target" />
                }
                <path [attr.d]="c.path" class="line" />
                @if (c.alert) {
                  <path [attr.d]="c.alert" class="alert" />
                }
              </svg>
            </div>
          </div>
          <span class="read" [class.has-target]="c.target">
            @if (c.target) {
              <span class="lead" aria-hidden="true"></span>
            }
            <span class="data">{{ c.readout }}</span>
          </span>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .console {
      border: 1px solid var(--graphite-line);
      background: var(--graphite-950);
      border-radius: 3px;
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--graphite-line);
      color: var(--on-graphite-2);
      font-size: 0.6875rem;
    }
    .live {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75rem;
    }
    .live i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--pass-lit);
      animation: blink 2s steps(2, jump-none) infinite;
    }
    .ch {
      display: grid;
      grid-template-columns: 170px 1fr 104px;
      align-items: center;
      gap: 16px;
      padding: 14px 16px;
      border-bottom: 1px solid var(--graphite-700);
    }
    .ch:last-child {
      border-bottom: 0;
    }
    .who {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .id {
      font-size: 0.625rem;
      color: var(--on-graphite-2);
    }
    .name {
      font-size: 0.875rem;
      font-weight: 600;
      font-stretch: 90%;
      line-height: 1.25;
    }
    .scope {
      height: 40px;
      overflow: hidden;
      background-image: linear-gradient(var(--graphite-700) 1px, transparent 1px);
      background-size: 100% 10px;
    }
    .roll {
      width: 200%;
      height: 100%;
    }
    :host.is-in .roll {
      animation: roll 16s linear infinite;
    }
    .ch:nth-child(3) .roll {
      animation-duration: 22s;
    }
    .ch:nth-child(4) .roll {
      animation-duration: 12s;
    }
    .ch:nth-child(5) .roll {
      animation-duration: 19s;
    }
    svg {
      width: 100%;
      height: 100%;
    }
    .line {
      fill: none;
      stroke: var(--pass-lit);
      stroke-width: 1.5;
      vector-effect: non-scaling-stroke;
    }
    .target {
      stroke: var(--accent-lit);
      stroke-width: 1;
      stroke-dasharray: 5 4;
      vector-effect: non-scaling-stroke;
    }
    .read.has-target {
      position: relative;
      justify-self: stretch;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .lead {
      position: relative;
      flex: 1;
      border-top: 1px dashed var(--accent-lit);
    }
    .lead::before {
      content: '';
      position: absolute;
      right: 100%;
      top: -1px;
      width: 16px;
      border-top: 1px dashed var(--accent-lit);
    }
    .tgt {
      display: block;
      font-size: 0.5625rem;
      color: var(--accent-lit);
      text-align: right;
    }
    .alert {
      fill: none;
      stroke: var(--fault);
      stroke-width: 2;
      vector-effect: non-scaling-stroke;
    }
    .read {
      justify-self: end;
      text-align: right;
      font-size: 0.6875rem;
      font-weight: 700;
      color: var(--pass-lit);
    }
    @keyframes roll {
      to {
        transform: translateX(-50%);
      }
    }
    @keyframes blink {
      50% {
        opacity: 0.25;
      }
    }
    @media (max-width: 560px) {
      .ch {
        grid-template-columns: 1fr auto;
        gap: 8px 12px;
      }
      .scope {
        grid-column: 1 / -1;
        grid-row: 2;
      }
      .lead {
        display: none;
      }
      .read.has-target {
        justify-self: end;
      }
    }
  `,
})
export class NocConsole {
  protected readonly channels: Channel[] = [
    { id: 'CH1', name: 'Real-time monitoring', readout: 'NOMINAL', ...trace(11, 5) },
    { id: 'CH2', name: 'KPI tracking', readout: 'ON TARGET', target: true, ...trace(47, 3, undefined, 12, 5, 17) },
    { id: 'CH3', name: 'Threat response', readout: 'MITIGATED', ...trace(83, 2, 136) },
    { id: 'CH4', name: 'Performance optimisation', readout: 'TUNED', ...trace(29, 4) },
  ];
}
