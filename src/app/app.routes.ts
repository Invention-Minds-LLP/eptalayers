import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
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
