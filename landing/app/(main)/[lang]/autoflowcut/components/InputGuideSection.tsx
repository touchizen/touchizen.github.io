'use client';

import { Language, TranslationKey } from '@/lib/i18n';

export default function InputGuideSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section id="input-guide" className="section-padding">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-4">
              <span>&#x1F4C2;</span>
              {t('autoflowcut_input_badge' as TranslationKey)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {t('autoflowcut_input_title' as TranslationKey)}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t('autoflowcut_input_desc' as TranslationKey)}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* 3 Input Format Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* TXT Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                  <span>&#x1F4DD;</span>
                  {t('autoflowcut_input_txt_title' as TranslationKey)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('autoflowcut_input_txt_desc' as TranslationKey)}
                </p>
                <div className="bg-gray-900 dark:bg-black rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">
                  <pre>{`A young scholar reading under a pine tree, Joseon era
A merchant crossing a stone bridge at dawn
Two warriors facing each other in a bamboo forest`}</pre>
                </div>
              </div>

              {/* CSV Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                  <span>&#x1F4CA;</span>
                  {t('autoflowcut_input_csv_title' as TranslationKey)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('autoflowcut_input_csv_desc' as TranslationKey)}
                </p>
                <div className="bg-gray-900 dark:bg-black rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">
                  <pre>{`prompt,subtitle,characters,scene_tag,duration
"Scholar reading under pine","한 선비가 소나무 아래서...",scholar,reading_scene,5`}</pre>
                </div>
              </div>

              {/* SRT Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                  <span>&#x1F4AC;</span>
                  {t('autoflowcut_input_srt_title' as TranslationKey)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('autoflowcut_input_srt_desc' as TranslationKey)}
                </p>
                <div className="bg-gray-900 dark:bg-black rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">
                  <pre>{`1
00:00:00,000 --> 00:00:05,000
한 선비가 소나무 아래에서 책을 읽고 있었다.`}</pre>
                </div>
              </div>
            </div>

            {/* AI Generation Section */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">&#x1F9E0;</span>
                {t('autoflowcut_input_ai_title' as TranslationKey)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('autoflowcut_input_ai_desc' as TranslationKey)}
              </p>

              {/* 4 Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { num: '1', key: 'autoflowcut_input_ai_step1' },
                  { num: '2', key: 'autoflowcut_input_ai_step2' },
                  { num: '3', key: 'autoflowcut_input_ai_step3' },
                  { num: '4', key: 'autoflowcut_input_ai_step4' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl">
                    <div className="w-8 h-8 flex-shrink-0 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.num}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                      {t(step.key as TranslationKey)}
                    </p>
                  </div>
                ))}
              </div>

              {/* 3 AI Tool Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Claude', icon: '&#x1F7E0;', color: 'border-purple-300 dark:border-purple-700', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                  { name: 'ChatGPT', icon: '&#x1F7E2;', color: 'border-green-300 dark:border-green-700', bg: 'bg-green-50 dark:bg-green-900/20' },
                  { name: 'Gemini', icon: '&#x1F535;', color: 'border-blue-300 dark:border-blue-700', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                ].map((tool, i) => (
                  <div key={i} className={`p-4 ${tool.bg} rounded-xl border-2 ${tool.color} text-center`}>
                    <div className="text-2xl mb-2" dangerouslySetInnerHTML={{ __html: tool.icon }} />
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {tool.name}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
