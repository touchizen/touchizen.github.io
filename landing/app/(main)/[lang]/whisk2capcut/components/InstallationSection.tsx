import { Language, TranslationKey } from '@/lib/i18n';

export default function InstallationSection({ lang, t, isMac }: { lang: Language; t: (key: TranslationKey) => string; isMac: boolean }) {
  return (
      <section id="install" className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('whisk2capcut_install_title' as TranslationKey)}</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('whisk2capcut_install_subtitle' as TranslationKey)}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                      {t('whisk2capcut_compare_feature' as TranslationKey)}
                    </th>
                    <th className="text-center py-4 px-4 font-semibold">
                      <div className="inline-flex flex-col items-center gap-1">
                        <span className="text-violet-600 dark:text-violet-400">💻 {t('whisk2capcut_compare_desktop' as TranslationKey)}</span>
                        <span className="text-xs px-2 py-0.5 bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 rounded-full font-medium">
                          {t('whisk2capcut_compare_recommended' as TranslationKey)}
                        </span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      🧩 {t('whisk2capcut_compare_plugin' as TranslationKey)}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {[
                    { key: 'whisk2capcut_compare_ai', desktop: true, plugin: true },
                    { key: 'whisk2capcut_compare_export', desktop: true, plugin: true },
                    { key: 'whisk2capcut_compare_kenburns', desktop: true, plugin: true },
                    { key: 'whisk2capcut_compare_srt', desktop: true, plugin: true },
                    { key: 'whisk2capcut_compare_direct_write', desktop: true, plugin: false },
                    { key: 'whisk2capcut_compare_auto_launch', desktop: true, plugin: false },
                    { key: 'whisk2capcut_compare_no_browser', desktop: true, plugin: false },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-6 text-gray-700 dark:text-gray-300 text-sm">
                        {t(row.key as TranslationKey)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-green-500 text-lg">✓</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.plugin ? (
                          <span className="text-green-500 text-lg">✓</span>
                        ) : (
                          <span className="text-gray-300 dark:text-gray-600 text-lg">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* AutoFlowCut 전환 안내 */}
            <div className="mt-10 p-6 rounded-2xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-600">
              <div className="text-center">
                <p className="text-lg font-bold text-amber-700 dark:text-amber-300 mb-2">
                  {lang === 'ko' ? '⚠️ Google Whisk 종료로 서비스가 종료됩니다' : lang === 'ja' ? '⚠️ Google Whisk終了によりサービスを終了します' : lang === 'de' ? '⚠️ Dienst wird aufgrund der Einstellung von Google Whisk beendet' : '⚠️ Service ending due to Google Whisk shutdown'}
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-400 mb-4">
                  {lang === 'ko' ? 'Google Flow AI 기반의 AutoFlowCut으로 전환해 주세요.' : lang === 'ja' ? 'Google Flow AI搭載のAutoFlowCutへ移行してください。' : lang === 'de' ? 'Bitte wechseln Sie zu AutoFlowCut mit Google Flow AI.' : 'Please switch to AutoFlowCut, powered by Google Flow AI.'}
                </p>
                <a
                  href={`/${lang}/autoflowcut`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-cyan-500/25"
                >
                  {lang === 'ko' ? 'AutoFlowCut으로 전환하기' : lang === 'ja' ? 'AutoFlowCutに移行する' : lang === 'de' ? 'Zu AutoFlowCut wechseln' : 'Switch to AutoFlowCut'}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
