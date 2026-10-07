import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTACT } from '../../content/site';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';
import { PageHero } from '../../ui/d/page-hero';
import { useThemeD } from '../../ui/d/theme';

/**
 * Careers (content section 4). The site is static, so "Apply now" opens the visitor's email app addressed
 * to hr@ with the application filled in; the resume is attached there (a browser cannot attach it to mailto).
 */
@Component({
  selector: 'app-careers',
  imports: [ReactiveFormsModule, Icon, InView, PageHero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      eyebrow="Careers"
      heading="Shape the Connected World with Us"
      [accent]="3"
      photo="photos/case-campus.webp"
      lede="At Epta Layers, we’re more than an IT solutions provider; we’re architects of robust, intelligent networks. Rooted in the foundational 7 Layers of the OSI model, we partner with global IT leaders to design and deliver custom networking solutions that solve complex business challenges."
    >
      <a ctas class="d-pill d-pill--fill" href="#apply">Apply now <app-icon name="arrow" /></a>
    </app-page-hero>

    <section id="apply" class="d-band d-band--light" aria-labelledby="ap-title">
      <div class="wrap d-split">
        <div class="d-reveal" appInView>
          <p class="d-eyebrow">Join the team</p>
          <h2 id="ap-title" class="d-h2">Ready to layer your expertise onto <span class="d-em">something foundational?</span></h2>
          <p class="d-lede">Explore your next career chapter at Epta Layers.</p>
          <p class="d-lede">
            To show your interest in joining the team, send a cover letter together with your resume to
            <a [href]="'mailto:' + hr">{{ hr }}</a>
          </p>
          <ol class="stack d-stagger" appInView aria-hidden="true">
            @for (l of layers; track l; let i = $index) {
              <li [style.--i]="i">{{ l }}</li>
            }
          </ol>
        </div>

        <div class="panel d-reveal" appInView style="--i: 1">
          @if (sent()) {
            <div class="done" role="status">
              <p class="d-h3">Your email app should have opened.</p>
              <p>
                Attach your resume to that email before sending it to <a [href]="'mailto:' + hr">{{ hr }}</a>.
              </p>
              <button type="button" class="d-pill d-pill--line" (click)="sent.set(false)">Edit application</button>
            </div>
          } @else {
            <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
              <label>
                <span>Name</span>
                <input formControlName="name" autocomplete="name" [attr.aria-invalid]="bad('name')" />
                @if (bad('name')) {
                  <small>Add your name.</small>
                }
              </label>
              <label>
                <span>Email</span>
                <input type="email" formControlName="email" autocomplete="email" [attr.aria-invalid]="bad('email')" />
                @if (bad('email')) {
                  <small>Enter an email address like name&#64;example.com.</small>
                }
              </label>
              <label>
                <span>Resume</span>
                <input type="file" accept=".pdf,.doc,.docx" (change)="pick($event)" />
                <small class="hint">You’ll attach it to the email that opens.</small>
              </label>
              <label>
                <span>Cover letter</span>
                <textarea formControlName="cover" rows="6" [attr.aria-invalid]="bad('cover')"></textarea>
                @if (bad('cover')) {
                  <small>A few lines about you and the role you want.</small>
                }
              </label>
              <button class="d-pill d-pill--fill" type="submit">Apply now <app-icon name="arrow" /></button>
            </form>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .d-lede a {
      color: var(--orange);
      font-weight: 600;
    }
    .stack {
      list-style: none;
      margin: 32px 0 0;
      padding: 0;
      display: grid;
      gap: 6px;
      max-width: 340px;
    }
    .stack li {
      padding: 10px 16px;
      border-radius: 6px;
      background: linear-gradient(90deg, #0e1b3f, #1d2a5a);
      color: #c7cfe4;
      font-size: 0.8125rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-left: calc((6 - var(--i)) * 10px);
    }
    .stack li:first-child {
      background: var(--hot);
      color: #fff;
    }
    .panel {
      padding: 36px;
      border: 1px solid var(--line-l);
      border-radius: 12px;
      background: #f6f8fd;
    }
    form {
      display: grid;
      gap: 20px;
    }
    label {
      display: grid;
      gap: 8px;
    }
    label > span {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--muted-l);
    }
    input,
    textarea {
      width: 100%;
      padding: 12px 14px;
      border: 1px solid #c9d0e0;
      border-radius: 8px;
      background: #fff;
      color: var(--ink-l);
      font: inherit;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    }
    input:focus-visible,
    textarea:focus-visible {
      outline: none;
      border-color: var(--orange);
      box-shadow: 0 0 0 3px rgb(255 95 39 / 0.18);
    }
    [aria-invalid='true'] {
      border-color: #d93a3a;
    }
    small {
      color: #c42b2b;
      font-size: 0.8125rem;
    }
    small.hint {
      color: var(--muted-l);
    }
    form .d-pill {
      justify-self: start;
    }
    .done {
      display: grid;
      gap: 14px;
      justify-items: start;
    }
    .done p {
      margin: 0;
      color: var(--muted-l);
    }
    .done a {
      color: var(--orange);
      font-weight: 600;
    }
    @media (max-width: 560px) {
      .panel {
        padding: 22px;
      }
    }
  `,
})
export class Careers {
  protected readonly hr = CONTACT.hr;
  protected readonly layers = ['Application', 'Presentation', 'Session', 'Transport', 'Network', 'Data Link', 'Physical'];
  protected readonly sent = signal(false);
  private readonly tried = signal(false);
  private file = '';

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    cover: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    useThemeD();
  }

  protected bad(name: 'name' | 'email' | 'cover'): boolean | null {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || this.tried()) ? true : null;
  }

  protected pick(e: Event) {
    this.file = (e.target as HTMLInputElement).files?.[0]?.name ?? '';
  }

  protected submit() {
    this.tried.set(true);
    if (this.form.invalid) return;
    const { name, email, cover } = this.form.getRawValue();
    const body = `${cover}\n\n${name}\n${email}${this.file ? `\n\nResume: ${this.file} (attached)` : ''}`;
    location.href = `mailto:${this.hr}?subject=${encodeURIComponent(`Application: ${name}`)}&body=${encodeURIComponent(body)}`;
    this.sent.set(true);
  }
}
