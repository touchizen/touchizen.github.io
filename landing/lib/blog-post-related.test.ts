import { describe, expect, it, vi } from 'vitest';
import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// The post page is a client component; outside the app router it only needs these stubbed.
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: () => {} }) }));
vi.mock('@/components/Header', () => ({ default: () => null }));
vi.mock('@/components/Footer', () => ({ default: () => null }));

import BlogPostClient from '@/app/(main)/[lang]/blog/[slug]/BlogPostClient';
import BlogPostPage from '@/app/(main)/[lang]/blog/[slug]/page';

const reading = { slug: 'cur', title: 'Current', date: '2026-10-01', excerpt: '', tags: [], author: 'Touchizen', htmlContent: '<p>body</p>' };
const item = (slug: string, image?: string) => ({ slug, title: `Title ${slug}`, date: '2026-09-29', image });

const render = (related: ReturnType<typeof item>[]) =>
  renderToStaticMarkup(createElement(BlogPostClient, { lang: 'ko', post: reading, related }));

describe('related posts beside a post', () => {
  it('links each related post with its thumbnail', () => {
    const html = render([item('a', '/images/blog/a.jpg'), item('b')]);
    const aside = html.match(/<aside[\s\S]*<\/aside>/)?.[0] ?? '';
    expect(aside).toMatch(/<a href="\/ko\/blog\/a\/"[^>]*>(?:(?!<\/a>)[\s\S])*<img[^>]*src="\/images\/blog\/a\.jpg"/);
    expect(aside).toMatch(/<a href="\/ko\/blog\/b\/"[^>]*>(?:(?!<\/a>)[\s\S])*<img[^>]*src="\/images\/touchizen\.png"/);
    expect(aside).toContain('Title a');
  });

  it('heads the list in the reader’s language', () => {
    expect(render([item('a')])).toMatch(/<aside[\s\S]*다른 글/);
  });

  it('shows no related section when there is nothing to list', () => {
    expect(render([])).not.toContain('<aside');
  });

  it('page passes other posts without their bodies', () => {
    const el = BlogPostPage({ params: { lang: 'ko', slug: 'gpt-6-1-sol-astra-pro-200' } }) as ReactElement<{ related: object[] }>;
    const { related } = el.props;
    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(5);
    for (const r of related) {
      expect(Object.keys(r).sort()).toEqual(['date', 'image', 'slug', 'title']);
      expect(r).not.toHaveProperty('slug', 'gpt-6-1-sol-astra-pro-200');
    }
  });
});
