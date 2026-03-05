import { Language, TranslationKey } from '@/lib/i18n';

const features = [
  { title: 'whisk2capcut_feat1_title', desc: 'whisk2capcut_feat1_desc', icon: '🎨' },
  { title: 'whisk2capcut_feat2_title', desc: 'whisk2capcut_feat2_desc', icon: '📦' },
  { title: 'whisk2capcut_feat3_title', desc: 'whisk2capcut_feat3_desc', icon: '🎬' },
  { title: 'whisk2capcut_feat4_title', desc: 'whisk2capcut_feat4_desc', icon: '💬' },
  { title: 'whisk2capcut_feat5_title', desc: 'whisk2capcut_feat5_desc', icon: '🖼️' },
  { title: 'whisk2capcut_feat6_title', desc: 'whisk2capcut_feat6_desc', icon: '📄' },
  { title: 'whisk2capcut_feat7_title', desc: 'whisk2capcut_feat7_desc', icon: '💾' },
  { title: 'whisk2capcut_feat8_title', desc: 'whisk2capcut_feat8_desc', icon: '🏷️' },
];

export default function FeaturesSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding">
        <div className="container-custom px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="gradient-text">{t('whisk2capcut_features_title')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 card-hover"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {t(feature.title as TranslationKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t(feature.desc as TranslationKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
