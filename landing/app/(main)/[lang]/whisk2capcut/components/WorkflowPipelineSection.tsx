import VideoWorkflowPipeline from '@/components/VideoWorkflowPipeline';
import { Language, TranslationKey } from '@/lib/i18n';

export default function WorkflowPipelineSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding">
        <div className="container-custom px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="gradient-text">{t('workflow_pipeline_title' as TranslationKey)}</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {t('workflow_pipeline_subtitle' as TranslationKey)}
          </p>
          <VideoWorkflowPipeline lang={lang} />
        </div>
      </section>
  );
}
