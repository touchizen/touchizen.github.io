'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';
import { features } from '@/lib/products';

interface FeaturesProps {
  lang: Language;
}

export default function Features({ lang }: FeaturesProps) {
  const t = (key: TranslationKey) => translations[lang][key];

  return (
    <section id="features" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('features_title')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t('features_subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`text-center p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 card-hover animate-fade-in stagger-${index + 1}`}
              style={{ opacity: 0 }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {t(feature.titleKey as TranslationKey)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t(feature.descKey as TranslationKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
