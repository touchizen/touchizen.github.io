'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = (key: TranslationKey) => translations[lang][key];
  const videoId = lang === 'ko' ? 'mYnfgqvCkME' : 'cqxvDx9HTvQ';

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
      <div className="relative z-10 container-custom px-4 text-center">
        <div className="animate-fade-in">
          <p className="text-primary-500 dark:text-primary-400 font-semibold mb-4 tracking-wide uppercase text-sm">
            {t('hero_by')}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{t('hero_title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto text-balance">
            {t('hero_subtitle')}
          </p>

          {/* Latest product demo video */}
          <div className="relative aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="AutoFlowCut Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#download"
              className="btn-primary text-lg px-8 py-4"
            >
              {t('quick_dl_title')}
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
            <a
              href={`/${lang}/autoflowcut/`}
              className="btn-secondary text-lg px-8 py-4"
            >
              {t('quick_dl_learn_more')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
