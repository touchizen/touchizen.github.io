'use client';

import { useState, useEffect } from 'react';
import { Language, translations, TranslationKey } from '@/lib/i18n';

interface QuickDownloadProps {
  lang: Language;
}

const DESKTOP_WIN_URL = 'https://apps.microsoft.com/detail/9PNZVP54WRSM';
const DESKTOP_MAC_URL = 'https://github.com/touchizen/AutoFlowCut/releases';
const GITHUB_URL = 'https://github.com/touchizen/AutoFlowCut';

export default function QuickDownload({ lang }: QuickDownloadProps) {
  const t = (key: TranslationKey) => translations[lang][key];
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);

  return (
    <section id="download" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/images/autoflowcut.svg?v=20260313" alt="AutoFlowCut" className="w-10 h-10 rounded-xl" />
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
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-cyan-500 dark:border-cyan-400 shadow-lg">
            {/* Recommended Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                {t('quick_dl_desktop_recommended')}
              </span>
            </div>

            <div className="mt-2">
              {/* Title */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
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
                  href={isMac ? DESKTOP_MAC_URL : DESKTOP_WIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:opacity-90 active:scale-95 text-sm"
                >
                  {isMac ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                    </svg>
                  )}
                  {isMac ? t('quick_dl_mac') : t('quick_dl_win')}
                </a>
                <a
                  href={isMac ? DESKTOP_WIN_URL : DESKTOP_MAC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gray-900 dark:bg-gray-700 text-white hover:shadow-lg hover:opacity-90 active:scale-95 text-sm"
                >
                  {isMac ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  )}
                  {isMac ? t('quick_dl_win') : t('quick_dl_mac')}
                </a>
              </div>

              {/* Version info */}
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
                {t('quick_dl_version')}
              </p>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="mt-2">
              {/* Title */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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

              {/* GitHub Button */}
              <div className="space-y-2">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gray-900 dark:bg-gray-700 text-white hover:shadow-lg hover:opacity-90 active:scale-95 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {t('quick_dl_chrome_store')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Learn more link */}
        <div className="text-center mt-6">
          <a
            href={`/${lang}/autoflowcut/`}
            className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
          >
            {t('quick_dl_learn_more')} →
          </a>
        </div>
      </div>
    </section>
  );
}
