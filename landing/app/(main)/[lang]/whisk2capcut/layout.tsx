import type { Metadata } from 'next';
import { Language, languages, translations, TranslationKey } from '@/lib/i18n';

type Props = { params: { lang: Language } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  const baseUrl = 'https://touchizen.com';

  const titles: Record<Language, string> = {
    en: 'Whisk2CapCut: Convert Google Whisk Images to CapCut Projects',
    ko: 'Whisk2CapCut: Google Whisk 이미지를 CapCut 프로젝트로 변환',
    ja: 'Whisk2CapCut: Google Whisk画像をCapCutプロジェクトへ変換',
    de: 'Whisk2CapCut: Google-Whisk-Bilder in CapCut-Projekte umwandeln',
  };

  const descriptions: Record<Language, string> = {
    en: 'Turn Google Whisk image batches into editable CapCut projects with subtitles, timing, and Ken Burns effects in one click.',
    ko: 'Google Whisk 이미지 묶음을 자막, 타이밍, Ken Burns 효과가 포함된 편집 가능한 CapCut 프로젝트로 원클릭 변환하세요.',
    ja: 'Google Whiskの画像バッチを、字幕・タイミング・Ken Burns効果付きの編集可能なCapCutプロジェクトへワンクリック変換します。',
    de: 'Wandle Google-Whisk-Bildserien mit Untertiteln, Timing und Ken-Burns-Effekten per Klick in editierbare CapCut-Projekte um.',
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
    metadataBase: new URL(baseUrl),
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
      siteName: 'Touchizen',
      type: 'website',
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
    en: 'Turn Google Whisk image batches into editable CapCut projects with subtitles, timing, and Ken Burns effects in one click.',
    ko: 'Google Whisk 이미지 묶음을 자막, 타이밍, Ken Burns 효과가 포함된 편집 가능한 CapCut 프로젝트로 원클릭 변환하세요.',
    ja: 'Google Whiskの画像バッチを、字幕・タイミング・Ken Burns効果付きの編集可能なCapCutプロジェクトへワンクリック変換します。',
    de: 'Wandle Google-Whisk-Bildserien mit Untertiteln, Timing und Ken-Burns-Effekten per Klick in editierbare CapCut-Projekte um.',
  };

  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Whisk2CapCut',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Chrome, Windows, macOS',
    url: `${baseUrl}/${lang}/whisk2capcut/`,
    description: descriptions[lang],
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: ({
          en: 'Free (5 exports / 7 days trial)',
          ko: '무료 (5회 내보내기 / 7일 체험)',
          ja: '無料（5回エクスポート / 7日間トライアル）',
          de: 'Kostenlos (5 Exporte / 7 Tage Testversion)',
        })[lang],
      },
      {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'USD',
        description: ({
          en: 'Pro Monthly',
          ko: 'Pro 월간 구독',
          ja: 'Pro 月額プラン',
          de: 'Pro Monatlich',
        })[lang],
      },
      {
        '@type': 'Offer',
        price: '39.99',
        priceCurrency: 'USD',
        description: ({
          en: 'Pro Yearly (save 33%)',
          ko: 'Pro 연간 구독 (33% 할인)',
          ja: 'Pro 年額プラン（33%お得）',
          de: 'Pro Jährlich (33% sparen)',
        })[lang],
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
