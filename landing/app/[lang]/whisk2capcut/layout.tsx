import type { Metadata } from 'next';
import { Language } from '@/lib/i18n';

type Props = { params: { lang: Language } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  const baseUrl = 'https://touchizen.com';

  const titles: Record<Language, string> = {
    en: 'Whisk2CapCut - Bulk AI Images to CapCut Project in One Click',
    ko: 'Whisk2CapCut - AI 이미지 대량 생성 → CapCut 원클릭 변환',
    ja: 'Whisk2CapCut - AI画像一括生成→CapCutワンクリック変換',
    de: 'Whisk2CapCut - KI-Bilder → CapCut-Projekt mit einem Klick',
  };

  const descriptions: Record<Language, string> = {
    en: 'Generate 200+ AI images with Google Whisk and export to CapCut project in one click.',
    ko: 'Google Whisk로 AI 이미지 200장+ 생성, CapCut 프로젝트로 원클릭 변환.',
    ja: 'Google WhiskでAI画像200枚+生成、CapCutプロジェクトにワンクリック変換。',
    de: '200+ KI-Bilder mit Google Whisk generieren und mit einem Klick in CapCut exportieren.',
  };

  const ogImages: Record<Language, string> = {
    en: '/images/thumbnails/whisk2capcut/thumbnail_1_en.png',
    ko: '/images/thumbnails/whisk2capcut/thumbnail_1_ko.png',
    ja: '/images/thumbnails/whisk2capcut/thumbnail_1_ja.png',
    de: '/images/thumbnails/whisk2capcut/thumbnail_1_de.png',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `${baseUrl}/${lang}/whisk2capcut`,
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
