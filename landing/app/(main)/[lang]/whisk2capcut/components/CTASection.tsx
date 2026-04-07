import { Language, TranslationKey } from '@/lib/i18n';

export default function CTASection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding bg-gradient-to-br from-violet-500 to-purple-600">
        <div className="container-custom px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('whisk2capcut_cta_title')}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t('whisk2capcut_cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`/${lang}/autoflowcut`}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 active:scale-95"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              {lang === 'ko' ? 'AutoFlowCut으로 전환하기' : lang === 'ja' ? 'AutoFlowCutに移行する' : lang === 'de' ? 'Zu AutoFlowCut wechseln' : 'Switch to AutoFlowCut'}
            </a>
          </div>
        </div>
      </section>
  );
}
