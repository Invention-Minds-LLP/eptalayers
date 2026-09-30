import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Icon } from '../../ui/icon';

/** Shared by routes still being built (`pending`) and unknown URLs (404). */
@Component({
  selector: 'app-status-page',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="wrap">
      <div class="stack">
      <div class="sheet">
        <div class="head">
          <span class="data">{{ pending() ? 'STATUS: IN BUILD' : 'ERROR 404' }}</span>
          <span class="data path">{{ url }}</span>
        </div>
        @if (pending()) {
          <h1>{{ title() }} is being wired up.</h1>
          <p>This page is part of the Epta Layers site and is still being built. In the meantime, an engineer can answer directly.</p>
        } @else {
          <h1>No link on this port.</h1>
          <p>We tested the address and nothing answered. The page may have moved, or the link may be mistyped.</p>
        }
        <div class="ctas">
          <a class="btn" routerLink="/">Back to home <app-icon name="arrow" /></a>
          <a class="btn btn--ghost" routerLink="/contact">Talk to an engineer</a>
        </div>
      </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      padding-block: 96px 128px;
      min-height: 60vh;
    }
    .stack {
      position: relative;
      max-width: 760px;
    }
    .sheet {
      position: relative;
      background: var(--sheet);
      padding: 32px 40px 40px;
      border-top: 6px solid var(--ink);
    }
    .head {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 14px;
      margin-bottom: 32px;
      border-bottom: 2px solid var(--ink);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--limit-ink);
    }
    .path {
      color: var(--ink-3);
      font-weight: 400;
      overflow-wrap: anywhere;
      text-align: right;
    }
    h1 {
      font-size: clamp(2rem, 4.5vw, 3.25rem);
      font-stretch: 110%;
    }
    p {
      margin-top: 16px;
      max-width: 52ch;
      color: var(--ink-2);
    }
    .ctas {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 32px;
    }
    @media (max-width: 560px) {
      .sheet {
        padding: 24px 18px 28px;
      }
    }
  `,
})
export class StatusPage {
  private readonly data = toSignal(inject(ActivatedRoute).data, {
    initialValue: {} as Record<string, unknown>,
  });
  protected readonly url = inject(Router).url;
  protected pending(): boolean {
    return !!this.data()['pending'];
  }
  protected title(): string {
    return (this.data()['title'] as string) ?? 'This page';
  }
}
