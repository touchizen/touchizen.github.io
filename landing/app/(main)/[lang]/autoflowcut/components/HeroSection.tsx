import { Language, TranslationKey } from '@/lib/i18n';

export default function HeroSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-custom px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-6">
            🖥️ {t('autoflowcut_platform_badge' as TranslationKey)}
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
              📝 {lang === 'ko' ? 'TXT/CSV/SRT 입력 → 이미지 생성 → 비디오 생성 → CapCut 프로젝트 내보내기' : lang === 'ja' ? 'TXT/CSV/SRT入力 → 画像生成 → 動画生成 → CapCutプロジェクトエクスポート' : lang === 'de' ? 'TXT/CSV/SRT Eingabe → Bilder generieren → Videos generieren → CapCut-Projekt exportieren' : 'TXT/CSV/SRT input → Generate images → Generate videos → Export CapCut project'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://apps.microsoft.com/detail/9PNZVP54WRSM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold text-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25"
            >
              {t('autoflowcut_hero_cta' as TranslationKey)}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
            <a
              href="https://github.com/touchizen/AutoFlowCut"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-2xl font-semibold text-lg transition-all hover:-translate-y-0.5 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
              {t('autoflowcut_hero_cta_secondary' as TranslationKey)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
