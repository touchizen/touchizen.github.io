// 카테고리 라우트 파일은 카테고리 하나만 넘기는 얇은 파일이어야 한다. 드라마·경제를 열 때 IT 라우트를
// 복사하는데, 본문이 기본값(TECH)에 기대면 하나만 빠뜨려도 테스트 없이 조용히 틀어진다 — 드라마 글이
// 홈 canonical 을 갖거나, IT 글이 드라마 주소로 링크되거나, sitemap 이 IT 주소로 나간다.
// 목록 페이지(허브·카테고리 목록)는 홈 메타를 물려받지 않고 자기 주소를 canonical 로 선언한다.
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import type { ReactElement } from 'react';
import type { Metadata } from 'next';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: () => {} }) }));
vi.mock('@/components/Header', () => ({ default: () => null }));
vi.mock('@/components/Footer', () => ({ default: () => null }));

import { getPostSlugs } from './blog';
import { BLOG_CATEGORIES, TECH, type BlogCategory } from './blog-categories';
import { blogSitemapEntries, blogSitemapXml, categorySitemapResponse } from './blog-sitemap';
import { languages, type Language } from './i18n';
import { postMetadata, postStaticParams, renderPostPage } from '@/app/(main)/[lang]/blog/postRoute';
import { generateMetadata as hubMetadata } from '@/app/(main)/[lang]/blog/page';
import { generateMetadata as techListMetadata } from '@/app/(main)/[lang]/blog/tech/page';

const FAKE: BlogCategory = {
  id: 'drama',
  contentDir: 'blog',
  postBase: 'x/y',
  listBase: 'x/list',
  sitemapFile: 'sitemap-x.xml',
  nameKey: 'blog_cat_tech',
};
const SITE = 'https://touchizen.com';
const slug = getPostSlugs('ko')[0];

type Around = { category: BlogCategory; related: { slug: string }[]; latest: { slug: string }[]; others: { slug: string }[] };
const props = (el: unknown) => (el as ReactElement<Around>).props;

describe('post route helpers', () => {
  it("builds a category's static params from that category's posts", () => {
    const expected = languages.flatMap((l) => getPostSlugs(l.code, FAKE).map((s) => ({ lang: l.code, slug: s })));
    expect(postStaticParams(FAKE)).toEqual(expect.arrayContaining(expected));
    expect(postStaticParams(FAKE)).toHaveLength(expected.length);
  });

  it("gives a post the category's canonical", () => {
    expect(postMetadata({ lang: 'ko', slug }, FAKE).alternates?.canonical).toBe(`${SITE}/ko/x/y/${slug}/`);
  });

  it('renders the post inside its category', () => {
    expect(props(renderPostPage({ lang: 'ko', slug }, FAKE)).category).toBe(FAKE);
  });

  it("serves a category sitemap with the category's addresses", async () => {
    expect(await categorySitemapResponse(FAKE).text()).toContain(`<loc>${SITE}/ko/x/y/`);
  });
});

describe('every category route passes its own category', () => {
  const app = (...parts: string[]) => path.join(process.cwd(), 'app', ...parts);

  for (const category of BLOG_CATEGORIES) {
    it(`${category.id}: post pages, metadata, neighbours and sitemap all come from ${category.contentDir}`, async () => {
      const page = await import(app('(main)', '[lang]', category.postBase, '[slug]', 'page.tsx'));
      const own = new Set(languages.flatMap((l) => getPostSlugs(l.code, category).map((s) => `${l.code}/${s}`)));

      const params: { lang: Language; slug: string }[] = page.generateStaticParams();
      expect(params.filter((p) => !own.has(`${p.lang}/${p.slug}`))).toEqual([]);

      const first = params[0];
      expect((page.generateMetadata({ params: first }) as Metadata).alternates?.canonical)
        .toBe(`${SITE}/${first.lang}/${category.postBase}/${first.slug}/`);

      const shown = props(page.default({ params: first }));
      expect(shown.category).toBe(category);
      const listed = [...shown.related, ...shown.latest, ...shown.others].map((p) => `${first.lang}/${p.slug}`);
      expect(listed.filter((p) => !own.has(p))).toEqual([]);

      const route = await import(app(category.sitemapFile, 'route.ts'));
      expect(await route.GET().text()).toBe(blogSitemapXml(blogSitemapEntries(category), category));
      expect(fs.existsSync(app(category.sitemapFile, 'route.ts'))).toBe(true);
    });
  }
});

describe('blog list pages declare their own address', () => {
  const check = (meta: Metadata, pathFor: (lang: string) => string) => {
    expect(meta.alternates?.canonical).toBe(`${SITE}${pathFor('ko')}`);
    expect(meta.alternates?.languages).toEqual({
      ...Object.fromEntries(languages.map((l) => [l.code, `${SITE}${pathFor(l.code)}`])),
      'x-default': `${SITE}${pathFor('en')}`,
    });
    expect(meta.openGraph?.url).toBe(`${SITE}${pathFor('ko')}`);
    // A child's openGraph replaces the parent's whole — without images the share card loses its picture.
    expect(meta.openGraph?.images).toBeTruthy();
  };

  it('the hub', () => {
    const meta = hubMetadata({ params: { lang: 'ko' } });
    check(meta, (l) => `/${l}/blog/`);
    expect(meta.title).toContain('블로그');
  });

  it('the IT list', () => {
    const meta = techListMetadata({ params: { lang: 'ko' } });
    check(meta, (l) => `/${l}/blog/tech/`);
    expect(meta.title).toContain('IT·AI');
  });
});
