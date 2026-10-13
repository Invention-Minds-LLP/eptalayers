import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CASE_STUDIES, OSI } from '../../content/site';
import { Icon } from '../../ui/icon';
import { InView } from '../../ui/in-view';
import { Parallax } from '../../ui/parallax';
import { LAYERS } from '../../content/layers';
import { LayerGlyph } from '../../ui/d/layer-glyph';
import { LayerJourney } from './layer-journey';

type Glyph = 'network' | 'shield' | 'people' | 'server' | 'cloud' | 'gear' | 'pulse';

/**
 * Homepage D: the layout of the agency comp supplied on 2026-10-06, carrying only Epta's own content
 * (taglines, solutions, OSI layers, lifecycle, case studies and the NOC quote from the client's content file).
 */
@Component({
  selector: 'app-home-d',
  imports: [RouterLink, Icon, InView, Parallax, LayerJourney, LayerGlyph],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-d.html',
  styleUrl: './home-d.scss',
  host: { '(pointermove)': 'tilt($event)' },
})
export class HomeD {
  /** "Tailored IT Infrastructure for Your Business", one word at a time; the last two carry the accent. */
  protected readonly headline = ['Tailored', 'IT', 'Infrastructure', 'for', 'Your', 'Business'];

  protected readonly osi = OSI;

  /* ---------- stats: counted up when the strip comes into view ---------- */
  protected readonly count = signal(0);
  protected readonly stats = computed(() => {
    const p = this.count();
    return [
      { value: `${Math.round(7 * p)}`, label: 'OSI layers covered end to end' },
      { value: `${Math.round(24 * p)}/7*`, label: 'NOC monitoring & support' },
      { value: `${Math.round(90 * p)}–${Math.round(95 * p)}%`, label: 'Wi-Fi connectivity accuracy delivered' },
      { value: `${Math.round(1500 * p).toLocaleString('en-IN')}+`, label: 'Users on one rebuilt campus' },
    ];
  });
  private readonly statsEl = viewChild<ElementRef<HTMLElement>>('statsEl');

  protected readonly solutions: { glyph: Glyph; name: string; tags: string[]; slug: string }[] = [
    { glyph: 'network', name: 'Enterprise Network', tags: ['Routing & Switching', 'Wi-Fi & SD-WAN', 'Information Management'], slug: 'enterprise-network' },
    { glyph: 'shield', name: 'Security Architecture', tags: ['Network Security & SASE', 'Email & Endpoint', 'Cloud Security'], slug: 'security-architecture' },
    { glyph: 'people', name: 'Collaboration Architecture', tags: ['Cloud meeting & calling', 'IP phones', 'Conference rooms'], slug: 'collaboration-architecture' },
    { glyph: 'server', name: 'Data Center Architecture', tags: ['SDN', 'SAN', 'ADC', 'WAF', 'Cloud/DR'], slug: 'data-center-architecture' },
    { glyph: 'cloud', name: 'Data Center Services', tags: ['Colocation', 'Cloud & DR', 'CDN & MPLS', 'Data resiliency'], slug: 'data-center-services' },
    { glyph: 'gear', name: 'Enterprise Services', tags: ['Hardware renewal', 'Licensing', 'Professional services'], slug: 'enterprise-services' },
    { glyph: 'pulse', name: 'Network Operation Center', tags: ['24/7* monitoring', 'KPI tracking', 'Threat response'], slug: 'network-operation-center' },
  ];

  /* ---------- hero ticker: one layer lit at a time, L1 → L7, with its drawing ---------- */
  protected readonly layers = LAYERS;
  protected readonly layersTop = [...LAYERS].reverse();
  protected readonly hero = signal(0);

  /** The Epta Layers engagement lifecycle, in the client's own six steps. */
  protected readonly lifecycle = [
    { name: 'Assess', does: 'We study how your business runs and draw up a blueprint.' },
    { name: 'Design', does: 'We design the solution around your goals, not a product list.' },
    { name: 'Supply', does: 'We supply hardware from world-leading technology brands.' },
    { name: 'Implement', does: 'We install and test everything, layer by layer.' },
    { name: 'Support & run', does: 'Support after go-live, and 24/7* monitoring through our NOC.' },
    { name: 'Renew', does: 'We refresh and upgrade as your business grows.' },
  ]

