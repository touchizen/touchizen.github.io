import { Language, TranslationKey } from '@/lib/i18n';

export default function InstallationSection({ lang, t, isMac }: { lang: Language; t: (key: TranslationKey) => string; isMac: boolean }) {
  return (
      <section id="install" className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-4">
                <span>💻</span>
                {t('autoflowcut_install_title' as TranslationKey)}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">
                  {t('autoflowcut_install_title' as TranslationKey)}
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t('autoflowcut_install_desc' as TranslationKey)}
              </p>
            </div>

            {/* Platform Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Mac Card */}
              <div className={`p-6 rounded-2xl border-2 ${isMac ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 dark:border-cyan-600' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {t('autoflowcut_install_mac_title' as TranslationKey)}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('autoflowcut_install_mac_desc' as TranslationKey)}
                </p>
                <a
                  href="https://github.com/touchizen/AutoFlowCut/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t('autoflowcut_install_mac_title' as TranslationKey)}
                </a>
              </div>

              {/* Windows Card */}
              <div className={`p-6 rounded-2xl border-2 ${!isMac ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {t('autoflowcut_install_win_title' as TranslationKey)}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('autoflowcut_install_win_desc' as TranslationKey)}
                </p>
                <a
                  href="https://apps.microsoft.com/detail/autoflowcut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-xl font-semibold transition-all hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t('autoflowcut_install_win_title' as TranslationKey)}
                </a>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {lang === 'ko' ? '시스템 요구사항' : lang === 'ja' ? 'システム要件' : lang === 'de' ? 'Systemanforderungen' : 'System Requirements'}
              </h3>
              <div className="space-y-3">
                {['autoflowcut_install_req1', 'autoflowcut_install_req2', 'autoflowcut_install_req3'].map((key) => (
                  <div key={key} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {t(key as TranslationKey)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Source Note */}
            <div className="text-center">
              <a
                href="https://github.com/touchizen/AutoFlowCut"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {t('autoflowcut_install_opensource' as TranslationKey)}
              </a>
            </div>
          </div>
        </div>
      </section>
  );
}
