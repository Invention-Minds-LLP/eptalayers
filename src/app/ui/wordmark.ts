import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Client lockup: seven-step orange-to-pink mark + wordmark.
 * The ink-wordmark file (derived) shows on light pages; the client's original white-wordmark
 * file shows on dark pages (`body.theme-dusk`) or when `ground` is set to 'dark'.
 */
@Component({
  selector: 'app-wordmark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.force-dark]': "ground() === 'dark'" },
  template: `
    <img
      class="on-light"
      src="brand/epta-layers-logo-light.png"
      alt="Epta Layers"
      width="850"
      height="204"
      [style.height.px]="height()"
      decoding="async"
    />
    <img
      class="on-dark"
      src="brand/epta-layers-logo-dark.png"
      alt="Epta Layers"
      width="850"
      height="204"
      [style.height.px]="height()"
      decoding="async"
    />
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
    }
    img {
      width: auto;
      max-width: none;
    }
    .on-dark {
      display: none;
    }
    :host-context(.theme-dusk) .on-light,
    :host(.force-dark) .on-light {
      display: none;
    }
    :host-context(.theme-dusk) .on-dark,
    :host(.force-dark) .on-dark {
      display: block;
    }
  `,
})
export class Wordmark {
  readonly height = input(34);
  readonly ground = input<'light' | 'dark'>('light');
}
