import type { Metadata } from 'next';
import { Language, languages, translations, TranslationKey } from '@/lib/i18n';

type Props = { params: { lang: Language } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  const baseUrl = 'https://touchizen.com';

  const titles: Record<Language, string> = {
    en: 'AutoFlowCut: Gemini/Veo API Video Pipeline → CapCut Export',
    ko: 'AutoFlowCut: Gemini/Veo API 영상 파이프라인 → CapCut 내보내기',
    ja: 'AutoFlowCut: Gemini/Veo API動画パイプライン → CapCutエクスポート',
    de: 'AutoFlowCut: Gemini/Veo API-Videopipeline → CapCut-Export',
  };

  const descriptions: Record<Language, string> = {
    en: 'Bring your own Google AI Studio API key, bulk-generate images and videos with Gemini and Veo, then export edit-ready CapCut projects in one click.',
    ko: 'Google AI Studio API 키를 연결해 Gemini와 Veo로 이미지/비디오를 대량 생성하고, 편집 가능한 CapCut 프로젝트로 원클릭 내보내기.',
    ja: 'Google AI Studio APIキーを接続し、GeminiとVeoで画像・動画を一括生成。編集可能なCapCutプロジェクトへワンクリックエクスポート。',
    de: 'Verbinden Sie Ihren Google AI Studio API-Schlüssel, generieren Sie Bilder und Videos mit Gemini und Veo und exportieren Sie editierbare CapCut-Projekte per Klick.',
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
      'Google Gemini API',
      'Veo API',
      'Google AI Studio API key',
      'BYOK',
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
        height: 720,
      }],
      videos: [{
        url: `https://www.youtube.com/embed/${lang === 'ko' ? 'mYnfgqvCkME' : 'cqxvDx9HTvQ'}`,
        type: 'text/html',
        width: 1280,
        height: 720,
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
    en: 'Bulk-generate AI images and videos with your Google AI Studio API key, then export CapCut projects in one click.',
    ko: 'Google AI Studio API 키로 AI 이미지와 영상을 대량 생성하고 CapCut 프로젝트로 원클릭 내보내기.',
    ja: 'Google AI Studio APIキーでAI画像・動画を一括生成し、CapCutプロジェクトへワンクリックエクスポート。',
    de: 'Generieren Sie KI-Bilder und -Videos mit Ihrem Google AI Studio API-Schlüssel und exportieren Sie CapCut-Projekte per Klick.',
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
        en: 'Free to download. Includes 5 CapCut exports/month + 5 signup bonus. Pro: $9.99/mo or $99.99/yr for unlimited exports. Google API usage is billed by Google.',
        ko: '무료 다운로드. CapCut 내보내기 월 5회 + 가입 보너스 5회 포함. Pro는 월 $9.99 또는 연 $99.99로 내보내기 무제한. Google API 사용량은 Google 계정에 직접 과금됩니다.',
        ja: '無料ダウンロード。CapCutエクスポート月5回 + 登録ボーナス5回付き。Proは月額$9.99または年額$99.99でエクスポート無制限。Google API利用料はGoogleから直接請求されます。',
        de: 'Kostenloser Download. Enthält 5 CapCut-Exporte/Monat + 5 Anmelde-Bonus. Pro: $9,99/Mo oder $99,99/Jahr für unbegrenzte Exporte. Google API-Nutzung wird direkt von Google berechnet.',
      })[lang],
    },
    downloadUrl: 'https://github.com/touchizen/AutoFlowCut/releases/latest',
    author: {
      '@type': 'Organization',
      name: 'Touchizen',
      url: 'https://touchizen.com',
      sameAs: [
        lang === 'ko' ? 'https://youtube.com/@터치즌' : 'https://youtube.com/@touchizen',
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
