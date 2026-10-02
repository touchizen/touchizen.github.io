import { getPostBySlug, getPostSlugs } from './blog';
import { Language, languages } from './i18n';

/**
 * The blog half of the sitemap, built from content/blog at every build (served as /sitemap-blog.xml),
 * so a new post is listed by adding its file — public/sitemap.xml is only the index, and
 * public/sitemap-pages.xml keeps the hand-written non-blog pages.
 */

const SITE_URL = 'https://touchizen.com';
const ORDER: Language[] = languages.map((l) => l.code);

export interface SitemapEntry {
  lang: Language;
  slug: string;
  date: string;
  modified?: string;
  noindex: boolean;
}

// trailingSlash: true in next.config.js — same URL shape as the emitted pages and their canonical links.
const postUrl = (lang: Language, slug: string) => `${SITE_URL}/${lang}/blog/${slug}/`;

/** One entry per post file in content/blog. */
export function blogSitemapEntries(): SitemapEntry[] {
  return ORDER.flatMap((lang) => getPostSlugs(lang).flatMap((slug) => {
    const post = getPostBySlug(lang, slug);
    return post ? [{ lang, slug, date: post.date, modified: post.modified, noindex: post.noindex }] : [];
  }));
}

/** Sitemap <urlset> for the indexable posts: newest first, each post's languages linked with hreflang (x-default = English). */
export function blogSitemapXml(entries: SitemapEntry[]): string {
  const bySlug = new Map<string, SitemapEntry[]>();
  for (const e of entries.filter((x) => !x.noindex)) bySlug.set(e.slug, [...(bySlug.get(e.slug) ?? []), e]);

  const newest = (list: SitemapEntry[]) => Math.max(...list.map((e) => new Date(e.date).getTime()));
  const posts = Array.from(bySlug.entries()).sort(([a, x], [b, y]) => newest(y) - newest(x) || a.localeCompare(b));

  const urls = posts.flatMap(([slug, list]) => {
    const langs = ORDER.filter((code) => list.some((e) => e.lang === code));
    const links = [...langs.map((code) => [code, postUrl(code, slug)]), ...(langs.includes('en') ? [['x-default', postUrl('en', slug)]] : [])]
      .map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`);
    return langs.map((code) => {
      const e = list.find((x) => x.lang === code)!;
      return ['  <url>', `    <loc>${postUrl(code, slug)}</loc>`, ...links, `    <lastmod>${e.modified || e.date}</lastmod>`, '    <priority>0.7</priority>', '  </url>'].join('\n');
    });
  });

  return ['<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls, '</urlset>', ''].join('\n');
}
