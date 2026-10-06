import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type StopId = 'l7' | 'l6' | 'l5' | 'l4' | 'l3' | 'l2' | 'l1' | 'travel' | 'arrive';

/**
 * The nine illustrated stops of one order's journey, drawn as one stage.
 * Only the active stop is visible; its actors play once as it arrives.
 */
@Component({
  selector: 'app-journey-scene',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './journey-scene.html',
  styleUrl: './journey-scene.scss',
})
export class JourneyScene {
  readonly stop = input<StopId>('l7');

  protected on(id: StopId): boolean {
    return this.stop() === id;
  }

  protected readonly cityWins = Array.from({ length: 24 }, (_, i) => ({
    x: 84 + (i % 8) * 40,
    y: 120 + Math.floor(i / 8) * 46,
    lit: [0, 3, 5, 9, 10, 14, 17, 20, 22].includes(i),
  }));
  protected readonly blocks = [
    [60, 70, 150, 110],
    [250, 70, 150, 110],
    [440, 70, 130, 110],
    [610, 70, 130, 110],
    [60, 230, 150, 130],
    [250, 230, 150, 130],
    [440, 230, 130, 130],
    [610, 230, 130, 130],
    [60, 410, 150, 120],
    [250, 410, 150, 120],
    [440, 410, 130, 120],
    [610, 410, 130, 120],
  ];
  protected readonly ports = Array.from({ length: 12 }, (_, i) => i);
  protected readonly hills = [
    'M0 430 L80 360 L150 400 L240 320 L330 390 L420 340 L520 400 L600 350 L700 410 L800 370 L800 600 L0 600Z',
    'M0 470 L110 410 L200 450 L300 400 L390 455 L480 420 L560 460 L640 430 L800 470 L800 600 L0 600Z',
  ];
}
