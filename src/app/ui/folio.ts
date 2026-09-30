import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** The report's running foot: one report ID, sheet n of total, section name. */
@Component({
  selector: 'app-folio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <span class="data">EL-OSI-07</span>
    <span class="rule"></span>
    <span class="name">{{ name() }}</span>
    <span class="data">{{ pad(sheet()) }} / {{ pad(of()) }}</span>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 72px;
      font-size: 0.6875rem;
      color: var(--folio, var(--ink-3));
    }
    .data {
      font-size: 0.625rem;
    }
    .rule {
      flex: 1;
      height: 1px;
      background: currentColor;
      opacity: 0.35;
    }
    .name {
      font-stretch: 80%;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    @media (max-width: 560px) {
      :host {
        margin-top: 48px;
      }
    }
  `,
})
export class Folio {
  readonly sheet = input.required<number>();
  readonly of = input(8);
  readonly name = input.required<string>();

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
