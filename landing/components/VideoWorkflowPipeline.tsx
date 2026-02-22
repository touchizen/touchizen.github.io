'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';

interface VideoWorkflowPipelineProps {
  lang: Language;
}

export default function VideoWorkflowPipeline({ lang }: VideoWorkflowPipelineProps) {
  const t = (key: TranslationKey) => translations[lang][key];

  const steps = [
    {
      num: 1,
      icon: '📝',
      titleKey: 'workflow_step1_title' as TranslationKey,
      descKey: 'workflow_step1_desc' as TranslationKey,
      color: 'from-slate-400 to-slate-500',
      bgColor: 'bg-slate-50 dark:bg-slate-900/30',
      borderColor: 'border-slate-200 dark:border-slate-700',
    },
    {
      num: 2,
      icon: '🎙️',
      titleKey: 'workflow_step2_title' as TranslationKey,
      descKey: 'workflow_step2_desc' as TranslationKey,
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      num: 3,
      icon: '✂️',
      titleKey: 'workflow_step3_title' as TranslationKey,
      descKey: 'workflow_step3_desc' as TranslationKey,
      color: 'from-amber-400 to-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
      badge: 'SRT',
    },
    {
      num: 4,
      icon: '🎨',
      titleKey: 'workflow_step4_title' as TranslationKey,
      descKey: 'workflow_step4_desc2' as TranslationKey,
      color: 'from-orange-400 to-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
    },
    {
      num: 5,
      icon: '⚡',
      titleKey: 'workflow_step5_title' as TranslationKey,
      descKey: 'workflow_step5_desc' as TranslationKey,
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20',
      borderColor: 'border-violet-300 dark:border-violet-700',
      highlight: true,
    },
    {
      num: 6,
      icon: '🎬',
      titleKey: 'workflow_step6_title' as TranslationKey,
      descKey: 'workflow_step6_desc' as TranslationKey,
      color: 'from-green-400 to-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Pipeline steps */}
      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-slate-300 via-violet-400 to-green-400 dark:from-slate-600 dark:via-violet-500 dark:to-green-500" />

        <div className="space-y-1">
          {steps.map((step, index) => (
            <div key={step.num} className="relative">
              {/* Step card */}
              <div
                className={`relative flex items-start gap-4 md:gap-6 p-4 md:p-5 rounded-2xl transition-all ${
                  step.highlight
                    ? 'border-2 border-violet-400 dark:border-violet-400 outline outline-2 outline-offset-[3px] outline-violet-400 dark:outline-violet-400 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 shadow-lg scale-[1.02]'
                    : `border-2 ${step.borderColor} ${step.bgColor}`
                }`}
              >
                {/* Number circle */}
                <div
                  className={`relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                >
                  {step.highlight ? (
                    <img src="/images/whisk2capcut.svg" alt="Whisk2CapCut" className="w-7 h-7 md:w-9 md:h-9 rounded" />
                  ) : (
                    <span className="text-xl md:text-2xl">{step.icon}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
                      STEP {step.num}
                    </span>
                    {step.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
                        {step.badge}
                      </span>
                    )}
                    {step.highlight && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700 flex items-center gap-1">
                        <img src="/images/whisk2capcut.svg" alt="" className="w-3.5 h-3.5 rounded" />
                        Whisk2CapCut
                      </span>
                    )}
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold mt-1 ${
                    step.highlight ? 'text-violet-700 dark:text-violet-300' : 'text-gray-900 dark:text-white'
                  }`}>
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    {t(step.descKey)}
                  </p>
                  {step.highlight && (
                    <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 mt-2 flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                      {t('workflow_step5_highlight' as TranslationKey)}
                    </p>
                  )}
                </div>
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <svg className="w-5 h-5 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SRT Callout */}
      <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-700/50">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
            <span className="text-lg">🔗</span>
          </div>
          <div>
            <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-1">
              SRT = Key Connector
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
              {t('workflow_srt_callout' as TranslationKey)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
