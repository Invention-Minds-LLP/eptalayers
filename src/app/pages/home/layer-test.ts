import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { OSI } from '../../content/site';
import { Icon } from '../../ui/icon';

type RowState = 'pending' | 'testing' | 'pass';

@Component({
  selector: 'app-layer-test',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './layer-test.html',
  styleUrl: './layer-test.scss',
})
export class LayerTest {
  protected readonly layers = OSI;
  /** Highest layer number that has passed; the run climbs from layer 1. */
  protected readonly passed = signal(0);
  protected readonly running = signal(false);
  protected readonly stamp = signal('');
  protected readonly complete = computed(() => this.passed() === 7);

  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.passed.set(7);
        this.sign();
      } else {
        this.timer = setTimeout(() => this.run(), 650);
      }
    });
  }

  protected state(n: number): RowState {
    if (n <= this.passed()) return 'pass';
    if (this.running() && n === this.passed() + 1) return 'testing';
    return 'pending';
  }

  protected run(): void {
    clearTimeout(this.timer);
    this.passed.set(0);
    this.stamp.set('');
    this.running.set(true);
    const step = () => {
      this.passed.update((p) => p + 1);
      if (this.passed() < 7) {
        this.timer = setTimeout(step, 340);
      } else {
        this.running.set(false);
        this.sign();
      }
    };
    this.timer = setTimeout(step, 420);
  }

  private sign(): void {
    const fmt = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    this.stamp.set(`${fmt.format(new Date())} IST`);
  }
}
