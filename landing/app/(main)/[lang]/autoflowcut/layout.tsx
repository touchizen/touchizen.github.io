import type { Metadata } from 'next';
import { Language, languages, translations, TranslationKey } from '@/lib/i18n';

type Props = { params: { lang: Language } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  const baseUrl = 'https://touchizen.com';

  const titles: Record<Language, string> = {
    en: 'AutoFlowCut: Bulk AI Image & Video Generation → CapCut Export',
    ko: 'AutoFlowCut: AI 이미지 & 영상 대량 생성 → CapCut 내보내기',
    ja: 'AutoFlowCut: AI画像・動画の一括生成 → CapCutエクスポート',
    de: 'AutoFlowCut: KI-Bild- & Video-Massenerstellung → CapCut-Export',
  };

  const descriptions: Record<Language, string> = {
    en: 'Bulk-generate hundreds of AI images and videos with Google Flow AI, then export to CapCut projects in one click. Text-to-Image, Text-to-Video, Image-to-Video.',
    ko: 'Google Flow AI로 수백 장의 AI 이미지와 영상을 대량 생성하고 CapCut 프로젝트로 원클릭 내보내기. Text-to-Image, Text-to-Video, Image-to-Video 지원.',
    ja: 'Google Flow AIで数百枚のAI画像・動画を一括生成し、CapCutプロジェクトへワンクリックエクスポート。Text-to-Image、Text-to-Video、Image-to-Video対応。',
    de: 'Erstellen Sie mit Google Flow AI hunderte KI-Bilder und -Videos in Massen und exportieren Sie sie per Klick in CapCut-Projekte. Text-to-Image, Text-to-Video, Image-to-Video.',
  };

  const ogImages: Record<Language, string> = {
    en: '/images/thumbnails/autoflowcut/thumbnail_1_en.png',
    ko: '/images/thumbnails/autoflowcut/thumbnail_1_ko.png',
    ja: '/images/thumbnails/autoflowcut/thumbnail_1_ja.png',
    de: '/images/thumbnails/autoflowcut/thumbnail_1_de.png',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    keywords: [
      'AutoFlowCut',
      'Google Flow AI',
      'bulk AI image generation',
      'text to video',
      'image to video',
      'CapCut automation',
      'CapCut project export',
      'AI video generation',
      'short-form video',
      'content creation tool',
    ],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/autoflowcut/`,
      languages: {
        ...Object.fromEntries(
          languages.map((l) => [l.code, `${baseUrl}/${l.code}/autoflowcut/`])
        ),
        'x-default': `${baseUrl}/en/autoflowcut/`,
      },
    },
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      siteName: 'Touchizen',
      type: 'website',
      url: `${baseUrl}/${lang}/autoflowcut/`,
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

function generateJsonLd(lang: Language) {
  const baseUrl = 'https://touchizen.com';
  const t = (key: string) => translations[lang][key as TranslationKey];

  const descriptions: Record<Language, string> = {
    en: 'Bulk-generate hundreds of AI images and videos with Google Flow AI, then export to CapCut projects in one click.',
    ko: 'Google Flow AI로 수백 장의 AI 이미지와 영상을 대량 생성하고 CapCut 프로젝트로 원클릭 내보내기.',
    ja: 'Google Flow AIで数百枚のAI画像・動画を一括生成し、CapCutプロジェクトへワンクリックエクスポート。',
    de: 'Erstellen Sie mit Google Flow AI hunderte KI-Bilder und -Videos in Massen und exportieren Sie sie per Klick in CapCut-Projekte.',
  };

  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AutoFlowCut',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'macOS, Windows',
    url: `${baseUrl}/${lang}/autoflowcut/`,
    description: descriptions[lang],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: ({
        en: 'Free — AI generation is free (Google Flow AI), CapCut export requires license',
        ko: '무료 — AI 생성은 무료 (Google Flow AI), CapCut 내보내기는 라이선스 필요',
        ja: '無料 — AI生成は無料（Google Flow AI）、CapCutエクスポートにはライセンスが必要',
        de: 'Kostenlos — KI-Generierung ist kostenlos (Google Flow AI), CapCut-Export erfordert Lizenz',
      })[lang],
    },
    downloadUrl: 'https://github.com/touchizen/AutoFlowCut/releases/latest',
    author: {
      '@type': 'Organization',
      name: 'Touchizen',
      url: 'https://touchizen.com',
      sameAs: [
        'https://youtube.com/@touchizen',
        'https://x.com/touchizen',
        'https://github.com/touchizen/AutoFlowCut',
        'https://discord.gg/DTMMs8TZDN',
      ],
    },
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { q: 'autoflowcut_faq_q1', a: 'autoflowcut_faq_a1' },
      { q: 'autoflowcut_faq_q2', a: 'autoflowcut_faq_a2' },
      { q: 'autoflowcut_faq_q3', a: 'autoflowcut_faq_a3' },
      { q: 'autoflowcut_faq_q4', a: 'autoflowcut_faq_a4' },
      { q: 'autoflowcut_faq_q5', a: 'autoflowcut_faq_a5' },
      { q: 'autoflowcut_faq_q6', a: 'autoflowcut_faq_a6' },
    ].map(({ q, a }) => ({
      '@type': 'Question',
      name: t(q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(a),
      },
    })),
  };

  return [softwareApp, faqPage];
}

export default function Layout({ children, params }: { children: React.ReactNode; params: { lang: Language } }) {
  const jsonLdItems = generateJsonLd(params.lang);

  return (
    <>
      {jsonLdItems.map((jsonLd, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}
      {children}
    </>
  );
}
