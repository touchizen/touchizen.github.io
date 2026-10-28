// /{lang}/blog/ 는 카테고리 허브, IT 목록은 /{lang}/blog/tech/ 로 옮긴다. IT 글 주소는 그대로.
//
// 예전 /{lang}/blog/ 를 북마크한 사람이 지금보다 덜 보면 안 된다 — 카테고리가 하나뿐일 때 허브는
// 그 카테고리 글을 전부 보여 준다. 화면 컴포넌트의 주소는 전부 카테고리에서 나온다.
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import type { Language } from './i18n';

const push = vi.fn();
let lastHeader: { onLanguageChange: (lang: Language) => void } | undefined;
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));
vi.mock('@/components/Header', () => ({
  default: (p: { onLanguageChange: (lang: Language) => void }) => {
    lastHeader = p;
    return null;
  },
}));
vi.mock('@/components/Footer', () => ({ default: () => null }));

import { getAllPosts } from './blog';
import { TECH, type BlogCategory } from './blog-categories';
import BlogHubClient, { type HubSection } from '@/app/(main)/[lang]/blog/BlogHubClient';
import BlogHubPage from '@/app/(main)/[lang]/blog/page';
import BlogPageClient from '@/app/(main)/[lang]/blog/BlogPageClient';
import BlogPostClient from '@/app/(main)/[lang]/blog/[slug]/BlogPostClient';

const FAKE: BlogCategory = {
  id: 'drama',
  contentDir: 'blog',
  postBase: 'x/y',
  listBase: 'x/list',
  sitemapFile: 'sitemap-x.xml',
  nameKey: 'blog_cat_tech',
};

const card = (slug: string) => ({ slug, title: `Title ${slug}`, date: '2026-10-01', excerpt: '', tags: [] });
const reading = { slug: 'cur', title: 'Current', date: '2026-10-01', excerpt: '', tags: [], author: 'Touchizen', htmlContent: '<p>body</p>' };
const hrefs = (html: string) => Array.from(html.matchAll(/<a href="([^"]+)"/g), (m) => m[1]);
/** Links whose text is the "더 보기" label. */
const moreLinks = (html: string) => Array.from(html.matchAll(/<a href="([^"]+)"[^>]*>(?:(?!<\/a>)[\s\S])*더 보기/g), (m) => m[1]);

beforeEach(() => {
  push.mockClear();
  lastHeader = undefined;
});

describe('blog hub', () => {
  it('shows every IT post on the hub while IT is the only category', () => {
    const { sections } = (BlogHubPage({ params: { lang: 'ko' } }) as ReactElement<{ sections: HubSection[] }>).props;
    expect(sections).toHaveLength(1);
    expect(sections[0].category).toBe(TECH);
    expect(sections[0].posts).toHaveLength(getAllPosts('ko').length);
    expect(sections[0].more).toBe(false);
  });

  it('shows three posts and a more link per category when there are several', () => {
    const sections: HubSection[] = [
      { category: TECH, posts: [card('a'), card('b'), card('c')], more: true },
      { category: FAKE, posts: [card('d')], more: false },
    ];
    const html = renderToStaticMarkup(createElement(BlogHubClient, { lang: 'ko', sections }));
    expect(hrefs(html)).toEqual(expect.arrayContaining(['/ko/blog/tech/', '/ko/x/list/', '/ko/blog/a/', '/ko/blog/c/', '/ko/x/y/d/']));
    expect(moreLinks(html)).toEqual(['/ko/blog/tech/']);
  });
});

describe('category-aware blog screens', () => {
  it("links list cards with the category's post address", () => {
    const fake = renderToStaticMarkup(createElement(BlogPageClient, { lang: 'ko', posts: [card('a')], category: FAKE }));
    expect(hrefs(fake)).toContain('/ko/x/y/a/');
    const tech = renderToStaticMarkup(createElement(BlogPageClient, { lang: 'ko', posts: [card('a')] }));
    expect(hrefs(tech)).toContain('/ko/blog/a/');
  });

  it('sends the post back to its own category list', () => {
    const prev = { slug: 'old', title: 'Old', date: '2026-09-01' };
    const fake = renderToStaticMarkup(createElement(BlogPostClient, { lang: 'ko', post: reading, category: FAKE, prev, latest: [prev] }));
    expect(hrefs(fake)).toContain('/ko/x/list/');
    expect(hrefs(fake).filter((h) => h.includes('/old/'))).toEqual(['/ko/x/y/old/', '/ko/x/y/old/']);
    const tech = renderToStaticMarkup(createElement(BlogPostClient, { lang: 'ko', post: reading }));
    expect(hrefs(tech)).toContain('/ko/blog/tech/');
  });

  it('switches language to the same list and the same post', () => {
    renderToStaticMarkup(createElement(BlogPageClient, { lang: 'ko', posts: [card('a')] }));
    lastHeader!.onLanguageChange('en');
    renderToStaticMarkup(createElement(BlogPostClient, { lang: 'ko', post: reading }));
    lastHeader!.onLanguageChange('en');
    renderToStaticMarkup(createElement(BlogHubClient, { lang: 'ko', sections: [] }));
    lastHeader!.onLanguageChange('en');
    expect(push.mock.calls.map((c) => c[0])).toEqual(['/en/blog/tech/', '/en/blog/cur/', '/en/blog/']);
  });
});
