import { Language, TranslationKey } from '@/lib/i18n';

export default function TrustSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
    <>
      {/* Privacy & Safety Section */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900/50 dark:to-gray-900/50">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {t('autoflowcut_trust_badge' as TranslationKey)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {t('autoflowcut_trust_title' as TranslationKey)}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t('autoflowcut_trust_desc' as TranslationKey)}
            </p>
          </div>

          {/* Privacy Section Title */}
          <h3 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            {t('autoflowcut_trust_privacy_title' as TranslationKey)}
          </h3>

          {/* 4 Privacy Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {t('autoflowcut_trust_google_title' as TranslationKey)}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('autoflowcut_trust_google_desc' as TranslationKey)}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {t('autoflowcut_trust_local_title' as TranslationKey)}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('autoflowcut_trust_local_desc' as TranslationKey)}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {t('autoflowcut_trust_opensource_title' as TranslationKey)}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('autoflowcut_trust_opensource_desc' as TranslationKey)}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {t('autoflowcut_trust_free_title' as TranslationKey)}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('autoflowcut_trust_free_desc' as TranslationKey)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {t('autoflowcut_trust_badges_title' as TranslationKey)}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Local Processing */}
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {lang === 'ko' ? 'Local Processing' : 'Local Processing'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? '모든 데이터는 로컬에서 처리' : 'All data processed locally'}
              </p>
            </div>

            {/* Open Source */}
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {lang === 'ko' ? 'Open Source' : 'Open Source'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? '소스 코드 공개 및 투명성 보장' : 'Source code open & transparent'}
              </p>
            </div>

            {/* Free Forever */}
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {lang === 'ko' ? 'Free Forever' : 'Free Forever'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? '영원히 무료, 숨은 비용 없음' : 'Free forever, no hidden costs'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
