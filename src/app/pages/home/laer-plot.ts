import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';

@Component({
  selector: 'app-laer-plot',
  imports: [Icon],
  hostDirectives: [InView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure aria-label="Schematic of the LAER cycle: value realised rises through Land, Adopt, Expand and Renew, crossing the business KPI target.">
      <div class="axis-y label" aria-hidden="true">Value realised</div>
      <div class="plot">
        <svg viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
          @for (x of [100, 200, 300]; track x) {
            <line [attr.x1]="x" [attr.x2]="x" y1="0" y2="100" class="grid" />
          }
          <line x1="0" x2="400" y1="52" y2="52" class="limit" />
          <path
            class="trace"
            d="M0 92 L60 88 L100 72 L150 66 L200 46 L250 38 L300 24 L350 20 L400 12"
          />
        </svg>
        <span class="limit-tag label">Business KPI target</span>
        <span class="schematic label">Schematic, not client data</span>
      </div>
      <ol class="phases">
        @for (p of phases; track p.name) {
          <li>
            <span class="leader" aria-hidden="true"></span>
            <strong>{{ p.name }}</strong>
            <span>{{ p.does }}</span>
          </li>
        }
      </ol>
      <figcaption>
        <app-icon name="replay" />
        <span>Renew feeds the next Land: the cycle repeats as your KPIs move.</span>
      </figcaption>
    </figure>
  `,
  styles: `
    :host {
      display: block;
    }
    figure {
      margin: 0;
      display: grid;
      grid-template-columns: 22px 1fr;
      column-gap: 10px;
    }
    .axis-y {
      grid-row: 1;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      text-align: center;
      color: var(--ink-3);
      font-size: 0.6875rem;
    }
    .plot {
      position: relative;
      height: 220px;
      border-left: 1px solid var(--ink);
      border-bottom: 1px solid var(--ink);
    }
    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .grid {
      stroke: var(--rule);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }
    .limit {
      stroke: var(--ink-2);
      stroke-width: 1.5;
      stroke-dasharray: 6 5;
      vector-effect: non-scaling-stroke;
    }
    .trace {
      fill: none;
      stroke: var(--brand-7);
      stroke-width: 3;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
      clip-path: inset(-10% 0 -10% 0);
      transition: clip-path 1.8s var(--ease-out) 0.2s;
    }
    :host:not(.is-in) .trace {
      clip-path: inset(-10% 100% -10% 0);
    }
    .limit-tag {
      position: absolute;
      right: 0;
      top: calc(52% + 6px);
      color: var(--ink-2);
      font-size: 0.6875rem;
    }
    .schematic {
      position: absolute;
      left: 10px;
      top: 6px;
      color: var(--ink-3);
      font-size: 0.625rem;
    }
    .phases {
      grid-column: 2;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      display: flex;
      flex-direction: column;
      padding: 0 10px 0 0;
      font-size: 0.8125rem;
      color: var(--ink-2);
      line-height: 1.35;
    }
    .leader {
      width: 1px;
      height: 16px;
      margin-bottom: 8px;
      background: var(--ink);
    }
    li strong {
      color: var(--ink);
      font-size: 1rem;
      font-weight: 750;
      font-stretch: 110%;
    }
    figcaption {
      grid-column: 2;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 18px;
      font-size: 0.875rem;
      color: var(--ink-2);
    }
    figcaption app-icon {
      width: 18px;
      color: var(--accent);
    }
    @media (max-width: 520px) {
      .plot {
        height: 170px;
      }
      li {
        font-size: 0.75rem;
      }
      li strong {
        font-size: 0.875rem;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host:not(.is-in) .trace {
        clip-path: none;
      }
    }
  `,
})
export class LaerPlot {
  protected readonly phases = [
    { name: 'Land', does: 'Implement' },
    { name: 'Adopt', does: 'Train your teams' },
    { name: 'Expand', does: 'Maximise the investment' },
    { name: 'Renew', does: 'Refresh & renew' },
  ];
}
