import { Language, TranslationKey } from '@/lib/i18n';

export default function VideoGenerationSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-4">
            🎬 {t('autoflowcut_video_title' as TranslationKey)}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {t('autoflowcut_video_title' as TranslationKey)}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t('autoflowcut_video_subtitle' as TranslationKey)}
          </p>
        </div>

        {/* T2V & I2V Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* T2V Card */}
          <div className="relative bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                📝
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('autoflowcut_t2v_title' as TranslationKey)}
              </h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              {t('autoflowcut_t2v_desc' as TranslationKey)}
            </p>

            {/* Input / Output / Use case */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 text-xs flex-shrink-0 mt-0.5">
                  ↓
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('autoflowcut_t2v_input' as TranslationKey)}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs flex-shrink-0 mt-0.5">
                  ↑
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('autoflowcut_t2v_output' as TranslationKey)}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 text-xs flex-shrink-0 mt-0.5">
                  ★
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('autoflowcut_t2v_usecase' as TranslationKey)}
                </span>
              </div>
            </div>

            {/* Flow diagram */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <span className="px-2 py-1 rounded bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 font-medium">Text</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">Flow AI</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium">Video</span>
            </div>
          </div>

          {/* I2V Card */}
          <div className="relative bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                🖼️
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('autoflowcut_i2v_title' as TranslationKey)}
              </h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              {t('autoflowcut_i2v_desc' as TranslationKey)}
            </p>

            {/* Input / Output / Use case */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 text-xs flex-shrink-0 mt-0.5">
                  ↓
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('autoflowcut_i2v_input' as TranslationKey)}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 text-xs flex-shrink-0 mt-0.5">
                  ↑
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('autoflowcut_i2v_output' as TranslationKey)}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 text-xs flex-shrink-0 mt-0.5">
                  ★
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {t('autoflowcut_i2v_usecase' as TranslationKey)}
                </span>
              </div>
            </div>

            {/* Flow diagram */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <span className="px-2 py-1 rounded bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 font-medium">Image</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">Flow AI</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium">Video</span>
            </div>
          </div>
        </div>

        {/* Smart Media Selection */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                🎯
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {t('autoflowcut_video_smart_title' as TranslationKey)}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('autoflowcut_video_smart_desc' as TranslationKey)}
                </p>
                {/* Priority flow */}
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium">
                    I2V
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                    T2V
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                    Image
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
