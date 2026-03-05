import { Language, TranslationKey } from '@/lib/i18n';

export default function AudienceSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="gradient-text">{t('whisk2capcut_audience_title')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
            {[
              { emoji: '📹', title: t('whisk2capcut_audience_1_title'), desc: t('whisk2capcut_audience_1_desc') },
              { emoji: '📖', title: t('whisk2capcut_audience_2_title'), desc: t('whisk2capcut_audience_2_desc') },
              { emoji: '🎬', title: t('whisk2capcut_audience_3_title'), desc: t('whisk2capcut_audience_3_desc') },
              { emoji: '📚', title: t('whisk2capcut_audience_4_title'), desc: t('whisk2capcut_audience_4_desc') },
              { emoji: '🎥', title: t('whisk2capcut_audience_5_title'), desc: t('whisk2capcut_audience_5_desc') },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 card-hover">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
