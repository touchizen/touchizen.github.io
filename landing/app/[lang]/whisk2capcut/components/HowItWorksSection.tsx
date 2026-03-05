import WorkflowDemo from '@/components/WorkflowDemo';
import { Language, TranslationKey } from '@/lib/i18n';

export default function HowItWorksSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding">
        <div className="container-custom px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="gradient-text">{t('whisk2capcut_howto_title')}</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {lang === 'ko' ? '3단계로 끝나는 간단한 워크플로우를 직접 확인해보세요' : 'See how simple it is with just 3 steps'}
          </p>
          <WorkflowDemo lang={lang} />
        </div>
      </section>
  );
}
