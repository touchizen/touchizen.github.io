// touchizen.com/blog/ 는 언어 없는 블로그 입구다. GitHub Pages 라 서버 리다이렉트가 없어서 루트(/)처럼
// 브라우저에서 언어를 골라 보낸다. 검색엔진에는 영어 허브가 그 페이지라고 알린다(사이트맵의 x-default 와 같게).
import fs from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { blogEntryPath } from './blog-entry';
import { metadata } from '@/app/(redirect)/blog/layout';

vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }) }));
import BlogEntryPage from '@/app/(redirect)/blog/page';

const SITE = 'https://touchizen.com';

describe('/blog/ entry', () => {
  it('sends a saved site language to its blog hub', () => {
    expect(blogEntryPath('ko', 'en-US')).toBe('/ko/blog/');
    expect(blogEntryPath('de', 'es-MX')).toBe('/de/blog/');
  });

  it('falls back to the browser language, then English', () => {
    expect(blogEntryPath(null, 'ja-JP')).toBe('/ja/blog/');
    expect(blogEntryPath(null, 'ko')).toBe('/ko/blog/');
    expect(blogEntryPath(null, 'fr-FR')).toBe('/en/blog/');
  });

  // A stale or foreign saved value must not hide the browser's language (Codex review).
  it('ignores a saved value that is not a blog language', () => {
    expect(blogEntryPath('', 'ja-JP')).toBe('/ja/blog/');
    expect(blogEntryPath('fr', 'ja-JP')).toBe('/ja/blog/');
    expect(blogEntryPath('ko-KR', 'de-DE')).toBe('/de/blog/');
  });

  it('sends Spanish readers to the Spanish drama blog, the only Spanish part of the blog', () => {
    expect(blogEntryPath(null, 'es-MX')).toBe('/es/blog/drama/');
    expect(blogEntryPath('es', 'en-US')).toBe('/es/blog/drama/');
  });

  it('tells search engines the English hub is the page and lists every language hub', () => {
    expect(metadata.alternates?.canonical).toBe(`${SITE}/en/blog/`);
    expect(metadata.alternates?.languages).toEqual({
      en: `${SITE}/en/blog/`,
      ko: `${SITE}/ko/blog/`,
      ja: `${SITE}/ja/blog/`,
      de: `${SITE}/de/blog/`,
      'x-default': `${SITE}/en/blog/`,
    });
  });

  // CI runs the tests before the build, so the page is rendered here instead of read from out/.
  it('refreshes to the English hub without JavaScript and links every hub', () => {
    expect(fs.existsSync(path.join(process.cwd(), 'app/(redirect)/blog/page.tsx'))).toBe(true);
    const html = renderToStaticMarkup(createElement(BlogEntryPage));
    expect(html).toContain('<noscript><meta http-equiv="refresh" content="0;url=/en/blog/"/></noscript>');
    expect(Array.from(html.matchAll(/<a href="([^"]+)"/g), (m) => m[1])).toEqual(['/en/blog/', '/ko/blog/', '/ja/blog/', '/de/blog/', '/es/blog/drama/']);
  });
});
