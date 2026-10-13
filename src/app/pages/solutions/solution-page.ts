import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { SEO } from '../../content/seo';
import { SOLUTION_PAGES, TWENTY_FOUR_SEVEN_NOTE } from '../../content/solution-pages';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';
import { CtaBand } from '../../ui/d/cta-band';
import { PageHero } from '../../ui/d/page-hero';
import { SolutionVisual } from '../../ui/d/solution-visual';
import { useThemeD } from '../../ui/d/theme';
import { NotFound } from '../not-found/not-found';

/** One page per solution (content sections 7–12), all from SOLUTION_PAGES. */
@Component({
  selector: 'app-solution-page',
  imports: [RouterLink, Icon, InView, PageHero, CtaBand, SolutionVisual, NotFound],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './solution-page.html',
  styleUrl: './solution-page.scss',
})
export class SolutionPage {
  private readonly slug = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });
  protected readonly page = computed(() => SOLUTION_PAGES.find((s) => s.slug === this.slug()));
  protected readonly kicker = computed(() => SEO['/solutions/' + this.slug()]?.kicker ?? this.page()?.name ?? '');
  protected readonly note = TWENTY_FOUR_SEVEN_NOTE;
  protected readonly next = computed(() => {
    const i = SOLUTION_PAGES.findIndex((s) => s.slug === this.slug());
    return SOLUTION_PAGES[(i + 1) % SOLUTION_PAGES.length];
  });

  constructor() {
    useThemeD();
  }

  protected pad(n: number) {
    return n < 9 ? '0' + (n + 1) : String(n + 1);
  }
}
