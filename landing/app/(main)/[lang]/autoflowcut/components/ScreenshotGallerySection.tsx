'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language, TranslationKey } from '@/lib/i18n';

interface Screenshot {
  src: string;
  alt: string;
  caption: {
    en: string;
    ko: string;
    ja: string;
    de: string;
  };
}

const screenshots: Screenshot[] = [
  {
    src: '/images/autoflowcut/screenshots/ss_01.jpg',
    alt: 'CapCut Export',
    caption: {
      en: 'One-click export to CapCut — your scenes become a ready-to-edit video project',
      ko: '원클릭 CapCut 내보내기 — 씬이 바로 편집 가능한 영상 프로젝트로',
      ja: 'ワンクリックでCapCutにエクスポート — シーンがすぐに編集可能な映像プロジェクトに',
      de: 'Ein-Klick-Export zu CapCut — Szenen werden zum fertigen Videoprojekt',
    },
  },
  {
    src: '/images/autoflowcut/screenshots/ss_02.jpg',
    alt: 'Audio & Video Preview',
    caption: {
      en: 'Built-in audio & video preview with timeline for precise editing',
      ko: '타임라인 기반 오디오 & 비디오 미리보기',
      ja: 'タイムライン付きオーディオ＆ビデオプレビューで正確な編集',
      de: 'Integrierte Audio- & Videovorschau mit Timeline für präzises Editing',
    },
  },
  {
    src: '/images/autoflowcut/screenshots/ss_03.jpg',
    alt: 'Scene Management',
    caption: {
      en: 'Manage scenes with subtitles, timecodes, and media in one unified view',
      ko: '자막, 타임코드, 미디어를 한 화면에서 씬 관리',
      ja: '字幕、タイムコード、メディアを一つの画面でシーン管理',
      de: 'Szenen mit Untertiteln, Timecodes und Medien in einer Ansicht verwalten',
    },
  },
  {
    src: '/images/autoflowcut/screenshots/ss_04.jpg',
    alt: 'Batch Video Generation',
    caption: {
      en: 'AI-powered batch video generation — bring every scene to life with F2V',
      ko: 'AI 기반 배치 영상 생성 — F2V로 모든 씬을 영상으로',
      ja: 'AI搭載バッチ動画生成 — F2Vですべてのシーンを映像化',
      de: 'KI-gestützte Batch-Videogenerierung — jede Szene mit F2V zum Leben erwecken',
    },
  },
  {
    src: '/images/autoflowcut/screenshots/ss_05.jpg',
    alt: 'Reference System',
    caption: {
      en: 'Reference image system for consistent character visuals across scenes',
      ko: '레퍼런스 이미지로 캐릭터 비주얼 일관성 유지',
      ja: 'リファレンス画像システムでシーン間のキャラクタービジュアルを一貫維持',
      de: 'Referenzbildsystem für konsistente Charaktervisualisierung über Szenen hinweg',
    },
  },
  {
    src: '/images/autoflowcut/screenshots/ss_06.jpg',
    alt: 'Auto-Save',
    caption: {
      en: 'All generated images and videos are auto-saved to your PC',
      ko: '생성된 모든 이미지와 영상이 내 PC에 자동 저장',
      ja: '生成されたすべての画像と動画がPCに自動保存',
      de: 'Alle generierten Bilder und Videos werden automatisch auf dem PC gespeichert',
    },
  },
  {
    src: '/images/autoflowcut/screenshots/ss_07.jpg',
    alt: 'Scene Overview',
    caption: {
      en: 'Full scene overview with AI-generated images and detailed prompts',
      ko: 'AI 생성 이미지와 프롬프트를 한눈에 확인',
      ja: 'AI生成画像と詳細プロンプトのフルシーン概要',
      de: 'Komplette Szenenübersicht mit KI-generierten Bildern und detaillierten Prompts',
    },
  },
  {
    src: '/images/autoflowcut/screenshots/ss_08.jpg',
    alt: 'MCP Integration',
    caption: {
      en: 'MCP server integration — connect Claude AI for automated workflows',
      ko: 'MCP 서버 연동 — Claude AI로 워크플로우 자동화',
      ja: 'MCPサーバー連携 — Claude AIでワークフロー自動化',
      de: 'MCP-Server-Integration — Claude AI für automatisierte Workflows verbinden',
    },
  },
  {
    src: '/images/autoflowcut/screenshots/ss_09.jpg',
    alt: 'Claude AI Automation',
    caption: {
      en: 'Claude AI assistant automates scene creation and CapCut export',
      ko: 'Claude AI가 씬 생성부터 CapCut 내보내기까지 자동화',
      ja: 'Claude AIアシスタントがシーン作成からCapCutエクスポートまで自動化',
      de: 'Claude AI-Assistent automatisiert Szenenerstellung und CapCut-Export',
    },
  },
  {
    src: '/images/autoflowcut/screenshots/ss_10.jpg',
    alt: 'Style Presets',
    caption: {
      en: '80+ art style presets — from animation to cinematic photography',
      ko: '80가지 이상의 아트 스타일 프리셋 제공',
      ja: '80種以上のアートスタイルプリセット — アニメから映画写真まで',
      de: '80+ Kunst-Stil-Voreinstellungen — von Animation bis Filmfotografie',
    },
  },
];

export default function ScreenshotGallerySection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
    setProgress(0);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => { goToNext(); }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  useEffect(() => {
    if (isPaused) return;
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);
    return () => clearInterval(progressInterval);
  }, [isPaused, currentIndex]);

  const current = screenshots[currentIndex];

  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-4">
              <span>&#x1F4F8;</span>
              {t('autoflowcut_screenshot_badge' as TranslationKey)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {t('autoflowcut_screenshot_title' as TranslationKey)}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('autoflowcut_screenshot_desc' as TranslationKey)}
            </p>
          </div>

          <div className="relative">
            {/* Main Image */}
            <div
              className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <img
                src={current.src}
                alt={current.alt}
                className="w-full h-full object-contain"
              />

              {/* Nav Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-900 transition-colors"
                aria-label="Previous"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-900 transition-colors"
                aria-label="Next"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
                {currentIndex + 1} / {screenshots.length}
              </div>
            </div>

            {/* Caption */}
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 mt-4">
              {current.caption[lang]}
            </p>

            {/* Progress Bar */}
            <div className="mt-4 max-w-md mx-auto">
              <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'bg-cyan-500'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex justify-center gap-2 mt-6 overflow-x-auto pb-2">
              {screenshots.map((screenshot, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-cyan-500 ring-2 ring-cyan-500/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
