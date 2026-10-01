import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type RoomId = 'A-101' | 'A-102' | 'A-103' | 'A-104' | 'A-105' | 'A-106' | 'A-107';

export interface Room {
  id: RoomId;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** where its fault pin / resolved stamp sits */
  px: number;
  py: number;
}

export const ROOMS: Room[] = [
  { id: 'A-101', name: 'Reception', x: 40, y: 260, w: 220, h: 300, px: 200, py: 330 },
  { id: 'A-102', name: 'Open office', x: 260, y: 40, w: 440, h: 360, px: 640, py: 90 },
  { id: 'A-103', name: 'Conference', x: 40, y: 40, w: 220, h: 220, px: 210, py: 80 },
  { id: 'A-104', name: 'Server room', x: 700, y: 40, w: 240, h: 180, px: 905, py: 205 },
  { id: 'A-105', name: 'IT desk', x: 700, y: 220, w: 240, h: 180, px: 905, py: 255 },
  { id: 'A-106', name: 'Branch office', x: 990, y: 380, w: 150, h: 160, px: 1110, py: 405 },
  { id: 'A-107', name: 'IT stores', x: 260, y: 400, w: 440, h: 160, px: 660, py: 430 },
];

/** Plan view-box centre, used to bring a focused room to the middle. */
const VB = { w: 1160, h: 600 };
let seq = 0;

@Component({
  selector: 'app-floor-plan',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './floor-plan.html',
  styleUrl: './floor-plan.scss',
  host: {
    '[class.drafted]': 'drafted()',
    '[class.supplying]': 'callouts()',
    '[class.pulsing]': 'pulses()',
    '[style.--t]': 't()',
  },
})
export class FloorPlan {
  /** OSI layers drawn, 1–7 */
  readonly layers = input<number[]>([]);
  /** layers shown as dashed design intent instead of live */
  readonly drafted = input(false);
  readonly devices = input(false);
  /** OEM equipment callouts (Supply step) */
  readonly callouts = input(false);
  readonly survey = input(false);
  readonly branch = input(true);
  readonly pulses = input(false);
  readonly incident = input(false);
  readonly renew = input(false);
  /** 0 = before Epta (fault pins, patchy coverage), 1 = with Epta (resolved, even coverage) */
  readonly t = input(0);
  readonly showStates = input(false);
  readonly heat = input(false);
  readonly focus = input<RoomId | null>(null);
  readonly label = input('Office floor plan');

  protected readonly uid = `fp${++seq}-`;
  protected readonly rooms = ROOMS;
  protected readonly calloutList = [
    { label: 'WI-FI ACCESS POINT', x: 580, y: 150, lx: 630, ly: 112 },
    { label: 'ACCESS SWITCH', x: 480, y: 330, lx: 530, ly: 364 },
    { label: 'CORE ROUTER', x: 885, y: 176, lx: 960, ly: 236 },
    { label: 'IP PHONES', x: 105, y: 119, lx: 66, ly: 210 },
  ];
  protected readonly desks = [0, 1, 2, 3].flatMap((c) => [0, 1, 2].map((r) => ({ x: 290 + c * 100, y: 78 + r * 96 })));

  protected on(n: number): boolean {
    return this.layers().includes(n);
  }

  protected readonly zoom = computed(() => {
    const id = this.focus();
    const r = ROOMS.find((x) => x.id === id);
    if (!r) return 'translate(0px, 0px) scale(1)';
    const s = 1.55;
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    const tx = VB.w / 2 - cx * s;
    const ty = VB.h / 2 - cy * s;
    return `translate(${tx}px, ${ty}px) scale(${s})`;
  });
}
