'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language, TranslationKey } from '@/lib/i18n';

interface Screenshot {
  alt: string; // a11y label only — actual caption is burned into the image per language
}

// Keep alt order in sync with the captioning scripts:
//   AutoFlowCut/docs/ms-store/screenshots/en/add-captions.cjs
//   AutoFlowCut/docs/ms-store/screenshots/ko/add-captions-v2.cjs
const screenshots: Screenshot[] = [
  { alt: 'CapCut Export' },
  { alt: 'Audio & Video Preview' },
  { alt: 'Multi-track Audio Timeline' },
  { alt: 'Scene Management' },
  { alt: 'Batch Video Generation' },
  { alt: 'Reference System' },
  { alt: 'Auto-Save' },
  { alt: 'Scene Overview' },
  { alt: 'Claude AI Automation' },
  { alt: 'Style Presets' },
];

// Picks the matching language folder; falls back to English for ja/de.
function screenshotSrc(lang: Language, index: number): string {
  const langDir = lang === 'ko' ? 'ko' : 'en';
  return `/images/autoflowcut/screenshots/${langDir}/ss_${String(index + 1).padStart(2, '0')}.jpg`;
}

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
  const currentSrc = screenshotSrc(lang, currentIndex);

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
                src={currentSrc}
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

            {/* Caption is burned into the image per language — no JSX caption to avoid duplication */}

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
            <div className="flex justify-start md:justify-center gap-2 mt-6 overflow-x-auto pb-2 max-w-full">
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
                    src={screenshotSrc(lang, index)}
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
