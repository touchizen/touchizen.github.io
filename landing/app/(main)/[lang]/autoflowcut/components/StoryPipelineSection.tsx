import { Language, TranslationKey } from '@/lib/i18n';
import StoryWorkflowPipeline from '@/components/StoryWorkflowPipeline';

export default function StoryPipelineSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 text-sm font-medium mb-4">
            &#x1F9E9; {t('story_wf_badge' as TranslationKey)}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
              {t('story_wf_title' as TranslationKey)}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t('story_wf_subtitle' as TranslationKey)}
          </p>
        </div>

        {/* Disambiguation — this is NOT the app's built-in Story mode. */}
        <div className="max-w-3xl mx-auto mb-10 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-xl flex items-start gap-3">
          <span className="text-xl flex-shrink-0">&#x2139;&#xFE0F;</span>
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {t('story_wf_note' as TranslationKey)}{' '}
            <a href="#story-mode" className="font-semibold underline hover:no-underline">
              {t('autoflowcut_story_title' as TranslationKey)}
            </a>
          </p>
        </div>

        <StoryWorkflowPipeline lang={lang} />
      </div>
    </section>
  );
}
