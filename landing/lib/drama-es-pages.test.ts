// 스페인어 드라마 페이지를 진짜 헤더·푸터와 함께 그려서 본다: 보이는 문구는 스페인어이고, 페이지 안의
// 모든 내부 링크는 실제로 빌드되는 페이지를 가리킨다. es 로 빌드되는 건 드라마 목록·글뿐이라 드라마 링크는
// /es/ 로, 나머지(로고·허브·IT 목록·제품·약관)는 영어 페이지로 간다.
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: () => {} }), useParams: () => ({}) }));

import { languages, translations } from './i18n';
import { es } from './i18n/es';
import { getPostSlugs } from './blog';
import { DRAMA } from './blog-categories';
import { languageMenu } from '@/components/LanguageToggle';
import EsDramaList from '@/app/(main)/es/blog/drama/page';
import EsDramaPost from '@/app/(main)/es/blog/drama/[slug]/page';
import { generateStaticParams as siteLanguageParams } from '@/app/(main)/[lang]/layout';

const APP = path.join(process.cwd(), 'app');
const PUBLIC = path.join(process.cwd(), 'public');

type Params = Record<string, string>;

/** Every page.tsx under app/: its folder and its URL segments (route groups dropped). */
function pageDirs(dir = APP, segs: string[] = []): { dir: string; segs: string[] }[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (!e.isDirectory()) return e.name === 'page.tsx' ? [{ dir, segs }] : [];
    return pageDirs(path.join(dir, e.name), /^\(.*\)$/.test(e.name) ? segs : [...segs, e.name]);
  });
}

/**
 * The addresses the static export builds, worked out from the route files the way Next does: a post page's
 * own generateStaticParams, and [lang] from the language layout for pages without params of their own —
 * which is why es is not in that layout.
 */
async function builtPaths(): Promise<Set<string>> {
  const langs: Params[] = siteLanguageParams();
  const paths = await Promise.all(pageDirs().map(async ({ dir, segs }) => {
    let sets: Params[] = [{}];
    if (segs.includes('[slug]')) sets = (await import(path.join(dir, 'page.tsx'))).generateStaticParams();
    if (segs.includes('[lang]') && !sets.every((p) => p.lang)) sets = sets.flatMap((p) => langs.map((l) => ({ ...l, ...p })));
    return sets.map((p) => `/${segs.map((s) => s.replace(/^\[(\w+)\]$/, (_, k) => p[k])).join('/')}/`.replace(/\/+/g, '/'));
  }));
  return new Set(paths.flat());
}

const render = (el: unknown) => renderToStaticMarkup(el as ReactElement);
const hrefs = (html: string) => Array.from(html.matchAll(/<a [^>]*href="([^"]+)"/g), (m) => m[1].replace(/&amp;/g, '&'));
/** Links into this site, without the #fragment (a bare #fragment stays on the page it is on). */
const internal = (html: string) => hrefs(html).filter((h) => h.startsWith('/') && !h.startsWith('//')).map((h) => h.split('#')[0]);

const slugs = getPostSlugs('es', DRAMA).sort();
const screens: [string, string][] = [
  ['/es/blog/drama/', render(EsDramaList())],
  ...slugs.map((s): [string, string] => [`/es/blog/drama/${s}/`, render(EsDramaPost({ params: { slug: s } }))]),
];

describe('Spanish drama pages', () => {
  it('are seven posts and the list', () => {
    expect(slugs).toHaveLength(7);
  });

  it('link only to pages the export builds', async () => {
    const built = await builtPaths();
    expect(built).toContain('/es/blog/drama/');
    expect(built).toContain('/en/');
    expect(built).not.toContain('/es/');
    const exists = (href: string) => {
      const p = href.endsWith('/') || path.extname(href) ? href : `${href}/`;
      return built.has(p) || fs.existsSync(path.join(PUBLIC, href));
    };
    const broken = screens.flatMap(([page, html]) => internal(html).filter((h) => !exists(h)).map((h) => `${page} → ${h}`));
    expect(broken).toEqual([]);
  });

  it('keep drama links in Spanish and send everything else to English', () => {
    const wrong = screens.flatMap(([page, html]) =>
      internal(html)
        .filter((h) => !path.extname(h))
        .filter((h) => (h.startsWith('/es/') ? !h.startsWith('/es/blog/drama/') : !/^\/en(\/|$)/.test(h)))
        .map((h) => `${page} → ${h}`));
    expect(wrong).toEqual([]);
    for (const [, html] of screens) {
      expect(internal(html)).toContain('/es/blog/drama/');
      expect(internal(html)).toContain('/en/blog/');
    }
  });

  it('show their words in Spanish', () => {
    const [, list] = screens[0];
    const post = screens.find(([, html]) => html.includes(es.blog_prev) || html.includes(es.blog_next))![1];
    for (const word of [es.blog_cat_drama, es.blog_drama_subtitle, es.nav_products, es.footer_privacy, es.footer_terms, es.brand_slogan]) {
      expect(list).toContain(word);
    }
    for (const word of [es.blog_back, es.blog_watch_youtube, es.blog_subscribe_channel, es.blog_latest, es.footer_tagline]) {
      expect(post).toContain(word);
    }
    // No piece of text on the page is an English UI string that Spanish falls back to.
    const spanish: string[] = Object.values(es);
    const english = new Set(Object.entries(translations.en).filter(([k, v]) => !(k in es) && !spanish.includes(v)).map(([, v]) => v as string));
    const texts = (html: string) => Array.from(html.matchAll(/>([^<]+)</g), (m) => m[1].replace(/[←→]/g, '').trim());
    for (const [page, html] of screens) {
      expect(texts(html).filter((t) => english.has(t)), page).toEqual([]);
    }
  });
});

describe('the language menu', () => {
  it('names Spanish with its country badge when the page has it', () => {
    expect(languageMenu(DRAMA.languages)).toEqual([...languages, { code: 'es', name: 'Español', country: 'ES' }]);
    expect(languageMenu()).toEqual(languages);
  });

  it('is the site four by default', () => {
    expect(languageMenu().map((l) => l.code)).toEqual(Object.keys(translations));
  });
});
