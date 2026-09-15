'use client';

import { useCallback, useEffect, useState } from 'react';

import { Language } from '@/lib/i18n';

// 형제 페이지(autoflowcut·whisk2capcut)의 갤러리를 따른다 — 자동 넘김 5초, 좌우 버튼,
// 진행바, `ja/de → en` 폴백. 두 가지만 다르다:
//   1) 이 앱의 스크린샷은 **세로 폰 화면**(1080×2184)이라 16:10 가로 프레임이 안 맞는다.
//   2) autoflowcut 은 자막을 이미지에 **구워** 넣지만 이 스크린샷은 스토어에 올린 원본
//      그대로라 자막이 없다 ⇒ 여기서 JSX 로 낸다.
// 문구는 i18n 키가 아니라 **이 페이지 자신의 관례**(`COPY: Record<Language, …>`)를 따른다 —
// page.tsx 가 이미 그렇게 쓴다.

const SHOT_COUNT = 8;

/** 한국어 화면은 ko, 나머지(en·ja·de)는 영어 화면을 쓴다 — 앱이 지원하는 언어가 둘이다. */
function screenshotSrc(lang: Language, index: number): string {
  const dir = lang === 'ko' ? 'ko' : 'en';
  return `/images/mathshorts/screenshots/${dir}/ss_${String(index + 1).padStart(2, '0')}.jpg`;
}

type Copy = { badge: string; title: string; desc: string; captions: string[] };

const COPY: Record<Language, Copy> = {
  ko: {
    badge: '화면 미리보기',
    title: '앱에서 실제로 보이는 화면',
    desc: '스토어에 올린 그대로입니다. 폰에서 찍었습니다.',
    captions: [
      '구를 3차원으로 — 가까운 쪽이 밝고, 앞선이 지나는 자리에서 뒷선이 끊깁니다',
      '푼 과정이 그대로 영상이 됩니다 — 단계마다 한 줄씩',
      '자기장이 궤도를 나선으로 감는 모습도 3차원으로',
      '단계별 풀이와 답을 먼저 보고, 영상으로 만들지 고릅니다',
      '풀이 영상과 공식 영상 — 무엇이 다른지 앱이 설명합니다',
      '사진을 찍거나, 갤러리에서 고르거나, 수식을 직접 입력하거나',
      '만들기 전에 미리 봅니다. 크레딧은 확인한 뒤에 쓰입니다',
      '테마 세 가지와 등장 모션 두 가지 중에서 고릅니다',
    ],
  },
  en: {
    badge: 'Screens',
    title: 'What the app actually looks like',
    desc: 'The same shots as the store listing, taken on a phone.',
    captions: [
      'A sphere in three dimensions — the near side brighter, back strands breaking where the front ones cross',
      'The working becomes the video, one step at a time',
      'A magnetic field winding a path into a helix, also in 3D',
      'Read the steps and the answer first, then decide whether to make a video',
      'Solution videos and formula videos — the app explains the difference',
      'Take a photo, pick one from the gallery, or type the expression',
      'Preview before you spend. Credits are used after you have seen it',
      'Three themes and two entrance motions to choose from',
    ],
  },
  ja: {
    badge: '画面プレビュー',
    title: 'アプリの実際の画面',
    desc: 'ストア掲載と同じもので、実機で撮影しています。',
    captions: [
      '球を3次元で — 手前は明るく、前の線が通る所で後ろの線が途切れます',
      '解いた手順がそのまま動画になります',
      '磁場が軌道を螺旋に巻く様子も3次元で',
      '手順と答えを先に見てから、動画にするか決めます',
      '解説動画と数式動画 — 違いをアプリが説明します',
      '撮る、ギャラリーから選ぶ、数式を入力する',
      'つくる前にプレビュー。クレジットは確認したあとに使われます',
      'テーマ3種類と登場モーション2種類から選べます',
    ],
  },
  de: {
    badge: 'Bildschirme',
    title: 'So sieht die App wirklich aus',
    desc: 'Dieselben Aufnahmen wie im Store, auf einem Telefon gemacht.',
    captions: [
      'Eine Kugel in drei Dimensionen — die nahe Seite heller, hintere Linien brechen an den vorderen',
      'Der Lösungsweg wird zum Video, Schritt für Schritt',
      'Ein Magnetfeld, das eine Bahn zur Helix windet — ebenfalls in 3D',
      'Erst die Schritte und die Antwort lesen, dann über das Video entscheiden',
      'Lösungs- und Formelvideos — die App erklärt den Unterschied',
      'Fotografieren, aus der Galerie wählen oder den Ausdruck tippen',
      'Vorschau, bevor Sie zahlen. Credits werden erst danach verbraucht',
      'Drei Themes und zwei Einblendungen zur Auswahl',
    ],
  },
};

export default function ScreenshotGallerySection({ lang }: { lang: Language }) {
  const copy = COPY[lang] ?? COPY.en;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === SHOT_COUNT - 1 ? 0 : prev + 1));
    setProgress(0);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? SHOT_COUNT - 1 : prev - 1));
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

  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
              <span>&#x1F4F1;</span>
              {copy.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                {copy.title}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{copy.desc}</p>
          </div>

          <div className="relative">
            <div
              className="relative flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 py-6"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* 세로 폰 화면이라 높이를 고정하고 가운데에 둔다 — 가로 프레임은 안 맞는다. */}
              <img
                src={screenshotSrc(lang, currentIndex)}
                alt={copy.captions[currentIndex]}
                className="h-[420px] md:h-[560px] w-auto rounded-xl shadow-xl"
              />

              <button
                onClick={goToPrevious}
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label="Previous"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label="Next"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="absolute bottom-3 right-4 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
                {currentIndex + 1} / {SHOT_COUNT}
              </div>
            </div>

            <p className="mt-5 text-center text-gray-700 dark:text-gray-300 min-h-[3rem] px-4">
              {copy.captions[currentIndex]}
            </p>

            <div className="mt-2 max-w-md mx-auto">
              <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 flex justify-center gap-2">
                {Array.from({ length: SHOT_COUNT }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrentIndex(i); setProgress(0); }}
                    className={`h-2 rounded-full transition-all ${
                      i === currentIndex ? 'w-6 bg-violet-500' : 'w-2 bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
