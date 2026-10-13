import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTACT } from '../../content/site';
import { Icon } from '../../ui/icon';
import { submitNetlifyForm } from '../../ui/netlify-form';

@Component({
  selector: 'app-sign-off-form',
  imports: [ReactiveFormsModule, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (sent()) {
      <div class="done" role="status">
        <span class="verdict"><app-icon name="check" />MESSAGE SENT</span>
        <p>
          Thank you. An Epta Layers engineer will reply soon. For anything urgent, call
          <a [href]="contact.phoneHref">{{ contact.phoneDisplay }}</a>.
        </p>
        <button type="button" class="btn btn--ghost" (click)="sent.set(false); form.reset()">Send another message</button>
      </div>
    } @else {
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <div class="row two">
          <label>
            <span class="label">Name</span>
            <input formControlName="name" autocomplete="name" [attr.aria-invalid]="bad('name')" />
            @if (bad('name')) {
              <small>Add your name so an engineer knows who to reply to.</small>
            }
          </label>
          <label>
            <span class="label">Work email</span>
            <input
              type="email"
              formControlName="email"
              autocomplete="email"
              [attr.aria-invalid]="bad('email')"
            />
            @if (bad('email')) {
              <small>Enter an email address like name&#64;company.com.</small>
            }
          </label>
        </div>
        <div class="row two">
          <label>
            <span class="label">Phone (optional)</span>
            <input type="tel" formControlName="phone" autocomplete="tel" />
          </label>
          <label>
            <span class="label">Company (optional)</span>
            <input formControlName="company" autocomplete="organization" />
          </label>
        </div>
        <label class="row">
          <span class="label">Area</span>
          <select formControlName="service">
            @for (s of services; track s) {
              <option [value]="s">{{ s }}</option>
            }
          </select>
        </label>
        <label class="row">
          <span class="label">What should we look at?</span>
          <textarea
            formControlName="message"
            rows="5"
            [attr.aria-invalid]="bad('message')"
            placeholder="Sites, users, the symptoms you're seeing…"
          ></textarea>
          @if (bad('message')) {
            <small>Tell us a little about the problem, even one line helps.</small>
          }
        </label>
        <div class="submit">
          <button class="btn" type="submit" [disabled]="sending()">
            {{ sending() ? 'Sending…' : 'Send to an engineer' }} <app-icon name="arrow" />
          </button>
          <span class="note">Goes to the Epta Layers team</span>
        </div>
        @if (failed()) {
          <p class="fail" role="alert">
            We could not send your message. Please try again, or email
            <a [href]="'mailto:' + contact.info">{{ contact.info }}</a>.
          </p>
        }
      </form>
    }
  `,
  styles: `
    :host {
      display: block;
    }
    form {
      display: grid;
      gap: 20px;
    }
    .two {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .label {
      color: var(--ink-3);
      font-size: 0.6875rem;
    }
    input,
    select,
    textarea {
      width: 100%;
      min-height: 48px;
      padding: 10px 0;
      border: 0;
      border-bottom: 1px solid var(--rule-strong);
      border-radius: 0;
      background: transparent;
      font-size: 1.0625rem;
      transition: border-color 0.2s var(--ease-out);
    }
    textarea {
      resize: vertical;
      line-height: 1.5;
    }
    select {
      appearance: none;
      cursor: pointer;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2316191c' stroke-width='1.6'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0 center;
      background-size: 18px;
    }
    :host-context(.theme-dusk) select {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b9bfd2' stroke-width='1.6'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    }
    :host-context(.theme-dusk) option {
      background: #151c33;
      color: #f1f0f5;
    }
    ::placeholder {
      color: var(--ink-3);
    }
    input:hover,
    select:hover,
    textarea:hover {
      border-bottom-color: var(--ink);
    }
    input:focus-visible,
    select:focus-visible,
    textarea:focus-visible {
      outline: none;
      border-bottom: 2px solid var(--accent);
    }
    [aria-invalid='true'] {
      border-bottom: 2px solid var(--limit);
    }
    small {
      color: var(--limit-ink);
      font-size: 0.8125rem;
    }
    .submit {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px;
      margin-top: 8px;
    }
    .fail {
      margin: 0;
      color: var(--limit-ink);
      font-size: 0.875rem;
    }
    .fail a {
      color: inherit;
      font-weight: 700;
    }
    .note {
      font-size: 0.8125rem;
      color: var(--ink-3);
    }
    .done {
      display: grid;
      justify-items: start;
      gap: 16px;
    }
    .done a {
      color: var(--accent);
    }
    @media (max-width: 560px) {
      .two {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class SignOffForm {
  protected readonly contact = CONTACT;
  protected readonly services = [
    'Enterprise Network',
    'Security',
    'Collaboration',
    'Data Center',
    'NOC',
    'General',
  ];
  /** preselects the Area dropdown, e.g. from a solution page's call to action */
  readonly preset = input<string | null | undefined>(null);
  protected readonly sent = signal(false);
  protected readonly sending = signal(false);
  protected readonly failed = signal(false);
  private readonly tried = signal(false);

  constructor() {
    effect(() => {
      const p = this.preset();
      if (p && this.services.includes(p)) this.form.controls.service.setValue(p);
    });
  }

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', { nonNullable: true }),
    company: new FormControl('', { nonNullable: true }),
    service: new FormControl('General', { nonNullable: true }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected bad(name: 'name' | 'email' | 'message'): boolean | null {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || this.tried()) ? true : null;
  }

  protected async submit(): Promise<void> {
    this.tried.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    this.failed.set(false);
    const ok = await submitNetlifyForm('contact', this.form.getRawValue());
    this.sending.set(false);
    if (ok) this.sent.set(true);
    else this.failed.set(true);
  }
}
