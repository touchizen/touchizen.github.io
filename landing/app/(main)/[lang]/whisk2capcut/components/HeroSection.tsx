import PluginMockup from '@/components/PluginMockup';
import { Language, TranslationKey } from '@/lib/i18n';

export default function HeroSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="relative pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-700 dark:text-violet-300 text-sm font-medium mb-6">
                <img src="/images/whisk2capcut.svg" alt="Whisk2CapCut" className="w-6 h-6 rounded" />
                Desktop App & Chrome Extension
              </div>
              <div className="flex items-center gap-6 mb-4">
                <img src="/images/whisk2capcut.svg" alt="Whisk2CapCut" className="w-20 h-20 md:w-24 md:h-24 rounded-2xl" />
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                      {t('whisk2capcut_hero_title')}
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl font-bold text-green-500 dark:text-green-400">
                    {t('whisk2capcut_hero_slogan')}
                  </p>
                </div>
              </div>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4">
                {t('whisk2capcut_hero_subtitle')}
              </p>

              {/* Target Copy - Workflow Summary */}
              <div className="mb-8 p-4 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl border border-violet-200 dark:border-violet-800">
                <p className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">
                  {t('whisk2capcut_hero_target' as TranslationKey)}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={`/${lang}/autoflowcut`} className="btn-primary text-lg">
                  {lang === 'ko' ? 'AutoFlowCut으로 전환' : lang === 'ja' ? 'AutoFlowCutに移行' : lang === 'de' ? 'Zu AutoFlowCut wechseln' : 'Switch to AutoFlowCut'}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Plugin Mockup */}
            <div className="hidden lg:block">
              <PluginMockup lang={lang} variant="generating" />
            </div>
          </div>
        </div>
      </section>
  );
}
