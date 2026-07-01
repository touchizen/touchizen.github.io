import type { Metadata } from 'next';
import { Language, languages, translations, TranslationKey } from '@/lib/i18n';

type Props = { params: { lang: Language } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  const baseUrl = 'https://touchizen.com';

  const titles: Record<Language, string> = {
    en: 'AutoFlowCut: AI Video Pipeline → CapCut, Premiere & Vrew Export',
    ko: 'AutoFlowCut: AI 영상 파이프라인 → CapCut·Premiere·Vrew 내보내기',
    ja: 'AutoFlowCut: AI動画パイプライン → CapCut・Premiere・Vrewエクスポート',
    de: 'AutoFlowCut: KI-Videopipeline → CapCut-, Premiere- & Vrew-Export',
  };

  const descriptions: Record<Language, string> = {
    en: 'Bulk-generate images and videos with Gemini and Veo — via Google Flow login or your own API key — then export edit-ready projects for CapCut, Adobe Premiere Pro, or Vrew in one click. Open source (AGPL v3).',
    ko: 'Google Flow 로그인 또는 내 API 키로 Gemini·Veo 이미지/비디오를 대량 생성하고, 편집 가능한 CapCut·Premiere Pro·Vrew 프로젝트로 원클릭 내보내기. 오픈소스(AGPL v3).',
    ja: 'Google Flowログインまたは自分のAPIキーでGemini・Veoの画像・動画を一括生成し、CapCut・Adobe Premiere Pro・Vrewの編集可能なプロジェクトへワンクリックエクスポート。オープンソース(AGPL v3)。',
    de: 'Generieren Sie Bilder und Videos mit Gemini und Veo — per Google-Flow-Login oder eigenem API-Schlüssel — und exportieren Sie editierbare Projekte für CapCut, Adobe Premiere Pro oder Vrew per Klick. Open Source (AGPL v3).',
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
      'Google Flow',
      'Google Gemini API',
      'Veo API',
      'Google AI Studio API key',
      'BYOK',
      'bulk AI image generation',
      'text to video',
      'image to video',
      'CapCut export',
      'Premiere Pro export',
      'Vrew export',
      'AI video generation',
      'open source video tool',
      'AGPL',
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
    en: 'Bulk-generate AI images and videos with Gemini and Veo — via Google Flow login or your own API key — then export projects for CapCut, Premiere Pro, or Vrew in one click. Open source (AGPL v3).',
    ko: 'Google Flow 로그인 또는 내 API 키로 Gemini·Veo AI 이미지/영상을 대량 생성하고 CapCut·Premiere Pro·Vrew 프로젝트로 원클릭 내보내기. 오픈소스(AGPL v3).',
    ja: 'Google Flowログインまたは自分のAPIキーでGemini・VeoのAI画像・動画を一括生成し、CapCut・Premiere Pro・Vrewプロジェクトへワンクリックエクスポート。オープンソース(AGPL v3)。',
    de: 'Generieren Sie KI-Bilder und -Videos mit Gemini und Veo — per Google-Flow-Login oder eigenem API-Schlüssel — und exportieren Sie Projekte für CapCut, Premiere Pro oder Vrew per Klick. Open Source (AGPL v3).',
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
        en: 'Free to download and open source (AGPL v3). Includes 5 project exports/month + 5 signup bonus. Pro: $9.99/mo or $99.99/yr for unlimited exports. Flow login offers free generation on a low-cost subscription; API mode is billed by Google.',
        ko: '무료 다운로드 및 오픈소스(AGPL v3). 프로젝트 내보내기 월 5회 + 가입 보너스 5회 포함. Pro는 월 $9.99 또는 연 $99.99로 내보내기 무제한. Flow 로그인은 저비용 구독으로 무료 생성, API 모드는 Google에 직접 과금됩니다.',
        ja: '無料ダウンロード＆オープンソース(AGPL v3)。プロジェクトエクスポート月5回 + 登録ボーナス5回付き。Proは月額$9.99または年額$99.99でエクスポート無制限。Flowログインは低コストのサブスクで無料生成、APIモードはGoogleから直接請求されます。',
        de: 'Kostenloser Download und Open Source (AGPL v3). Enthält 5 Projekt-Exporte/Monat + 5 Anmelde-Bonus. Pro: $9,99/Mo oder $99,99/Jahr für unbegrenzte Exporte. Flow-Login bietet kostenlose Generierung im günstigen Abo; API-Modus wird von Google berechnet.',
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
