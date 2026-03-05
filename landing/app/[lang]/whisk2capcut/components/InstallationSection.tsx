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

            {/* Download Buttons */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Desktop - Primary */}
              <div className="p-6 rounded-2xl border-2 border-violet-500 bg-violet-50 dark:bg-violet-900/20 dark:border-violet-600">
                <h3 className="text-lg font-bold text-violet-700 dark:text-violet-300 mb-4 flex items-center gap-2">
                  💻 {t('whisk2capcut_compare_desktop' as TranslationKey)}
                  <span className="text-xs px-2 py-0.5 bg-violet-200 dark:bg-violet-800 text-violet-700 dark:text-violet-300 rounded-full">
                    {t('whisk2capcut_compare_recommended' as TranslationKey)}
                  </span>
                </h3>
                <div className="flex flex-col gap-3">
                  <a
                    href={isMac ? 'https://github.com/touchizen/whisk2capcut-desktop/releases/latest/download/Whisk2CapCut-arm64.dmg' : 'https://apps.microsoft.com/detail/9N38G1SCG12J'}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold transition-all hover:-translate-y-0.5"
                  >
                    {isMac ? '🍎' : '🪟'} {t(isMac ? 'whisk2capcut_desktop_dl_mac' as TranslationKey : 'whisk2capcut_desktop_dl_win' as TranslationKey)}
                  </a>
                  <a
                    href={isMac ? 'https://apps.microsoft.com/detail/9N38G1SCG12J' : 'https://github.com/touchizen/whisk2capcut-desktop/releases/latest/download/Whisk2CapCut-arm64.dmg'}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all hover:-translate-y-0.5"
                  >
                    {isMac ? '🪟' : '🍎'} {t(isMac ? 'whisk2capcut_desktop_dl_win' as TranslationKey : 'whisk2capcut_desktop_dl_mac' as TranslationKey)}
                  </a>
                </div>
              </div>

              {/* Plugin - Secondary */}
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                  🧩 {t('whisk2capcut_compare_plugin' as TranslationKey)}
                </h3>
                <a
                  href="https://chromewebstore.google.com/detail/whisk2capcut/bipgbkcmomdhfclabgdgepdhdfekcldl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
                >
                  🌐 {t('whisk2capcut_hero_cta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
