import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONTACT, NAV } from '../content/site';
import { Icon } from '../ui/icon';
import { Wordmark } from '../ui/wordmark';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, Icon, Wordmark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'open.set(false)' },
  template: `
    <a class="skip" href="#main">Skip to content</a>
    <div class="wrap bar">
      <a routerLink="/" class="home" aria-label="Epta Layers — home" (click)="open.set(false)">
        <app-wordmark />
      </a>

      <nav class="nav" aria-label="Primary">
        @for (item of nav; track item.path) {
          <a [routerLink]="item.path" routerLinkActive="is-active">{{ item.label }}</a>
        }
      </nav>

      <div class="actions">
        <a class="phone data" [href]="contact.phoneHref">{{ contact.phoneDisplay }}</a>
        <a class="btn" routerLink="/contact">Talk to an engineer</a>
        <button
          class="toggle"
          type="button"
          [attr.aria-expanded]="open()"
          aria-controls="mobile-nav"
          (click)="open.set(!open())"
        >
          <app-icon [name]="open() ? 'close' : 'menu'" />
          <span class="sr-only">{{ open() ? 'Close menu' : 'Open menu' }}</span>
        </button>
      </div>
    </div>

    @if (open()) {
      <nav id="mobile-nav" class="drawer" aria-label="Mobile">
        <div class="wrap">
          @for (item of nav; track item.path) {
            <a [routerLink]="item.path" (click)="open.set(false)">
              {{ item.label }}
              <app-icon name="arrow" />
            </a>
          }
          <a routerLink="/contact" (click)="open.set(false)">
            Contact
            <app-icon name="arrow" />
          </a>
          <a class="drawer-phone data" [href]="contact.phoneHref">
            <app-icon name="phone" />
            {{ contact.phoneDisplay }}
          </a>
        </div>
      </nav>
    }
  `,
  styles: `
    :host {
      position: sticky;
      top: 0;
      z-index: 40;
      display: block;
      background: var(--sheet);
      color: var(--ink);
      border-bottom: 1px solid var(--rule);
    }
    .skip {
      position: absolute;
      left: 12px;
      top: 10px;
      transform: translateY(-200%);
      opacity: 0;
      padding: 10px 14px;
      background: var(--sheet);
      color: var(--ink);
      font-weight: 600;
      z-index: 2;
    }
    .skip:focus {
      transform: none;
      opacity: 1;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 32px;
      height: 72px;
    }
    .home {
      text-decoration: none;
    }
    .nav {
      display: flex;
      gap: 4px;
      margin-right: auto;
    }
    .nav a {
      position: relative;
      padding: 8px 12px;
      color: var(--ink-2);
      text-decoration: none;
      font-size: 0.9375rem;
      font-weight: 500;
      font-stretch: 92%;
      transition: color 0.2s var(--ease-out);
    }
    .nav a::after {
      content: '';
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 2px;
      height: 2px;
      background: var(--brand-1);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.35s var(--ease-out);
    }
    .nav a:hover,
    .nav a.is-active {
      color: var(--ink);
    }
    .nav a:hover::after,
    .nav a.is-active::after {
      transform: scaleX(1);
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .phone {
      font-size: 0.8125rem;
      color: var(--ink-2);
      text-decoration: none;
    }
    .phone:hover {
      color: var(--ink);
    }
    .toggle {
      display: none;
      width: 48px;
      height: 48px;
      place-items: center;
      background: transparent;
      border: 1px solid var(--rule-strong);
      border-radius: 3px;
      cursor: pointer;
    }
    .toggle app-icon {
      width: 22px;
    }
    .drawer {
      border-top: 1px solid var(--rule);
      padding: 8px 0 24px;
    }
    .drawer a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 56px;
      border-bottom: 1px solid var(--rule);
      color: var(--ink);
      text-decoration: none;
      font-size: 1.25rem;
      font-weight: 650;
      font-stretch: 105%;
    }
    .drawer app-icon {
      width: 20px;
      color: var(--ink-3);
    }
    .drawer .drawer-phone {
      justify-content: flex-start;
      gap: 12px;
      border: 0;
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--ink-2);
    }
    @media (max-width: 1080px) {
      .nav,
      .phone {
        display: none;
      }
      .bar {
        justify-content: space-between;
      }
      .toggle {
        display: grid;
      }
    }
    @media (max-width: 520px) {
      .actions .btn {
        display: none;
      }
    }
  `,
})
export class SiteHeader {
  protected readonly nav = NAV;
  protected readonly contact = CONTACT;
  protected readonly open = signal(false);
}
