import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../ui/icon';
import { PageHero } from '../../ui/d/page-hero';
import { useThemeD } from '../../ui/d/theme';

/** Unknown routes (and unknown solution or case-study slugs). */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Icon, PageHero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      eyebrow="Page not found"
      heading="This page isn’t on the network"
      [accent]="2"
      lede="The address may have changed. Everything Epta Layers offers is one step away."
    >
      <a ctas class="d-pill d-pill--fill" routerLink="/">Back to home <app-icon name="arrow" /></a>
      <a ctas class="d-pill d-pill--line" routerLink="/solutions">Our solutions</a>
      <a ctas class="d-pill d-pill--line" routerLink="/contact">Contact</a>
    </app-page-hero>
  `,
})
export class NotFound {
  constructor() {
    useThemeD();
  }
}
