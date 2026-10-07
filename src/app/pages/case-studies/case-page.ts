import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CASE_PAGES } from '../../content/case-pages';
import { CONTACT } from '../../content/site';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';
import { CountUp } from '../../ui/d/count-up';
import { CtaBand } from '../../ui/d/cta-band';
import { PageHero } from '../../ui/d/page-hero';
import { useThemeD } from '../../ui/d/theme';
import { NotFound } from '../not-found/not-found';

/** One full case study (content section 15). */
@Component({
  selector: 'app-case-page',
  imports: [RouterLink, Icon, InView, CountUp, PageHero, CtaBand, NotFound],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './case-page.html',
  styleUrl: './case-page.scss',
})
export class CasePage {
  private readonly slug = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });
  protected readonly cs = computed(() => CASE_PAGES.find((c) => c.slug === this.slug()));
  protected readonly next = computed(() => {
    const i = CASE_PAGES.findIndex((c) => c.slug === this.slug());
    return CASE_PAGES[(i + 1) % CASE_PAGES.length];
  });
  protected readonly mail = CONTACT.caseStudies;

  constructor() {
    useThemeD();
  }
}
