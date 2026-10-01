import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { HomeB } from './pages/home-b/home-b';
import { StatusPage } from './pages/status/status-page';

const pending = (path: string, title: string) => ({
  path,
  component: StatusPage,
  title: `${title} · Epta Layers`,
  data: { pending: true, title },
});

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Epta Layers · Single-point enterprise solutions provider, Bangalore',
  },
  {
    path: 'home-b',
    component: HomeB,
    title: 'Epta Layers · Surveyed layer by layer, run 24x7',
  },
  pending('solutions', 'Solutions'),
  pending('solutions/:slug', 'This solution page'),
  pending('case-studies', 'Case studies'),
  pending('case-studies/:slug', 'This case study'),
  pending('story', 'The Epta story'),
  pending('vision-mission', 'Vision & mission'),
  pending('careers', 'Careers'),
  pending('blog', 'Epta Insights'),
  pending('contact', 'Contact'),
  pending('privacy', 'Privacy policy'),
  pending('terms', 'Terms & conditions'),
  { path: '**', component: StatusPage, title: 'Page not found · Epta Layers' },
];
