import type { Metadata } from 'next';
import { Language, languages } from '@/lib/i18n';
import SiteDocument, { SITE_ROBOTS } from '@/components/SiteDocument';
import '../../globals.css';

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
    en: 'Apps and tools by Touchizen that save your time and boost your creativity.',
    ko: '시간을 절약하고 창의력을 높여 주는 Touchizen의 앱과 도구.',
    ja: '時間を節約し、創造力を高めるTouchizenのアプリとツール。',
    de: 'Apps und Tools von Touchizen, die Zeit sparen und die Kreativität fördern.',
  };

  const locales: Record<Language, string> = {
    en: 'en_US',
    ko: 'ko_KR',
    ja: 'ja_JP',
    de: 'de_DE',
  };

  const baseUrl = 'https://touchizen.com';

  const ogImage = `${baseUrl}/images/touchizen.png`;

  return {
    title: titles[lang],
    description: descriptions[lang],
    keywords: [
      'creator tools',
      'content creation',
      'time saving tools',
    ],
    authors: [{ name: 'Touchizen' }],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/`,
      languages: {
        ...Object.fromEntries(
          languages.map((l) => [l.code, `${baseUrl}/${l.code}/`])
        ),
        'x-default': `${baseUrl}/en/`,
      },
    },
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `${baseUrl}/${lang}/`,
      siteName: 'Touchizen',
      type: 'website',
      locale: locales[lang],
      alternateLocale: languages.filter((l) => l.code !== lang).map((l) => locales[l.code]),
      images: [{ url: ogImage, width: 571, height: 571, alt: titles[lang] }],
    },
    twitter: {
      card: 'summary',
      site: '@touchizen',
      creator: '@touchizen',
      title: titles[lang],
      description: descriptions[lang],
      images: [ogImage],
    },
    robots: SITE_ROBOTS,
    verification: {
      google: 'abab50d830b4ddf2',
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  return <SiteDocument lang={params.lang}>{children}</SiteDocument>;
}
