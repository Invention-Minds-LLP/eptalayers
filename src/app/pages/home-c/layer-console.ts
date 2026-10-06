import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StopId } from '../../content/journey';

/**
 * The working surface of each stop: what an engineer would actually see at that layer while the
 * order passes. All nine are in the DOM; only the active one is shown, and switching re-runs its sequence.
 */
@Component({
  selector: 'app-layer-console',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './layer-console.html',
  styleUrl: './layer-console.scss',
})
export class LayerConsole {
  readonly stop = input.required<StopId>();

  protected on(id: StopId) {
    return this.stop() === id;
  }

  protected readonly cipher = [
    ['{ "order": "PO-4471",', '9f3a c21e 77b0 41d8 e2'],
    ['  "from": "BLR-HQ/sales",', 'a05c 3e91 0bd4 f7c2 6a 18'],
    ['  "to": "BOM-branch",', '5d2e 88f1 c04a 93b7 e1'],
    ['  "lines": 3,', 'c7a9 2f60 1e'],
    ['  "priority": "normal" }', '3b84 d1f0 a6e2 7c95 04'],
  ];

  protected readonly segments = Array.from({ length: 12 }, (_, i) => i + 1);
  protected readonly ports = Array.from({ length: 24 }, (_, i) => i + 1);
  /** pin pairs in T568B colours */
  protected readonly pairs = [
    { pins: [1, 2], c: '#f08a24' },
    { pins: [3, 6], c: '#3ddc97' },
    { pins: [4, 5], c: '#4b8bf5' },
    { pins: [7, 8], c: '#b07a4f' },
  ];
  protected readonly pins = [1, 2, 3, 4, 5, 6, 7, 8];
  protected readonly layers = ['L7', 'L6', 'L5', 'L4', 'L3', 'L2', 'L1'];

  protected pairColour(pin: number) {
    return this.pairs.find((p) => p.pins.includes(pin))!.c;
  }
}
