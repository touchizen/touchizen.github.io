import { Language, TranslationKey } from '@/lib/i18n';

export default function TimeSavingSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('autoflowcut_time_badge' as TranslationKey)}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {t('autoflowcut_time_title' as TranslationKey)}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t('autoflowcut_time_desc' as TranslationKey)}
            </p>
          </div>

          {/* Comparison Box */}
          <div className="max-w-5xl mx-auto mb-10">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                {/* Manual Work - Left */}
                <div className="text-center px-8 py-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <div className="text-3xl mb-2">&#x274C;</div>
                  <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-2 uppercase tracking-wide">
                    {t('autoflowcut_time_manual' as TranslationKey)}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-red-500">
                    {t('autoflowcut_time_manual_time' as TranslationKey)}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center">
                  <svg className="w-12 h-12 text-cyan-500 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* AutoFlowCut - Right */}
                <div className="text-center px-8 py-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="text-3xl mb-2">&#x2705;</div>
                  <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-2 uppercase tracking-wide">
                    {t('autoflowcut_time_auto' as TranslationKey)}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-green-500">
                    {t('autoflowcut_time_auto_time' as TranslationKey)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { value: 'autoflowcut_time_stat1_value', label: 'autoflowcut_time_stat1_label', color: 'text-cyan-500', bg: 'bg-cyan-100 dark:bg-cyan-900/30', iconColor: 'text-cyan-500' },
              { value: 'autoflowcut_time_stat2_value', label: 'autoflowcut_time_stat2_label', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-500' },
              { value: 'autoflowcut_time_stat3_value', label: 'autoflowcut_time_stat3_label', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 flex-shrink-0 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <svg className={`w-7 h-7 ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${stat.color}`}>
                      {t(stat.value as TranslationKey)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t(stat.label as TranslationKey)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
