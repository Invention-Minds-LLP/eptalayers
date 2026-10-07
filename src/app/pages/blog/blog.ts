import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InView } from '../../ui/in-view';
import { CtaBand } from '../../ui/d/cta-band';
import { PageHero } from '../../ui/d/page-hero';
import { useThemeD } from '../../ui/d/theme';

/** Epta Insights (content section 14). No articles exist yet, so the three slots say so plainly. */
@Component({
  selector: 'app-blog',
  imports: [InView, PageHero, CtaBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      eyebrow="Epta Insights"
      heading="Latest Articles & Expertise"
      [accent]="1"
      photo="photos/l6-code.webp"
      lede="Welcome to the Epta Layers Blog. Here we share our deep understanding of IT networks and infrastructure, drawing on our foundational approach to the 7 layers of the OSI model."
    />

    <section class="d-band d-band--light" aria-labelledby="bl-title">
      <div class="wrap">
        <div class="d-head d-reveal" appInView>
          <div>
            <p class="d-eyebrow">Articles</p>
            <h2 id="bl-title" class="d-h2">Insights on the way</h2>
            <p class="d-lede">
              This blog is designed to extend our commitment to delivering the best possible customer experience by
              sharing valuable insights and expertise on topics central to our comprehensive solution offerings.
            </p>
          </div>
        </div>
        <ul class="d-cards d-stagger" appInView>
          @for (k of [1, 2, 3]; track k) {
            <li class="d-card slot">
              <span class="shim img" aria-hidden="true"></span>
              <span class="shim line" aria-hidden="true"></span>
              <span class="shim line short" aria-hidden="true"></span>
              <p>Article coming soon</p>
            </li>
          }
        </ul>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: `
    .slot {
      gap: 14px;
    }
    .shim {
      display: block;
      border-radius: 6px;
      background: linear-gradient(90deg, #eef1f7 0%, #f8f9fc 40%, #eef1f7 80%);
      background-size: 200% 100%;
      animation: shimmer 1.8s linear infinite;
    }
    .img {
      aspect-ratio: 16 / 9;
    }
    .line {
      height: 14px;
    }
    .short {
      width: 60%;
    }
    @keyframes shimmer {
      to {
        background-position: -200% 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .shim {
        animation: none;
      }
    }
  `,
})
export class Blog {
  constructor() {
    useThemeD();
  }
}
