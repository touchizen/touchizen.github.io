// 앱 페이지가 있는데 **메인 페이지에서 아무도 안 가리키는** 상태를 막는다.
//
// ⛔ 실제로 그렇게 돼 있었다: `/mathshorts/` 는 네 언어로 멀쩡히 있었고 앱의 서랍이 그 주소를
// 공유하고 있었는데, `lib/products.ts` 에 항목이 없어 **touchizen.com 에서 들어갈 길이 없었다.**
// 페이지를 만들면 등록을 잊는 것이 이 저장소의 반복되는 모양이라, 한 페이지가 아니라
// **모양 전체**에 건다 — `og-metadata.test.ts` 와 같은 규율이다.
//
// 새 앱 페이지를 더하면 이 테스트가 **선택을 강요한다**: 메인에 올리거나, 왜 안 올리는지
// 여기 적거나. 조용히 빠지는 것만 막는다.
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { products } from './products';

const APP_DIR = join(process.cwd(), 'app', '(main)', '[lang]');

/** 메인에 **일부러** 안 올리는 페이지. 이유 없이 넣지 마라 — 이유가 이 테스트의 값이다. */
const NOT_ON_MAIN_PAGE: Record<string, string> = {
  blog: '상품이 아니라 글 목록이다',
  whisk2capcut: '서비스 종료 — lib/products.ts 의 주석 참고',
  neonrail: '앱이 아직 배포 전이다 — 배포 뒤에 별도로 올린다',
};

/** `layout.tsx` 를 가진 디렉터리 = 자기 링크 미리보기 카드를 갖는 페이지 = 앱 페이지. */
function appPageDirs(): string[] {
  return readdirSync(APP_DIR)
    .filter((name) => statSync(join(APP_DIR, name)).isDirectory())
    .filter((name) => existsSync(join(APP_DIR, name, 'layout.tsx')))
    .sort();
}

describe('main page product registry', () => {
  it('links every app page from the main page, or says why not', () => {
    const registered = new Set(products.map((p) => p.link.replace(/^\/|\/$/g, '')));
    const orphans = appPageDirs().filter(
      (dir) => !registered.has(dir) && !(dir in NOT_ON_MAIN_PAGE),
    );
    expect(orphans).toEqual([]);
  });

  // ⚠ 위 테스트만 있으면 **면제 목록에 다 적어 넣고** 통과시킬 수 있다. 그래서 목록이
  //   실제 디렉터리를 가리키는지도 본다 — 사라진 페이지의 면제는 남아 있으면 안 된다.
  it('keeps the exemption list honest — every entry is a real page', () => {
    const dirs = appPageDirs();
    expect(Object.keys(NOT_ON_MAIN_PAGE).filter((d) => !dirs.includes(d))).toEqual([]);
  });

  it('points every registered detail page at a page that exists', () => {
    const broken = products
      .filter((p) => p.hasDetailPage && !p.isExternal)
      .map((p) => p.link.replace(/^\/|\/$/g, ''))
      .filter((slug) => !existsSync(join(APP_DIR, slug)));
    expect(broken).toEqual([]);
  });
});
