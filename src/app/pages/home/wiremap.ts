import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';

interface Wire {
  pin: number;
  label: string;
  color: string;
  striped: boolean;
}

/** T568B pair colours, each wire carrying one part of the OEM-to-enterprise lifecycle. */
const WIRES: Wire[] = [
  { pin: 1, label: 'Architecture consulting', color: '#e07a1f', striped: true },
  { pin: 2, label: 'Hardware supply', color: '#e07a1f', striped: false },
  { pin: 3, label: 'OEM-certified implementation', color: '#2e8b57', striped: true },
  { pin: 4, label: 'Training', color: '#1e5aa8', striped: false },
  { pin: 5, label: 'Post-implementation support', color: '#1e5aa8', striped: true },
  { pin: 6, label: 'Licensing & subscriptions', color: '#2e8b57', striped: false },
  { pin: 7, label: 'Refresh cycles', color: '#7a4b2a', striped: true },
  { pin: 8, label: 'Long-term support', color: '#7a4b2a', striped: false },
];

@Component({
  selector: 'app-wiremap',
  imports: [Icon],
  hostDirectives: [InView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure>
      <div class="ends" aria-hidden="true">
        <span class="label">OEM technology</span>
        <span class="label">Your enterprise</span>
      </div>
      <ol class="map">
        @for (w of wires; track w.pin; let i = $index) {
          <li [style.--c]="w.color" [style.--d]="i * 70 + 'ms'">
            <span class="pin data">{{ w.pin }}</span>
            <span class="wire" [class.striped]="w.striped"></span>
            <span class="text">{{ w.label }}</span>
            <span class="pin data">{{ w.pin }}</span>
          </li>
        }
      </ol>
      <figcaption>
        <span class="verdict"><app-icon name="check" />PASS</span>
        <span>Wiremap straight-through: every pin lands where the OEM intended.</span>
      </figcaption>
    </figure>
  `,
  styles: `
    :host {
      display: block;
    }
    figure {
      margin: 0;
    }
    .ends {
      display: flex;
      justify-content: space-between;
      color: var(--ink-3);
      font-size: 0.6875rem;
      margin-bottom: 10px;
    }
    .map {
      list-style: none;
      margin: 0;
      padding: 12px 0;
      border-block: 1px solid var(--rule);
    }
    li {
      position: relative;
      display: grid;
      grid-template-columns: 28px 1fr 28px;
      align-items: end;
      height: 40px;
    }
    .pin {
      display: grid;
      place-items: center;
      height: 22px;
      background: var(--graphite-800);
      color: var(--on-graphite);
      font-size: 0.6875rem;
      font-weight: 700;
    }
    .wire {
      height: 6px;
      margin-bottom: 8px;
      background: var(--c);
      transform-origin: left center;
      transform: scaleX(1);
      transition: transform 0.9s var(--ease-out) var(--d);
    }
    .wire.striped {
      background: repeating-linear-gradient(90deg, var(--c) 0 10px, #fff 10px 20px);
      box-shadow: inset 0 0 0 1px rgb(22 25 28 / 0.12);
    }
    :host:not(.is-in) .wire {
      transform: scaleX(0.02);
    }
    .text {
      position: absolute;
      left: 36px;
      top: 2px;
      font-size: 0.8125rem;
      font-weight: 550;
      line-height: 1.2;
      transition: opacity 0.5s var(--ease-out) calc(var(--d) + 0.35s);
    }
    :host:not(.is-in) .text {
      opacity: 0;
    }
    figcaption {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 14px;
      font-size: 0.875rem;
      color: var(--ink-2);
    }
    @media (prefers-reduced-motion: reduce) {
      :host:not(.is-in) .wire {
        transform: none;
      }
      :host:not(.is-in) .text {
        opacity: 1;
      }
    }
  `,
})
export class Wiremap {
  protected readonly wires = WIRES;
}
