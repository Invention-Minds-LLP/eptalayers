import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Client-supplied lockup (orange-to-pink seven-layer mark + white wordmark). Dark grounds only. */
@Component({
  selector: 'app-wordmark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
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
  `,
})
export class Wordmark {
  readonly height = input(34);
}
