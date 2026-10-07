import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { OSI } from '../../content/site';
import { Visual } from '../../content/solution-pages';
import { InView } from '../in-view';
import { RackShow } from './rack-show';

/**
 * One animated picture per solution, drawn only from what that solution's content says.
 * Each starts when it scrolls into view. Decorative: the page text carries the meaning.
 */
@Component({
  selector: 'app-solution-visual',
  imports: [InView, RackShow],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  templateUrl: './solution-visual.html',
  styleUrl: './solution-visual.scss',
})
export class SolutionVisual {
  readonly kind = input.required<Visual>();
  protected readonly osi = OSI;
  protected readonly people = [0, 1, 2, 3];
  protected readonly pillars = ['SDN', 'SAN', 'ADC', 'WAF'];
  protected readonly dcs = ['Colocation', 'Cloud & DR', 'CDN', 'MPLS'];
  protected readonly cycle = ['Hardware Renewal', 'Software Licensing', 'Professional Services'];
  protected readonly noc = ['Real-time Monitoring', 'KPI Tracking', 'Threat Response', 'Performance Optimization'];
  /** a calm, plausible trace for the monitoring sparkline; illustrative, not data */
  protected readonly trace = 'M0 30 L20 26 L40 28 L60 18 L80 22 L100 14 L120 20 L140 12 L160 16 L180 10 L200 14 L220 8 L240 12';
}
