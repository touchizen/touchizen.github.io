import { Language, TranslationKey } from '@/lib/i18n';

export default function StoryModeSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  // The real in-app stepper: Setup(0) → Research(①) → Synopsis(②) → Script(③)
  // → Scene split(④) → Audio(⑤) → Prompts(⑥). Setup is an entry tab, not a run step.
  const steps = [
    { num: '0', title: 'autoflowcut_story_step0_title', desc: 'autoflowcut_story_step0_desc', icon: '⚙️', color: 'from-gray-500 to-gray-700', auto: false },
    { num: '①', title: 'autoflowcut_story_step1_title', desc: 'autoflowcut_story_step1_desc', icon: '🔍', color: 'from-slate-500 to-blue-500', auto: false },
    { num: '②', title: 'autoflowcut_story_step2_title', desc: 'autoflowcut_story_step2_desc', icon: '📋', color: 'from-blue-500 to-indigo-600', auto: false },
    { num: '③', title: 'autoflowcut_story_step3_title', desc: 'autoflowcut_story_step3_desc', icon: '✍️', color: 'from-violet-500 to-purple-600', auto: false },
    { num: '④', title: 'autoflowcut_story_step4_title', desc: 'autoflowcut_story_step4_desc', icon: '✂️', color: 'from-pink-500 to-rose-600', auto: true },
    { num: '⑤', title: 'autoflowcut_story_step5_title', desc: 'autoflowcut_story_step5_desc', icon: '🎙️', color: 'from-amber-500 to-orange-500', auto: true },
    { num: '⑥', title: 'autoflowcut_story_step6_title', desc: 'autoflowcut_story_step6_desc', icon: '🖼️', color: 'from-cyan-500 to-blue-600', auto: true },
  ];

  const autoLabel = lang === 'ko' ? '자동' : lang === 'ja' ? '自動' : lang === 'de' ? 'Auto' : 'auto';
  const runAllLabel = lang === 'ko' ? '▶ 전체 실행' : lang === 'ja' ? '▶ 一括実行' : lang === 'de' ? '▶ Alles ausführen' : '▶ Run all';

  return (
    <section id="story-mode" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
            📖 {t('autoflowcut_story_badge' as TranslationKey)}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
              {t('autoflowcut_story_title' as TranslationKey)}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            {t('autoflowcut_story_subtitle' as TranslationKey)}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Stepper — mirrors the in-app chip row (scrolls sideways, no wrap) */}
          <div className="mb-10 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              {steps.map((step, i) => (
                <div key={step.num} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                    <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${step.color} text-white text-xs font-bold flex items-center justify-center`}>
                      {step.num}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      {t(step.title as TranslationKey)}
                    </span>
                    {step.auto && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300">
                        {autoLabel}
                      </span>
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
              <span className="ml-2 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold whitespace-nowrap">
                {runAllLabel}
              </span>
            </div>
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                    {step.num}
                  </div>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {t(step.title as TranslationKey)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(step.desc as TranslationKey)}
                </p>
              </div>
            ))}
          </div>

          {/* Highlights — auto/Run all + character references */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border border-cyan-200 dark:border-cyan-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span>⚡</span>
                {t('autoflowcut_story_auto_title' as TranslationKey)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('autoflowcut_story_auto_desc' as TranslationKey)}
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl border border-violet-200 dark:border-violet-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span>🎭</span>
                {t('autoflowcut_story_char_title' as TranslationKey)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('autoflowcut_story_char_desc' as TranslationKey)}
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href={`/guide/${lang}/autoflowcut/story-guide.html`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-xl font-semibold transition-all hover:-translate-y-0.5 shadow-lg"
            >
              <span>📖</span>
              {t('autoflowcut_story_cta' as TranslationKey)}
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
