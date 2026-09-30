import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CASE_STUDIES, CONTACT } from '../../content/site';
import { Icon } from '../../ui/icon';

@Component({
  selector: 'app-case-files',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tabs" role="tablist" aria-label="Case studies" (keydown)="onKey($event)">
      @for (c of cases; track c.id; let i = $index) {
        <button
          type="button"
          role="tab"
          [id]="'tab-' + c.id"
          [attr.aria-selected]="i === active()"
          [attr.aria-controls]="'panel-' + c.id"
          [tabIndex]="i === active() ? 0 : -1"
          (click)="active.set(i)"
        >
          <span class="data">{{ c.id }}</span>
          <span class="sector">{{ c.sector }}</span>
        </button>
      }
    </div>

    <div class="stack">
      @for (c of cases; track c.id; let i = $index) {
        @if (i === active()) {
          <article
            class="file"
            role="tabpanel"
            [id]="'panel-' + c.id"
            [attr.aria-labelledby]="'tab-' + c.id"
          >
            <header>
              <div>
                <h3>{{ c.title }}</h3>
                <p class="client">{{ c.client }}</p>
              </div>
              <span class="verdict"><app-icon name="check" />SIGNED OFF</span>
            </header>

            <div class="body">
              <div class="challenge">
                <h4 class="label">Condition found</h4>
                <p>{{ c.challenge }}</p>
              </div>
              <table class="results">
                <caption class="label">Result recorded</caption>
                <tbody>
                  @for (r of c.results; track r.measure) {
                    <tr>
                      <th scope="row">{{ r.measure }}</th>
                      <td [class.data]="isMeasure(r.value)" [class.num]="isMeasure(r.value)">
                        {{ r.value }}
                        @if (band(r.value); as b) {
                          <span class="gauge" aria-hidden="true">
                            <span class="track">
                              <span class="band" [style.left.%]="b[0]" [style.width.%]="b[1] - b[0]">
                                <i class="leader"></i>
                              </span>
                            </span>
                            <span class="scale"><b>0</b><b>50</b><b>100</b></span>
                            <span class="gnote">Wi-Fi connectivity accuracy, post-implementation · no pre-project baseline stated</span>
                          </span>
                        }
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <footer>
              <a class="btn btn--ghost" [routerLink]="['/case-studies', c.slug]">
                Read the full report <app-icon name="arrow" />
              </a>
              <span class="ask">
                Details: <a [href]="'mailto:' + contact.caseStudies">{{ contact.caseStudies }}</a>
              </span>
            </footer>
          </article>
        }
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .tabs {
      display: flex;
      gap: 4px;
      padding-left: 20px;
    }
    [role='tab'] {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      min-width: 150px;
      padding: 10px 16px 12px;
      border: 0;
      border-radius: 3px 3px 0 0;
      background: var(--sheet-deep);
      color: var(--ink-2);
      text-align: left;
      cursor: pointer;
      transition: background-color 0.25s var(--ease-out);
    }
    [role='tab'] .data {
      font-size: 0.625rem;
    }
    .sector {
      font-weight: 700;
      font-stretch: 92%;
    }
    [role='tab']:hover {
      background: var(--sheet-under);
      color: var(--ink);
    }
    [role='tab'][aria-selected='true'] {
      background: var(--sheet);
      color: var(--ink);
    }
    .stack {
      position: relative;
    }
    .file {
      position: relative;
      background: var(--sheet);
      border: 1px solid var(--rule);
      border-radius: 0 2px 2px 2px;
      padding: 36px 40px 28px;
      animation: slide 0.5s var(--ease-out);
    }
    @keyframes slide {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      padding-bottom: 20px;
      border-bottom: 2px solid var(--ink);
    }
    h3 {
      font-size: clamp(1.6rem, 3vw, 2.4rem);
      font-stretch: 112%;
    }
    .client {
      margin-top: 8px;
      color: var(--ink-2);
    }
    .body {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 40px;
      padding-block: 24px;
    }
    .label {
      display: block;
      color: var(--ink-3);
      font-size: 0.6875rem;
      text-align: left;
      margin-bottom: 10px;
    }
    .challenge p {
      max-width: 42ch;
    }
    .results {
      width: 100%;
      border-collapse: collapse;
    }
    .results tr {
      border-top: 1px solid var(--rule);
    }
    .results th {
      padding: 12px 16px 12px 0;
      text-align: left;
      font-weight: 400;
      color: var(--ink-2);
      font-size: 0.9375rem;
      width: 46%;
    }
    .results td {
      padding: 12px 0;
      font-size: 0.9375rem;
      font-weight: 600;
      line-height: 1.4;
    }
    .gauge {
      display: block;
      margin: 24px 36px 8px 0;
      max-width: 260px;
      font-family: var(--font-sans);
    }
    .track {
      display: block;
      position: relative;
      height: 6px;
      background: var(--sheet-deep);
    }
    .band {
      position: absolute;
      top: 0;
      bottom: 0;
      background: var(--pass);
    }
    .leader {
      position: absolute;
      left: 50%;
      bottom: 100%;
      width: 1px;
      height: 16px;
      background: var(--ink);
    }
    .scale {
      display: flex;
      justify-content: space-between;
      padding-top: 8px;
    }
    .gnote {
      display: block;
      margin-top: 6px;
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 1.35;
      color: var(--ink-3);
    }
    .scale b {
      font-size: 0.6875rem;
      font-weight: 500;
      color: var(--ink-3);
    }
    .results td.num {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--pass-ink);
    }
    footer {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding-top: 20px;
      border-top: 1px solid var(--rule);
    }
    .ask {
      font-size: 0.875rem;
      color: var(--ink-2);
    }
    .ask a {
      color: var(--accent);
    }
    @media (max-width: 860px) {
      .body {
        grid-template-columns: 1fr;
        gap: 24px;
      }
      .file {
        padding: 24px 20px 20px;
      }
      header {
        flex-direction: column-reverse;
        gap: 12px;
      }
      .tabs {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        padding-left: 0;
      }
      [role='tab'] {
        min-width: 0;
        padding: 10px 10px;
      }
      .sector {
        font-size: 0.8125rem;
        overflow-wrap: anywhere;
      }
    }
  `,
})
export class CaseFiles {
  protected readonly cases = CASE_STUDIES;
  protected readonly contact = CONTACT;
  protected readonly active = signal(0);
  protected readonly current = computed(() => this.cases[this.active()]);

  /** A percentage range like "90–95%" becomes a reading band on a 0–100 scale. */
  protected band(v: string): [number, number] | null {
    const m = /^(\d+)–(\d+)%$/.exec(v);
    return m ? [+m[1], +m[2]] : null;
  }

  protected isMeasure(v: string): boolean {
    return /^[\d,.–+%\s]+$/.test(v);
  }

  protected onKey(e: KeyboardEvent): void {
    const n = this.cases.length;
    let next = this.active();
    if (e.key === 'ArrowRight') next = (next + 1) % n;
    else if (e.key === 'ArrowLeft') next = (next - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    else return;
    e.preventDefault();
    this.active.set(next);
    document.getElementById(`tab-${this.cases[next].id}`)?.focus();
  }
}
