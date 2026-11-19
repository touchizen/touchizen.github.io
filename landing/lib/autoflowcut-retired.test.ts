// AutoFlowCut 운영 종료(2026-11-19). 홈에서는 내리고, 남겨 둔 페이지·가이드·블로그 글에는
// 종료 안내를 붙인다. 이 테스트는 "어딘가에 아직 AFC 를 권하는 곳이 남았나"를 모양 전체로 본다 —
// 한 곳만 고치고 나머지가 계속 다운로드·전환을 권하는 게 이 사이트에서 반복되는 실수라서.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { createElement } from 'react';
import matter from 'gray-matter';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { blogOnlyLanguages, languages } from '@/lib/i18n';

// The AutoFlowCut page reads its language from the route; render it as each language.
const route = vi.hoisted(() => ({ lang: 'en' }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: () => {}, replace: () => {} }),
  useParams: () => ({ lang: route.lang }),
  usePathname: () => `/${route.lang}/autoflowcut/`,
}));

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

  it.each(languages.map((l) => l.code))('lists no AutoFlowCut feature in the %s home features section', async (lang) => {
    const { default: Features } = await import('@/components/Features');
    const html = renderToStaticMarkup(createElement(Features, { lang }));
    expect(html).not.toMatch(/capcut|autoflowcut|100\+|100장|100枚/i);
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

  it.each([...languages, ...blogOnlyLanguages].map((l) => l.code))('has no YouTube link in the %s footer', (lang) => {
    const html = renderToStaticMarkup(createElement(Footer, { lang }));
    expect(html).not.toMatch(/youtube\.com\/|youtu\.be\//);
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

  it('puts the notice on every AutoFlowCut guide page, in every guide language', () => {
    const guideLangs = readdirSync(GUIDE_DIR).filter((l) => existsSync(join(GUIDE_DIR, l, 'autoflowcut')));
    const pagesOf = (l: string) =>
      readdirSync(join(GUIDE_DIR, l, 'autoflowcut')).filter((f) => f.endsWith('.html')).sort();
    expect(guideLangs.sort()).toEqual(languages.map((l) => l.code).sort());
    for (const l of guideLangs) expect(pagesOf(l), l).toEqual(pagesOf('en'));
    expect(pagesOf('en').length).toBeGreaterThan(0);

    const missing = guideLangs.flatMap((l) =>
      pagesOf(l)
        .map((f) => join(GUIDE_DIR, l, 'autoflowcut', f))
        .filter((p) => {
          const html = read(p);
          const at = html.indexOf('data-afc-retired');
          const notice = at < 0 ? '' : html.slice(at, html.indexOf('</div>', html.indexOf('</div>', at) + 1));
          return !(notice.includes('AutoFlowCut') && notice.includes('MIT') && notice.includes(REPO_URL));
        }),
    );
    expect(missing).toEqual([]);
  });

  it('puts the notice first in every blog post tagged AutoFlowCut, in every site language', () => {
    const tagged = readdirSync(BLOG_DIR).flatMap((lang) =>
      readdirSync(join(BLOG_DIR, lang))
        .filter((f) => f.endsWith('.md'))
        .map((f) => ({ lang, slug: f.replace(/\.md$/, ''), ...matter(read(join(BLOG_DIR, lang, f))) }))
        .filter((post) => (post.data.tags ?? []).includes('AutoFlowCut')),
    );
    const slugs = Array.from(new Set(tagged.map((p) => p.slug))).sort();
    expect(slugs.length).toBeGreaterThan(0);
    for (const l of languages.map((x) => x.code)) {
      expect(tagged.filter((p) => p.lang === l).map((p) => p.slug).sort(), l).toEqual(slugs);
    }

    const missing = tagged.filter((post) => {
      const first = post.content.trimStart().split('\n')[0];
      return !(first.startsWith('> ⚠️ **AutoFlowCut') && first.includes('MIT') && first.includes(REPO_URL));
    });
    expect(missing.map((p) => `${p.lang}/${p.slug}`)).toEqual([]);
  });
});

describe('nothing left to download or buy on the AutoFlowCut page', () => {
  it.each(languages.map((l) => l.code))('renders the %s page without store, download, price or YouTube', async (lang) => {
    route.lang = lang;
    const { default: AutoFlowCutPage } = await import('@/app/(main)/[lang]/autoflowcut/page');
    const html = renderToStaticMarkup(createElement(AutoFlowCutPage));
    expect(html).toContain('data-afc-retired'); // the render really is the AutoFlowCut page
    expect(html).not.toContain('apps.microsoft.com');
    expect(html).not.toContain('Microsoft Store');
    expect(html).not.toContain('releases/latest');
    expect(html).not.toMatch(/\$\d+\.99/);
    expect(html).not.toMatch(/youtube\.com\/|youtu\.be\//);
  });

  it('drops the install, pricing, contribution-rewards and download-CTA sections', () => {
    const page = read(join(LANG_DIR, 'autoflowcut', 'page.tsx'));
    for (const section of ['InstallationSection', 'PricingSection', 'ContributeSection', 'CTASection']) {
      expect(page).not.toContain(section);
    }
  });

  it('asks no pricing or macOS-download question in the FAQ or its structured data', () => {
    for (const file of ['components/FAQSection.tsx', 'layout.tsx']) {
      expect(read(join(LANG_DIR, 'autoflowcut', file))).not.toMatch(/autoflowcut_faq_[qa](6|9)\b/);
    }
  });

  it('offers no price or download in the structured data', () => {
    const layout = read(join(LANG_DIR, 'autoflowcut', 'layout.tsx'));
    expect(layout).not.toMatch(/offers|downloadUrl|\$\d+\.99/);
  });
});
