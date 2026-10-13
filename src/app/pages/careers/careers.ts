import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Opening, loadOpenings } from '../../content/careers';
import { CONTACT } from '../../content/site';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';
import { PageHero } from '../../ui/d/page-hero';
import { useThemeD } from '../../ui/d/theme';
import { submitNetlifyForm } from '../../ui/netlify-form';

const MAX_RESUME = 5 * 1024 * 1024;

/**
 * Careers. Openings are read live from the client's Google Sheet (see content/careers.ts).
 * Applications go to Netlify Forms (form "careers"), which stores the resume and emails HR.
 */
@Component({
  selector: 'app-careers',
  imports: [ReactiveFormsModule, RouterLink, Icon, InView, PageHero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers {
  protected readonly hr = CONTACT.hr;
  protected readonly openings = signal<Opening[] | null>(null);
  protected readonly openingsFailed = signal(false);
  protected readonly state = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  protected readonly fileError = signal('');
  protected readonly fileName = signal('');
  private readonly tried = signal(false);
  private resume: File | null = null;
  private readonly formEl = viewChild<ElementRef<HTMLElement>>('formEl');

  protected readonly experience = ['Fresher', 'Less than 2 years', '2–5 years', '5–10 years', 'More than 10 years'];
  protected readonly notice = ['Immediate', '15 days', '30 days', '60 days', '90 days'];

  protected readonly form = new FormGroup({
    role: new FormControl('General application', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[+\d][\d\s-]{7,}$/)] }),
    location: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    experience: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    currentCompany: new FormControl('', { nonNullable: true }),
    notice: new FormControl('', { nonNullable: true }),
    currentCtc: new FormControl('', { nonNullable: true }),
    expectedCtc: new FormControl('', { nonNullable: true }),
    linkedin: new FormControl('', { nonNullable: true }),
    cover: new FormControl('', { nonNullable: true }),
    consent: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });

  constructor() {
    useThemeD();
    afterNextRender(() => {
      loadOpenings()
        .then((o) => this.openings.set(o))
        .catch(() => {
          this.openings.set([]);
          this.openingsFailed.set(true);
        });
    });
  }

  protected bad(name: keyof typeof this.form.controls): boolean | null {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || this.tried()) ? true : null;
  }

  protected apply(o: Opening) {
    this.form.controls.role.setValue(o.role);
    this.formEl()?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected pick(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0] ?? null;
    this.fileError.set('');
    if (f && f.size > MAX_RESUME) {
      this.fileError.set('Please upload a file under 5 MB.');
      this.resume = null;
      this.fileName.set('');
      return;
    }
    this.resume = f;
    this.fileName.set(f?.name ?? '');
  }

  protected async submit() {
    this.tried.set(true);
    if (!this.resume) this.fileError.set(this.fileError() || 'Please attach your resume.');
    if (this.form.invalid || !this.resume) return;
    const v = this.form.getRawValue();
    this.state.set('sending');
    const ok = await submitNetlifyForm('careers', {
      role: v.role,
      name: v.name,
      email: v.email,
      phone: v.phone,
      location: v.location,
      experience: v.experience,
      'current-company': v.currentCompany,
      'notice-period': v.notice,
      'current-ctc': v.currentCtc,
      'expected-ctc': v.expectedCtc,
      linkedin: v.linkedin,
      'cover-letter': v.cover,
      resume: this.resume,
    });
    this.state.set(ok ? 'sent' : 'error');
  }

  protected reset() {
    this.form.reset();
    this.resume = null;
    this.fileName.set('');
    this.tried.set(false);
    this.state.set('idle');
  }
}
