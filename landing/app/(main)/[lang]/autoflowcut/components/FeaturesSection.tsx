import { Language, TranslationKey } from '@/lib/i18n';

export default function FeaturesSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  const features = [
    { title: 'autoflowcut_feat1_title', desc: 'autoflowcut_feat1_desc', icon: '🖼️', color: 'from-violet-500 to-purple-600' },
    { title: 'autoflowcut_feat2_title', desc: 'autoflowcut_feat2_desc', icon: '🎬', color: 'from-cyan-500 to-blue-600' },
    { title: 'autoflowcut_feat3_title', desc: 'autoflowcut_feat3_desc', icon: '✂️', color: 'from-green-500 to-emerald-600' },
    { title: 'autoflowcut_feat4_title', desc: 'autoflowcut_feat4_desc', icon: '🎯', color: 'from-orange-500 to-red-500' },
    { title: 'autoflowcut_feat5_title', desc: 'autoflowcut_feat5_desc', icon: '🔄', color: 'from-pink-500 to-rose-600' },
    { title: 'autoflowcut_feat6_title', desc: 'autoflowcut_feat6_desc', icon: '💻', color: 'from-gray-600 to-gray-800' },
  ];

  return (
    <section id="features" className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-4">
            ✨ {t('autoflowcut_features_title' as TranslationKey)}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {t('autoflowcut_features_title' as TranslationKey)}
            </span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:shadow-md"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feat.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {t(feat.title as TranslationKey)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t(feat.desc as TranslationKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
