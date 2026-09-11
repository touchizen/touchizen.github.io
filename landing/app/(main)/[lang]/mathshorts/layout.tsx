import type { Metadata } from 'next';
import { Language } from '@/lib/i18n';

type Props = { params: { lang: Language } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  const baseUrl = 'https://touchizen.com';

  const titles: Record<Language, string> = {
    en: 'MathShorts - Maths Solved on Video | Snap or Type',
    ko: '매쓰쇼츠 - 수학 풀이 영상 | 찍거나 입력하면 영상으로',
    ja: 'マスショーツ - 数学を動画で | 撮るか入力するだけ',
    de: 'MathShorts - Mathe als Video | Fotografieren oder Tippen',
  };

  const descriptions: Record<Language, string> = {
    en: 'Photograph a maths problem or type a formula, and get the solution as a short video. Curves and physics laws are animated.',
    ko: '수학 문제를 사진 찍거나 수식을 입력하면 풀이를 짧은 영상으로 만들어 줍니다. 그래프와 물리 법칙이 움직입니다.',
    ja: '数学の問題を撮影するか数式を入力すると、解説を短い動画にします。グラフと物理法則が動きます。',
    de: 'Fotografieren Sie eine Matheaufgabe oder tippen Sie eine Formel — die Lösung wird zu einem kurzen Video.',
  };

  // 앱 서랍의 "앱 공유하기" 가 이 주소를 보낸다 — 카카오톡·슬랙이 보여주는 카드가
  // 이 메타다. ⛔ 자식 레이아웃의 `openGraph` 는 부모 것을 **통째로 대체한다**(합쳐지지
  // 않는다). 여기에 `images` 가 없으면 결과 HTML 에 `og:image` 가 **아예 안 생기고**,
  // 크롤러는 사이트 파비콘(터치즌 아이콘)으로 떨어진다 — 실제로 그러고 있었다.
  // `summary_large_image` 카드라 1.91:1 이 필요하므로 앱 아이콘을 1200×630 카드로 깔았다.
  const ogImage = `${baseUrl}/images/mathshorts/og.png`;

  return {
    metadataBase: new URL(baseUrl),
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `${baseUrl}/${lang}/mathshorts`,
      siteName: 'Touchizen',
      type: 'website',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: titles[lang],
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: [ogImage],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
