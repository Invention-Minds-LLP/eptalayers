import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT, OSI, SOLUTIONS } from '../../content/site';
import { Icon } from '../../ui/icon';
import { Folio } from '../../ui/folio';
import { InView } from '../../ui/in-view';
import { CaseFiles } from './case-files';
import { LaerPlot } from './laer-plot';
import { LayerTest } from './layer-test';
import { NocConsole } from './noc-console';
import { SignOffForm } from './sign-off-form';
import { Wiremap } from './wiremap';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, InView, Folio, LayerTest, Wiremap, LaerPlot, NocConsole, CaseFiles, SignOffForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly solutions = SOLUTIONS;
  protected readonly contact = CONTACT;
  protected readonly stack = OSI;
  protected readonly layerCols = [1, 2, 3, 4, 5, 6, 7];
  protected readonly oemSlots = [1, 2, 3, 4, 5, 6];
  protected readonly findings = [
    { id: 'F1', text: 'Tailored IT infrastructure for your business' },
    { id: 'F2', text: 'Security embedded in every layer of your network' },
    { id: 'F3', text: 'Hardware supply, implementation and post-implementation support' },
  ];
}
