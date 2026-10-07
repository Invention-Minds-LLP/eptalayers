import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LegalBlock, LegalDoc, PRIVACY, TERMS } from '../../content/legal';
import { PageHero } from '../../ui/d/page-hero';
import { useThemeD } from '../../ui/d/theme';

/** Privacy Policy and Terms & Conditions, published as supplied, with a section index beside the text. */
@Component({
  selector: 'app-legal-page',
  imports: [PageHero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero eyebrow="Legal" [heading]="doc().title" [accent]="1" />

    <section class="d-band d-band--light legal" [attr.aria-label]="doc().title">
      <div class="wrap grid">
        <nav class="toc" aria-label="Sections">
          <p class="d-eyebrow">Sections</p>
          <ol>
            @for (s of doc().sections; track s.n) {
              <li><a [href]="'#s' + s.n" (click)="go($event, s.n)">{{ s.n }}. {{ s.title }}</a></li>
            }
          </ol>
        </nav>
        <article class="text">
          @for (b of doc().intro; track $index) {
            @if (para(b); as t) {
              <p>{{ t }}</p>
            } @else {
              <ul>
                @for (li of list(b); track $index) {
                  <li>{{ li }}</li>
                }
              </ul>
            }
          }
          @for (s of doc().sections; track s.n) {
            <h2 [id]="'s' + s.n">{{ s.n }}. {{ s.title }}</h2>
            @for (b of s.blocks; track $index) {
              @if (para(b); as t) {
                <p>{{ t }}</p>
              } @else {
                <ul>
                  @for (li of list(b); track $index) {
                    <li>{{ li }}</li>
                  }
                </ul>
              }
            }
          }
        </article>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr);
      gap: 64px;
      align-items: start;
    }
    .toc {
      position: sticky;
      top: 96px;
      max-height: calc(100svh - 120px);
      overflow: auto;
    }
    .toc ol {
      list-style: none;
      margin: 18px 0 0;
      padding: 0;
      display: grid;
      gap: 4px;
    }
    .toc a {
      display: block;
      padding: 6px 10px;
      border-left: 2px solid var(--line-l);
      color: var(--muted-l);
      font-size: 0.8125rem;
      line-height: 1.4;
      text-decoration: none;
      transition:
        color 0.2s ease,
        border-color 0.2s ease;
    }
    .toc a:hover {
      color: var(--ink-l);
      border-left-color: var(--orange);
    }
    .text {
      max-width: 76ch;
    }
    .text h2 {
      margin: 48px 0 14px;
      padding-top: 18px;
      border-top: 1px solid var(--line-l);
      font-size: 1.25rem;
      font-weight: 700;
      scroll-margin-top: 96px;
    }
    .text p,
    .text li {
      margin: 0 0 14px;
      line-height: 1.75;
      color: #3d4763;
      overflow-wrap: anywhere;
    }
    .text ul {
      margin: 0 0 14px;
      padding-left: 22px;
    }
    @media (max-width: 900px) {
      .grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .toc {
        position: static;
        max-height: none;
      }
    }
  `,
})
export class LegalPage {
  protected readonly doc = computed<LegalDoc>(() => (this.which === 'terms' ? TERMS : PRIVACY));
  private readonly which = inject(ActivatedRoute).snapshot.data['doc'] as string;

  constructor() {
    useThemeD();
  }

  protected para(b: LegalBlock) {
    return 'p' in b ? b.p : null;
  }

  protected list(b: LegalBlock) {
    return 'ul' in b ? b.ul : [];
  }

  /** in-page jump that keeps the route (anchor hrefs alone would be resolved against the base href) */
  protected go(e: Event, n: number) {
    e.preventDefault();
    document.getElementById('s' + n)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
