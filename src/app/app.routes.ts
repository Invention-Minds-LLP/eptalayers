import { Routes } from '@angular/router';
import { HomeD } from './pages/home-d/home-d';

const T = (t: string) => `${t} · Epta Layers`;

export const routes: Routes = [
  {
    path: '',
    component: HomeD,
    title: 'Epta Layers · A single-point enterprise solutions provider, Bangalore',
  },
  /* the earlier homepage directions, kept for review */
  {
    path: 'home-a',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: T('One request, seven stops'),
  },
  {
    path: 'home-b',
    loadComponent: () => import('./pages/home-b/home-b').then((m) => m.HomeB),
    title: T('Surveyed layer by layer, run 24x7'),
  },
  {
    path: 'home-c',
    loadComponent: () => import('./pages/home-c/home-c').then((m) => m.HomeC),
    title: T('Every order crosses seven layers'),
  },
  { path: 'home-d', redirectTo: '', pathMatch: 'full' },

  {
    path: 'solutions',
    loadComponent: () => import('./pages/solutions/solutions-index').then((m) => m.SolutionsIndex),
    title: T('Solutions'),
  },
  {
    path: 'solutions/:slug',
    loadComponent: () => import('./pages/solutions/solution-page').then((m) => m.SolutionPage),
    title: T('Solutions'),
  },
  {
    path: 'case-studies',
    loadComponent: () => import('./pages/case-studies/case-index').then((m) => m.CaseIndex),
    title: T('Case studies'),
  },
  {
    path: 'case-studies/:slug',
    loadComponent: () => import('./pages/case-studies/case-page').then((m) => m.CasePage),
    title: T('Case study'),
  },
  { path: 'story', loadComponent: () => import('./pages/story/story').then((m) => m.Story), title: T('The Epta story') },
  {
    path: 'vision-mission',
    loadComponent: () => import('./pages/vision/vision').then((m) => m.Vision),
    title: T('Vision & mission'),
  },
  { path: 'careers', loadComponent: () => import('./pages/careers/careers').then((m) => m.Careers), title: T('Careers') },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog').then((m) => m.Blog), title: T('Epta Insights') },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact), title: T('Contact') },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/legal/legal-page').then((m) => m.LegalPage),
    data: { doc: 'privacy' },
    title: T('Privacy policy'),
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/legal/legal-page').then((m) => m.LegalPage),
    data: { doc: 'terms' },
    title: T('Terms & conditions'),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: T('Page not found'),
  },
];
