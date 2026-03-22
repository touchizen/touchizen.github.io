import { Language, TranslationKey } from '@/lib/i18n';

export default function ScreenshotGallerySection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-4">
                <span>📸</span>
                {t('autoflowcut_screenshot_badge' as TranslationKey)}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">
                  {t('autoflowcut_screenshot_title' as TranslationKey)}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('autoflowcut_screenshot_desc' as TranslationKey)}
              </p>
            </div>

            {/* Screenshot Placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="aspect-video rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-center"
                >
                  <span className="text-gray-400 dark:text-gray-500 font-medium">
                    Screenshot {num}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-400 dark:text-gray-500">
              {t('autoflowcut_screenshot_placeholder' as TranslationKey)}
            </p>
          </div>
        </div>
      </section>
  );
}
