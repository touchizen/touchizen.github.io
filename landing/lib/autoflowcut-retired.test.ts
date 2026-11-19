// AutoFlowCut 운영 종료(2026-11-19). 홈에서는 내리고, 남겨 둔 페이지·가이드·블로그 글에는
// 종료 안내를 붙인다. 이 테스트는 "어딘가에 아직 AFC 를 권하는 곳이 남았나"를 모양 전체로 본다 —
// 한 곳만 고치고 나머지가 계속 다운로드·전환을 권하는 게 이 사이트에서 반복되는 실수라서.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import Hero from '@/components/Hero';
import { languages } from '@/lib/i18n';

import { products } from './products';

const ROOT = process.cwd();
const APP = join(ROOT, 'app');
const LANG_DIR = join(APP, '(main)', '[lang]');
const GUIDE_DIR = join(ROOT, '..', 'guide');
const BLOG_DIR = join(ROOT, 'content', 'blog');
const REPO_URL = 'https://github.com/touchizen/AutoFlowCut';

const read = (p: string) => readFileSync(p, 'utf8');

function filesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? filesUnder(p) : [p];
  });
}

describe('main page without AutoFlowCut', () => {
  it('takes AutoFlowCut off the product list', () => {
    expect(products.map((p) => p.id)).not.toContain('autoflowcut');
  });

  it('drops the AutoFlowCut download section from the home page', () => {
    expect(read(join(LANG_DIR, 'page.tsx'))).not.toContain('QuickDownload');
  });

  it.each(languages.map((l) => l.code))('shows no AutoFlowCut video or link in the %s hero', (lang) => {
    const html = renderToStaticMarkup(createElement(Hero, { lang }));
    expect(html.toLowerCase()).not.toContain('autoflowcut');
    expect(html).not.toContain('<iframe');
  });

  it('does not pitch AutoFlowCut on the root page crawlers read', () => {
    expect(read(join(APP, '(redirect)', 'page.tsx'))).not.toMatch(/autoflowcut/i);
  });

  it.each([
    ['home', join(LANG_DIR, 'layout.tsx')],
    ['root', join(APP, '(redirect)', 'layout.tsx')],
  ])('describes the %s page without AutoFlowCut features or its video', (_, layout) => {
    expect(read(layout)).not.toMatch(/capcut|whisk|youtube/i);
  });

  it('no longer sends whisk2capcut readers to AutoFlowCut', () => {
    const pointing = filesUnder(join(LANG_DIR, 'whisk2capcut')).filter((f) =>
      read(f).includes('/autoflowcut'),
    );
    expect(pointing).toEqual([]);
  });
});

describe('retired notice on what stays', () => {
  it('opens the AutoFlowCut page with the retired banner', () => {
    expect(read(join(LANG_DIR, 'autoflowcut', 'page.tsx'))).toContain('<RetiredBanner');
  });

  it.each(languages.map((l) => l.code))('says it is retired and links the source, in %s', async (lang) => {
    const { default: RetiredBanner } = await import('@/app/(main)/[lang]/autoflowcut/components/RetiredBanner');
    const html = renderToStaticMarkup(createElement(RetiredBanner, { lang }));
    expect(html).toContain('data-afc-retired');
    expect(html).toContain(REPO_URL);
  });

  it('has no YouTube link left on the AutoFlowCut page', () => {
    const linking = filesUnder(join(LANG_DIR, 'autoflowcut')).filter((f) =>
      /youtube\.com\/|youtu\.be\//.test(read(f)),
    );
    expect(linking).toEqual([]);
  });

  it('calls AutoFlowCut MIT-licensed, not AGPL, on its page', () => {
    const sources = [
      ...filesUnder(join(LANG_DIR, 'autoflowcut')),
      ...['ko', 'en', 'ja', 'de'].map((l) => join(ROOT, 'lib', 'i18n', `${l}.ts`)),
    ];
    expect(sources.filter((f) => read(f).includes('AGPL'))).toEqual([]);
  });

  it('puts the notice on every AutoFlowCut guide page', () => {
    const pages = readdirSync(GUIDE_DIR)
      .map((lang) => join(GUIDE_DIR, lang, 'autoflowcut'))
      .filter((dir) => existsSync(dir))
      .flatMap((dir) => readdirSync(dir).filter((f) => f.endsWith('.html')).map((f) => join(dir, f)));
    expect(pages.length).toBe(28);
    expect(pages.filter((p) => !read(p).includes('data-afc-retired'))).toEqual([]);
  });

  it('puts the notice first in every blog post tagged AutoFlowCut', () => {
    const posts = readdirSync(BLOG_DIR)
      .flatMap((lang) => readdirSync(join(BLOG_DIR, lang)).map((f) => join(BLOG_DIR, lang, f)))
      .filter((p) => p.endsWith('.md') && /^tags:.*"AutoFlowCut"/m.test(read(p)));
    expect(posts.length).toBe(20);
    const missing = posts.filter((p) => {
      const body = read(p).replace(/^---\n[\s\S]*?\n---\n/, '').trimStart();
      return !(body.startsWith('> ⚠️') && body.split('\n')[0].includes(REPO_URL));
    });
    expect(missing).toEqual([]);
  });
});
