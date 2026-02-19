'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';

interface QuickDownloadProps {
  lang: Language;
}

const DESKTOP_WIN_URL = 'https://github.com/touchizen/whisk2capcut-desktop/releases/latest/download/Whisk2CapCut-Setup.exe';
const DESKTOP_MAC_URL = 'https://github.com/touchizen/whisk2capcut-desktop/releases/latest/download/Whisk2CapCut.dmg';
const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/whisk2capcut/lkbmmoicfaohjdlehmfdijaeofjhougo';

export default function QuickDownload({ lang }: QuickDownloadProps) {
  const t = (key: TranslationKey) => translations[lang][key];

  return (
    <section id="download" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="/images/whisk2capcut.svg"
              alt="Whisk2CapCut"
              className="w-10 h-10 rounded-xl"
            />
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="gradient-text">{t('quick_dl_title')}</span>
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t('quick_dl_subtitle')}
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Desktop App Card */}
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-purple-500 dark:border-purple-400 shadow-lg">
            {/* Recommended Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                {t('quick_dl_desktop_recommended')}
              </span>
            </div>

            <div className="mt-2">
              {/* Title */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('quick_dl_desktop_title')}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                {t('quick_dl_desktop_desc')}
              </p>

              {/* Download Buttons */}
              <div className="space-y-2">
                <a
                  href={DESKTOP_WIN_URL}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-lg hover:opacity-90 active:scale-95 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                  </svg>
                  {t('quick_dl_win')}
                </a>
                <a
                  href={DESKTOP_MAC_URL}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gray-900 dark:bg-gray-700 text-white hover:shadow-lg hover:opacity-90 active:scale-95 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  {t('quick_dl_mac')}
                </a>
              </div>

              {/* Version info */}
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
                {t('quick_dl_version')}
              </p>
            </div>
          </div>

          {/* Chrome Extension Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="mt-2">
              {/* Title */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('quick_dl_plugin_title')}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                {t('quick_dl_plugin_desc')}
              </p>

              {/* Install Button */}
              <div className="space-y-2">
                <a
                  href={CHROME_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold transition-all duration-300 bg-blue-600 text-white hover:shadow-lg hover:opacity-90 active:scale-95 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001-3.952 6.848c.404.037.812.057 1.227.057 6.627 0 12-5.373 12-12 0-1.19-.176-2.339-.5-3.424z" />
                  </svg>
                  {t('quick_dl_chrome_store')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Compare link */}
        <div className="text-center mt-6">
          <a
            href={`/${lang}/whisk2capcut/#install`}
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium"
          >
            {t('quick_dl_learn_more')} →
          </a>
        </div>
      </div>
    </section>
  );
}
