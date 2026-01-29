'use client';

import { useState, useEffect } from 'react';
import { Language, detectLanguage, translations, TranslationKey } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Tab component for file format sections
function FileFormatTabs({
  id,
  sampleTab,
  promptTab,
  sampleContent,
  promptContent,
  lang,
}: {
  id: string;
  sampleTab: string;
  promptTab: string;
  sampleContent: React.ReactNode;
  promptContent: React.ReactNode;
  lang: Language;
}) {
  const [activeTab, setActiveTab] = useState<'sample' | 'prompt'>('sample');

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('sample')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'sample'
              ? 'border-violet-500 text-violet-600 dark:text-violet-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          {sampleTab}
        </button>
        <button
          onClick={() => setActiveTab('prompt')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'prompt'
              ? 'border-violet-500 text-violet-600 dark:text-violet-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          {promptTab}
        </button>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'sample' ? sampleContent : promptContent}
      </div>
    </div>
  );
}

export default function Whisk2CapCutPage() {
  const [lang, setLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLang(detectLanguage());
  }, []);

  const t = (key: TranslationKey) => translations[lang][key];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const features = [
    { title: 'whisk2capcut_feat1_title', desc: 'whisk2capcut_feat1_desc', icon: '🎨' },
    { title: 'whisk2capcut_feat2_title', desc: 'whisk2capcut_feat2_desc', icon: '📦' },
    { title: 'whisk2capcut_feat3_title', desc: 'whisk2capcut_feat3_desc', icon: '🎬' },
    { title: 'whisk2capcut_feat4_title', desc: 'whisk2capcut_feat4_desc', icon: '💬' },
    { title: 'whisk2capcut_feat5_title', desc: 'whisk2capcut_feat5_desc', icon: '🖼️' },
    { title: 'whisk2capcut_feat6_title', desc: 'whisk2capcut_feat6_desc', icon: '📄' },
  ];

  const steps = [
    { title: 'whisk2capcut_step1_title', desc: 'whisk2capcut_step1_desc', num: '1' },
    { title: 'whisk2capcut_step2_title', desc: 'whisk2capcut_step2_desc', num: '2' },
    { title: 'whisk2capcut_step3_title', desc: 'whisk2capcut_step3_desc', num: '3' },
    { title: 'whisk2capcut_step4_title', desc: 'whisk2capcut_step4_desc', num: '4' },
  ];

  const plans = [
    {
      name: t('pricing_free'),
      desc: t('pricing_free_desc'),
      price: '$0',
      period: '',
      features: [
        t('pricing_free_feature1'),
        t('pricing_free_feature2'),
        t('pricing_free_feature3'),
      ],
      cta: t('pricing_cta_free'),
      highlighted: false,
    },
    {
      name: t('pricing_pro'),
      desc: t('pricing_pro_desc'),
      price: '$4.99',
      period: lang === 'ko' ? '/월' : '/mo',
      yearlyPrice: '$39.99',
      yearlyPeriod: lang === 'ko' ? '/년' : '/yr',
      saveText: t('pricing_pro_save'),
      features: [
        t('pricing_pro_feature1'),
        t('pricing_pro_feature2'),
        t('pricing_pro_feature3'),
      ],
      cta: t('pricing_cta_pro'),
      highlighted: true,
    },
  ];

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={setLang} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container-custom px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-700 dark:text-violet-300 text-sm font-medium mb-6">
              <span>🎬</span>
              Chrome Extension
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                {t('whisk2capcut_hero_title')}
              </span>
            </h1>
            {/* Slogan */}
            <p className="text-2xl md:text-3xl font-bold text-green-500 dark:text-green-400 mb-4">
              {t('whisk2capcut_hero_slogan')}
            </p>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              {t('whisk2capcut_hero_subtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://chrome.google.com/webstore"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg"
              >
                {t('whisk2capcut_hero_cta')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a href="#pricing" className="btn-secondary text-lg">
                {t('whisk2capcut_hero_cta_secondary')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">{t('whisk2capcut_what_title')}</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('whisk2capcut_what_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Time Saving Section */}
      <section className="section-padding bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('time_save_badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                {t('time_save_title')}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t('time_save_subtitle')}
            </p>
          </div>

          {/* Main Before → After comparison */}
          <div className="max-w-5xl mx-auto mb-10">
            {/* Before vs After Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                {/* Before */}
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    {lang === 'ko' ? '수작업' : 'Manual Work'}
                  </div>
                  <div className="text-5xl md:text-6xl font-bold text-red-500">
                    4{lang === 'ko' ? '시간+' : 'hr+'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {lang === 'ko' ? '이미지 편집, 배치, 타임라인 설정' : 'Edit, arrange, setup timeline'}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center">
                  <svg className="w-12 h-12 text-green-500 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* After */}
                <div className="text-center">
                  <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-2 uppercase tracking-wide">
                    Whisk2CapCut
                  </div>
                  <div className="text-5xl md:text-6xl font-bold text-green-500">
                    &lt;1{lang === 'ko' ? '분' : 'min'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {lang === 'ko' ? '자동 변환 완료' : 'Auto conversion done'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {/* Stat 1: 100+ images */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-violet-500">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {lang === 'ko' ? '이미지를 ~10분에 생성' : 'images in ~10 min'}
                  </div>
                </div>
              </div>
            </div>

            {/* Stat 2: Time saved */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">
                    {lang === 'ko' ? '4시간+' : '4+ hrs'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {lang === 'ko' ? '수작업 시간 절약' : 'manual work saved'}
                  </div>
                </div>
              </div>
            </div>

            {/* Stat 3: 1-click export */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-500">
                    {lang === 'ko' ? '1클릭' : '1 Click'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {lang === 'ko' ? 'CapCut 프로젝트로 내보내기' : 'export to CapCut project'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {t('time_save_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="gradient-text">{t('whisk2capcut_features_title')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 card-hover"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {t(feature.title as TranslationKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t(feature.desc as TranslationKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="gradient-text">{t('whisk2capcut_howto_title')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {t(step.title as TranslationKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t(step.desc as TranslationKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Input Guide Section */}
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
                      <pre>{`prompt,subtitle,characters,scene_tag,style_tag,duration
"A wise old king sits on golden throne","늙은 현명한 왕이 황금 왕좌에 앉아있다",왕,궁전,cinematic,4
"Beautiful queen enters through doors","아름다운 왕비가 화려한 문으로 들어온다",왕비,궁전,cinematic,3
"King and queen discuss matters","왕과 왕비가 중요한 문제를 논의한다",왕;왕비,궁전,cinematic,4`}</pre>
                    </div>

                    <a
                      href="/samples/scene-sample.csv"
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
- subtitle: Korean subtitle text for the scene
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                      {[
                        { col: 'input_ref_csv_col1', desc: 'input_ref_csv_col1_desc' },
                        { col: 'input_ref_csv_col2', desc: 'input_ref_csv_col2_desc' },
                        { col: 'input_ref_csv_col3', desc: 'input_ref_csv_col3_desc' },
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
                      <pre>{`type,name,image_path,description
character,왕,images/king.png,"Wise old king with white beard"
character,왕비,images/queen.png,"Beautiful queen in red dress"
background,궁전,images/palace.png,"Grand palace interior"
style,cinematic,images/cinematic.png,"Dramatic lighting"`}</pre>
                    </div>

                    <a
                      href="/samples/reference-sample.csv"
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
                      <pre>{`1
00:00:00,000 --> 00:00:04,000
늙은 현명한 왕이 황금 왕좌에 앉아있다

2
00:00:04,000 --> 00:00:07,000
아름다운 왕비가 화려한 문으로 들어온다

3
00:00:07,000 --> 00:00:11,000
왕과 왕비가 중요한 문제를 논의한다

4
00:00:11,000 --> 00:00:14,000
어린 왕자가 성 안뜰에서 검술 연습을 한다`}</pre>
                    </div>

                    <a
                      href="/samples/sample.srt"
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
2. Korean subtitles, concise (under 30 chars)
3. Sequential numbering starting from 1
4. Timecodes: HH:MM:SS,mmm --> HH:MM:SS,mmm
5. One blank line between entries

Format:
[number]
[start time] --> [end time]
[Korean subtitle text]

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

      {/* Export Guide Section */}
      <section id="export-guide" className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('export_guide_title')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('export_guide_subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Export Options */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">⚙️</span>
                {t('export_options_title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'export_opt1_name', desc: 'export_opt1_desc', icon: '📁', default: '-' },
                  { name: 'export_opt2_name', desc: 'export_opt2_desc', icon: '🔍', default: 'ON' },
                  { name: 'export_opt3_name', desc: 'export_opt3_desc', icon: '🎬', default: 'ON' },
                  { name: 'export_opt4_name', desc: 'export_opt4_desc', icon: '💬', default: 'ON' },
                ].map((opt, i) => (
                  <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{opt.icon}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {t(opt.name as TranslationKey)}
                      </span>
                      <span className="ml-auto text-xs px-2 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded">
                        {opt.default}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t(opt.desc as TranslationKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ken Burns Effect */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">🎬</span>
                {t('kenburns_title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('kenburns_desc')}
              </p>

              {/* Modes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span>🎯</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {t('kenburns_mode_pattern')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('kenburns_mode_pattern_desc')}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span>🎲</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {t('kenburns_mode_random')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('kenburns_mode_random_desc')}
                  </p>
                </div>
              </div>

              {/* Patterns */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {t('kenburns_patterns_title')}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {[
                    { name: 'zoomIn', desc: '1.0x → 1.3x' },
                    { name: 'zoomOut', desc: '1.3x → 1.0x' },
                    { name: 'panLeft', desc: '→ ←' },
                    { name: 'panRight', desc: '← →' },
                    { name: 'panUp', desc: '↓ ↑' },
                    { name: 'panDown', desc: '↑ ↓' },
                    { name: 'zoomInPanLeft', desc: '↗ + ←' },
                    { name: 'zoomInPanRight', desc: '↗ + →' },
                    { name: 'zoomOutPanUp', desc: '↙ + ↑' },
                    { name: 'zoomOutPanDown', desc: '↙ + ↓' },
                  ].map((pattern, i) => (
                    <div key={i} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                      <div className="text-xs font-mono text-gray-900 dark:text-white">{pattern.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{pattern.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cycle */}
              <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span>⏱️</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {t('kenburns_cycle')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('kenburns_cycle_desc')}
                </p>
              </div>
            </div>

            {/* Import Steps */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">📥</span>
                {t('import_title')}
              </h3>

              {/* CapCut Project Folder Paths */}
              <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>📁</span>
                  {lang === 'ko' ? 'CapCut 프로젝트 폴더 경로' : 'CapCut Project Folder Path'}
                </h4>
                <div className="space-y-3">
                  {/* macOS */}
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🍎</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">macOS</div>
                      <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 px-3 py-2 rounded-lg font-mono overflow-x-auto">
                        ~/Movies/CapCut/User Data/Projects/com.lveditor.draft/
                      </code>
                    </div>
                  </div>
                  {/* Windows */}
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🪟</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Windows</div>
                      <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 px-3 py-2 rounded-lg font-mono overflow-x-auto">
                        C:\Users\[Username]\AppData\Local\CapCut\User Data\Projects\com.lveditor.draft\
                      </code>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
                  {lang === 'ko'
                    ? '💡 내보낸 프로젝트 폴더를 위 경로에 복사한 후 CapCut을 재시작하세요.'
                    : '💡 Copy the exported project folder to the path above, then restart CapCut.'}
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { step: '1', key: 'import_step1' },
                  { step: '2', key: 'import_step2' },
                  { step: '3', key: 'import_step3' },
                  { step: '4', key: 'import_step4' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t(item.key as TranslationKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Structure */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">📂</span>
                {t('output_structure_title')}
              </h3>
              <div className="bg-gray-900 dark:bg-black rounded-xl p-6 font-mono text-sm text-gray-300 overflow-x-auto">
                <pre>{`project_folder/
├── draft_info.json        # CapCut project data
├── draft_meta_info.json   # Project metadata
├── media/                 # Image/Video/SFX files
│   ├── scene_001.png
│   ├── scene_002.png
│   └── ...
└── README.txt             # Import guide`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('whisk2capcut_pricing_title')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('whisk2capcut_pricing_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl card-hover ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                    POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                    {plan.desc}
                  </p>
                </div>

                <div className="text-center mb-6">
                  <div className="mb-2">
                    <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={`text-lg ${plan.highlighted ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  {'yearlyPrice' in plan && plan.yearlyPrice && (
                    <div className={`text-sm ${plan.highlighted ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                      {lang === 'ko' ? '또는' : 'or'} {plan.yearlyPrice}{plan.yearlyPeriod}
                      <span className="ml-2 px-2 py-0.5 bg-green-400 text-green-900 text-xs font-bold rounded-full">
                        {plan.saveText}
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? 'text-white' : 'text-violet-500'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className={plan.highlighted ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95 ${
                    plan.highlighted
                      ? 'bg-white text-violet-600 hover:bg-gray-100'
                      : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-lg'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-violet-500 to-purple-600">
        <div className="container-custom px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('whisk2capcut_cta_title')}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t('whisk2capcut_cta_subtitle')}
          </p>
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 active:scale-95"
          >
            {t('whisk2capcut_cta_button')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
