import { describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// The list page is a client component; outside the app router it only needs these stubbed.
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: () => {} }) }));
vi.mock('@/components/Header', () => ({ default: () => null }));
vi.mock('@/components/Footer', () => ({ default: () => null }));

import BlogPageClient from '@/app/(main)/[lang]/blog/BlogPageClient';

const post = (slug: string, image?: string) => ({
  slug, title: `Title ${slug}`, date: '2026-09-29', excerpt: 'excerpt', tags: ['tag'], image,
});

const render = (posts: ReturnType<typeof post>[]) =>
  renderToStaticMarkup(createElement(BlogPageClient, { lang: 'ko', posts }));

describe('blog list thumbnails', () => {
  it("shows the post's image as a thumbnail inside the post's link", () => {
    const html = render([post('a', '/images/blog/a.jpg')]);
    expect(html).toMatch(/<a href="\/ko\/blog\/a\/"[^>]*>(?:(?!<\/a>)[\s\S])*<img[^>]*src="\/images\/blog\/a\.jpg"/);
  });

  it('marks the thumbnail decorative and lazy — the title next to it already names the post', () => {
    const img = render([post('a', '/images/blog/a.jpg')]).match(/<img[^>]*>/)?.[0] ?? '';
    expect(img).toContain('alt=""');
    expect(img).toContain('loading="lazy"');
  });

  it('falls back to the site image when a post has none', () => {
    const html = render([post('b')]);
    expect(html).toMatch(/<img[^>]*src="\/images\/touchizen\.png"/);
  });

  it('gives every post exactly one thumbnail', () => {
    const html = render([post('a', '/images/blog/a.jpg'), post('b'), post('c', '/images/blog/c.png')]);
    expect(html.match(/<img/g)?.length).toBe(3);
  });
});
