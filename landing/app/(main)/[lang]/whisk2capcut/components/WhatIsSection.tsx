import { Language, TranslationKey } from '@/lib/i18n';

export default function WhatIsSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">{t('whisk2capcut_what_title')}</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('whisk2capcut_what_desc')}
            </p>
          </div>
        </div>
      </section>
  );
}
