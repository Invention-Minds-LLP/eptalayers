import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SOLUTION_OVERVIEW, SOLUTION_PAGES } from '../../content/solution-pages';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';
import { CtaBand } from '../../ui/d/cta-band';
import { PageHero } from '../../ui/d/page-hero';
import { useThemeD } from '../../ui/d/theme';

/** Solutions overview (content section 6). */
@Component({
  selector: 'app-solutions-index',
  imports: [RouterLink, Icon, InView, PageHero, CtaBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      eyebrow="Epta Solutions"
      heading="Tailored IT Infrastructure for Your Business"
      [accent]="2"
      photo="photos/l3-routes.webp"
      lede="Epta assists in visualizing and communicating how IT Networks operate, with a keen focus on network architecture. As a single-point enterprise solutions provider, we work with IT world leaders to deliver tailor-made solutions that address your problem areas and align with your business KPIs."
    >
      <a ctas class="d-pill d-pill--fill" href="#offerings">Our solution offerings <app-icon name="arrow" /></a>
    </app-page-hero>

    <section class="d-band d-band--deep" aria-labelledby="fw-title">
      <div class="wrap d-split">
        <div class="d-reveal" appInView>
          <p class="d-eyebrow">Our service framework</p>
          <h2 id="fw-title" class="d-h2">Rooted in the <span class="d-em">7 layers of the OSI model</span></h2>
        </div>
        <div class="d-reveal" appInView style="--i: 1">
          <div class="d-prose">
            <p>
              Our comprehensive service framework is rooted in the 7 layers of the OSI model, ensuring we understand your
              unique needs based on your line of business before designing a customized networking solution. As a part
              of our service delivery model, our expert team develops a preliminary blueprint of your business to assist
              in hardware supply, implementation, and post-implementation support.
            </p>
          </div>
          <ol class="flow d-stagger" appInView>
            @for (s of flow; track s; let i = $index) {
              <li><span class="d-num">{{ '0' + (i + 1) }}</span>{{ s }}</li>
            }
          </ol>
        </div>
      </div>
    </section>

    <section id="offerings" class="d-band d-band--light" aria-labelledby="off-title">
      <div class="wrap">
        <div class="d-head d-reveal" appInView>
          <div>
            <p class="d-eyebrow">Our solution offerings</p>
            <h2 id="off-title" class="d-h2">Seven Solution Areas. <span class="d-em">One Accountable Partner.</span></h2>
          </div>
        </div>
        <ol class="rows">
          @for (s of pages; track s.slug; let i = $index) {
            <li class="row d-reveal" appInView>
              <span class="idx">{{ i < 9 ? '0' + (i + 1) : i + 1 }}</span>
              <div class="ph"><img [src]="s.photo" alt="" loading="lazy" /></div>
              <div class="txt">
                <h3 class="d-h3">{{ s.name }}</h3>
                <p class="line">{{ overview[s.slug].line }}</p>
                <p>{{ overview[s.slug].text }}</p>
                <a class="d-link" [routerLink]="['/solutions', s.slug]">{{ overview[s.slug].cta }} <app-icon name="arrow" /></a>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>

    <app-cta-band
      text="Talk to an Epta engineer about your network, security, collaboration and data center needs."
      label="Talk to an Engineer"
    />
  `,
  styles: `
    .flow {
      list-style: none;
      margin: 28px 0 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }
    .flow li {
      display: grid;
      gap: 6px;
      padding: 16px 18px;
      border: 1px solid var(--navy-line);
      border-radius: 8px;
      font-weight: 600;
    }
    .rows {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
    }
    .row {
      display: grid;
      grid-template-columns: 56px 220px minmax(0, 1fr);
      gap: 32px;
      align-items: start;
      padding: 32px 0;
      border-top: 1px solid var(--line-l);
    }
    .row:last-child {
      border-bottom: 1px solid var(--line-l);
    }
    .idx {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--orange);
      padding-top: 4px;
    }
    .ph {
      overflow: hidden;
      aspect-ratio: 4 / 3;
      border-radius: 8px;
    }
    .ph img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(0.85);
      transition: transform 0.9s var(--ease-out);
    }
    .row:hover .ph img {
      transform: scale(1.07);
    }
    .txt {
      display: grid;
      gap: 10px;
      justify-items: start;
    }
    .txt p {
      margin: 0;
      max-width: 70ch;
      line-height: 1.7;
      color: var(--muted-l);
    }
    .txt .line {
      color: var(--ink-l);
      font-weight: 600;
    }
    @media (max-width: 760px) {
      .row {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .flow {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class SolutionsIndex {
  protected readonly pages = SOLUTION_PAGES;
  protected readonly overview = SOLUTION_OVERVIEW;
  protected readonly flow = ['Preliminary blueprint of your business', 'Hardware supply', 'Implementation', 'Post-implementation support'];

  constructor() {
    useThemeD();
  }
}
