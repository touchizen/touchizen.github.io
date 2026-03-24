import { Language, TranslationKey } from '@/lib/i18n';
import StoryWorkflowPipeline from '@/components/StoryWorkflowPipeline';

export default function StoryPipelineSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
            &#x1F3AC; story-engine skill
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

        <StoryWorkflowPipeline lang={lang} />
      </div>
    </section>
  );
}
