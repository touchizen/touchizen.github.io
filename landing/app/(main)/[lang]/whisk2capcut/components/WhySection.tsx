import { Language, TranslationKey } from '@/lib/i18n';

export default function WhySection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="gradient-text">{t('whisk2capcut_why_title')}</span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 text-lg">
              {t('whisk2capcut_why_intro')}
            </p>
            <div className="space-y-4">
              {[
                { icon: '📦', text: t('whisk2capcut_why_1') },
                { icon: '⏱️', text: t('whisk2capcut_why_2') },
                { icon: '💬', text: t('whisk2capcut_why_3') },
                { icon: '🎞️', text: t('whisk2capcut_why_4') },
                { icon: '🎭', text: t('whisk2capcut_why_5') },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-lg font-semibold text-orange-500 dark:text-orange-400">
              {t('whisk2capcut_why_cta')}
            </p>
          </div>
        </div>
      </section>
  );
}
