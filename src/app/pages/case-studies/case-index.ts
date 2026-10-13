import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CASE_PAGES } from '../../content/case-pages';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';
import { Parallax } from '../../ui/parallax';
import { CountUp } from '../../ui/d/count-up';
import { CtaBand } from '../../ui/d/cta-band';
import { PageHero } from '../../ui/d/page-hero';
import { useThemeD } from '../../ui/d/theme';

/** Case studies index (content section 5). */
@Component({
  selector: 'app-case-index',
  imports: [RouterLink, Icon, InView, Parallax, CountUp, PageHero, CtaBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      eyebrow="IT Infrastructure Case Studies"
      heading="Businesses That Kept Moving"
      [accent]="2"
      photo="photos/case-building.webp"
      lede="Real projects, real results. See how Epta Layers fixed networks, security and data centers for three very different companies."
    />

    <section class="d-band d-band--light" aria-label="Case studies">
      <div class="wrap list">
        @for (c of cases; track c.slug; let i = $index) {
          <article class="item d-reveal" appInView [class.flip]="i % 2 === 1">
            <a class="photo" [routerLink]="['/case-studies', c.slug]" appParallax="0.1" tabindex="-1" aria-hidden="true">
              <img [src]="c.photo" alt="" loading="lazy" />
              <span class="tag">{{ c.sector }}</span>
            </a>
            <div class="body">
              <p class="d-eyebrow">Case study · {{ c.sector }}</p>
              <h2 class="d-h2">{{ c.title }}</h2>
              <p class="d-lede">{{ c.teaser }}</p>
              <dl class="figs">
                @for (f of c.figures; track f.label) {
                  <div>
                    <dt [appCountUp]="f.value">{{ f.value }}</dt>
                    <dd>{{ f.label }}</dd>
                  </div>
                }
              </dl>
              <a class="d-link" [routerLink]="['/case-studies', c.slug]">Click to read <app-icon name="arrow" /></a>
            </div>
          </article>
        }
      </div>
    </section>

    <app-cta-band
      heading="Let’s Build a Connected Future Together"
      text="Want the full story behind a project? An Epta Layers engineer will walk you through it."
      label="Talk to an Engineer"
    />
  `,
  styles: `
    .list {
      display: grid;
      gap: 96px;
    }
    .item {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 56px;
      align-items: center;
    }
    .item.flip .photo {
      order: 2;
    }
    .photo {
      position: relative;
      display: block;
      overflow: hidden;
      aspect-ratio: 4 / 3;
      border-radius: 10px;
    }
    .photo img {
      position: absolute;
      left: 0;
      top: -10%;
      width: 100%;
      height: 120%;
      object-fit: cover;
      transform: translate3d(0, var(--py, 0px), 0);
      transition: scale 0.9s var(--ease-out);
    }
    .photo:hover img {
      scale: 1.05;
    }
    .tag {
      position: absolute;
      left: 16px;
      bottom: 16px;
      padding: 7px 14px;
      border-radius: 999px;
      background: rgb(10 20 48 / 0.8);
      color: #fff;
      font-size: 0.8125rem;
      font-weight: 600;
    }
    .body .d-h2 {
      font-size: clamp(1.5rem, 2.4vw, 2rem);
    }
    .figs {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin: 28px 0;
    }
    .figs div {
      padding-top: 14px;
      border-top: 2px solid var(--orange);
    }
    dt {
      font-size: clamp(1.6rem, 2.6vw, 2.2rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }
    dd {
      margin: 6px 0 0;
      font-size: 0.8125rem;
      color: var(--muted-l);
    }
    @media (max-width: 900px) {
      .item {
        grid-template-columns: 1fr;
        gap: 28px;
      }
      .item.flip .photo {
        order: 0;
      }
      .list {
        gap: 72px;
      }
    }
  `,
})
export class CaseIndex {
  protected readonly cases = CASE_PAGES;

  constructor() {
    useThemeD();
  }
}
