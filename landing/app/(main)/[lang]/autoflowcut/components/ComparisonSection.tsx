import { Language, TranslationKey } from '@/lib/i18n';

export default function ComparisonSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  const rows = [
    {
      feature: t('autoflowcut_diff_ai' as TranslationKey),
      whisk: t('autoflowcut_diff_whisk_ai' as TranslationKey),
      flow: t('autoflowcut_diff_flow_ai' as TranslationKey),
    },
    {
      feature: t('autoflowcut_diff_image' as TranslationKey),
      whisk: '✅',
      flow: '✅',
    },
    {
      feature: t('autoflowcut_diff_video' as TranslationKey),
      whisk: '❌',
      flow: '✅ T2V + I2V',
    },
    {
      feature: t('autoflowcut_diff_export' as TranslationKey),
      whisk: '✅',
      flow: '✅',
    },
    {
      feature: t('autoflowcut_diff_media_select' as TranslationKey),
      whisk: '❌',
      flow: '✅',
    },
    {
      feature: 'Ken Burns',
      whisk: '✅',
      flow: '✅',
    },
    {
      feature: t('autoflowcut_diff_opensource' as TranslationKey),
      whisk: '❌',
      flow: '✅',
    },
  ];

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
            ⚡ {t('autoflowcut_diff_title' as TranslationKey)}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {t('autoflowcut_diff_title' as TranslationKey)}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('autoflowcut_diff_subtitle' as TranslationKey)}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Whisk Sunset Warning */}
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-xl flex items-start gap-3">
            <span className="text-xl flex-shrink-0">&#x26A0;&#xFE0F;</span>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              {t('autoflowcut_diff_whisk_sunset' as TranslationKey)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {lang === 'ko' ? '기능' : lang === 'ja' ? '機能' : lang === 'de' ? 'Funktion' : 'Feature'}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600 dark:text-purple-400">
                    Whisk2CapCut
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                    <div className="flex items-center justify-center gap-1">
                      AutoFlowCut
                      <span className="px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 rounded text-xs">NEW</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={`border-b border-gray-100 dark:border-gray-700/50 ${i % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-900/20'}`}>
                    <td className="px-6 py-3.5 text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {row.feature}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-center text-gray-600 dark:text-gray-400">
                      {row.whisk}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-center text-gray-900 dark:text-white font-semibold">
                      {row.flow}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
