import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT, SOLUTIONS } from '../content/site';
import { Wordmark } from '../ui/wordmark';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, Wordmark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrap grid">
      <div class="brand">
        <app-wordmark [height]="40" />
        <p>
          A single-point enterprise solutions provider for networking and communication
          infrastructure. Bangalore, India.
        </p>
      </div>

      <nav aria-label="Solutions">
        <h2 class="label">Solutions</h2>
        @for (s of solutions; track s.slug) {
          <a [routerLink]="['/solutions', s.slug]">{{ s.name }}</a>
        }
      </nav>

      <nav aria-label="Company">
        <h2 class="label">Company</h2>
        <a routerLink="/story">Epta story</a>
        <a routerLink="/vision-mission">Vision &amp; mission</a>
        <a routerLink="/case-studies">Case studies</a>
        <a routerLink="/careers">Careers</a>
        <a routerLink="/blog">Epta Insights</a>
        <a routerLink="/contact">Contact</a>
      </nav>

      <div class="reach">
        <h2 class="label">Reach us</h2>
        <a class="data" [href]="contact.phoneHref">{{ contact.phoneDisplay }}</a>
        <a [href]="'mailto:' + contact.info">{{ contact.info }}</a>
        <a [href]="'mailto:' + contact.hr">{{ contact.hr }}</a>
        @for (o of contact.offices; track o.name) {
          <address>
            <strong>{{ o.name }}</strong>
            @for (l of o.lines; track l) {
              <span>{{ l }}</span>
            }
          </address>
        }
      </div>
    </div>

    <div class="wrap legal">
      <span>© {{ year }} Epta Layers Pvt. Ltd.</span>
      <span class="links">
        <a routerLink="/privacy">Privacy policy</a>
        <a routerLink="/terms">Terms &amp; conditions</a>
      </span>
      <span class="credit">
        Designed and developed by
        <a href="https://inventionminds.com/" target="_blank" rel="noopener">
          Invention Minds LLP<span class="sr-only"> (opens in a new tab)</span>
        </a>
      </span>
    </div>
  `,
  styles: `
    :host {
      display: block;
      background: var(--sheet);
      color: var(--ink);
      border-top: 6px solid var(--ink);
      padding-top: 72px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr 0.8fr 1.1fr;
      gap: 48px;
      padding-bottom: 64px;
    }
    .brand p {
      margin-top: 20px;
      max-width: 34ch;
      color: var(--ink-2);
      font-size: 0.9375rem;
    }
    h2 {
      color: var(--ink-3);
      margin-bottom: 16px;
      font-size: 0.75rem;
    }
    nav,
    .reach {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    a {
      color: var(--ink);
      text-decoration: none;
      font-size: 0.9375rem;
    }
    a:hover {
      color: var(--accent);
      text-decoration: underline;
      text-decoration-color: var(--brand-1);
    }
    .reach .data {
      font-size: 0.875rem;
    }
    address {
      display: flex;
      flex-direction: column;
      margin-top: 12px;
      font-style: normal;
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--ink-2);
    }
    address strong {
      color: var(--ink);
      font-weight: 600;
    }
    .legal {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      padding-block: 24px 32px;
      border-top: 1px solid var(--rule);
      color: var(--ink-3);
      font-size: 0.875rem;
    }
    .links {
      display: flex;
      gap: 24px;
    }
    .links a {
      font-size: 0.875rem;
      color: var(--ink-2);
    }
    .credit {
      flex-basis: 100%;
      color: var(--ink-3);
    }
    .credit a {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--ink-2);
      text-decoration: underline;
      text-decoration-color: var(--brand-1);
      text-underline-offset: 0.25em;
    }
    @media (max-width: 960px) {
      .grid {
        grid-template-columns: 1fr 1fr;
      }
      .brand {
        grid-column: 1 / -1;
      }
    }
    @media (max-width: 560px) {
      .grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }
  `,
})
export class SiteFooter {
  protected readonly solutions = SOLUTIONS;
  protected readonly contact = CONTACT;
  protected readonly year = new Date().getFullYear();
}
