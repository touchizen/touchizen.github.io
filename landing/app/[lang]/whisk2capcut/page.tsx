'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Language, languages, translations, TranslationKey } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PluginMockup from '@/components/PluginMockup';
import WorkflowDemo from '@/components/WorkflowDemo';
import KenBurnsDemo from '@/components/KenBurnsDemo';
import CapCutTimeline from '@/components/CapCutTimeline';
import ScreenshotCarousel from '@/components/ScreenshotCarousel';

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
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;

  // Validate lang parameter
  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';

  const t = (key: TranslationKey) => translations[lang][key];

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}/whisk2capcut`);
  };

  const features = [
    { title: 'whisk2capcut_feat1_title', desc: 'whisk2capcut_feat1_desc', icon: '🎨' },
    { title: 'whisk2capcut_feat2_title', desc: 'whisk2capcut_feat2_desc', icon: '📦' },
    { title: 'whisk2capcut_feat3_title', desc: 'whisk2capcut_feat3_desc', icon: '🎬' },
    { title: 'whisk2capcut_feat4_title', desc: 'whisk2capcut_feat4_desc', icon: '💬' },
    { title: 'whisk2capcut_feat5_title', desc: 'whisk2capcut_feat5_desc', icon: '🖼️' },
    { title: 'whisk2capcut_feat6_title', desc: 'whisk2capcut_feat6_desc', icon: '📄' },
    { title: 'whisk2capcut_feat7_title', desc: 'whisk2capcut_feat7_desc', icon: '💾' },
    { title: 'whisk2capcut_feat8_title', desc: 'whisk2capcut_feat8_desc', icon: '🏷️' },
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
      <Header lang={lang} onLanguageChange={handleLanguageChange} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-700 dark:text-violet-300 text-sm font-medium mb-6">
                <img src="/images/whisk2capcut.svg" alt="Whisk2CapCut" className="w-6 h-6 rounded" />
                Chrome Extension
              </div>
              <div className="flex items-center gap-6 mb-4">
                <img src="/images/whisk2capcut.svg" alt="Whisk2CapCut" className="w-20 h-20 md:w-24 md:h-24 rounded-2xl" />
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                      {t('whisk2capcut_hero_title')}
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl font-bold text-green-500 dark:text-green-400">
                    {t('whisk2capcut_hero_slogan')}
                  </p>
                </div>
              </div>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4">
                {t('whisk2capcut_hero_subtitle')}
              </p>

              {/* Target Copy - Workflow Summary */}
              <div className="mb-8 p-4 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl border border-violet-200 dark:border-violet-800">
                <p className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">
                  {t('whisk2capcut_hero_target' as TranslationKey)}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://chromewebstore.google.com/detail/whisk2capcut/bipgbkcmomdhfclabgdgepdhdfekcldl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-lg"
                >
                  {t('whisk2capcut_hero_cta')}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a href="#desktop" className="btn-secondary text-lg">
                  {t('whisk2capcut_hero_cta_desktop' as TranslationKey)}
                </a>
                <a href="#pricing" className="btn-secondary text-lg">
                  {t('whisk2capcut_hero_cta_secondary')}
                </a>
              </div>
            </div>

            {/* Right: Plugin Mockup */}
            <div className="hidden lg:block">
              <PluginMockup lang={lang} variant="generating" />
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Gallery Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {lang === 'ko' ? '스크린샷' : lang === 'ja' ? 'スクリーンショット' : lang === 'de' ? 'Screenshots' : 'Screenshots'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">
                  {lang === 'ko' ? '플러그인 미리보기' : lang === 'ja' ? 'プラグインプレビュー' : lang === 'de' ? 'Plugin-Vorschau' : 'Plugin Preview'}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? '실제 플러그인 화면을 확인해보세요' : lang === 'ja' ? '実際のプラグイン画面をご覧ください' : lang === 'de' ? 'Sehen Sie sich die tatsächlichen Plugin-Bildschirme an' : 'See the actual plugin screens'}
              </p>
            </div>

            <ScreenshotCarousel lang={lang} />
          </div>
        </div>
      </section>

      {/* Demo Video Section - TODO: Add YouTube video */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-700 dark:text-red-300 text-sm font-medium mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                {lang === 'ko' ? '데모 영상' : lang === 'ja' ? 'デモ動画' : lang === 'de' ? 'Demo-Video' : 'Demo Video'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">
                  {lang === 'ko' ? '1분 만에 이해하기' : lang === 'ja' ? '1分で理解する' : lang === 'de' ? 'In 1 Minute verstehen' : 'Understand in 1 Minute'}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? '실제 사용 과정을 영상으로 확인하세요' : lang === 'ja' ? '実際の使用プロセスを動画でご確認ください' : lang === 'de' ? 'Sehen Sie den tatsächlichen Nutzungsprozess im Video' : 'Watch the actual usage process in the video'}
              </p>
            </div>

            {/* YouTube Video Placeholder - Replace YOUTUBE_VIDEO_ID with actual ID */}
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700">
              {/* TODO: Replace this placeholder with actual YouTube embed */}
              {/*
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/YOUTUBE_VIDEO_ID"
                title="Whisk2CapCut Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              */}

              {/* Placeholder UI */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                <svg className="w-20 h-20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <p className="text-lg font-medium">
                  {lang === 'ko' ? '데모 영상 준비 중...' : lang === 'ja' ? 'デモ動画準備中...' : lang === 'de' ? 'Demo-Video wird vorbereitet...' : 'Demo video coming soon...'}
                </p>
                <p className="text-sm mt-2">
                  {lang === 'ko' ? 'YouTube 영상 ID를 여기에 추가하세요' : lang === 'ja' ? 'ここにYouTube動画IDを追加' : lang === 'de' ? 'YouTube-Video-ID hier hinzufügen' : 'Add YouTube video ID here'}
                </p>
              </div>
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

      {/* Google Whisk Introduction */}
      <section className="section-padding">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google Labs
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">{t('whisk_intro_title')}</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t('whisk_intro_desc')}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🖼️</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  {t('whisk_intro_feature1_title')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('whisk_intro_feature1_desc')}
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  {t('whisk_intro_feature2_title')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('whisk_intro_feature2_desc')}
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🆓</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  {t('whisk_intro_feature3_title')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('whisk_intro_feature3_desc')}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <a
                href="https://labs.google/whisk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
              >
                {t('whisk_intro_cta')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
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

      {/* Who Is This For Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="gradient-text">{t('whisk2capcut_audience_title')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
            {[
              { emoji: '📹', title: t('whisk2capcut_audience_1_title'), desc: t('whisk2capcut_audience_1_desc') },
              { emoji: '📖', title: t('whisk2capcut_audience_2_title'), desc: t('whisk2capcut_audience_2_desc') },
              { emoji: '🎬', title: t('whisk2capcut_audience_3_title'), desc: t('whisk2capcut_audience_3_desc') },
              { emoji: '📚', title: t('whisk2capcut_audience_4_title'), desc: t('whisk2capcut_audience_4_desc') },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 card-hover">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Interactive Demo */}
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

            {/* Ken Burns Effect - Interactive Demo */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">🎬</span>
                {t('kenburns_title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('kenburns_desc')}
              </p>

              {/* Interactive Ken Burns Demo */}
              <KenBurnsDemo lang={lang} />

              {/* Modes - collapsed info */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {/* Windows - 3 paths */}
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🪟</span>
                    <div className="flex-1 space-y-2">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Windows</div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">CapCut ({lang === 'ko' ? '기본' : 'Default'})</span>
                        <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 px-3 py-2 rounded-lg font-mono overflow-x-auto mt-1">
                          C:\Users\[{lang === 'ko' ? '사용자명' : 'Username'}]\AppData\Local\CapCut\User Data\Projects\com.lveditor.draft\
                        </code>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">CapCut Pro</span>
                        <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 px-3 py-2 rounded-lg font-mono overflow-x-auto mt-1">
                          C:\Users\[{lang === 'ko' ? '사용자명' : 'Username'}]\AppData\Local\CapCutPro\User Data\Projects\com.lveditor.draft\
                        </code>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Documents</span>
                        <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 px-3 py-2 rounded-lg font-mono overflow-x-auto mt-1">
                          C:\Users\[{lang === 'ko' ? '사용자명' : 'Username'}]\Documents\CapCut\Projects\
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
                  {lang === 'ko'
                    ? '💡 확장 프로그램에서 프리셋(CapCut / CapCut Pro / Documents)을 선택하면 경로가 자동 생성됩니다.'
                    : '💡 Select a preset (CapCut / CapCut Pro / Documents) in the extension to auto-generate the path.'}
                </p>
              </div>

              <div className="space-y-4 mb-6">
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

              {/* Detailed Guide Link */}
              <a
                href={`/guide/${lang}/whisk2capcut/`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-lg font-medium text-sm hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {lang === 'ko' ? '자세한 가이드 보기' : lang === 'ja' ? '詳細ガイドを見る' : lang === 'de' ? 'Ausführliche Anleitung' : 'View Detailed Guide'}
              </a>
            </div>

            {/* CapCut Preview - Interactive Timeline */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">🎥</span>
                {lang === 'ko' ? 'CapCut에서 보이는 모습' : 'Preview in CapCut'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {lang === 'ko'
                  ? '내보낸 프로젝트를 CapCut에서 열면 이런 모습입니다. 이미지, 자막, 애니메이션이 모두 타임라인에 배치됩니다.'
                  : 'This is how your exported project looks in CapCut. Images, subtitles, and animations are all placed on the timeline.'}
              </p>
              <CapCutTimeline lang={lang} />
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

      {/* Desktop App Section */}
      <section id="desktop" className="section-padding bg-gradient-to-br from-slate-900 to-gray-900">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 rounded-full text-violet-300 text-sm font-medium mb-4">
              💻 {t('whisk2capcut_desktop_badge' as TranslationKey)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {t('whisk2capcut_desktop_title' as TranslationKey)}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('whisk2capcut_desktop_subtitle' as TranslationKey)}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Features */}
              <div className="space-y-4">
                {(['whisk2capcut_desktop_feat1', 'whisk2capcut_desktop_feat2', 'whisk2capcut_desktop_feat3', 'whisk2capcut_desktop_feat4'] as TranslationKey[]).map((key, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-green-400 text-lg mt-0.5">✓</span>
                    <span className="text-gray-200">{t(key)}</span>
                  </div>
                ))}
              </div>

              {/* Download buttons */}
              <div className="flex flex-col justify-center gap-4">
                <a
                  href="https://github.com/touchizen/whisk2capcut-desktop/releases/latest/download/Whisk2CapCut.Setup.1.0.0.exe"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <span className="text-2xl">🪟</span>
                  {t('whisk2capcut_desktop_dl_win' as TranslationKey)}
                </a>
                <a
                  href="https://github.com/touchizen/whisk2capcut-desktop/releases/latest/download/Whisk2CapCut-1.0.0-arm64.dmg"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-500/25"
                >
                  <span className="text-2xl">🍎</span>
                  {t('whisk2capcut_desktop_dl_mac' as TranslationKey)}
                </a>
                <a
                  href="https://github.com/touchizen/whisk2capcut-desktop/releases/tag/v1.0.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-violet-400 hover:text-violet-300 text-sm underline underline-offset-4"
                >
                  {t('whisk2capcut_desktop_dl_all' as TranslationKey)}
                </a>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm">
              {t('whisk2capcut_desktop_version' as TranslationKey)}
            </p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
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

          {/* Feature Comparison Table */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              {lang === 'ko' ? '기능 비교' : lang === 'ja' ? '機能比較' : lang === 'de' ? 'Funktionsvergleich' : 'Feature Comparison'}
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      {lang === 'ko' ? '기능' : lang === 'ja' ? '機能' : lang === 'de' ? 'Funktion' : 'Feature'}
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      <div>{lang === 'ko' ? '무료' : lang === 'ja' ? '無料' : lang === 'de' ? 'Kostenlos' : 'Free'}</div>
                      <div className="text-xs font-normal text-gray-500">$0</div>
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-violet-600 dark:text-violet-400">
                      <div>Pro ({lang === 'ko' ? '월간' : lang === 'ja' ? '月額' : lang === 'de' ? 'Monat' : 'Monthly'})</div>
                      <div className="text-xs font-normal">$4.99/{lang === 'ko' ? '월' : lang === 'ja' ? '月' : lang === 'de' ? 'Mo' : 'mo'}</div>
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20">
                      <div>Pro ({lang === 'ko' ? '연간' : lang === 'ja' ? '年額' : lang === 'de' ? 'Jahr' : 'Yearly'})</div>
                      <div className="text-xs font-normal">$39.99/{lang === 'ko' ? '년' : lang === 'ja' ? '年' : lang === 'de' ? 'Jahr' : 'yr'}</div>
                      <div className="text-xs text-green-500 font-semibold">{lang === 'ko' ? '33% 할인' : lang === 'ja' ? '33%オフ' : lang === 'de' ? '33% Rabatt' : '33% OFF'}</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {lang === 'ko' ? 'Whisk 대량 이미지 생성 및 자동저장' : lang === 'ja' ? 'Whisk一括画像生成と自動保存' : lang === 'de' ? 'Whisk Massenbildgenerierung & Auto-Speichern' : 'Whisk Bulk Image Generation & Auto-Save'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-green-500 font-semibold text-sm">
                        {lang === 'ko' ? '무제한' : lang === 'ja' ? '無制限' : lang === 'de' ? 'Unbegrenzt' : 'Unlimited'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-green-500 font-semibold text-sm">
                        {lang === 'ko' ? '무제한' : lang === 'ja' ? '無制限' : lang === 'de' ? 'Unbegrenzt' : 'Unlimited'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center bg-violet-50/50 dark:bg-violet-900/10">
                      <span className="text-green-500 font-semibold text-sm">
                        {lang === 'ko' ? '무제한' : lang === 'ja' ? '無制限' : lang === 'de' ? 'Unbegrenzt' : 'Unlimited'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {lang === 'ko' ? 'CapCut 내보내기' : lang === 'ja' ? 'CapCutエクスポート' : lang === 'de' ? 'CapCut Export' : 'CapCut Export'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-orange-500 font-semibold text-sm">
                        {lang === 'ko' ? '5회/7일' : lang === 'ja' ? '5回/7日' : lang === 'de' ? '5x/7 Tage' : '5x/7 days'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-green-500 font-semibold text-sm">
                        {lang === 'ko' ? '무제한' : lang === 'ja' ? '無制限' : lang === 'de' ? 'Unbegrenzt' : 'Unlimited'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center bg-violet-50/50 dark:bg-violet-900/10">
                      <span className="text-green-500 font-semibold text-sm">
                        {lang === 'ko' ? '무제한' : lang === 'ja' ? '無制限' : lang === 'de' ? 'Unbegrenzt' : 'Unlimited'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {lang === 'ko' ? 'Ken Burns 효과' : lang === 'ja' ? 'Ken Burnsエフェクト' : lang === 'de' ? 'Ken Burns Effekt' : 'Ken Burns Effect'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center bg-violet-50/50 dark:bg-violet-900/10">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {lang === 'ko' ? '자막 자동 삽입' : lang === 'ja' ? '字幕自動挿入' : lang === 'de' ? 'Automatische Untertitel' : 'Auto Subtitle Insertion'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center bg-violet-50/50 dark:bg-violet-900/10">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {lang === 'ko' ? '우선 지원' : lang === 'ja' ? '優先サポート' : lang === 'de' ? 'Prioritäts-Support' : 'Priority Support'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center bg-violet-50/50 dark:bg-violet-900/10">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-t-2 border-violet-200 dark:border-violet-800">
                    <td className="px-4 py-5 text-sm font-bold text-gray-900 dark:text-white">
                      {lang === 'ko' ? '가격' : lang === 'ja' ? '価格' : lang === 'de' ? 'Preis' : 'Price'}
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">$0</div>
                      <div className="text-xs text-gray-500">{lang === 'ko' ? '영구 무료' : lang === 'ja' ? '永久無料' : lang === 'de' ? 'Für immer kostenlos' : 'Free forever'}</div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">$4.99</div>
                      <div className="text-xs text-gray-500">/{lang === 'ko' ? '월' : lang === 'ja' ? '月' : lang === 'de' ? 'Monat' : 'month'}</div>
                    </td>
                    <td className="px-4 py-5 text-center bg-violet-100/50 dark:bg-violet-900/30">
                      <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">$39.99</div>
                      <div className="text-xs text-gray-500">/{lang === 'ko' ? '년' : lang === 'ja' ? '年' : lang === 'de' ? 'Jahr' : 'year'}</div>
                      <div className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">
                        {lang === 'ko' ? '월 $3.33 (33% 할인)' : lang === 'ja' ? '月額$3.33 (33%オフ)' : lang === 'de' ? '$3.33/Monat (33% Rabatt)' : '$3.33/month (33% OFF)'}
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Safety Section */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900/50 dark:to-gray-900/50">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              🔒
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('privacy_safety_title')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t('privacy_safety_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {t('privacy_safety_feature1_title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('privacy_safety_feature1_desc')}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {t('privacy_safety_feature2_title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('privacy_safety_feature2_desc')}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {t('privacy_safety_feature3_title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('privacy_safety_feature3_desc')}
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {t('privacy_safety_feature4_title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('privacy_safety_feature4_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('faq_title')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('faq_subtitle')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'faq_q1', a: 'faq_a1' },
              { q: 'faq_q2', a: 'faq_a2' },
              { q: 'faq_q3', a: 'faq_a3' },
              { q: 'faq_q4', a: 'faq_a4' },
              { q: 'faq_q5', a: 'faq_a5' },
              { q: 'faq_q6', a: 'faq_a6' },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-gray-900 dark:text-white pr-4">
                    {t(faq.q as TranslationKey)}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                  {t(faq.a as TranslationKey)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            <span className="gradient-text">{t('trust_title' as TranslationKey)}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Local Processing */}
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {t('trust_data_title' as TranslationKey)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('trust_data_desc' as TranslationKey)}
              </p>
            </div>

            {/* Independent Tool */}
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {t('trust_affiliate_title' as TranslationKey)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('trust_affiliate_desc' as TranslationKey)}
              </p>
            </div>

            {/* Secure Payments */}
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                {t('trust_secure_title' as TranslationKey)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('trust_secure_desc' as TranslationKey)}
              </p>
            </div>
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
            href="https://chromewebstore.google.com/detail/whisk2capcut/bipgbkcmomdhfclabgdgepdhdfekcldl"
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
