'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';

interface StepDef {
  num: string;
  icon: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  input: string;
  output: string;
  color: string;
  highlight?: boolean;
  gate?: boolean;
}

interface PhaseDef {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  steps: StepDef[];
}

interface StoryWorkflowPipelineProps {
  lang: Language;
}

export default function StoryWorkflowPipeline({ lang }: StoryWorkflowPipelineProps) {
  const t = (key: TranslationKey) => translations[lang][key];

  const phases: PhaseDef[] = [
    {
      id: 'design',
      label: t('story_wf_phase1' as TranslationKey),
      color: 'from-slate-500 to-blue-500',
      bgColor: 'bg-slate-100 dark:bg-slate-800/40',
      steps: [
        {
          num: 'R1',
          icon: '🔍',
          titleKey: 'story_wf_r1_title' as TranslationKey,
          descKey: 'story_wf_r1_desc' as TranslationKey,
          input: t('story_wf_r1_in' as TranslationKey),
          output: t('story_wf_r1_out' as TranslationKey),
          color: 'from-slate-400 to-slate-500',
        },
        {
          num: 'R2',
          icon: '✅',
          titleKey: 'story_wf_r2_title' as TranslationKey,
          descKey: 'story_wf_r2_desc' as TranslationKey,
          input: t('story_wf_r2_in' as TranslationKey),
          output: t('story_wf_r2_out' as TranslationKey),
          color: 'from-slate-400 to-slate-500',
        },
        {
          num: 'R3',
          icon: '📋',
          titleKey: 'story_wf_r3_title' as TranslationKey,
          descKey: 'story_wf_r3_desc' as TranslationKey,
          input: t('story_wf_r3_in' as TranslationKey),
          output: t('story_wf_r3_out' as TranslationKey),
          color: 'from-blue-400 to-blue-500',
        },
      ],
    },
    {
      id: 'writing',
      label: t('story_wf_phase2' as TranslationKey),
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-100 dark:bg-violet-800/30',
      steps: [
        {
          num: 'R4',
          icon: '🛫',
          titleKey: 'story_wf_r4_title' as TranslationKey,
          descKey: 'story_wf_r4_desc' as TranslationKey,
          input: t('story_wf_r4_in' as TranslationKey),
          output: t('story_wf_r4_out' as TranslationKey),
          color: 'from-violet-400 to-violet-500',
        },
        {
          num: 'R5',
          icon: '✍️',
          titleKey: 'story_wf_r5_title' as TranslationKey,
          descKey: 'story_wf_r5_desc' as TranslationKey,
          input: t('story_wf_r5_in' as TranslationKey),
          output: t('story_wf_r5_out' as TranslationKey),
          color: 'from-purple-400 to-purple-500',
        },
        {
          num: 'R6',
          icon: '🔄',
          titleKey: 'story_wf_r6_title' as TranslationKey,
          descKey: 'story_wf_r6_desc' as TranslationKey,
          input: t('story_wf_r6_in' as TranslationKey),
          output: t('story_wf_r6_out' as TranslationKey),
          color: 'from-purple-400 to-purple-500',
        },
        {
          num: 'R7',
          icon: '🛑',
          titleKey: 'story_wf_r7_title' as TranslationKey,
          descKey: 'story_wf_r7_desc' as TranslationKey,
          input: t('story_wf_r7_in' as TranslationKey),
          output: t('story_wf_r7_out' as TranslationKey),
          color: 'from-red-400 to-red-500',
          gate: true,
        },
      ],
    },
    {
      id: 'production',
      label: t('story_wf_phase3' as TranslationKey),
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-100 dark:bg-amber-800/30',
      steps: [
        {
          num: 'R8',
          icon: '📦',
          titleKey: 'story_wf_r8_title' as TranslationKey,
          descKey: 'story_wf_r8_desc' as TranslationKey,
          input: t('story_wf_r8_in' as TranslationKey),
          output: t('story_wf_r8_out' as TranslationKey),
          color: 'from-amber-400 to-amber-500',
        },
        {
          num: 'R9',
          icon: '🎙️',
          titleKey: 'story_wf_r9_title' as TranslationKey,
          descKey: 'story_wf_r9_desc' as TranslationKey,
          input: t('story_wf_r9_in' as TranslationKey),
          output: t('story_wf_r9_out' as TranslationKey),
          color: 'from-orange-400 to-orange-500',
        },
      ],
    },
    {
      id: 'visual',
      label: t('story_wf_phase4' as TranslationKey),
      color: 'from-cyan-500 to-green-500',
      bgColor: 'bg-cyan-100 dark:bg-cyan-800/30',
      steps: [
        {
          num: 'R10',
          icon: '📊',
          titleKey: 'story_wf_r10_title' as TranslationKey,
          descKey: 'story_wf_r10_desc' as TranslationKey,
          input: t('story_wf_r10_in' as TranslationKey),
          output: t('story_wf_r10_out' as TranslationKey),
          color: 'from-cyan-400 to-cyan-500',
        },
        {
          num: 'R11',
          icon: '⚡',
          titleKey: 'story_wf_r11_title' as TranslationKey,
          descKey: 'story_wf_r11_desc' as TranslationKey,
          input: t('story_wf_r11_in' as TranslationKey),
          output: t('story_wf_r11_out' as TranslationKey),
          color: 'from-cyan-500 to-blue-600',
          highlight: true,
        },
        {
          num: 'R12',
          icon: '🚀',
          titleKey: 'story_wf_r12_title' as TranslationKey,
          descKey: 'story_wf_r12_desc' as TranslationKey,
          input: t('story_wf_r12_in' as TranslationKey),
          output: t('story_wf_r12_out' as TranslationKey),
          color: 'from-green-400 to-green-500',
        },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {phases.map((phase, pi) => (
        <div key={phase.id} className="mb-8 last:mb-0">
          {/* Phase Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`h-1 flex-1 bg-gradient-to-r ${phase.color} rounded-full opacity-30`} />
            <span className={`px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full ${phase.bgColor} bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
              {phase.label}
            </span>
            <div className={`h-1 flex-1 bg-gradient-to-r ${phase.color} rounded-full opacity-30`} />
          </div>

          {/* Steps in this phase */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div className={`absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b ${phase.color} opacity-30`} />

            <div className="space-y-1">
              {phase.steps.map((step, si) => (
                <div key={step.num} className="relative">
                  <div
                    className={`relative flex items-start gap-4 md:gap-6 p-4 md:p-5 rounded-2xl transition-all ${
                      step.highlight
                        ? 'border-2 border-cyan-400 dark:border-cyan-400 outline outline-2 outline-offset-[3px] outline-cyan-400 dark:outline-cyan-400 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 shadow-lg scale-[1.02]'
                        : step.gate
                          ? 'border-2 border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10'
                          : `border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50`
                    }`}
                  >
                    {/* Number circle */}
                    <div
                      className={`relative z-10 flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-md`}
                    >
                      <span className="text-lg md:text-xl">{step.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold tracking-wider ${
                          step.highlight ? 'text-cyan-500' : step.gate ? 'text-red-400' : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {step.num}
                        </span>
                        {step.gate && (
                          <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-700">
                            {lang === 'ko' ? '사용자 확인 필요' : 'User Confirmation'}
                          </span>
                        )}
                        {step.highlight && (
                          <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700 flex items-center gap-1">
                            AutoFlowCut
                          </span>
                        )}
                      </div>
                      <h3 className={`text-base md:text-lg font-bold mt-1 ${
                        step.highlight ? 'text-cyan-700 dark:text-cyan-300' : 'text-gray-900 dark:text-white'
                      }`}>
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">
                        {t(step.descKey)}
                      </p>

                      {/* Input → Output badges */}
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" /></svg>
                          {step.input}
                        </span>
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 border border-green-200 dark:border-green-800">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16l4-4m0 0l-4-4m4 4H3" /></svg>
                          {step.output}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {si < phase.steps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Phase connector arrow */}
          {pi < phases.length - 1 && (
            <div className="flex justify-center py-3">
              <svg className="w-6 h-6 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      ))}

      {/* Gate System Callout */}
      <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-900/20 dark:to-amber-900/20 border-2 border-red-200 dark:border-red-700/50">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
            <span className="text-lg">🚦</span>
          </div>
          <div>
            <h4 className="font-bold text-red-800 dark:text-red-300 mb-1">
              {t('story_wf_gate_title' as TranslationKey)}
            </h4>
            <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">
              {t('story_wf_gate_desc' as TranslationKey)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
