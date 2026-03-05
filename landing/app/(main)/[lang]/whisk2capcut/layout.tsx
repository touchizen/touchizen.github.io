import type { Metadata } from 'next';
import { Language, languages, translations, TranslationKey } from '@/lib/i18n';

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
    alternates: {
      canonical: `${baseUrl}/${lang}/whisk2capcut/`,
      languages: {
        ...Object.fromEntries(
          languages.map((l) => [l.code, `${baseUrl}/${l.code}/whisk2capcut/`])
        ),
        'x-default': `${baseUrl}/en/whisk2capcut/`,
      },
    },
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `${baseUrl}/${lang}/whisk2capcut/`,
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

function generateJsonLd(lang: Language) {
  const baseUrl = 'https://touchizen.com';
  const t = (key: string) => translations[lang][key as TranslationKey];

  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Whisk2CapCut',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Chrome, Windows, macOS',
    url: `${baseUrl}/${lang}/whisk2capcut/`,
    description: t('whisk2capcut_hero_subtitle'),
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free (5 exports / 7 days trial)',
      },
      {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'USD',
        description: 'Pro Monthly',
      },
      {
        '@type': 'Offer',
        price: '39.99',
        priceCurrency: 'USD',
        description: 'Pro Yearly (save 33%)',
      },
    ],
    author: {
      '@type': 'Organization',
      name: 'Touchizen',
      url: 'https://touchizen.com',
      sameAs: [
        'https://youtube.com/@touchizen',
        'https://x.com/touchizen',
        'https://github.com/touchizen/whisk2capcut',
        'https://discord.gg/touchizen',
      ],
    },
    installUrl: 'https://chromewebstore.google.com/detail/whisk2capcut/bipgbkcmomdhfclabgdgepdhdfekcldl',
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { q: 'faq_q1', a: 'faq_a1' },
      { q: 'faq_q2', a: 'faq_a2' },
      { q: 'faq_q3', a: 'faq_a3' },
      { q: 'faq_q4', a: 'faq_a4' },
      { q: 'faq_q5', a: 'faq_a5' },
      { q: 'faq_q6', a: 'faq_a6' },
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
