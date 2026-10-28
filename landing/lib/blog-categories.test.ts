// 블로그는 카테고리 여러 개(IT·AI, 드라마, 나중에 경제)로 운영한다 — docs/superpowers/specs/2026-10-28-drama-blog-design.md.
//
// 카테고리 목록에는 **글이 있는 카테고리만** 넣는다. 정적 export 는 글이 0개인 카테고리를 빈 페이지나
// 자리표시 페이지로밖에 못 만들고, 빈 페이지는 애드센스가 가치 없는 콘텐츠로 본다. 그래서 숨김 규칙을
// 화면마다 조건문으로 두지 않고, 목록에 들어가는 조건 하나로 건다.
import { describe, expect, it } from 'vitest';

import { buildPostJsonLd, buildPostMetadata, getPostBySlug, getPostSlugs } from './blog';
import { BLOG_CATEGORIES, TECH, categoryListPath, categoryPostPath, type BlogCategory } from './blog-categories';
import { blogSitemapXml } from './blog-sitemap';
import { languages } from './i18n';

/** IT 글을 다른 주소로 내보내 보는 가짜 카테고리 — 주소가 카테고리에서 나오는지 본다. */
const FAKE: BlogCategory = {
  id: 'drama',
  contentDir: 'blog',
  postBase: 'x/y',
  listBase: 'x/list',
  sitemapFile: 'sitemap-x.xml',
  nameKey: 'blog_cat_tech',
};

const SITE = 'https://touchizen.com';

describe('blog categories', () => {
  it('keeps the IT post addresses and gives IT its own list', () => {
    expect(categoryPostPath(TECH, 'ko', 'a')).toBe('/ko/blog/a/');
    expect(categoryListPath(TECH, 'ko')).toBe('/ko/blog/tech/');
  });

  it('lists only categories that have posts in every language', () => {
    const empty = BLOG_CATEGORIES.flatMap((cat) =>
      languages.filter((l) => getPostSlugs(l.code, cat).length === 0).map((l) => `${cat.id}/${l.code}`),
    );
    expect(BLOG_CATEGORIES.length).toBeGreaterThan(0);
    expect(empty).toEqual([]);
  });

  it('has no IT post slug that a category folder would shadow', () => {
    const categoryIds = ['tech', 'drama', 'economy'];
    const clashes = languages.flatMap((l) => getPostSlugs(l.code, TECH).filter((slug) => categoryIds.includes(slug)));
    expect(clashes).toEqual([]);
  });

  it("builds a post's canonical, hreflang and JSON-LD from its category", () => {
    const slug = getPostSlugs('ko')[0];
    const post = getPostBySlug('ko', slug)!;

    const meta = buildPostMetadata('ko', slug, FAKE);
    expect(meta.alternates?.canonical).toBe(`${SITE}/ko/x/y/${slug}/`);
    expect((meta.alternates?.languages as Record<string, string>).ko).toBe(`${SITE}/ko/x/y/${slug}/`);
    expect(buildPostJsonLd('ko', slug, post, FAKE).mainEntityOfPage['@id']).toBe(`${SITE}/ko/x/y/${slug}/`);

    expect(buildPostMetadata('ko', slug).alternates?.canonical).toBe(`${SITE}/ko/blog/${slug}/`);
  });

  it("writes a category sitemap with the category's addresses", () => {
    const xml = blogSitemapXml([{ lang: 'ko', slug: 'a', date: '2026-01-01', noindex: false }], FAKE);
    expect(xml).toContain(`<loc>${SITE}/ko/x/y/a/</loc>`);
  });
});
