'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language } from '@/lib/i18n';

interface Screenshot {
  src: {
    en: string;
    ko: string;
    ja: string;
    de: string;
  };
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
    src: {
      en: '/images/thumbnails/whisk2capcut/thumbnail_1_en.png',
      ko: '/images/thumbnails/whisk2capcut/thumbnail_1_ko.png',
      ja: '/images/thumbnails/whisk2capcut/thumbnail_1_ja.png',
      de: '/images/thumbnails/whisk2capcut/thumbnail_1_de.png',
    },
    alt: 'One Click Automation',
    caption: {
      en: 'Whisk → CapCut in one click',
      ko: 'Whisk → CapCut 원클릭 자동화',
      ja: 'Whisk → CapCut ワンクリック自動化',
      de: 'Whisk → CapCut mit einem Klick',
    },
  },
  {
    src: {
      en: '/images/thumbnails/whisk2capcut/thumbnail_2_en.png',
      ko: '/images/thumbnails/whisk2capcut/thumbnail_2_ko.png',
      ja: '/images/thumbnails/whisk2capcut/thumbnail_2_ja.png',
      de: '/images/thumbnails/whisk2capcut/thumbnail_2_de.png',
    },
    alt: 'Before and After',
    caption: {
      en: 'Hours of manual work → automated in one click',
      ko: '수 시간 수작업 → 원클릭 자동화',
      ja: '何時間もの手作業 → ワンクリックで自動化',
      de: 'Stunden manueller Arbeit → automatisiert mit einem Klick',
    },
  },
  {
    src: {
      en: '/images/thumbnails/whisk2capcut/thumbnail_3_en.png',
      ko: '/images/thumbnails/whisk2capcut/thumbnail_3_ko.png',
      ja: '/images/thumbnails/whisk2capcut/thumbnail_3_ja.png',
      de: '/images/thumbnails/whisk2capcut/thumbnail_3_de.png',
    },
    alt: 'How It Works',
    caption: {
      en: 'Prompt → AI Generate → Video Project',
      ko: '프롬프트 → AI 생성 → 영상 프로젝트',
      ja: 'プロンプト → AI生成 → 動画プロジェクト',
      de: 'Prompt → KI-Generierung → Video-Projekt',
    },
  },
  {
    src: {
      en: '/images/thumbnails/whisk2capcut/thumbnail_4_en.png',
      ko: '/images/thumbnails/whisk2capcut/thumbnail_4_ko.png',
      ja: '/images/thumbnails/whisk2capcut/thumbnail_4_ja.png',
      de: '/images/thumbnails/whisk2capcut/thumbnail_4_de.png',
    },
    alt: 'Visual Consistency',
    caption: {
      en: 'Visual consistency by tag matching',
      ko: '태그 매칭에 의한 비주얼 일관성',
      ja: 'タグマッチングによるビジュアル一貫性',
      de: 'Visuelle Konsistenz durch Tag-Matching',
    },
  },
  {
    src: {
      en: '/images/thumbnails/whisk2capcut/thumbnail_5_en.png',
      ko: '/images/thumbnails/whisk2capcut/thumbnail_5_ko.png',
      ja: '/images/thumbnails/whisk2capcut/thumbnail_5_ja.png',
      de: '/images/thumbnails/whisk2capcut/thumbnail_5_de.png',
    },
    alt: 'Work Less Create More',
    caption: {
      en: 'Work less, create more',
      ko: '덜 일하고, 더 창조하자',
      ja: '少ない作業で、もっと創造を',
      de: 'Weniger arbeiten, mehr kreieren',
    },
  },
];

interface ScreenshotCarouselProps {
  lang: Language;
}

export default function ScreenshotCarousel({ lang }: ScreenshotCarouselProps) {
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

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  // Progress bar update every 100ms
  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPaused, currentIndex]);

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
          src={currentScreenshot.src[lang]}
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

      {/* Progress Bar */}
      <div className="mt-4 max-w-md mx-auto">
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 transition-all duration-100 ease-linear"
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
              src={screenshot.src[lang]}
              alt={screenshot.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
