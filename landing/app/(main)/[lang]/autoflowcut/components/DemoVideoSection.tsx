import { Language, TranslationKey } from '@/lib/i18n';

export default function DemoVideoSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-4">
                <span>🎬</span>
                {t('autoflowcut_demo_badge' as TranslationKey)}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">
                  {t('autoflowcut_demo_title' as TranslationKey)}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('autoflowcut_demo_desc' as TranslationKey)}
              </p>
            </div>

            {/* Video Placeholder */}
            {/* TODO: Replace with YouTube embed: <iframe src="https://www.youtube.com/embed/VIDEO_ID" ... /> */}
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
                <p className="text-lg font-medium">
                  {t('autoflowcut_demo_placeholder' as TranslationKey)}
                </p>
              </div>
            </div>

            <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-4">
              {t('autoflowcut_demo_placeholder' as TranslationKey)}
            </p>
          </div>
        </div>
      </section>
  );
}
