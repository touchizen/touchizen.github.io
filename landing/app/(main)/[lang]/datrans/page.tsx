'use client';

import { useRouter, useParams } from 'next/navigation';
import { Language, languages } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.touchizen.pdftrans';
const IOS_URL =
  'https://apps.apple.com/app/id6738001463';

type Copy = {
  badge: string;
  tagline: string;
  lead: string;
  playCta: string;
  iosCta: string;
  featuresTitle: string;
  features: { icon: string; title: string; desc: string }[];
  privacy: string;
  deleteAccount: string;
};

const COPY: Record<Language, Copy> = {
  ko: {
    badge: 'AI 문서 번역 리더',
    tagline: '원문 레이아웃 그대로, 자연스러운 번역',
    lead: 'PDF와 EPUB 문서의 레이아웃, 표, 이미지를 원본 그대로 유지하면서 번역합니다. 데이터 유출 없는 무료 온디바이스 번역부터 최신 AI 클라우드 번역까지.',
    playCta: 'Google Play에서 받기',
    iosCta: 'App Store에서 받기',
    featuresTitle: '주요 기능',
    features: [
      {
        icon: '📐',
        title: '레이아웃 그대로 번역',
        desc: '서식과 배치를 깨뜨리지 않고 원본 페이지 위에 번역된 텍스트를 자연스럽게 얹어 읽기 편합니다.',
      },
      {
        icon: '🔒',
        title: '데이터 유출 없는 무료 온디바이스',
        desc: 'ML Kit 기기 내 번역 모델을 탑재하여 인터넷 연결이나 서버 전송 없이 무료로 안전하게 번역합니다.',
      },
      {
        icon: '🤖',
        title: '최신 AI & BYOK 지원',
        desc: 'Gemini, Claude, GPT 등 강력한 클라우드 AI 번역을 지원하며, 사용자의 API 키를 직접 사용할 수도 있습니다.',
      },
      {
        icon: '💬',
        title: '문서 기반 AI 대화',
        desc: '문서를 읽다 궁금한 내용이 생기면 AI에게 바로 질문하고 핵심 내용 요약이나 심층 설명을 받아보세요.',
      },
      {
        icon: '✏️',
        title: '펜 도구 & 영역 번역',
        desc: '문서에서 필요한 문단이나 표 영역만 쓱 그어 원하는 부분만 빠르게 번역할 수 있습니다.',
      },
      {
        icon: '📚',
        title: '스마트 서재 & EPUB 지원',
        desc: 'PDF뿐만 아니라 전자책(EPUB)도 지원하며, 폴더별 문서 정리와 이어보기 기록을 지원합니다.',
      },
    ],
    privacy: '개인정보처리방침',
    deleteAccount: '계정 및 데이터 삭제',
  },
  en: {
    badge: 'AI Document Translation Reader',
    tagline: 'Preserve Layout, Translate Naturally',
    lead: 'Translates PDF and EPUB documents while keeping layouts, tables, and images intact. Enjoy free private on-device translation to state-of-the-art cloud AI.',
    playCta: 'Get it on Google Play',
    iosCta: 'Download on App Store',
    featuresTitle: 'Key Features',
    features: [
      {
        icon: '📐',
        title: 'Preserves Original Layout',
        desc: 'Replaces source text directly within the original layout without breaking formatting, tables, or image positions.',
      },
      {
        icon: '🔒',
        title: 'Free & Private On-Device',
        desc: 'Powered by on-device ML Kit models — translates completely free without uploading your documents to external servers.',
      },
      {
        icon: '🤖',
        title: 'Cutting-Edge AI & BYOK',
        desc: 'Supports Gemini, Claude, and GPT. You can also bring your own API keys for complete control and transparency.',
      },
      {
        icon: '💬',
        title: 'Document AI Chat',
        desc: 'Ask questions about the document you are reading to get instant explanations, summaries, and in-depth insights.',
      },
      {
        icon: '✏️',
        title: 'Pen & Region Translation',
        desc: 'Simply highlight or circle any paragraph or diagram to translate exactly what you need.',
      },
      {
        icon: '📚',
        title: 'Smart Bookshelf & EPUB',
        desc: 'Read both PDF and EPUB ebooks with folder organization, bookmarks, and reading progress tracking.',
      },
    ],
    privacy: 'Privacy Policy',
    deleteAccount: 'Account & Data Deletion',
  },
  ja: {
    badge: 'AI ドキュメント翻訳リーダー',
    tagline: '原文レイアウトそのまま、自然な翻訳',
    lead: 'PDFやEPUBのレイアウト、表、画像を崩さずそのまま翻訳。情報漏洩のない無料オンデバイス翻訳から最新クラウドAIまで。',
    playCta: 'Google Play で入手',
    iosCta: 'App Store からダウンロード',
    featuresTitle: '主な機能',
    features: [
      {
        icon: '📐',
        title: '原文レイアウトを忠実に維持',
        desc: '表や画像、文書の書式配置を崩さず、翻訳テキストを自然に重ねて快適に読めます。',
      },
      {
        icon: '🔒',
        title: '情報漏洩のない無料オンデバイス翻訳',
        desc: '端末内MLモデルを搭載し、外部サーバーへ文書を送信することなく完全無料で安全に翻訳できます。',
      },
      {
        icon: '🤖',
        title: '最新AI＆BYOK対応',
        desc: 'Gemini、Claude、GPTに対応。ご自身のAPIキーを直接利用できる透明性の高い設計です。',
      },
      {
        icon: '💬',
        title: '文書ベースのAIチャット',
        desc: '読んでいる文書について疑問があれば、AIに質問して要約や詳しい解説をその場ですぐ確認できます。',
      },
      {
        icon: '✏️',
        title: 'ペンツール・領域指定翻訳',
        desc: '必要な段落や図表の領域をペンで囲むだけで、読みたい部分だけをすばやく翻訳できます。',
      },
      {
        icon: '📚',
        title: 'スマート本棚・EPUB対応',
        desc: 'PDFだけでなくEPUB電子書籍にも対応。フォルダ管理や続きから読む読書履歴もサポート。',
      },
    ],
    privacy: 'プライバシーポリシー',
    deleteAccount: 'アカウント・データ削除',
  },
  de: {
    badge: 'KI-Dokumentenübersetzer & Reader',
    tagline: 'Original-Layout behalten, natürlich übersetzen',
    lead: 'Übersetzt PDF- und EPUB-Dokumente unter Beibehaltung von Layout, Tabellen und Grafiken. Von sicherer On-Device-Übersetzung bis hin zu führender Cloud-KI.',
    playCta: 'Bei Google Play holen',
    iosCta: 'Im App Store laden',
    featuresTitle: 'Hauptfunktionen',
    features: [
      {
        icon: '📐',
        title: 'Layoutgetreue Übersetzung',
        desc: 'Formate, Tabellen und Bildplatzierungen bleiben erhalten — übersetzter Text fügt sich nahtlos ein.',
      },
      {
        icon: '🔒',
        title: 'Kostenlos & Sicher On-Device',
        desc: 'Dank geräteinternem ML-Modell übersetzen Sie völlig kostenlos, ohne dass Dokumente das Gerät verlassen.',
      },
      {
        icon: '🤖',
        title: 'Modernste KI & BYOK',
        desc: 'Unterstützt Gemini, Claude und GPT. Nutzen Sie wahlweise Ihre eigenen API-Schlüssel.',
      },
      {
        icon: '💬',
        title: 'KI-Chat zum Dokument',
        desc: 'Stellen Sie Fragen zum gelesenen Dokument und erhalten Sie sofortige Zusammenfassungen und Erklärungen.',
      },
      {
        icon: '✏️',
        title: 'Stiftwerkzeug & Bereichsauswahl',
        desc: 'Markieren Sie gezielt Textabschnitte oder Tabellenbereiche, um genau den gewünschten Teil zu übersetzen.',
      },
      {
        icon: '📚',
        title: 'Smarte Bibliothek & EPUB-Support',
        desc: 'Liest PDFs und EPUB-E-Books mit Ordnerorganisation, Lesezeichen und Lesefortschritt.',
      },
    ],
    privacy: 'Datenschutzerklärung',
    deleteAccount: 'Konto- und Datenlöschung',
  },
};