  protected readonly industries = [
    { name: 'IT & ITeS', photo: 'photos/case-campus.webp', slug: 'it-ites', outcome: '90–95% Wi-Fi connectivity accuracy for 1,500+ users' },
    { name: 'Engineering', photo: 'photos/case-turbine.webp', slug: 'engineering', outcome: 'Network, workstations and servers rebuilt in three phases' },
    { name: 'Manufacturing', photo: 'photos/case-factory.webp', slug: 'manufacturing', outcome: 'Phases 2 and 3 approved after Phase 1' },
  ];

  /** OEM logos are not supplied yet; the marquee runs on labelled slots until they are. */
  protected readonly partnerSlots = Array.from({ length: 8 }, (_, i) => i);

  protected readonly stories = [
    {
      ...CASE_STUDIES[0],
      photo: 'photos/case-building.webp',
      heading: 'From network chaos to IT harmony',
      summary:
        'A leading American IT/ITeS company’s Bangalore campus went from dropped connections to a stable, reliable network.',
      points: ['Wi-Fi connectivity accuracy reached 90–95%', 'Rebuilt network serving 1,500+ users', 'Epta Layers’ services extended to more locations'],
    },
    {
      ...CASE_STUDIES[1],
      photo: 'photos/case-turbine.webp',
      heading: 'From complexity to clarity',
      summary:
        'A global engineering company in 40+ countries got one partner to rebuild its network, workstations and servers.',
      points: ['Delivered in three phases: network, workstations, servers', 'Converged, scalable infrastructure', 'Epta Layers’ approach adopted on other client projects'],
    },
    {
      ...CASE_STUDIES[2],
      photo: 'photos/case-factory.webp',
      heading: 'From latency to efficiency',
      summary:
        'A leading Indian manufacturer replaced a tangle of vendors with secure, standardised IT across four sites.',
      points: ['Stronger gateway, email and endpoint security', 'A three-tier data center design', 'Phases 2 and 3 approved'],
    },
  ];
  protected readonly story = signal(0);
  protected readonly current = computed(() => this.stories[this.story()]);

  private readonly host = inject(ElementRef<HTMLElement>).nativeElement;
  private frame = 0;
  private reduced = false;

  constructor() {
    const doc = inject(DOCUMENT);
    const destroy = inject(DestroyRef);
    doc.body.classList.add('theme-dusk', 'theme-d');
    destroy.onDestroy(() => doc.body.classList.remove('theme-dusk', 'theme-d'));

    afterNextRender(() => {
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (this.reduced) {
        this.count.set(1);
        return;
      }

      // count the stats up once, the first time the strip is seen
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io.disconnect();
          const t0 = performance.now();
          const run = (t: number) => {
            const k = Math.min(1, (t - t0) / 1600);
            this.count.set(1 - Math.pow(1 - k, 3));
            if (k < 1) requestAnimationFrame(run);
          };
          requestAnimationFrame(run);
        },
        { threshold: 0.4 },
      );
      const el = this.statsEl()?.nativeElement;
      if (el) io.observe(el);

      const tick = setInterval(() => this.hero.update((i) => (i + 1) % 7), 2600);
      destroy.onDestroy(() => {
        io.disconnect();
        clearInterval(tick);
        cancelAnimationFrame(this.frame);
      });
    });
  }

  protected step(by: number) {
    const n = this.stories.length;
    this.story.update((i) => (i + by + n) % n);
  }

  protected pad(n: number) {
    return n < 10 ? '0' + n : String(n);
  }

  /** Pointer position as -1…1, for the hero and stack tilt. Mouse only. */
  protected tilt(e: PointerEvent) {
    if (this.reduced || e.pointerType !== 'mouse') return;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = (e.clientY / innerHeight) * 2 - 1;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      this.host.style.setProperty('--mx', x.toFixed(3));
      this.host.style.setProperty('--my', y.toFixed(3));
    });
  }
}
