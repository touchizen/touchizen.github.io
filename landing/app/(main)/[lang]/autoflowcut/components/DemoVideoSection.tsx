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

            {/* YouTube Embed */}
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/mYnfgqvCkME"
                title="AutoFlowCut Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
  );
}
