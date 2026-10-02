import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { blogSitemapEntries, blogSitemapXml, type SitemapEntry } from './blog-sitemap';
import { GET } from '@/app/sitemap-blog.xml/route';

const SITE = 'https://touchizen.com';
const entry = (lang: SitemapEntry['lang'], slug: string, date: string, extra: Partial<SitemapEntry> = {}): SitemapEntry =>
  ({ lang, slug, date, noindex: false, ...extra });
const locs = (xml: string) => Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1]);
/** The <url> block whose <loc> is `loc`. */
const block = (xml: string, loc: string) => xml.split('<url>').find((b) => b.includes(`<loc>${loc}</loc>`)) ?? '';
const alternates = (b: string) => Array.from(b.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g), (m) => [m[1], m[2]]);

describe('blogSitemapXml', () => {
  it('lists every post in every language it exists in', () => {
    const xml = blogSitemapXml([entry('en', 'a', '2026-10-02'), entry('ko', 'a', '2026-10-02'), entry('ko', 'b', '2026-09-01')]);
    expect(locs(xml).sort()).toEqual([`${SITE}/en/blog/a/`, `${SITE}/ko/blog/a/`, `${SITE}/ko/blog/b/`]);
  });

  it('links the languages of a post to each other, with x-default on English', () => {
    const xml = blogSitemapXml([entry('en', 'a', '2026-10-02'), entry('ja', 'a', '2026-10-02')]);
    expect(alternates(block(xml, `${SITE}/ja/blog/a/`))).toEqual([
      ['en', `${SITE}/en/blog/a/`], ['ja', `${SITE}/ja/blog/a/`], ['x-default', `${SITE}/en/blog/a/`],
    ]);
  });

  it('has no x-default when the post has no English version', () => {
    const xml = blogSitemapXml([entry('ko', 'a', '2026-10-02'), entry('ja', 'a', '2026-10-02')]);
    expect(alternates(block(xml, `${SITE}/ko/blog/a/`)).map(([lang]) => lang)).toEqual(['ko', 'ja']);
  });

  it('leaves out noindex posts, also as alternates of the other languages', () => {
    const xml = blogSitemapXml([entry('en', 'a', '2026-10-02'), entry('ko', 'a', '2026-10-02', { noindex: true }), entry('en', 'hidden', '2026-09-01', { noindex: true })]);
    expect(locs(xml)).toEqual([`${SITE}/en/blog/a/`]);
    expect(alternates(block(xml, `${SITE}/en/blog/a/`)).map(([lang]) => lang)).toEqual(['en', 'x-default']);
  });

  it('dates each page by its last revision', () => {
    const xml = blogSitemapXml([entry('en', 'a', '2026-09-01', { modified: '2026-10-02' }), entry('en', 'b', '2026-09-15')]);
    expect(block(xml, `${SITE}/en/blog/a/`)).toContain('<lastmod>2026-10-02</lastmod>');
    expect(block(xml, `${SITE}/en/blog/b/`)).toContain('<lastmod>2026-09-15</lastmod>');
  });

  it('lists the newest post first, its languages in the site order', () => {
    const xml = blogSitemapXml([entry('de', 'old', '2026-01-01'), entry('ko', 'new', '2026-10-02'), entry('en', 'new', '2026-10-02')]);
    expect(locs(xml)).toEqual([`${SITE}/en/blog/new/`, `${SITE}/ko/blog/new/`, `${SITE}/de/blog/old/`]);
  });

  it('is a sitemap urlset with the xhtml namespace for the language links', () => {
    const xml = blogSitemapXml([entry('en', 'a', '2026-10-02')]);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')).toBe(true);
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    expect(xml.trimEnd().endsWith('</urlset>')).toBe(true);
  });
});

describe('blog sitemap from the real posts', () => {
  const contentDir = path.join(process.cwd(), 'content', 'blog');
  const files = fs.readdirSync(contentDir).flatMap((lang) =>
    fs.readdirSync(path.join(contentDir, lang)).filter((f) => f.endsWith('.md')).map((f) => ({ lang, slug: f.slice(0, -3), file: path.join(contentDir, lang, f) })));

  it('has every indexable post file and none of the noindex ones', () => {
    const xml = blogSitemapXml(blogSitemapEntries());
    for (const f of files) {
      const url = `${SITE}/${f.lang}/blog/${f.slug}/`;
      if (matter(fs.readFileSync(f.file, 'utf-8')).data.noindex === true) expect(locs(xml)).not.toContain(url);
      else expect(locs(xml)).toContain(url);
    }
  });

  it('is what /sitemap-blog.xml serves', async () => {
    const res = GET();
    expect(res.headers.get('content-type')).toContain('application/xml');
    expect(await res.text()).toBe(blogSitemapXml(blogSitemapEntries()));
  });
});

describe('sitemap files in public/', () => {
  const read = (name: string) => fs.readFileSync(path.join(process.cwd(), 'public', name), 'utf-8');

  it('sitemap.xml is an index of the page sitemap and the generated blog sitemap', () => {
    const xml = read('sitemap.xml');
    expect(xml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(locs(xml)).toEqual([`${SITE}/sitemap-pages.xml`, `${SITE}/sitemap-blog.xml`]);
  });

  it('sitemap-pages.xml keeps the blog index pages but no posts — those come from sitemap-blog.xml', () => {
    const pages = locs(read('sitemap-pages.xml'));
    expect(pages).toContain(`${SITE}/ko/blog/`);
    expect(pages.filter((l) => /\/blog\/[^/]+\/$/.test(l))).toEqual([]);
  });
});
