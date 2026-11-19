import type { Metadata } from 'next';
import { Language, languages, translations, TranslationKey } from '@/lib/i18n';

type Props = { params: { lang: Language } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  const baseUrl = 'https://touchizen.com';

  const titles: Record<Language, string> = {
    en: 'AutoFlowCut: AI Story Mode — Script, Voiceover & Video → CapCut, Premiere, Vrew',
    ko: 'AutoFlowCut: AI 스토리 모드 — 대본·나레이션·영상 → CapCut·Premiere·Vrew 내보내기',
    ja: 'AutoFlowCut: AIストーリーモード — 台本・ナレーション・動画 → CapCut・Premiere・Vrew',
    de: 'AutoFlowCut: KI-Story-Modus — Skript, Sprachausgabe & Video → CapCut, Premiere, Vrew',
  };

  const descriptions: Record<Language, string> = {
    en: 'AutoFlowCut is no longer maintained. It was a desktop app that wrote scripts with AI, generated images and video with Gemini and Veo, and exported projects to CapCut, Premiere Pro and Vrew. The source code remains available on GitHub under the MIT License.',
    ko: 'AutoFlowCut은 더 이상 운영하지 않습니다. AI로 대본을 쓰고 Gemini·Veo로 이미지와 영상을 만들어 CapCut·Premiere Pro·Vrew 프로젝트로 내보내던 데스크톱 앱입니다. 소스 코드는 GitHub에 MIT 라이선스로 공개되어 있습니다.',
    ja: 'AutoFlowCutの運営は終了しました。AIで台本を書き、Gemini・Veoで画像と動画を生成して、CapCut・Premiere Pro・Vrewのプロジェクトへ書き出すデスクトップアプリでした。ソースコードはGitHubでMITライセンスのもと公開しています。',
    de: 'AutoFlowCut wird nicht mehr gepflegt. Die Desktop-App schrieb Skripte mit KI, erzeugte Bilder und Videos mit Gemini und Veo und exportierte Projekte für CapCut, Premiere Pro und Vrew. Der Quellcode bleibt auf GitHub unter der MIT-Lizenz verfügbar.',
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
      'AI story mode',
      'AI script writing',
      'AI script generator',
      'YouTube script generator',
      'AI voiceover',
      'AI narration',
      'TTS',
      'text to speech',
      'Typecast',
      'ElevenLabs',
      'AI sound effects',
      'automatic scene splitting',
      'character reference consistency',
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
      'MIT',
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
    en: 'Story mode takes a video from a blank page to a finished project: AI script writing (Claude, Codex), YouTube research, synopsis and characters, automatic scene splitting, AI voiceover per speaker (Typecast, ElevenLabs, Gemini), and sound effects pulled from the script. Then bulk-generate AI images and videos with Gemini and Veo — via Google Flow login or your own API key — and export projects for CapCut, Premiere Pro, or Vrew in one click. Open source (MIT).',
    ko: '스토리 모드가 빈 페이지에서 완성 프로젝트까지 이끕니다: AI 대본 집필(Claude·Codex), YouTube 리서치, 시놉시스와 등장인물, 자동 씬 분리, 화자별 AI 나레이션(Typecast·ElevenLabs·Gemini), 대본에서 뽑아낸 효과음. 이어서 Google Flow 로그인 또는 내 API 키로 Gemini·Veo AI 이미지/영상을 대량 생성하고 CapCut·Premiere Pro·Vrew 프로젝트로 원클릭 내보내기. 오픈소스(MIT).',
    ja: 'ストーリーモードが白紙から完成プロジェクトまで導きます：AI台本執筆(Claude・Codex)、YouTubeリサーチ、あらすじと登場人物、シーン自動分割、話者ごとのAIナレーション(Typecast・ElevenLabs・Gemini)、台本から抽出した効果音。続いてGoogle Flowログインまたは自分のAPIキーでGemini・VeoのAI画像・動画を一括生成し、CapCut・Premiere Pro・Vrewプロジェクトへワンクリックエクスポート。オープンソース(MIT)。',
    de: 'Der Story-Modus führt vom leeren Blatt zum fertigen Projekt: KI-Skript (Claude, Codex), YouTube-Recherche, Synopsis und Figuren, automatische Szenenaufteilung, KI-Sprachausgabe pro Sprecher (Typecast, ElevenLabs, Gemini) und Soundeffekte aus dem Skript. Danach KI-Bilder und -Videos mit Gemini und Veo massenhaft generieren — per Google-Flow-Login oder eigenem API-Schlüssel — und Projekte für CapCut, Premiere Pro oder Vrew per Klick exportieren. Open Source (MIT).',
  };

  const softwareApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AutoFlowCut',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'macOS, Windows',
    url: `${baseUrl}/${lang}/autoflowcut/`,
    description: descriptions[lang],
    author: {
      '@type': 'Organization',
      name: 'Touchizen',
      url: 'https://touchizen.com',
      sameAs: [
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
        { q: 'autoflowcut_faq_q7', a: 'autoflowcut_faq_a7' },
      { q: 'autoflowcut_faq_q8', a: 'autoflowcut_faq_a8' },
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
