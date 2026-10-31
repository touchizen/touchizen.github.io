// 드라마 블로그만 스페인어(es)를 더한다. 사이트 언어(Language)는 그대로 넷(ko·en·ja·de)이다 —
// es 는 드라마 카테고리가 선언하는 언어(BlogCategory.languages)이고, 빌드되는 es 페이지는 드라마 목록과
// 드라마 글뿐이다. [lang]/layout.tsx 에 es 를 넣으면 generateStaticParams 가 없는 홈·제품 페이지가 전부
// es 로도 빌드되므로, es 는 app/(main)/es/blog/drama/ 의 따로 된 라우트 트리로 둔다.
import fs from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Metadata } from 'next';

const push = vi.fn();
let lastHeader: { lang: string; languages?: readonly string[]; onLanguageChange: (lang: string) => void } | undefined;
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));
vi.mock('@/components/Header', () => ({
  default: (p: NonNullable<typeof lastHeader>) => {
    lastHeader = p;
    return null;
  },
}));
vi.mock('@/components/Footer', () => ({ default: () => null }));

import { blogTranslations, detectLanguage, languages, translations } from './i18n';
import { es } from './i18n/es';
import { buildPostJsonLd, buildPostMetadata, getAllPosts, getPostBySlug, getPostLanguages, getPostSlugs } from './blog';
import { BLOG_CATEGORIES, DRAMA, TECH, categoryListPath, categoryPostPath } from './blog-categories';
import { blogSitemapEntries, blogSitemapXml } from './blog-sitemap';
import { postStaticParams } from '@/app/(main)/[lang]/blog/postRoute';
import { listMetadata } from '@/app/(main)/[lang]/blog/listRoute';
import BlogPageClient from '@/app/(main)/[lang]/blog/BlogPageClient';
import BlogPostClient from '@/app/(main)/[lang]/blog/[slug]/BlogPostClient';
import BlogHubClient from '@/app/(main)/[lang]/blog/BlogHubClient';
import EsLayout, { metadata as esLayoutMetadata } from '@/app/(main)/es/layout';
import LangLayout from '@/app/(main)/[lang]/layout';
import EsDramaList, { generateMetadata as esListMetadata } from '@/app/(main)/es/blog/drama/page';
import EsDramaPost, {
  generateMetadata as esPostMetadata,
  generateStaticParams as esPostParams,
} from '@/app/(main)/es/blog/drama/[slug]/page';

const SITE = 'https://touchizen.com';
const SITE_LANGS = languages.map((l) => l.code);
const esSlugs = getPostSlugs('es', DRAMA).sort();
const slug = esSlugs[0];
const props = <P,>(el: unknown) => (el as ReactElement<P>).props;

afterEach(() => {
  vi.unstubAllGlobals();
  push.mockClear();
  lastHeader = undefined;
});

describe('languages', () => {
  it('keeps the site at four languages', () => {
    expect(SITE_LANGS).toEqual(['en', 'ko', 'ja', 'de']);
    expect(Object.keys(translations)).toEqual(['en', 'ko', 'ja', 'de']);
  });

  it('gives Spanish to the drama blog only', () => {
    expect(DRAMA.languages).toEqual([...SITE_LANGS, 'es']);
    expect(TECH.languages).toEqual(SITE_LANGS);
    expect(BLOG_CATEGORIES.filter((c) => c.languages.includes('es'))).toEqual([DRAMA]);
  });

  it('never detects Spanish, saved or from the browser', () => {
    vi.stubGlobal('window', {});
    vi.stubGlobal('localStorage', { getItem: () => 'es' });
    vi.stubGlobal('navigator', { language: 'es-ES' });
    expect(detectLanguage()).toBe('en');
  });

  it('has Spanish words only for keys the site has, and English for the rest', () => {
    expect(Object.keys(es).filter((k) => !(k in translations.en))).toEqual([]);
    expect(blogTranslations.es.blog_back).toBe(es.blog_back);
    expect(blogTranslations.es.autoflowcut_desc).toBe(translations.en.autoflowcut_desc);
    for (const l of SITE_LANGS) expect(blogTranslations[l]).toBe(translations[l]);
  });
});

describe('addresses', () => {
  it('puts Spanish drama pages under /es/', () => {
    expect(categoryListPath(DRAMA, 'es')).toBe('/es/blog/drama/');
    expect(categoryPostPath(DRAMA, 'es', 'a')).toBe('/es/blog/drama/a/');
  });

  it('sends Spanish readers of a category without Spanish to its English pages', () => {
    expect(categoryListPath(TECH, 'es')).toBe('/en/blog/tech/');
    expect(categoryPostPath(TECH, 'es', 'a')).toBe('/en/blog/a/');
  });
});

