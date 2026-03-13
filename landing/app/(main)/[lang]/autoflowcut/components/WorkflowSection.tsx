import { Language, TranslationKey } from '@/lib/i18n';

export default function WorkflowSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  const steps = [
    {
      num: '1',
      icon: '📝',
      title: t('autoflowcut_step1_title' as TranslationKey),
      desc: t('autoflowcut_step1_desc' as TranslationKey),
      color: 'from-violet-500 to-purple-600',
    },
    {
      num: '2',
      icon: '🖼️',
      title: t('autoflowcut_step2_title' as TranslationKey),
      desc: t('autoflowcut_step2_desc' as TranslationKey),
      color: 'from-cyan-500 to-blue-600',
    },
    {
      num: '3',
      icon: '🎬',
      title: t('autoflowcut_step3_title' as TranslationKey),
      desc: t('autoflowcut_step3_desc' as TranslationKey),
      color: 'from-blue-500 to-indigo-600',
    },
    {
      num: '4',
      icon: '✂️',
      title: t('autoflowcut_step4_title' as TranslationKey),
      desc: t('autoflowcut_step4_desc' as TranslationKey),
      color: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            🔄 {lang === 'ko' ? '워크플로우' : lang === 'ja' ? 'ワークフロー' : lang === 'de' ? 'Workflow' : 'Workflow'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {lang === 'ko' ? '4단계 자동화 파이프라인' : lang === 'ja' ? '4ステップ自動化パイプライン' : lang === 'de' ? '4-Schritt-Automatisierungspipeline' : '4-Step Automation Pipeline'}
            </span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                      {step.num}
                    </div>
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 text-gray-300 dark:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Visual Pipeline */}
          <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base font-mono">
              <span className="px-3 py-1.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-lg">TXT / CSV / SRT</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-lg">Flow AI 🖼️</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg">T2V / I2V 🎬</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">CapCut ✂️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
