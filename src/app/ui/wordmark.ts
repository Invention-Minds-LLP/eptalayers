import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Client lockup: seven-step orange-to-pink mark + wordmark. `light` = ink wordmark (derived), `dark` = white original. */
@Component({
  selector: 'app-wordmark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      [src]="ground() === 'dark' ? 'brand/epta-layers-logo-dark.png' : 'brand/epta-layers-logo-light.png'"
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
  `,
})
export class Wordmark {
  readonly height = input(34);
  readonly ground = input<'light' | 'dark'>('light');
}
