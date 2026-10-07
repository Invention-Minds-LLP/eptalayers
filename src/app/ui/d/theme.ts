import { DOCUMENT, DestroyRef, inject } from '@angular/core';

/**
 * Puts the page on the Home D system (navy dusk header and footer, Plus Jakarta Sans, d- tokens)
 * for as long as the calling component lives. Call from a component constructor.
 */
export function useThemeD() {
  const body = inject(DOCUMENT).body;
  body.classList.add('theme-dusk', 'theme-d');
  inject(DestroyRef).onDestroy(() => body.classList.remove('theme-dusk', 'theme-d'));
}
