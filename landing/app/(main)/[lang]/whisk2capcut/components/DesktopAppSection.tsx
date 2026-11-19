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

              {/* 서비스 종료 안내 */}
              <div className="flex flex-col justify-center gap-4">
                <div className="p-4 bg-amber-500/20 border border-amber-500/40 rounded-xl text-center">
                  <p className="text-amber-300 font-semibold">
                    {lang === 'ko' ? '⚠️ Google Whisk 종료로 서비스를 종료했습니다' : lang === 'ja' ? '⚠️ Google Whisk終了によりサービスを終了しました' : lang === 'de' ? '⚠️ Dienst wurde aufgrund der Einstellung von Google Whisk beendet' : '⚠️ Service ended due to Google Whisk shutdown'}
                  </p>
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
