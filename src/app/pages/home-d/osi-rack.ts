import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { OSI } from '../../content/site';

/**
 * A network rack that assembles as the page scrolls: the cabinet first, then one unit of hardware per
 * OSI layer (L1 patch panel at the foot to L7 application server at the top), then the cables and lights.
 * Motion is driven entirely by CSS custom properties set on the pinned section around it.
 */
@Component({
  selector: 'app-osi-rack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './osi-rack.html',
  styleUrl: './osi-rack.scss',
  host: { 'aria-hidden': 'true' },
})
export class OsiRack {
  /** index (0 = L7 … 6 = L1) of the unit to pull forward and glow; -1 for none */
  readonly lit = input(-1);
  /** all seven units are in: LEDs run */
  readonly live = input(false);

  protected readonly units = OSI.map((l, i) => ({
    ...l,
    kind: (['app', 'fw', 'uc', 'sdwan', 'router', 'switch', 'patch'] as const)[i],
  }));
  protected readonly ports24 = Array.from({ length: 24 }, (_, i) => i);
  protected readonly ports16 = Array.from({ length: 16 }, (_, i) => i);
  protected readonly ports8 = Array.from({ length: 8 }, (_, i) => i);
  protected readonly cableTint = ['#ff5f27', '#fe046f', '#3d7bff', '#f5b301', '#3ddc97', '#ff5f27'];
}