export default function DaTransPage() {
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;
  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';
  const c = COPY[lang];

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}/datrans`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />

      <section className="px-6 pt-16 pb-12 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <span>📄</span>
            {c.badge}
          </div>

          <div className="mx-auto mb-8 h-24 w-24 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/datrans/icon.png" alt="DaTrans" className="h-full w-full object-cover" />
          </div>

          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            {c.tagline}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {c.lead}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 hover:-translate-y-0.5 sm:w-auto"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 01-.61-1.63V3.444c0-.623.226-1.19.61-1.63zm11.603 11.603l2.673-2.674L5.347 3.513l9.865 9.904zm0-2.834L5.347 20.487l12.538-7.23-2.673-2.674zm1.414-1.414l3.87 2.23a1.442 1.442 0 010 2.497l-3.87 2.23-2.38-2.378 2.38-2.579z" />
              </svg>
              <span>{c.playCta}</span>
            </a>
            <a
              href={IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gray-900 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-black hover:-translate-y-0.5 dark:bg-gray-800 dark:hover:bg-gray-700 sm:w-auto"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.64 1.35-.56.64-1.05 1.69-.92 2.71 1.01.08 2.03-.46 2.64-1.21z" />
              </svg>
              <span>{c.iosCta}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            {c.featuresTitle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-white/10">
                <div className="mb-3 text-3xl">{f.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 text-sm">
          <a href={`/${lang}/privacy`} className="text-blue-600 underline dark:text-blue-400">
            {c.privacy}
          </a>
          <a href={`/${lang}/delete-account/?app=datrans`} className="text-blue-600 underline dark:text-blue-400">
            {c.deleteAccount}
          </a>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
