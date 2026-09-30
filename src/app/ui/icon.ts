import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName = 'arrow' | 'check' | 'phone' | 'mail' | 'menu' | 'close' | 'replay' | 'pin';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', style: 'display:inline-flex' },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="square"
      stroke-linejoin="miter"
    >
      @switch (name()) {
        @case ('arrow') {
          <path d="M4 12h15M13 6l6 6-6 6" />
        }
        @case ('check') {
          <path d="M4.5 12.5l4.5 4.5L19.5 6.5" stroke-width="2.4" />
        }
        @case ('phone') {
          <path d="M5 3.5h4l1.5 4.5-2.5 1.5a11 11 0 006.5 6.5l1.5-2.5 4.5 1.5v4a2 2 0 01-2 2A17 17 0 013 5.5a2 2 0 012-2z" />
        }
        @case ('mail') {
          <path d="M3.5 5.5h17v13h-17z" />
          <path d="M3.5 6l8.5 7 8.5-7" />
        }
        @case ('menu') {
          <path d="M3 7h18M3 12h18M3 17h18" />
        }
        @case ('close') {
          <path d="M5 5l14 14M19 5L5 19" />
        }
        @case ('replay') {
          <path d="M4 12a8 8 0 108-8H7" />
          <path d="M9.5 1.5L7 4l2.5 2.5" />
        }
        @case ('pin') {
          <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0113 0c0 4.8-6.5 11-6.5 11z" />
          <circle cx="12" cy="10" r="2.3" />
        }
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
}
