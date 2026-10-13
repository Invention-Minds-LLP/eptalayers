import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CONTACT } from '../../content/site';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';
import { PageHero } from '../../ui/d/page-hero';
import { useThemeD } from '../../ui/d/theme';
import { SignOffForm } from '../home/sign-off-form';

/** Contact (content section 13). ?service= from a solution page's call to action preselects the Area. */
@Component({
  selector: 'app-contact',
  imports: [Icon, InView, PageHero, SignOffForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      eyebrow="Contact Epta Layers"
      heading="Let’s Build a Connected Future Together!"
      [accent]="3"
      photo="photos/city-dusk.webp"
      lede="Tell us about your sites and what isn’t working. An Epta Layers engineer will reply."
    />

    <section class="d-band d-band--light" aria-label="Get in touch">
      <div class="wrap d-split">
        <div class="d-reveal" appInView>
          <p class="d-eyebrow">Get in touch</p>
          <ul class="lines d-stagger" appInView>
            <li>
              <span class="ico"><app-icon name="phone" /></span>
              <span><small>Direct Line</small><a [href]="c.phoneHref">(+91) 9886-71-3131</a></span>
            </li>
            <li>
              <span class="ico"><app-icon name="mail" /></span>
              <span><small>Solutions Inquiry</small><a [href]="'mailto:' + c.info">{{ c.info }}</a></span>
            </li>
            <li>
              <span class="ico"><app-icon name="mail" /></span>
              <span><small>Careers</small><a [href]="'mailto:' + c.hr">{{ c.hr }}</a></span>
            </li>
          </ul>

          <p class="d-eyebrow offices-head">Office locations</p>
          <div class="offices d-stagger" appInView>
            <div class="office">
              <span class="pin"><app-icon name="pin" /></span>
              <b>Bangalore HQ</b>
              <small>Registered Office</small>
              <p>#47, 9th Cross, 5th Main<br />Srinidhi Layout - 560062</p>
            </div>
            <div class="office">
              <span class="pin"><app-icon name="pin" /></span>
              <b>Jayanagar Branch</b>
              <small>Next to Adishwar Electro World</small>
              <p>1st Floor, No 427/14-1<br />5th Block, Jayanagar - 560041</p>
            </div>
          </div>
        </div>

        <div class="panel d-reveal" appInView style="--i: 1">
          <p class="d-eyebrow">Contact form</p>
          <app-sign-off-form [preset]="service()" />
          <p class="careers">
            To apply for open positions, email cover letter + resume to <a [href]="'mailto:' + c.hr">{{ c.hr }}</a>
          </p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .lines {
      list-style: none;
      margin: 26px 0 0;
      padding: 0;
      display: grid;
      gap: 16px;
    }
    .lines li {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .ico,
    .pin {
      display: grid;
      place-items: center;
      flex: none;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #eef2fd;
      color: var(--blue);
      transition:
        background-color 0.3s ease,
        color 0.3s ease;
    }
    .ico app-icon,
    .pin app-icon {
      width: 20px;
    }
    .lines li:hover .ico {
      background: var(--hot);
      color: #fff;
    }
    .lines small,
    .office small {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted-l);
    }
    .lines a {
      color: var(--ink-l);
      font-size: 1.125rem;
      font-weight: 700;
      text-decoration: none;
    }
    .lines a:hover {
      color: var(--orange);
    }
    .offices-head {
      margin-top: 48px;
    }
    .offices {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      margin-top: 22px;
    }
    .office {
      display: grid;
      gap: 6px;
      padding: 22px;
      border: 1px solid var(--line-l);
      border-radius: 10px;
    }
    .office b {
      margin-top: 10px;
      font-size: 1.0625rem;
    }
    .office p {
      margin: 6px 0 0;
      line-height: 1.6;
      color: var(--muted-l);
    }
    .panel {
      padding: 36px;
      border-radius: 12px;
      background: var(--navy);
      color: #fff;
      --ink: #f1f0f5;
      --ink-3: #8f96b0;
      --rule-strong: rgb(185 191 210 / 0.34);
    }
    .panel app-sign-off-form {
      margin-top: 22px;
    }
    .careers {
      margin: 26px 0 0;
      padding-top: 20px;
      border-top: 1px solid var(--navy-line);
      font-size: 0.875rem;
      color: #c7cfe4;
    }
    .careers a {
      color: var(--orange);
      font-weight: 600;
    }
    @media (max-width: 560px) {
      .offices {
        grid-template-columns: 1fr;
      }
      .panel {
        padding: 24px 20px;
      }
    }
  `,
})
export class Contact {
  protected readonly c = CONTACT;
  protected readonly service = toSignal(inject(ActivatedRoute).queryParamMap.pipe(map((q) => q.get('service'))));

  constructor() {
    useThemeD();
  }
}
