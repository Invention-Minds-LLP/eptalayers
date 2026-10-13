import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { CASE_PAGES } from '../content/case-pages';
import { DEFAULT_IMAGE, NOINDEX_PATHS, NOT_FOUND_SEO, PageSeo, SEO, SITE_NAME, SITE_URL } from '../content/seo';
import { SOLUTION_PAGES } from '../content/solution-pages';

/**
 * Runs on every navigation (as the router's title strategy) and writes the page's on-page SEO:
 * title, description, keywords, canonical, robots, Open Graph / Twitter tags and JSON-LD
 * (breadcrumbs everywhere, Service on solution pages, Article on case studies).
 * Site-wide Organization data lives statically in index.html.
 */
@Injectable({ providedIn: 'root' })
export class SeoStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  override updateTitle(state: RouterStateSnapshot): void {
    const path = state.url.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
    const known = SEO[path];
    const seo: PageSeo = known ?? NOT_FOUND_SEO;
    const noindex = seo.noindex || NOINDEX_PATHS.includes(path);
    const url = SITE_URL + (path === '/' ? '/' : path);

    this.title.setTitle(seo.title);
    this.tag('name', 'description', seo.description);
    this.tag('name', 'keywords', seo.keywords.join(', '));
    this.tag('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    this.tag('property', 'og:title', seo.title);
    this.tag('property', 'og:description', seo.description);
    this.tag('property', 'og:url', url);
    this.tag('property', 'og:type', path.startsWith('/case-studies/') ? 'article' : 'website');
    this.tag('property', 'og:image', DEFAULT_IMAGE);
    this.tag('property', 'og:site_name', SITE_NAME);
    this.tag('property', 'og:locale', 'en_IN');
    this.tag('name', 'twitter:card', 'summary_large_image');
    this.tag('name', 'twitter:title', seo.title);
    this.tag('name', 'twitter:description', seo.description);
    this.tag('name', 'twitter:image', DEFAULT_IMAGE);

    this.canonical(known && !noindex ? url : null);
    this.jsonLd(known && !noindex ? this.schema(path, seo, url) : []);
  }

  private tag(attr: 'name' | 'property', key: string, content: string) {
    if (!content) {
      this.meta.removeTag(`${attr}="${key}"`);
      return;
    }
    this.meta.updateTag({ [attr]: key, content }, `${attr}="${key}"`);
  }

  private canonical(href: string | null) {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!href) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = href;
  }

  private jsonLd(blocks: object[]) {
    this.doc.head.querySelectorAll('script[data-seo="page"]').forEach((s) => s.remove());
    for (const b of blocks) {
      const s = this.doc.createElement('script');
      s.type = 'application/ld+json';
      s.dataset['seo'] = 'page';
      s.textContent = JSON.stringify(b);
      this.doc.head.appendChild(s);
    }
  }

  private schema(path: string, seo: PageSeo, url: string): object[] {
    const out: object[] = [];
    // breadcrumbs: Home › section › page
    if (path !== '/') {
      const parts = path.split('/').filter(Boolean);
      const items = [{ name: 'Home', url: SITE_URL + '/' }];
      let acc = '';
      for (const p of parts) {
        acc += '/' + p;
        const s = SEO[acc];
        items.push({ name: s?.crumb ?? p, url: SITE_URL + acc });
      }
      out.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
      });
    }

    const sol = SOLUTION_PAGES.find((s) => '/solutions/' + s.slug === path);
    if (sol) {
      out.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: seo.kicker ?? sol.name,
        serviceType: sol.name,
        description: seo.description,
        url,
        areaServed: { '@type': 'Country', name: 'India' },
        provider: { '@id': SITE_URL + '/#organization' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: sol.offerings.heading,
          itemListElement: sol.offerings.items.map((o) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: o.name, description: o.text },
          })),
        },
      });
    }

    const cs = CASE_PAGES.find((c) => '/case-studies/' + c.slug === path);
    if (cs) {
      out.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: cs.title,
        description: seo.description,
        image: SITE_URL + '/' + cs.photo,
        url,
        author: { '@id': SITE_URL + '/#organization' },
        publisher: { '@id': SITE_URL + '/#organization' },
        about: cs.sector,
      });
    }
    return out;
  }
}
