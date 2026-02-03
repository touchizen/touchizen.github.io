'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language } from '@/lib/i18n';

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
    src: '/images/screenshots/whisk2capcut/01_CapCutScreen_en.png',
    alt: 'CapCut Screen',
    caption: {
      en: 'Works seamlessly within CapCut',
      ko: 'CapCut 내에서 원활하게 작동',
      ja: 'CapCut内でシームレスに動作',
      de: 'Funktioniert nahtlos in CapCut',
    },
  },
  {
    src: '/images/screenshots/whisk2capcut/02_PrmoptInput.png',
    alt: 'Prompt Input',
    caption: {
      en: 'Enter your creative prompts',
      ko: '창의적인 프롬프트 입력',
      ja: 'クリエイティブなプロンプトを入力',
      de: 'Geben Sie Ihre kreativen Prompts ein',
    },
  },
  {
    src: '/images/screenshots/whisk2capcut/03_References_and_Scene3.png',
    alt: 'References and Scenes',
    caption: {
      en: 'Manage references and scenes',
      ko: '레퍼런스와 씬 관리',
      ja: 'リファレンスとシーンを管理',
      de: 'Verwalten Sie Referenzen und Szenen',
    },
  },
  {
    src: '/images/screenshots/whisk2capcut/04_ExportModal.png',
    alt: 'Export Modal',
    caption: {
      en: 'Export to CapCut project',
      ko: 'CapCut 프로젝트로 내보내기',
      ja: 'CapCutプロジェクトにエクスポート',
      de: 'Als CapCut-Projekt exportieren',
    },
  },
  {
    src: '/images/screenshots/whisk2capcut/05_SettingsModal.png',
    alt: 'Settings Modal',
    caption: {
      en: 'Customize your settings',
      ko: '설정 커스터마이즈',
      ja: '設定をカスタマイズ',
      de: 'Passen Sie Ihre Einstellungen an',
    },
  },
];

interface ScreenshotCarouselProps {
  lang: Language;
}

export default function ScreenshotCarousel({ lang }: ScreenshotCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const currentScreenshot = screenshots[currentIndex];

  return (
    <div className="relative">
      {/* Main Image Container */}
      <div
        className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={currentScreenshot.src}
          alt={currentScreenshot.alt}
          className="w-full h-full object-contain"
        />

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-900 transition-colors"
          aria-label="Previous screenshot"
        >
          <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-900 transition-colors"
          aria-label="Next screenshot"
        >
          <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
          {currentIndex + 1} / {screenshots.length}
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-lg text-gray-600 dark:text-gray-400 mt-4">
        {currentScreenshot.caption[lang]}
      </p>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-violet-500'
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
                ? 'border-violet-500 ring-2 ring-violet-500/30'
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
  );
}
