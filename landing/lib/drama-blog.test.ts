// 드라마 블로그(2단계) — docs/superpowers/plans/2026-10-28-drama-blog-phase2.md.
// 드라마 글은 유튜브 영상과 짝이다: front matter 의 youtube·series·seriesId 가 임베드, 끝 링크,
// VideoObject, 작품별 묶음을 만든다. 픽스처 카테고리(lib/__fixtures__/drama)로 실제 글 없이 검사한다.
import { describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: () => {} }) }));
vi.mock('@/components/Header', () => ({ default: () => null }));
vi.mock('@/components/Footer', () => ({ default: () => null }));

import { buildPostJsonLd, getAllPosts, getPostBySlug, getPostSlugs, toCardPost } from './blog';
import { hubSections } from './blog-hub';
import { BLOG_CATEGORIES, DRAMA, TECH, type BlogCategory } from './blog-categories';
import BlogPageClient from '@/app/(main)/[lang]/blog/BlogPageClient';
import BlogPostClient from '@/app/(main)/[lang]/blog/[slug]/BlogPostClient';
import BlogHubClient from '@/app/(main)/[lang]/blog/BlogHubClient';
import BlogHubPage from '@/app/(main)/[lang]/blog/page';
import type { ReactElement } from 'react';
import type { HubSection } from '@/app/(main)/[lang]/blog/BlogHubClient';

/** DRAMA with its posts read from the test fixtures instead of content/drama. */
export const FIXTURE: BlogCategory = { ...DRAMA, contentDir: '../lib/__fixtures__/drama' };

describe('drama category', () => {
  it('is open, after IT', () => {
    expect(BLOG_CATEGORIES).toEqual([TECH, DRAMA]);
  });

  it('lives under the blog with its own sitemap and channel', () => {
    expect(DRAMA).toMatchObject({
      id: 'drama', contentDir: 'drama', postBase: 'blog/drama', listBase: 'blog/drama',
      sitemapFile: 'sitemap-drama.xml', nameKey: 'blog_cat_drama', subtitleKey: 'blog_drama_subtitle',
      youtubeChannel: 'UCF79bfcre5z5WZmN8ncsA2Q',
    });
    expect(TECH.subtitleKey).toBe('blog_subtitle');
  });

  it("reads a post's video and series from its front matter", () => {
    expect(getPostBySlug('ko', 'sample-a', FIXTURE)).toMatchObject({ youtube: 'abcdefghijk', series: '샘플 드라마', seriesId: 'sample' });
  });

  it("subtitles a category list with the category's own line", () => {
    const html = renderToStaticMarkup(createElement(BlogPageClient, { lang: 'ko', posts: [], category: FIXTURE }));
    expect(html).toContain('드라마');
    expect(html).not.toContain('AI 영상 크리에이터를 위한');
  });
});

const reading = { slug: 'cur', title: 'Current', date: '2026-10-27', excerpt: '', tags: [], author: '고든인사이트', htmlContent: '<p>body</p>' };
const hrefs = (html: string) => Array.from(html.matchAll(/<a href="([^"]+)"/g), (m) => m[1]);

describe('a post with a video', () => {
  it('embeds the video under the title and links it at the end', () => {
    const html = renderToStaticMarkup(createElement(BlogPostClient, { lang: 'ko', post: { ...reading, youtube: 'abcdefghijk' }, category: FIXTURE }));
    const iframe = html.match(/<iframe[^>]*>/)?.[0] ?? '';
    // youtube-nocookie: no YouTube cookies until the reader presses play (plays still count as views).
    expect(iframe).toContain('src="https://www.youtube-nocookie.com/embed/abcdefghijk"');
    expect(iframe).toContain('title="Current"');
    expect(html.indexOf('<iframe')).toBeLessThan(html.indexOf('<p>body</p>'));
    const links = hrefs(html.slice(html.indexOf('<p>body</p>')));
    expect(links).toEqual(expect.arrayContaining([
      'https://youtu.be/abcdefghijk',
      'https://www.youtube.com/channel/UCF79bfcre5z5WZmN8ncsA2Q?sub_confirmation=1',
    ]));
    expect(html).toContain('유튜브에서 보기');
  });

  it('leaves a post without a video as it was', () => {
    const html = renderToStaticMarkup(createElement(BlogPostClient, { lang: 'ko', post: reading, category: TECH }));
    expect(html).not.toContain('<iframe');
    expect(html).not.toContain('youtu');
  });

  it("describes the video in the post's structured data", () => {
    const post = getPostBySlug('ko', 'sample-a', FIXTURE)!;
    expect(buildPostJsonLd('ko', 'sample-a', post, FIXTURE).video).toEqual({
      '@type': 'VideoObject',
      name: post.title,
      description: post.excerpt,
      thumbnailUrl: 'https://i.ytimg.com/vi/abcdefghijk/maxresdefault.jpg',
      uploadDate: '2026-10-27T09:00:00+09:00',
      embedUrl: 'https://www.youtube.com/embed/abcdefghijk',
      url: 'https://www.youtube.com/watch?v=abcdefghijk',
    });
    const it = getPostSlugs('ko')[0];
    expect(buildPostJsonLd('ko', it, getPostBySlug('ko', it)!).video).toBeUndefined();
  });
});

