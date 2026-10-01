import { describe, expect, it, vi } from 'vitest';
import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getPostBySlug } from './blog';

// The post page is a client component; outside the app router it only needs these stubbed.
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: () => {} }) }));
vi.mock('@/components/Header', () => ({ default: () => null }));
vi.mock('@/components/Footer', () => ({ default: () => null }));

import BlogPostClient, { type PostSummary } from '@/app/(main)/[lang]/blog/[slug]/BlogPostClient';
import BlogPostPage from '@/app/(main)/[lang]/blog/[slug]/page';

const reading = { slug: 'cur', title: 'Current', date: '2026-10-01', excerpt: '', tags: [], author: 'Touchizen', htmlContent: '<p>body</p>' };
const item = (slug: string, image?: string): PostSummary => ({ slug, title: `Title ${slug}`, date: '2026-09-29', image });

type Around = { related?: PostSummary[]; others?: PostSummary[]; latest?: PostSummary[]; prev?: PostSummary; next?: PostSummary };
const render = (around: Around) => renderToStaticMarkup(createElement(BlogPostClient, { lang: 'ko', post: reading, ...around }));
const aside = (html: string) => html.match(/<aside[\s\S]*<\/aside>/)?.[0] ?? '';
const postNav = (html: string) => html.match(/<nav[\s\S]*?<\/nav>/)?.[0] ?? '';

describe('sidebar beside a post', () => {
  it('links each listed post with its thumbnail', () => {
    const html = aside(render({ related: [item('a', '/images/blog/a.jpg')], latest: [item('b')] }));
    expect(html).toMatch(/<a href="\/ko\/blog\/a\/"[^>]*>(?:(?!<\/a>)[\s\S])*<img[^>]*src="\/images\/blog\/a\.jpg"/);
    expect(html).toMatch(/<a href="\/ko\/blog\/b\/"[^>]*>(?:(?!<\/a>)[\s\S])*<img[^>]*src="\/images\/touchizen\.png"/);
    expect(html).toContain('Title a');
  });

  it('heads related posts and latest posts separately, in the reader’s language', () => {
    const html = aside(render({ related: [item('a')], latest: [item('b')] }));
    expect(html).toMatch(/관련 글(?:(?!최신 글)[\s\S])*\/ko\/blog\/a\/[\s\S]*최신 글[\s\S]*\/ko\/blog\/b\//);
  });

  it('leaves out the related heading when no post shares a tag', () => {
    const html = aside(render({ related: [], latest: [item('b')] }));
    expect(html).not.toContain('관련 글');
    expect(html).toContain('최신 글');
  });

  it('heads other posts in the related posts’ place when none shares a tag', () => {
    const html = aside(render({ related: [], others: [item('o')], latest: [item('b')] }));
    expect(html).not.toContain('관련 글');
    expect(html).toMatch(/다른 글(?:(?!최신 글)[\s\S])*\/ko\/blog\/o\/[\s\S]*최신 글[\s\S]*\/ko\/blog\/b\//);
  });

  it('shows no sidebar when there is nothing to list', () => {
    expect(render({})).not.toContain('<aside');
  });
});

describe('previous and next links under a post', () => {
  it('links the older post as previous and the newer one as next', () => {
    const nav = postNav(render({ prev: item('old'), next: item('new') }));
    expect(nav).toMatch(/<a href="\/ko\/blog\/old\/"(?:(?!<\/a>)[\s\S])*이전 글(?:(?!<\/a>)[\s\S])*Title old/);
    expect(nav).toMatch(/<a href="\/ko\/blog\/new\/"(?:(?!<\/a>)[\s\S])*다음 글(?:(?!<\/a>)[\s\S])*Title new/);
  });

  it('leaves out the side that has no post', () => {
    const nav = postNav(render({ prev: item('old') }));
    expect(nav).toContain('이전 글');
    expect(nav).not.toContain('다음 글');
  });

  it('shows no links when the post stands alone', () => {
    expect(render({})).not.toContain('<nav');
  });
});

describe('post page', () => {
  const page = (slug: string) =>
    (BlogPostPage({ params: { lang: 'ko', slug } }) as ReactElement<Required<Around>>).props;

  it('passes related posts that share a tag and latest posts that repeat none of them', () => {
    const { related, latest } = page('story-mode-case-study');
    const tags = ['AutoFlowCut', 'Story 모드', '제작기', 'AI 영상 자동화'];
    expect(related.length).toBeGreaterThan(0);
    for (const r of related) expect(getPostBySlug('ko', r.slug)!.tags.some((tag) => tags.includes(tag))).toBe(true);
    expect(latest.length).toBeGreaterThan(0);
    const listed = [...related, ...latest].map((p) => p.slug);
    expect(new Set(listed).size).toBe(listed.length);
    expect(listed).not.toContain('story-mode-case-study');
  });

  it('passes no other posts when some posts are related', () => {
    expect(page('story-mode-case-study').others).toEqual([]);
  });

  it('passes the next newest posts as other posts when none is related', () => {
    const { related, others, latest } = page('github-star-tracker');
    expect(related).toEqual([]);
    expect(others.length).toBeGreaterThan(0);
    const listed = [...others, ...latest].map((p) => p.slug);
    expect(new Set(listed).size).toBe(listed.length);
    expect(listed).not.toContain('github-star-tracker');
    const oldestLatest = Math.min(...latest.map((p) => new Date(p.date).getTime()));
    for (const o of others) expect(new Date(o.date).getTime()).toBeLessThanOrEqual(oldestLatest);
  });

  it('passes the neighbouring posts by date', () => {
    const { prev, next } = page('github-star-tracker');
    expect(prev.slug).toBe('story-mode-case-study');
    expect(next.slug).toBe('gemini-3-8-tts-voice-clone');
  });

  it('passes other posts without their bodies', () => {
    const { related, others, latest, prev, next } = page('github-star-tracker');
    for (const p of [...related, ...others, ...latest, prev, next]) {
      expect(Object.keys(p).sort()).toEqual(['date', 'image', 'slug', 'title']);
    }
  });
});
