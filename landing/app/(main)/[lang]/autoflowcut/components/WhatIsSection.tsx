import { Language, TranslationKey } from '@/lib/i18n';

export default function WhatIsSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-4">
              💡 {t('autoflowcut_what_title' as TranslationKey)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {t('autoflowcut_what_title' as TranslationKey)}
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {t('autoflowcut_what_desc' as TranslationKey)}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">
                100+
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? '이미지 일괄 생성' : lang === 'ja' ? '画像一括生成' : lang === 'de' ? 'Batch-Bildgenerierung' : 'Batch Image Gen'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">
                T2V+I2V
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? 'AI 비디오 생성' : lang === 'ja' ? 'AI動画生成' : lang === 'de' ? 'KI-Videogenerierung' : 'AI Video Generation'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">
                1-Click
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? 'CapCut 내보내기' : lang === 'ja' ? 'CapCutエクスポート' : lang === 'de' ? 'CapCut-Export' : 'CapCut Export'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
