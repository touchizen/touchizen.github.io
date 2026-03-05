import ScreenshotCarousel from '@/components/ScreenshotCarousel';
import { Language, TranslationKey } from '@/lib/i18n';

export default function ScreenshotGallerySection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {lang === 'ko' ? '스크린샷' : lang === 'ja' ? 'スクリーンショット' : lang === 'de' ? 'Screenshots' : 'Screenshots'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">
                  {lang === 'ko' ? '플러그인 미리보기' : lang === 'ja' ? 'プラグインプレビュー' : lang === 'de' ? 'Plugin-Vorschau' : 'Plugin Preview'}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? '실제 플러그인 화면을 확인해보세요' : lang === 'ja' ? '実際のプラグイン画面をご覧ください' : lang === 'de' ? 'Sehen Sie sich die tatsächlichen Plugin-Bildschirme an' : 'See the actual plugin screens'}
              </p>
            </div>

            <ScreenshotCarousel lang={lang} />
          </div>
        </div>
      </section>
  );
}
