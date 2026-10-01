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
  viewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT } from '../../content/site';
import { Icon } from '../../ui/icon';
import { SignOffForm } from '../home/sign-off-form';
import { FloorPlan, RoomId } from './floor-plan';

interface PlanState {
  layers: number[];
  drafted?: boolean;
  devices?: boolean;
  callouts?: boolean;
  survey?: boolean;
  heat?: boolean;
  branch?: boolean;
  pulses?: boolean;
  incident?: boolean;
  renew?: boolean;
  t: number;
}

const ALL = [1, 2, 3, 4, 5, 6, 7];

@Component({
  selector: 'app-home-b',
  imports: [RouterLink, Icon, FloorPlan, SignOffForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-b.html',
  styleUrl: './home-b.scss',
})
export class HomeB {
  protected readonly contact = CONTACT;
  private readonly reduced =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- hero: CAD layer panel ---------- */
  protected readonly layerRows = [
    { n: 7, name: 'Application', drawn: 'Business apps, on-site and in the cloud' },
    { n: 6, name: 'Presentation', drawn: 'Perimeter and endpoint protection' },
    { n: 5, name: 'Session', drawn: 'Meetings and calls across sites' },
    { n: 4, name: 'Transport', drawn: 'SD-WAN links to branch and cloud' },
    { n: 3, name: 'Network', drawn: 'Routing between rooms' },
    { n: 2, name: 'Data Link', drawn: 'Switching and Wi-Fi cells' },
    { n: 1, name: 'Physical', drawn: 'Structured cabling, Fluke-tested' },
  ];
  protected readonly heroLayers = signal<number[]>([]);
  protected readonly legend: { icon: 'ap' | 'sw' | 'ft' | 'pin' | 'ok' | 'lyr'; label: string }[] = [
    { icon: 'lyr', label: 'OSI layer tag' },
    { icon: 'ap', label: 'Wi-Fi access point' },
    { icon: 'sw', label: 'Switch' },
    { icon: 'ft', label: 'Fluke test point' },
    { icon: 'pin', label: 'Issue found' },
    { icon: 'ok', label: 'Issue resolved' },
  ];

  /** Pending steps of the hero's automatic layer sequence; a manual toggle cancels them. */
  private heroTimers: ReturnType<typeof setTimeout>[] = [];
  private heroAutoDone = false;

  protected toggle(n: number): void {
    this.stopHeroSequence();
    this.heroLayers.update((l) => (l.includes(n) ? l.filter((x) => x !== n) : [...l, n]));
  }

  private stopHeroSequence(): void {
    this.heroAutoDone = true;
    this.heroTimers.forEach(clearTimeout);
    this.heroTimers = [];
  }

  /* ---------- story: six chapters drive the plan ---------- */
  protected readonly chapters: { key: string; title: string; body: string; get: string; state: PlanState }[] = [
    {
      key: 'Assess',
      title: 'We start on your floor.',
      body: 'Our team audits what you already have: Fluke-testing the cabling, analysing the floor plan for Wi-Fi, and mapping devices and vendors. You get a preliminary blueprint of your business, with every problem area pinned against your KPIs.',
      get: 'A preliminary blueprint of your business',
      state: { layers: [], survey: true, heat: true, t: 0, branch: false },
    },
    {
      key: 'Design',
      title: 'Then we draw the network you actually need.',
      body: 'A tailor-made design across all seven layers, built around your line of business, your problem areas and your business KPIs, not around one vendor’s catalogue.',
      get: 'A seven-layer design, specific to your business',
      state: { layers: ALL, drafted: true, t: 0, branch: false },
    },
    {
      key: 'Supply',
      title: 'We source it as an extended arm of the OEMs.',
      body: 'Hardware and software from world-leading OEMs, specified to the design and implemented to OEM-certified practice, with long-term support behind it.',
      get: 'The right equipment, OEM-certified',
      state: { layers: ALL, drafted: true, devices: true, callouts: true, t: 0, branch: false },
    },
    {
      key: 'Implement',
      title: 'We install it and switch it on, layer by layer.',
      body: 'From structured cabling up to your applications, each layer goes live in order, and every issue pinned in the survey is closed.',
      get: 'A working network, every pinned issue resolved',
      state: { layers: ALL, devices: true, heat: true, t: 1, branch: false },
    },
    {
      key: 'Support & run',
      title: 'Then we stay at the controls, 24x7.',
      body: 'Post-implementation support and a Network Operation Center: real-time monitoring, KPI tracking, threat response and performance optimisation, catching problems before they become downtime.',
      get: 'A 24x7 network sentinel and custom reporting',
      state: { layers: ALL, devices: true, t: 1, pulses: true, incident: true, branch: false },
    },
    {
      key: 'Renew',
      title: 'And we grow it with you.',
      body: 'Hardware refresh cycles, licence renewals and new sites, tracked through our LAER model (Land, Adopt, Expand, Renew) so the network keeps matching your KPIs.',
      get: 'A network that keeps pace with the business',
      state: { layers: ALL, devices: true, t: 1, renew: true, branch: true, pulses: true },
    },
  ];
  protected readonly chapter = signal(0);
  protected readonly storyState = computed(() => this.chapters[this.chapter()].state);
  /** Implement replays the layer sequence each time it is reached. */
  protected readonly storyLayers = signal<number[]>([]);
  private readonly chapterEls = viewChildren<ElementRef<HTMLElement>>('chapterEl');

  /* ---------- benefits: before / with Epta ---------- */
  protected readonly t = signal(0);
  protected readonly focusRoom = signal<RoomId | null>(null);
  protected readonly withEpta = computed(() => this.t() >= 0.5);
  protected readonly rooms: {
    id: RoomId;
    name: string;
    layer: string;
    before: string;
    after: string;
    measured?: string;
  }[] = [
    {
      id: 'A-101',
      name: 'Reception',
      layer: 'L6 · Security Architecture',
      before: 'Guests and staff share one network.',
      after: 'Guest access is separated and secured at the perimeter with network security and SASE.',
    },
    {
      id: 'A-102',
      name: 'Open office',
      layer: 'L1–L2 · Enterprise Network',
      before: 'Wi-Fi drops and packet loss slow everyone down.',
      after: 'Coverage planned from floor-plan analysis, on Fluke-tested cabling.',
      measured: '90–95% Wi-Fi connectivity accuracy for 1,500+ users · IT/ITeS campus',
    },
    {
      id: 'A-103',
      name: 'Conference room',
      layer: 'L5 · Collaboration Architecture',
      before: 'Calls with remote teams break up.',
      after: 'Cloud meetings, IP phones and room systems designed to work as one.',
    },
    {
      id: 'A-104',
      name: 'Server room',
      layer: 'L7 · Data Center Architecture',
      before: 'One failure can stop the business.',
      after: 'A scalable, secure data center with cloud and DR integration.',
      measured: 'Three-tier data center design minimised downtime · manufacturing client',
    },
    {
      id: 'A-105',
      name: 'IT desk',
      layer: 'L1–L7 · Network Operation Center',
      before: 'Problems surface when users complain.',
      after: 'The 24x7 NOC sees them first and resolves them.',
      measured: '“Epta’s NOC became our first line of defense against downtime.” · IT/ITeS client',
    },
    {
      id: 'A-106',
      name: 'Branch office',
      layer: 'L4 · SD-WAN & MPLS',
      before: 'Slow, inconsistent links between sites.',
      after: 'Sites connected over SD-WAN and MPLS, managed as one network.',
      measured: 'Network services standardised across Bangalore, Hosur, Anekal and Mumbai · manufacturing client',
    },
    {
      id: 'A-107',
      name: 'IT stores',
      layer: 'Lifecycle · Enterprise Services',
      before: 'Renewals and licences scattered across vendors.',
      after: 'One lifecycle partner for hardware renewal, licensing and support.',
      measured: 'Multiple OEM vendors consolidated · manufacturing client',
    },
  ];

  /* ---------- your numbers ---------- */
  protected readonly sites = signal(3);
  protected readonly vendors = signal(5);
  protected readonly checks = computed(() => this.sites() * 7);
  protected readonly revs = ['A', 'B', 'C', 'D', 'E', 'F'];

  protected readonly benefitsEl = viewChild<ElementRef<HTMLElement>>('benefitsEl');
  private readonly heroPlanEl = viewChild<ElementRef<HTMLElement>>('heroPlanEl');

  constructor() {
    const destroy = inject(DestroyRef);
    const doc = inject(DOCUMENT);
    doc.body.classList.add('theme-b');
    destroy.onDestroy(() => doc.body.classList.remove('theme-b'));

    const timers: ReturnType<typeof setTimeout>[] = [];
    destroy.onDestroy(() => timers.forEach(clearTimeout));

    afterNextRender(() => {
      // hero: switch the layers on from the cable up, once the plan is actually in view
      const heroPlan = this.heroPlanEl()?.nativeElement;
      if (this.reduced || !heroPlan) {
        this.heroLayers.set(ALL);
      } else {
        const hio = new IntersectionObserver(
          (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            hio.disconnect();
            if (this.heroAutoDone) return;
            this.heroTimers = ALL.map((n, i) =>
              setTimeout(() => this.heroLayers.update((l) => (l.includes(n) ? l : [...l, n])), 500 + i * 420),
            );
          },
          { threshold: 0.4 },
        );
        hio.observe(heroPlan);
        destroy.onDestroy(() => {
          hio.disconnect();
          this.stopHeroSequence();
        });
      }

      // story: the chapter in the middle of the viewport drives the plan
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const i = Number((e.target as HTMLElement).dataset['i']);
            this.enterChapter(i, timers);
          }
        },
        { rootMargin: '-45% 0px -45% 0px' },
      );
      this.chapterEls().forEach((el) => io.observe(el.nativeElement));
      destroy.onDestroy(() => io.disconnect());

      // benefits: scrub once from before to with Epta when the section arrives
      const target = this.benefitsEl()?.nativeElement;
      if (target) {
        const bio = new IntersectionObserver(
          (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            bio.disconnect();
            if (this.reduced) {
              this.t.set(1);
              return;
            }
            const start = performance.now();
            const run = (now: number) => {
              const p = Math.min(1, (now - start - 600) / 1800);
              if (p > 0) this.t.set(Math.round((1 - Math.pow(1 - p, 3)) * 100) / 100);
              if (p < 1) requestAnimationFrame(run);
            };
            requestAnimationFrame(run);
          },
          { threshold: 0.35 },
        );
        bio.observe(target);
        destroy.onDestroy(() => bio.disconnect());
      }
    });
  }

  private enterChapter(i: number, timers: ReturnType<typeof setTimeout>[]): void {
    if (i === this.chapter() && this.storyLayers().length) return;
    this.chapter.set(i);
    const layers = this.chapters[i].state.layers;
    if (this.chapters[i].key === 'Implement' && !this.reduced) {
      this.storyLayers.set([]);
      ALL.forEach((n, k) => timers.push(setTimeout(() => this.storyLayers.update((l) => [...l, n]), 150 + k * 260)));
    } else {
      this.storyLayers.set(layers);
    }
  }

  protected scrub(e: Event): void {
    this.t.set(Number((e.target as HTMLInputElement).value) / 100);
  }

  protected num(e: Event): number {
    return Number((e.target as HTMLInputElement).value);
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