describe('the es route tree', () => {
  const ES = path.join(process.cwd(), 'app', '(main)', 'es');
  const pages = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? pages(path.join(dir, e.name)) : e.name === 'page.tsx' ? [path.relative(ES, path.join(dir, e.name))] : []);

  it('has the drama list and post pages and nothing else', () => {
    expect(pages(ES).sort()).toEqual([path.join('blog', 'drama', '[slug]', 'page.tsx'), path.join('blog', 'drama', 'page.tsx')]);
  });

  it('builds every Spanish drama post, and the site tree builds none', () => {
    expect(esSlugs.length).toBeGreaterThan(0);
    expect(esPostParams().map((p: { slug: string }) => p.slug).sort()).toEqual(esSlugs);
    expect(postStaticParams(DRAMA).filter((p) => !(SITE_LANGS as string[]).includes(p.lang))).toEqual([]);
  });

  it('renders the drama list and posts in Spanish', () => {
    expect(props<{ lang: string; category: unknown }>(EsDramaList())).toMatchObject({ lang: 'es', category: DRAMA });
    expect(props<{ lang: string; category: unknown; post: { slug: string } }>(EsDramaPost({ params: { slug } })))
      .toMatchObject({ lang: 'es', category: DRAMA, post: { slug } });
  });

  it('draws the same document as the site, in Spanish', () => {
    const esDoc = renderToStaticMarkup(EsLayout({ children: createElement('p', null, 'x') }));
    const koDoc = renderToStaticMarkup(LangLayout({ children: createElement('p', null, 'x'), params: { lang: 'ko' } }));
    expect(esDoc).toMatch(/^<html lang="es"/);
    expect(koDoc).toMatch(/^<html lang="ko"/);
    expect(esDoc.replace('lang="es"', '')).toBe(koDoc.replace('lang="ko"', ''));
    expect(esDoc).toContain('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1889477374800958');
    expect(esDoc).toContain('googletagmanager.com/gtag/js?id=G-S0JLFKK5G0');
    expect(esDoc).toContain("localStorage.getItem('theme')");
    expect(esLayoutMetadata.metadataBase?.toString()).toBe(`${SITE}/`);
  });
});

describe('search metadata', () => {
  const alternates = (meta: Metadata) => meta.alternates?.languages as Record<string, string>;

  it('links a drama post to its Spanish version from every language', () => {
    for (const lang of [...SITE_LANGS, 'es'] as const) {
      expect(alternates(buildPostMetadata(lang, slug, DRAMA)).es).toBe(`${SITE}/es/blog/drama/${slug}/`);
    }
    expect(getPostLanguages(slug, DRAMA)).toEqual([...SITE_LANGS, 'es']);
  });

  it('gives the Spanish post its own canonical, Spanish share card and structured data', () => {
    const meta = esPostMetadata({ params: { slug } });
    expect(meta.alternates?.canonical).toBe(`${SITE}/es/blog/drama/${slug}/`);
    expect((meta.openGraph as { locale?: string }).locale).toBe('es_ES');
    expect(meta.title).toBe(getPostBySlug('es', slug, DRAMA)!.title);
    expect(buildPostJsonLd('es', slug, getPostBySlug('es', slug, DRAMA)!, DRAMA).inLanguage).toBe('es');
  });

  it('links the drama list in five languages, the IT list and hub in four', () => {
    const drama = listMetadata('en', DRAMA);
    expect(alternates(drama)).toEqual({
      ...Object.fromEntries([...SITE_LANGS, 'es'].map((l) => [l, `${SITE}/${l}/blog/drama/`])),
      'x-default': `${SITE}/en/blog/drama/`,
    });
    expect(Object.keys(alternates(listMetadata('en', TECH)))).toEqual([...SITE_LANGS, 'x-default']);

    const esList = esListMetadata();
    expect(esList.alternates?.canonical).toBe(`${SITE}/es/blog/drama/`);
    expect((esList.openGraph as { locale?: string }).locale).toBe('es_ES');
    expect(esList.title).toBe(`${es.blog_cat_drama} — ${es.blog_title} | Touchizen`);
    expect(esList.description).toBe(es.blog_drama_subtitle);
  });

  it('lists the Spanish posts in the drama sitemap, linked to their other languages', () => {
    const xml = blogSitemapXml(blogSitemapEntries(DRAMA), DRAMA);
    for (const s of esSlugs) {
      const loc = `${SITE}/es/blog/drama/${s}/`;
      expect(xml).toContain(`<loc>${loc}</loc>`);
      const block = xml.split('<url>').find((b) => b.includes(`<loc>${SITE}/ko/blog/drama/${s}/</loc>`))!;
      expect(block).toContain(`hreflang="es" href="${loc}"`);
    }
    expect(blogSitemapXml(blogSitemapEntries(TECH))).not.toContain('/es/');
  });
});

describe('the language menu', () => {
  const post = { slug: 'p', title: 'T', date: '2026-10-27', excerpt: '', tags: [], author: 'A', htmlContent: '' };

  it('offers Spanish on drama lists and posts, and switches to the same page', () => {
    renderToStaticMarkup(createElement(BlogPageClient, { lang: 'es', posts: [], category: DRAMA }));
    expect(lastHeader?.languages).toEqual([...SITE_LANGS, 'es']);
    lastHeader!.onLanguageChange('ko');
    expect(push).toHaveBeenLastCalledWith('/ko/blog/drama/');

    renderToStaticMarkup(createElement(BlogPostClient, { lang: 'ko', post, category: DRAMA }));
    expect(lastHeader?.languages).toEqual([...SITE_LANGS, 'es']);
    lastHeader!.onLanguageChange('es');
    expect(push).toHaveBeenLastCalledWith('/es/blog/drama/p/');
  });

  it('stays at four languages on IT pages and the hub', () => {
    renderToStaticMarkup(createElement(BlogPageClient, { lang: 'ko', posts: [], category: TECH }));
    expect(lastHeader?.languages).toEqual(SITE_LANGS);
    renderToStaticMarkup(createElement(BlogPostClient, { lang: 'ko', post, category: TECH }));
    expect(lastHeader?.languages).toEqual(SITE_LANGS);
    renderToStaticMarkup(createElement(BlogHubClient, { lang: 'ko', sections: [] }));
    expect(lastHeader?.languages ?? SITE_LANGS).toEqual(SITE_LANGS);
  });

  it('lists every Spanish post on the Spanish drama list', () => {
    expect(getAllPosts('es', DRAMA).map((p) => p.slug).sort()).toEqual(esSlugs);
  });
});