const headings = (html: string, level: number) =>
  Array.from(html.matchAll(new RegExp(`<h${level}[^>]*>([\\s\\S]*?)</h${level}>`, 'g')), (m) => m[1].replace(/<[^>]+>/g, '').trim());

describe('lists and the hub', () => {
  it('groups a list by show, newest show first, with the posts under their show', () => {
    const html = renderToStaticMarkup(createElement(BlogPageClient, { lang: 'ko', posts: getAllPosts('ko', FIXTURE).map(toCardPost), category: FIXTURE }));
    expect(headings(html, 2)).toEqual(['다른 작품', '샘플 드라마']);
    expect(headings(html, 3)).toEqual(['다른 작품 글 B', '샘플 드라마 글 C', '샘플 드라마 글 A']);
  });

  it('keeps a list of posts without a show flat', () => {
    const posts = getAllPosts('ko').map(toCardPost);
    const html = renderToStaticMarkup(createElement(BlogPageClient, { lang: 'ko', posts }));
    expect(headings(html, 2)).toHaveLength(posts.length);
    expect(headings(html, 3)).toEqual([]);
  });

  it('shows three posts and a more link per category when there are several', () => {
    // Sections come newest-post first (lib/blog-hub.test.ts), so find them by category, not position.
    const sections = hubSections('ko', [TECH, FIXTURE]);
    const tech = sections.find((s) => s.category.id === 'tech')!;
    const drama = sections.find((s) => s.category.id === 'drama')!;
    expect(tech.posts.map((p) => p.slug)).toEqual(getAllPosts('ko').slice(0, 3).map((p) => p.slug));
    expect(tech.more).toBe(true);
    expect(drama.posts.map((p) => p.slug)).toEqual(['sample-b', 'sample-c', 'sample-a']);
    expect(drama.more).toBe(false);
  });

  it('heads hub cards below their category heading', () => {
    const html = renderToStaticMarkup(createElement(BlogHubClient, { lang: 'ko', sections: hubSections('ko', [TECH, FIXTURE]) }));
    expect([...headings(html, 2)].sort()).toEqual(['IT·AI', '드라마'].sort());
    expect(headings(html, 3)).toHaveLength(6);
  });

  it('builds the hub page from the listed categories', () => {
    const { sections } = (BlogHubPage({ params: { lang: 'ko' } }) as ReactElement<{ sections: HubSection[] }>).props;
    expect(sections).toEqual(hubSections('ko'));
  });
});

describe('posts published the same day', () => {
  // Drama posts often go up twice a day, so `date` may carry the publish time (KST).
  it('come newest first by publish time', () => {
    expect(getAllPosts('ko', FIXTURE).map((p) => p.slug)).toEqual(['sample-b', 'sample-c', 'sample-a']);
  });

  it('show only the day to the reader', () => {
    const list = renderToStaticMarkup(createElement(BlogPageClient, { lang: 'ko', posts: getAllPosts('ko', FIXTURE).map(toCardPost), category: FIXTURE }));
    const post = renderToStaticMarkup(createElement(BlogPostClient, {
      lang: 'ko', post: { ...reading, date: '2026-10-27T20:00:00+09:00' }, category: FIXTURE,
      latest: [{ slug: 'sample-a', title: 'A', date: '2026-10-27T09:00:00+09:00' }],
    }));
    for (const html of [list, post]) {
      expect(html).toContain('>2026-10-27</time>');
      expect(html).not.toMatch(/T\d{2}:\d{2}/);
    }
  });
});

describe('quotes in a post', () => {
  // Posts quote dialogue in their own quotation marks; the typography plugin adds a second pair around
  // every blockquote ("" … ""). The reset is an inline <style> so no CSS minifier can drop it.
  it('get no automatic quotation marks around them', () => {
    const html = renderToStaticMarkup(createElement(BlogPostClient, { lang: 'ko', post: reading, category: FIXTURE }));
    expect(html).toContain('.prose blockquote p:first-of-type::before,.prose blockquote p:last-of-type::after{content:none!important}');
  });
});
