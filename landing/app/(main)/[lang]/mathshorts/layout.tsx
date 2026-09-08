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

  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `${baseUrl}/${lang}/mathshorts`,
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
