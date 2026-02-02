import type { Metadata } from 'next';
import { Language, languages } from '@/lib/i18n';

type Props = {
  params: { lang: Language };
};

export function generateStaticParams() {
  return languages.map((l) => ({ lang: l.code }));
}

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;

  const titles: Record<Language, string> = {
    en: 'Touchizen Creator Tools - Save Your Time with AI-Powered Tools',
    ko: 'Touchizen Creator Tools - AI 도구로 시간을 절약하세요',
    ja: 'Touchizen Creator Tools - AIツールで時間を節約',
    de: 'Touchizen Creator Tools - Sparen Sie Zeit mit KI-Tools',
  };

  const descriptions: Record<Language, string> = {
    en: 'Save hours of work with AI-powered creator tools. Generate 100+ images in minutes and instantly convert to CapCut projects.',
    ko: 'AI 기반 크리에이터 도구로 작업 시간을 절약하세요. 몇 분 안에 100개 이상의 이미지를 생성하고 CapCut 프로젝트로 즉시 변환하세요.',
    ja: 'AIパワードのクリエイターツールで作業時間を節約。数分で100枚以上の画像を生成し、CapCutプロジェクトに即座に変換。',
    de: 'Sparen Sie Stunden mit KI-gestützten Creator-Tools. Generieren Sie 100+ Bilder in Minuten und konvertieren Sie sofort in CapCut-Projekte.',
  };

  const locales: Record<Language, string> = {
    en: 'en_US',
    ko: 'ko_KR',
    ja: 'ja_JP',
    de: 'de_DE',
  };

  const baseUrl = 'https://touchizen.com';

  return {
    title: titles[lang],
    description: descriptions[lang],
    keywords: [
      'creator tools',
      'AI image generation',
      'CapCut automation',
      'Google Labs Whisk',
      'bulk image creation',
      'video editing automation',
      'content creation',
      'time saving tools',
    ],
    authors: [{ name: 'Touchizen' }],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: Object.fromEntries(
        languages.map((l) => [l.code, `${baseUrl}/${l.code}`])
      ),
    },
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `${baseUrl}/${lang}`,
      siteName: 'Touchizen',
      type: 'website',
      locale: locales[lang],
      alternateLocale: languages.filter((l) => l.code !== lang).map((l) => locales[l.code]),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@touchizen',
      creator: '@touchizen',
      title: titles[lang],
      description: descriptions[lang],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
