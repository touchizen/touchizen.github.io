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

              {/* AutoFlowCut 전환 안내 */}
              <div className="flex flex-col justify-center gap-4">
                <div className="p-4 bg-amber-500/20 border border-amber-500/40 rounded-xl text-center">
                  <p className="text-amber-300 font-semibold mb-3">
                    {lang === 'ko' ? '⚠️ Google Whisk 종료로 서비스가 종료됩니다' : lang === 'ja' ? '⚠️ Google Whisk終了によりサービスを終了します' : lang === 'de' ? '⚠️ Dienst wird aufgrund der Einstellung von Google Whisk beendet' : '⚠️ Service ending due to Google Whisk shutdown'}
                  </p>
                  <a
                    href={`/${lang}/autoflowcut`}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    {lang === 'ko' ? 'AutoFlowCut으로 전환' : lang === 'ja' ? 'AutoFlowCutに移行' : lang === 'de' ? 'Zu AutoFlowCut wechseln' : 'Switch to AutoFlowCut'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
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
