'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = (key: TranslationKey) => translations[lang][key];

  return (
    <section className="relative flex items-center justify-center overflow-hidden py-20 md:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center">
        <div className="animate-fade-in">
          <p className="text-primary-500 dark:text-primary-400 font-semibold mb-4 tracking-wide uppercase text-sm">
            {t('hero_by')}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
            <span className="gradient-text">{t('hero_title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-balance">
            {t('hero_subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}
