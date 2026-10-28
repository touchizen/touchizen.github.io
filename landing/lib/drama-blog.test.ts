// 드라마 블로그(2단계) — docs/superpowers/plans/2026-10-28-drama-blog-phase2.md.
// 드라마 글은 유튜브 영상과 짝이다: front matter 의 youtube·series·seriesId 가 임베드, 끝 링크,
// VideoObject, 작품별 묶음을 만든다. 픽스처 카테고리(lib/__fixtures__/drama)로 실제 글 없이 검사한다.
import { describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: () => {} }) }));
vi.mock('@/components/Header', () => ({ default: () => null }));
vi.mock('@/components/Footer', () => ({ default: () => null }));

import { getPostBySlug } from './blog';
import { DRAMA, TECH, type BlogCategory } from './blog-categories';
import BlogPageClient from '@/app/(main)/[lang]/blog/BlogPageClient';

/** DRAMA with its posts read from the test fixtures instead of content/drama. */
export const FIXTURE: BlogCategory = { ...DRAMA, contentDir: '../lib/__fixtures__/drama' };

describe('drama category', () => {
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
