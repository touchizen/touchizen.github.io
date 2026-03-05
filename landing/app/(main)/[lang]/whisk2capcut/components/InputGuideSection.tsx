'use client';

import { Language, TranslationKey } from '@/lib/i18n';
import FileFormatTabs from './FileFormatTabs';

export default function InputGuideSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section id="input-guide" className="section-padding">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('input_guide_title')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('input_guide_subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Text Prompts - Simple section without tabs */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">📝</span>
                {t('input_text_title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('input_text_desc')}
              </p>
              <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('input_text_example_title')}
              </div>
              <div className="bg-gray-900 dark:bg-black rounded-xl p-4 font-mono text-sm text-gray-300">
                <pre>{`A king sitting on throne in ancient palace
The queen enters the throne room
They discuss important matters together
The king makes a difficult decision`}</pre>
              </div>
            </div>

            {/* Scene CSV with Tabs */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">📊</span>
                {t('input_scene_csv_title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('input_scene_csv_desc')}
              </p>

              <FileFormatTabs
                id="scene-csv"
                sampleTab={lang === 'ko' ? '샘플 & 형식' : 'Sample & Format'}
                promptTab={lang === 'ko' ? 'AI 생성 프롬프트' : 'AI Generation Prompt'}
                lang={lang}
                sampleContent={
                  <>
                    {/* Scene CSV Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {[
                        { col: 'input_csv_col1', desc: 'input_csv_col1_desc' },
                        { col: 'input_csv_col2', desc: 'input_csv_col2_desc' },
                        { col: 'input_csv_col3', desc: 'input_csv_col3_desc' },
                        { col: 'input_csv_col4', desc: 'input_csv_col4_desc' },
                        { col: 'input_csv_col5', desc: 'input_csv_col5_desc' },
                        { col: 'input_csv_col6', desc: 'input_csv_col6_desc' },
                      ].map((item, i) => (
                        <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <code className="text-violet-600 dark:text-violet-400 font-mono text-sm">
                            {t(item.col as TranslationKey)}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {t(item.desc as TranslationKey)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Scene CSV Example */}
                    <div className="bg-gray-900 dark:bg-black rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto mb-4">
                      <pre>{t('sample_scene_csv')}</pre>
                    </div>

                    <a
                      href={`/samples/${lang}/scene-sample.csv`}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-lg font-medium text-sm hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {t('input_scene_csv_download')}
                    </a>
                  </>
                }
                promptContent={
                  <>
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lang === 'ko'
                          ? '이 프롬프트를 Claude, ChatGPT, Gemini에 붙여넣고 스토리를 입력하면 Scene CSV가 자동 생성됩니다.'
                          : 'Paste this prompt into Claude, ChatGPT, or Gemini with your story to auto-generate the Scene CSV.'}
                      </p>
                    </div>
                    <div className="bg-gray-900 dark:bg-black rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto mb-4 max-h-64 overflow-y-auto">
                      <pre id="meta-scene-prompt">{`You are a scene breakdown assistant for Whisk2CapCut.

Given a story or script, create a Scene CSV file with these columns:
- prompt: English scene description for AI image generation (composition, lighting, mood)
- subtitle: Subtitle text for the scene (in your preferred language)
- characters: Character names in the scene (semicolon-separated if multiple)
- scene_tag: Location/background tag (use consistent tags)
- style_tag: Art style tag (keep consistent across all scenes)
- duration: Scene duration in seconds (3-5 normal, 2 for quick cuts)

Rules:
1. Each row = one visual scene (single image)
2. Keep prompts descriptive but under 200 chars
3. Use consistent character names throughout
4. Group similar locations under one scene_tag
5. Consider pacing: vary duration for dramatic effect

Output: CSV with header row, quote values containing commas.

Now break down this story into scenes:`}</pre>
                    </div>
                    <button
                      onClick={() => {
                        const prompt = document.getElementById('meta-scene-prompt')?.textContent || '';
                        navigator.clipboard.writeText(prompt);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg font-medium text-sm hover:bg-violet-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {t('input_meta_copy')}
                    </button>
                  </>
                }
              />
            </div>

            {/* Reference CSV with Tabs */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">🖼️</span>
                {t('input_ref_csv_title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('input_ref_csv_desc')}
              </p>

              <FileFormatTabs
                id="ref-csv"
                sampleTab={lang === 'ko' ? '샘플 & 형식' : 'Sample & Format'}
                promptTab={lang === 'ko' ? 'AI 생성 프롬프트' : 'AI Generation Prompt'}
                lang={lang}
                sampleContent={
                  <>
                    {/* Reference CSV Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                      {[
                        { col: 'input_ref_csv_col1', desc: 'input_ref_csv_col1_desc' },
                        { col: 'input_ref_csv_col2', desc: 'input_ref_csv_col2_desc' },
                        { col: 'input_ref_csv_col3', desc: 'input_ref_csv_col3_desc' },
                        { col: 'input_ref_csv_col4', desc: 'input_ref_csv_col4_desc' },
                      ].map((item, i) => (
                        <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <code className="text-violet-600 dark:text-violet-400 font-mono text-sm">
                            {t(item.col as TranslationKey)}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {t(item.desc as TranslationKey)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Reference CSV Example */}
                    <div className="bg-gray-900 dark:bg-black rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto mb-4">
                      <pre>{t('sample_ref_csv')}</pre>
                    </div>

                    <a
                      href={`/samples/${lang}/reference-sample.csv`}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-lg font-medium text-sm hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {t('input_ref_csv_download')}
                    </a>
                  </>
                }
                promptContent={
                  <>
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lang === 'ko'
                          ? '이 프롬프트를 Claude, ChatGPT, Gemini에 붙여넣고 스토리를 입력하면 Reference CSV가 자동 생성됩니다.'
                          : 'Paste this prompt into Claude, ChatGPT, or Gemini with your story to auto-generate the Reference CSV.'}
                      </p>
                    </div>
                    <div className="bg-gray-900 dark:bg-black rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto mb-4 max-h-64 overflow-y-auto">
                      <pre id="meta-ref-prompt">{`You are a reference planning assistant for Whisk2CapCut.

Given a story, create a Reference CSV with these columns:
- type: Reference type (character, background, or style)
- name: Name for matching with scene tags
- image_path: Suggested image filename
- description: Description for generating/finding the reference image

For characters: List all unique characters with their visual appearance
For backgrounds: List all unique locations/settings
For styles: Suggest 1-2 art styles that fit the story

Output: CSV with header row.

Now create the reference list for this story:`}</pre>
                    </div>
                    <button
                      onClick={() => {
                        const prompt = document.getElementById('meta-ref-prompt')?.textContent || '';
                        navigator.clipboard.writeText(prompt);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg font-medium text-sm hover:bg-violet-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {t('input_meta_copy')}
                    </button>
                  </>
                }
              />
            </div>

            {/* SRT with Tabs */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">💬</span>
                {t('input_srt_title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('input_srt_desc')}
              </p>

              <FileFormatTabs
                id="srt"
                sampleTab={lang === 'ko' ? '샘플 & 형식' : 'Sample & Format'}
                promptTab={lang === 'ko' ? 'AI 생성 프롬프트' : 'AI Generation Prompt'}
                lang={lang}
                sampleContent={
                  <>
                    {/* SRT Example */}
                    <div className="bg-gray-900 dark:bg-black rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto mb-4">
                      <pre>{t('sample_srt')}</pre>
                    </div>

                    <a
                      href={`/samples/${lang}/sample.srt`}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-lg font-medium text-sm hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {t('input_srt_download')}
                    </a>
                  </>
                }
                promptContent={
                  <>
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lang === 'ko'
                          ? '이 프롬프트를 Claude, ChatGPT, Gemini에 붙여넣고 스토리를 입력하면 SRT 파일이 자동 생성됩니다.'
                          : 'Paste this prompt into Claude, ChatGPT, or Gemini with your story to auto-generate the SRT file.'}
                      </p>
                    </div>
                    <div className="bg-gray-900 dark:bg-black rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto mb-4 max-h-64 overflow-y-auto">
                      <pre id="meta-srt-prompt">{`You are a subtitle creator for Whisk2CapCut.

Given a story, create an SRT subtitle file where each subtitle becomes a video scene.

Rules:
1. Each subtitle = one scene (3-5 seconds)
2. Subtitles in your preferred language, concise (under 30 chars)
3. Sequential numbering starting from 1
4. Timecodes: HH:MM:SS,mmm --> HH:MM:SS,mmm
5. One blank line between entries

Format:
[number]
[start time] --> [end time]
[subtitle text]

[next entry...]

Now create the SRT file for this story:`}</pre>
                    </div>
                    <button
                      onClick={() => {
                        const prompt = document.getElementById('meta-srt-prompt')?.textContent || '';
                        navigator.clipboard.writeText(prompt);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg font-medium text-sm hover:bg-violet-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {t('input_meta_copy')}
                    </button>
                  </>
                }
              />
            </div>

            {/* AI Usage Guide */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">🧠</span>
                {t('ai_guide_title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('ai_guide_subtitle')}
              </p>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { num: '1', title: 'ai_guide_step1_title', desc: 'ai_guide_step1_desc' },
                  { num: '2', title: 'ai_guide_step2_title', desc: 'ai_guide_step2_desc' },
                  { num: '3', title: 'ai_guide_step3_title', desc: 'ai_guide_step3_desc' },
                  { num: '4', title: 'ai_guide_step4_title', desc: 'ai_guide_step4_desc' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl">
                    <div className="w-8 h-8 flex-shrink-0 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {t(step.title as TranslationKey)}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t(step.desc as TranslationKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Tools */}
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                {lang === 'ko' ? 'AI 도구별 사용법' : 'Usage by AI Tool'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'ai_guide_claude_title', desc: 'ai_guide_claude_desc', icon: '🟠', color: 'border-orange-300 dark:border-orange-700' },
                  { title: 'ai_guide_chatgpt_title', desc: 'ai_guide_chatgpt_desc', icon: '🟢', color: 'border-green-300 dark:border-green-700' },
                  { title: 'ai_guide_gemini_title', desc: 'ai_guide_gemini_desc', icon: '🔵', color: 'border-blue-300 dark:border-blue-700' },
                ].map((tool, i) => (
                  <div key={i} className={`p-4 bg-white dark:bg-gray-900 rounded-xl border-2 ${tool.color}`}>
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {t(tool.title as TranslationKey)}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t(tool.desc as TranslationKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
