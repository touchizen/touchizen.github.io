import { Language, TranslationKey } from '@/lib/i18n';

export default function DesktopAppSection({ lang, t, isMac }: { lang: Language; t: (key: TranslationKey) => string; isMac: boolean }) {
  return (
      <section id="desktop" className="section-padding bg-gradient-to-br from-slate-900 to-gray-900">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 rounded-full text-violet-300 text-sm font-medium mb-4">
              💻 {t('whisk2capcut_desktop_badge' as TranslationKey)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {t('whisk2capcut_desktop_title' as TranslationKey)}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('whisk2capcut_desktop_subtitle' as TranslationKey)}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Features */}
              <div className="space-y-4">
                {(['whisk2capcut_desktop_feat1', 'whisk2capcut_desktop_feat2', 'whisk2capcut_desktop_feat3', 'whisk2capcut_desktop_feat4'] as TranslationKey[]).map((key, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-green-400 text-lg mt-0.5">✓</span>
                    <span className="text-gray-200">{t(key)}</span>
                  </div>
                ))}
              </div>

              {/* Download buttons */}
              <div className="flex flex-col justify-center gap-4">
                <a
                  href={isMac ? 'https://github.com/touchizen/whisk2capcut-desktop/releases/latest/download/Whisk2CapCut-arm64.dmg' : 'https://apps.microsoft.com/detail/9N38G1SCG12J'}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <span className="text-2xl">{isMac ? '🍎' : '🪟'}</span>
                  {t(isMac ? 'whisk2capcut_desktop_dl_mac' as TranslationKey : 'whisk2capcut_desktop_dl_win' as TranslationKey)}
                </a>
                <a
                  href={isMac ? 'https://apps.microsoft.com/detail/9N38G1SCG12J' : 'https://github.com/touchizen/whisk2capcut-desktop/releases/latest/download/Whisk2CapCut-arm64.dmg'}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-500/25"
                >
                  <span className="text-2xl">{isMac ? '🪟' : '🍎'}</span>
                  {t(isMac ? 'whisk2capcut_desktop_dl_win' as TranslationKey : 'whisk2capcut_desktop_dl_mac' as TranslationKey)}
                </a>
                <a
                  href="https://github.com/touchizen/whisk2capcut-desktop/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-violet-400 hover:text-violet-300 text-sm underline underline-offset-4"
                >
                  {t('whisk2capcut_desktop_dl_all' as TranslationKey)}
                </a>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm">
              {t('whisk2capcut_desktop_version' as TranslationKey)}
            </p>
          </div>
        </div>
      </section>
  );
}
