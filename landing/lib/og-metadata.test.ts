// 앱 페이지의 링크 미리보기 카드가 실제로 생기는지 — 모든 앱 페이지에 대해, 모든 언어에 대해.
//
// ⛔ 이 검사가 있는 이유: Next 에서 **자식 레이아웃의 `openGraph` 는 부모 것을 통째로 대체한다.**
// 합쳐지지 않는다. 그래서 자식이 `openGraph.title` 만 쓰고 `images` 를 빠뜨리면 결과 HTML 에
// `og:image` 가 **아예 안 생기고**, 카카오톡·슬랙은 사이트 파비콘으로 떨어진다. mathshorts 에서
// 실제로 그렇게 나가고 있었다.
//
// 앱 서랍의 "공유" 가 보내는 것이 바로 이 주소들이라, 카드가 비면 공유 기능 자체가 값을 잃는다.
// 한 페이지가 아니라 **모양 전체**에 건다 — 같은 실수를 할 수 있는 자리가 앱마다 하나씩 있다.
import { describe, it, expect } from 'vitest';
import type { Metadata } from 'next';
import { languages, Language } from './i18n';

import { generateMetadata as neonrail } from '@/app/(main)/[lang]/neonrail/layout';
import { generateMetadata as mathshorts } from '@/app/(main)/[lang]/mathshorts/layout';
import { generateMetadata as autoflowcut } from '@/app/(main)/[lang]/autoflowcut/layout';
import { generateMetadata as calorieShot } from '@/app/(main)/[lang]/calorie-shot/layout';
import { generateMetadata as whisk2capcut } from '@/app/(main)/[lang]/whisk2capcut/layout';

type Generator = (props: { params: { lang: Language } }) => Metadata | Promise<Metadata>;

const APP_PAGES: [string, Generator][] = [
  ['neonrail', neonrail as Generator],
  ['mathshorts', mathshorts as Generator],
  ['autoflowcut', autoflowcut as Generator],
  ['calorie-shot', calorieShot as Generator],
  ['whisk2capcut', whisk2capcut as Generator],
];

describe.each(APP_PAGES)('%s link preview card', (name, generateMetadata) => {
  it.each(languages.map((l) => l.code))('has an og:image in %s', async (lang) => {
    const meta = await generateMetadata({ params: { lang } });

    const images = meta.openGraph?.images;
    expect(images, `${name}/${lang}: openGraph has no images, so og:image will not be emitted`).toBeTruthy();

    const list = Array.isArray(images) ? images : [images];
    expect(list.length, `${name}/${lang}: openGraph.images is empty`).toBeGreaterThan(0);

    const first = list[0] as { url?: string; width?: number; height?: number };
    expect(first.url, `${name}/${lang}: the first og image has no url`).toBeTruthy();

    // 문서에 적힌 실패 모드는 **정사각 아이콘을 그대로 카드에 얹는 것**이다 — `summary_large_image`
    // 는 가로로 긴 카드라, 1:1 을 넣으면 3분의 2가 빈 배경이 된다. 그래서 "가로로 길다"만 문다.
    // 🔴 정확히 1.91:1 을 요구하지는 않는다: 그건 권장값이지 요구사항이 아니고, 플랫폼은 crop 한다.
    // 이 저장소에도 1.905(1200x630) · 1.778(1280x720) · 1.6(1280x800) 이 함께 쓰이고 셋 다 멀쩡하다.
    // 1.91 을 박았더니 멀쩡한 페이지 둘이 빨개졌다 — 선호를 게이트로 만든 것이었다.
    if (first.width && first.height) {
      expect(first.width / first.height, `${name}/${lang}: og image is square-ish, not a wide card`).toBeGreaterThan(1.3);
    }
  });

  it.each(languages.map((l) => l.code))('has a twitter card image in %s', async (lang) => {
    const meta = await generateMetadata({ params: { lang } });
    expect(meta.twitter?.images, `${name}/${lang}: twitter card has no image`).toBeTruthy();
  });
});
