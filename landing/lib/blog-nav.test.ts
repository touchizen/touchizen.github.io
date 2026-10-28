// 메인에서 블로그로 들어가는 길: 헤더는 "블로그" 하나(허브), 카테고리가 둘 이상이면 그 아래 하위 메뉴.
// 카테고리마다 헤더 항목을 따로 두지 않는다 — 네 언어, 특히 독일어에서 헤더가 넘친다.
// 푸터는 카테고리가 하나여도 링크를 둔다(크롤러가 목록 페이지를 찾는 길).
import { describe, expect, it, vi } from 'vitest';
import { createElement, type KeyboardEvent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

vi.mock('@/components/ThemeToggle', () => ({ default: () => null }));
vi.mock('@/components/LanguageToggle', () => ({ default: () => null }));

import Header, { BlogCategoryLinks, closeMenuOnEscape } from '@/components/Header';
import Footer from '@/components/Footer';
import { TECH, type BlogCategory } from './blog-categories';
import { FAKE } from './__fixtures__/categories';


const hrefs = (html: string) => Array.from(html.matchAll(/<a href="([^"]+)"/g), (m) => m[1]);
const count = (html: string, href: string) => hrefs(html).filter((h) => h === href).length;
const header = (categories?: readonly BlogCategory[]) =>
  renderToStaticMarkup(createElement(Header, { lang: 'ko', onLanguageChange() {}, ...(categories && { categories }) }));

describe('blog navigation', () => {
  it('links the blog hub from the header', () => {
    expect(count(header(), '/ko/blog/')).toBeGreaterThan(0);
  });

  it('adds no category menu while there is one category', () => {
    expect(count(header([TECH]), '/ko/blog/tech/')).toBe(0);
  });

  it('lists every category under the blog link', () => {
    // The mobile menu starts closed, so this is the desktop dropdown.
    const html = header([TECH, FAKE]);
    expect(count(html, '/ko/blog/tech/')).toBe(1);
    expect(count(html, '/ko/x/list/')).toBe(1);
  });

  it('gives the mobile menu the same category links', () => {
    const html = renderToStaticMarkup(createElement(BlogCategoryLinks, { lang: 'ko', categories: [TECH, FAKE] }));
    expect(hrefs(html)).toEqual(['/ko/blog/tech/', '/ko/x/list/']);
    expect(html).toContain('IT·AI');
  });

  it('puts every category in the footer', () => {
    const one = renderToStaticMarkup(createElement(Footer, { lang: 'ko' }));
    expect(count(one, '/ko/blog/tech/')).toBe(1);
    expect(one).toContain('IT·AI');
    const two = renderToStaticMarkup(createElement(Footer, { lang: 'ko', categories: [TECH, FAKE] }));
    expect(count(two, '/ko/blog/tech/')).toBe(1);
    expect(count(two, '/ko/x/list/')).toBe(1);
  });
});

describe('blog menu accessibility', () => {
  it('tells assistive tech the blog link opens a menu, only when it does', () => {
    const blogLink = (html: string) => html.match(/<a [^>]*href="\/ko\/blog\/"[^>]*>/)?.[0] ?? '';
    expect(blogLink(header([TECH, FAKE]))).toContain('aria-haspopup="true"');
    expect(blogLink(header([TECH]))).not.toContain('aria-haspopup');
  });

  it('lets Escape close the menu by dropping focus out of it', () => {
    const blur = vi.fn();
    closeMenuOnEscape({ key: 'Escape', target: { blur } } as unknown as KeyboardEvent);
    closeMenuOnEscape({ key: 'Tab', target: { blur } } as unknown as KeyboardEvent);
    expect(blur).toHaveBeenCalledTimes(1);
  });
});
