// 애드센스 자동 광고는 **모든 페이지의 <head>** 에 같은 코드가 있어야 한다 (support.google.com/adsense/answer/9274019).
//
// 이 사이트의 페이지는 두 군데서 나온다 — Next 루트 레이아웃(`<html>` 을 그리는 layout.tsx)과,
// deploy.yml 이 `landing/out/` 에 그대로 복사하는 손으로 쓴 정적 HTML. 한쪽만 고치면 나머지가
// 조용히 빠지므로 **모양 전체**에 건다 — 새 레이아웃이나 새 정적 폴더를 더해도 이 테스트가 잡는다.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

import { describe, expect, it } from 'vitest';

const LANDING = process.cwd();
const REPO = join(LANDING, '..');

const ADSENSE_SRC =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1889477374800958';

/** 일부러 광고를 안 붙이는 정적 페이지. 이유 없이 넣지 마라. */
const NO_ADS: Record<string, string> = {
  'srt2short/callback.html': 'OAuth 인증 완료 화면 — 콘텐츠 없는 화면에 광고 금지(애드센스 정책)',
  'solvemath/ChatView.html': '개발용 채팅 UI 예제 페이지',
  'solvemath/mmd.html': '개발용 Mathpix 렌더링 예제 페이지',
  'transnote/ChatUI.html': '개발용 채팅 UI 예제 페이지',
  'transnote/newChatUI.html': '개발용 채팅 UI 예제 페이지',
  'transnote/lottie.html': '개발용 Lottie 예제 페이지',
};

function walk(dir: string, keep: (file: string) => boolean): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === 'node_modules' ? [] : walk(full, keep);
    return keep(full) ? [full] : [];
  });
}

/** deploy.yml 의 `cp -r <dir> landing/out/` 줄 = 배포되는 정적 폴더. */
function deployedStaticDirs(): string[] {
  const yml = readFileSync(join(REPO, '.github', 'workflows', 'deploy.yml'), 'utf8');
  return Array.from(yml.matchAll(/cp -r (\S+) landing\/out\//g), (m) => m[1]);
}

function headOf(html: string): string {
  const end = html.search(/<\/head>/i);
  return end < 0 ? '' : html.slice(0, end);
}

describe('AdSense auto ads code', () => {
  it('is in the <head> of every root layout', () => {
    const rootLayouts = walk(join(LANDING, 'app'), (f) => f.endsWith('layout.tsx')).filter((f) =>
      readFileSync(f, 'utf8').includes('<html'),
    );
    expect(rootLayouts.length).toBeGreaterThan(0);

    const missing = rootLayouts
      .filter((f) => !headOf(readFileSync(f, 'utf8')).includes(ADSENSE_SRC))
      .map((f) => relative(LANDING, f));
    expect(missing).toEqual([]);
  });

  it('is in the <head> of every deployed static HTML page exactly once, or says why not', () => {
    const pages = deployedStaticDirs().flatMap((dir) =>
      // `._*` 는 macOS AppleDouble 바이너리 — HTML 이 아니다.
      walk(join(REPO, dir), (f) => f.endsWith('.html') && !f.split('/').pop()!.startsWith('._')),
    );
    expect(pages.length).toBeGreaterThan(0);

    const wrong = pages
      .map((f) => relative(REPO, f))
      .filter((rel) => {
        const html = readFileSync(join(REPO, rel), 'utf8');
        const count = html.split(ADSENSE_SRC).length - 1;
        if (rel in NO_ADS) return count !== 0;
        return count !== 1 || !headOf(html).includes(ADSENSE_SRC);
      });
    expect(wrong).toEqual([]);
  });

  it('is backed by an ads.txt that authorizes the same publisher', () => {
    // Next 가 public/ 을 out/ 루트로 복사한다 → touchizen.com/ads.txt
    const adsTxt = readFileSync(join(LANDING, 'public', 'ads.txt'), 'utf8');
    expect(adsTxt).toContain('google.com, pub-1889477374800958, DIRECT, f08c47fec0942fa0');
  });
});
