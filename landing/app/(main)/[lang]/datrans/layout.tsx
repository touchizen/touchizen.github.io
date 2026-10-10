import type { Metadata } from 'next';
import { Language } from '@/lib/i18n';

type Props = { params: { lang: Language } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  const baseUrl = 'https://touchizen.com';

  const titles: Record<Language, string> = {
    ko: '다번역 (DaTrans) - 원문 레이아웃 그대로 번역하는 AI 리더',
    en: 'DaTrans - AI PDF & EPUB Layout-Preserving Translator',
    ja: 'DaTrans - 原文レイアウト維持 AI PDF・EPUB 翻訳',
    de: 'DaTrans - Layouttreuer KI-Übersetzer für PDF & EPUB',
  };

  const descriptions: Record<Language, string> = {
    ko: '문서의 서식과 배치를 그대로 유지하며 자연스럽게 번역합니다. 무료 온디바이스 번역부터 최신 AI 번역, 실시간 문서 질의응답까지.',
    en: 'Translates PDF and EPUB while preserving original layout and formatting. Free on-device translation to state-of-the-art AI.',
    ja: 'PDFとEPUBのレイアウトをそのまま保ちながら自然に翻訳。無料のオンデバイス翻訳から最新AIまで。',
    de: 'Übersetzen Sie PDFs und EPUBs unter Beibehaltung des Original-Layouts. Von kostenloser On-Device-Übersetzung bis hin zu modernster KI.',
  };

  const ogImage = `${baseUrl}/images/datrans/og-${lang}.png`;

  return {
    metadataBase: new URL(baseUrl),
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `${baseUrl}/${lang}/datrans`,
      siteName: 'Touchizen',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: titles[lang],
        },
      ],
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
