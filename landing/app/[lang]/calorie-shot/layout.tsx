import type { Metadata } from 'next';
import { Language } from '@/lib/i18n';

type Props = { params: { lang: Language } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  const baseUrl = 'https://touchizen.com';

  const titles: Record<Language, string> = {
    en: 'Calorie Shot - AI Food Calorie Analyzer | Snap & Know',
    ko: '칼로리샷 - AI 음식 칼로리 분석 | 찍으면 바로 알려주는',
    ja: 'カロリーショット - AI食品カロリー分析 | 撮るだけでわかる',
    de: 'Calorie Shot - KI-Lebensmittel-Kalorienanalyse | Foto & Ergebnis',
  };

  const descriptions: Record<Language, string> = {
    en: 'Take a photo of your food and AI analyzes calories and nutrients in 3 seconds. Available on Toss.',
    ko: '음식 사진을 찍으면 AI가 3초 만에 칼로리와 영양성분을 분석합니다. 토스에서 사용 가능.',
    ja: '食べ物の写真を撮ると、AIが3秒でカロリーと栄養素を分析します。Tossで利用可能。',
    de: 'Fotografieren Sie Ihr Essen und die KI analysiert Kalorien und Nährstoffe in 3 Sekunden. Verfügbar auf Toss.',
  };

  const ogImages: Record<Language, string> = {
    en: '/images/thumbnails/calorie-shot/og_en.png',
    ko: '/images/thumbnails/calorie-shot/og_ko.png',
    ja: '/images/thumbnails/calorie-shot/og_ja.png',
    de: '/images/thumbnails/calorie-shot/og_de.png',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `${baseUrl}/${lang}/calorie-shot`,
      images: [{
        url: ogImages[lang],
        width: 1280,
        height: 800,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: [ogImages[lang]],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
