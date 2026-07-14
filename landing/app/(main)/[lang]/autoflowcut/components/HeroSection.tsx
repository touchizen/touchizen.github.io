import { Language, TranslationKey } from '@/lib/i18n';
import { msStoreUrl } from '@/lib/storeUrl';

export default function HeroSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  const winStoreUrl = msStoreUrl('https://apps.microsoft.com/detail/9PNZVP54WRSM', lang);
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-custom px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium">
              🖥️ {t('autoflowcut_platform_badge' as TranslationKey)}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-full text-sm font-semibold">
              v3.0.2
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <img src="/images/autoflowcut.svg?v=20260313" alt="AutoFlowCut" className="w-24 h-24 md:w-28 md:h-28 rounded-3xl shadow-lg" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {t('autoflowcut_hero_title' as TranslationKey)}
            </span>
          </h1>

          <p className="text-xl md:text-2xl font-bold text-cyan-500 dark:text-cyan-400 mb-4">
            {t('autoflowcut_hero_slogan' as TranslationKey)}
          </p>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('autoflowcut_hero_subtitle' as TranslationKey)}
          </p>

          {/* Workflow Summary */}
          <div className="mb-8 max-w-2xl mx-auto p-4 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl border border-cyan-200 dark:border-cyan-800">
            <p className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">
              📝 {lang === 'ko' ? '스토리 모드(AI 대본 → 씬 → 음성) 또는 TXT/CSV/SRT 가져오기 → Gemini 이미지 → Veo 비디오 → CapCut / Premiere / Vrew 내보내기' : lang === 'ja' ? 'ストーリーモード（AI台本 → シーン → 音声）または TXT/CSV/SRT 読み込み → Gemini画像 → Veo動画 → CapCut / Premiere / Vrewエクスポート' : lang === 'de' ? 'Story-Modus (KI-Skript → Szenen → Stimme) oder TXT/CSV/SRT-Import → Gemini-Bilder → Veo-Videos → CapCut / Premiere / Vrew-Export' : 'Story mode (AI script → scenes → voice) or TXT/CSV/SRT import → Gemini images → Veo videos → CapCut / Premiere / Vrew export'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {/* Windows - Microsoft Store */}
            <a
              href={winStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold text-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
              </svg>
              {t('autoflowcut_hero_cta' as TranslationKey)}
            </a>
            {/* macOS - GitHub Releases */}
            <a
              href="https://github.com/touchizen/AutoFlowCut/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-2xl font-semibold text-lg transition-all hover:-translate-y-0.5 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t('autoflowcut_hero_cta_mac' as TranslationKey)}
            </a>
            {/* Story mode guide */}
            <a
              href={`/guide/${lang}/autoflowcut/story-guide.html`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-900 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 rounded-2xl font-semibold text-lg transition-all hover:-translate-y-0.5 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {t('autoflowcut_hero_cta_story' as TranslationKey)}
            </a>
            {/* Release notes */}
            <a
              href="#release-notes"
              className="inline-flex items-center gap-2 px-6 py-4 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-2xl font-medium text-base transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h7l3 3v13H7V4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4v4h4M9 13h6M9 17h4" />
              </svg>
              {t('autoflowcut_hero_cta_secondary' as TranslationKey)}
            </a>
          </div>

          {/* macOS arch guidance — navigator.platform/UA cannot tell Apple Silicon from Intel,
              so we tell the user rather than guess for them. */}
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {t('autoflowcut_hero_mac_arch' as TranslationKey)}
          </p>
        </div>
      </div>
    </section>
  );
}
