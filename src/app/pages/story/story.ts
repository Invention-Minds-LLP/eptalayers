import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT, OSI } from '../../content/site';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';
import { CtaBand } from '../../ui/d/cta-band';
import { PageHero } from '../../ui/d/page-hero';
import { RackShow } from '../../ui/d/rack-show';
import { useThemeD } from '../../ui/d/theme';

/** The Epta story (content section 2): the name, the 7 layers, the founder, careers. */
@Component({
  selector: 'app-story',
  imports: [RouterLink, Icon, InView, PageHero, CtaBand, RackShow],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      eyebrow="The Epta story"
      heading="A Single-Point Enterprise Solutions Provider"
      [accent]="3"
      photo="photos/city-dusk.webp"
      lede="Epta Layers is a single-point enterprise solutions provider that works with IT world leaders to deliver tailor-made solutions for networking and communication Infrastructure."
    />

    <!-- the name: seven, and the 7 layers -->
    <section class="d-band d-band--deep" aria-labelledby="osi-title">
      <div class="wrap d-split osi">
        <div class="d-reveal" appInView>
          <p class="d-eyebrow">Open Systems Interconnection (OSI) model</p>
          <h2 id="osi-title" class="d-h2">Epta stands for <span class="d-em">‘seven’</span> in Greek</h2>
          <p class="d-lede">
            It encapsulates our vision to focus on the 7 layers of networking in the OSI model.
          </p>
          <ol class="layers d-stagger" appInView>
            @for (l of osi; track l.n) {
              <li><b>{{ l.n }}</b><span>{{ l.name }}</span></li>
            }
          </ol>
        </div>
        <div class="d-reveal" appInView style="--i: 1"><app-rack-show /></div>
      </div>
    </section>

    <!-- behind Epta Layers -->
    <section class="d-band d-band--light" aria-labelledby="fd-title">
      <div class="wrap">
        <div class="d-split founder">
          <div class="d-reveal" appInView>
            <p class="d-eyebrow">Behind Epta Layers</p>
            <div class="card">
              <span class="mono" aria-hidden="true">SB</span>
              <div>
                <h2 id="fd-title" class="name">Santosh Baragur</h2>
                <p class="role">Founder, Epta Layers Pvt. Ltd.</p>
              </div>
            </div>
          </div>
          <div class="d-prose d-reveal" appInView style="--i: 1">
            <p class="big">
              After spending more than 20 years in Sales and Business Development for the Enterprise IT segment, I
              launched Epta Layers Pvt. Ltd. where I drive business continuity and IT transformation.
            </p>
            <p>My expertise lies in effectively identifying, satisfying, and retaining customers.</p>
          </div>
        </div>
        <ul class="d-cards trio d-stagger" appInView>
          @for (c of craft; track c.name; let i = $index) {
            <li class="d-card">
              <span class="d-num">0{{ i + 1 }}</span>
              <h3 class="d-h3">{{ c.name }}</h3>
              <ul class="d-checks">
                @for (p of c.points; track p) {
                  <li>{{ p }}</li>
                }
              </ul>
            </li>
          }
        </ul>
      </div>
    </section>

    <!-- careers -->
    <section class="d-band d-band--deep" aria-labelledby="cr-title">
      <div class="wrap careers d-reveal" appInView>
        <div>
          <p class="d-eyebrow">Careers</p>
          <h2 id="cr-title" class="d-h2">Shape the Connected World with Us</h2>
          <p class="d-lede">
            To apply for a position at Epta Layers, please send a cover letter together with your resume to
            <a [href]="'mailto:' + hr">{{ hr }}</a>
          </p>
        </div>
        <a class="d-pill d-pill--line" routerLink="/careers">Careers at Epta <app-icon name="arrow" /></a>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: `
    .osi {
      align-items: center;
    }
    .layers {
      list-style: none;
      margin: 28px 0 0;
      padding: 0;
      display: grid;
      gap: 8px;
    }
    .layers li {
      display: grid;
      grid-template-columns: 40px 1fr;
      align-items: center;
      gap: 14px;
      padding: 10px 14px;
      border: 1px solid var(--navy-line);
      border-radius: 8px;
      font-weight: 600;
    }
    .layers b {
      display: grid;
      place-items: center;
      height: 30px;
      border-radius: 6px;
      background: var(--hot);
      font-size: 0.875rem;
    }
    .founder {
      align-items: center;
      margin-bottom: 48px;
    }
    .card {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 22px;
    }
    .mono {
      display: grid;
      place-items: center;
      flex: none;
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background: var(--hot);
      color: #fff;
      font-size: 1.6rem;
      font-weight: 700;
      box-shadow: 0 0 0 8px rgb(255 95 39 / 0.12);
    }
    .name {
      margin: 0;
      font-size: clamp(1.6rem, 2.6vw, 2.2rem);
      font-weight: 700;
    }
    .role {
      margin: 6px 0 0;
      color: var(--muted-l);
    }
    .big {
      font-size: 1.25rem !important;
      line-height: 1.55 !important;
      color: var(--ink-l) !important;
      font-weight: 600;
    }
    .trio .d-checks {
      margin-top: 8px;
      color: var(--muted-l);
    }
    .careers {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 32px;
    }
    .careers a:not(.d-pill) {
      color: var(--orange);
      font-weight: 600;
    }
    @media (max-width: 760px) {
      .careers {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `,
})
export class Story {
  protected readonly osi = OSI;
  protected readonly hr = CONTACT.hr;
  protected readonly craft = [
    {
      name: 'Identifying Customers',
      points: [
        'Recognizing and anticipating customer wants and needs.',
        'Segmenting the target market to better understand specific customer groups and their unique preferences.',
      ],
    },
    {
      name: 'Satisfying Customers',
      points: [
        'Ensuring the availability of the appropriate product or service to meet customers’ demands at the right time.',
        'Creating value for customers by providing products/services that exceed their expectations.',
      ],
    },
    {
      name: 'Retaining Customers',
      points: [
        'Fostering customer loyalty by consistently delivering exceptional experiences.',
        'Staying updated with innovative technology solutions to enhance customer engagement.',
      ],
    },
  ];

  constructor() {
    useThemeD();
  }
}
