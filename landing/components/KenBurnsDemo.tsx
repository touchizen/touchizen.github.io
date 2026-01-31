'use client';

import { useState, useEffect } from 'react';

interface KenBurnsDemoProps {
  lang?: 'ko' | 'en' | 'ja' | 'de';
}

type EffectType = 'none' | 'zoomIn' | 'zoomOut' | 'panLeft' | 'panRight' | 'zoomInPanRight';

const effects: { id: EffectType; name: string; nameKo: string }[] = [
  { id: 'none', name: 'No Effect', nameKo: '효과 없음' },
  { id: 'zoomIn', name: 'Zoom In', nameKo: '줌인' },
  { id: 'zoomOut', name: 'Zoom Out', nameKo: '줌아웃' },
  { id: 'panLeft', name: 'Pan Left', nameKo: '왼쪽 패닝' },
  { id: 'panRight', name: 'Pan Right', nameKo: '오른쪽 패닝' },
  { id: 'zoomInPanRight', name: 'Zoom + Pan', nameKo: '줌 + 패닝' },
];

export default function KenBurnsDemo({ lang = 'ko' }: KenBurnsDemoProps) {
  const [activeEffect, setActiveEffect] = useState<EffectType>('zoomIn');
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0); // For animation restart

  // Restart animation when effect changes
  useEffect(() => {
    setKey(k => k + 1);
  }, [activeEffect]);

  // Auto-cycle through effects
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveEffect(current => {
        const currentIndex = effects.findIndex(e => e.id === current);
        const nextIndex = (currentIndex + 1) % effects.length;
        return effects[nextIndex].id;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const getAnimationStyle = (effect: EffectType): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transformOrigin: 'center center',
    };

    switch (effect) {
      case 'zoomIn':
        return {
          ...base,
          animation: 'kenBurnsZoomIn 4s ease-out forwards',
        };
      case 'zoomOut':
        return {
          ...base,
          animation: 'kenBurnsZoomOut 4s ease-out forwards',
        };
      case 'panLeft':
        return {
          ...base,
          animation: 'kenBurnsPanLeft 4s ease-out forwards',
        };
      case 'panRight':
        return {
          ...base,
          animation: 'kenBurnsPanRight 4s ease-out forwards',
        };
      case 'zoomInPanRight':
        return {
          ...base,
          animation: 'kenBurnsZoomInPanRight 4s ease-out forwards',
        };
      default:
        return base;
    }
  };

  return (
    <div className="space-y-6">
      {/* Effect Selector */}
      <div className="flex flex-wrap justify-center gap-2">
        {effects.map(effect => (
          <button
            key={effect.id}
            onClick={() => {
              setActiveEffect(effect.id);
              setIsPlaying(false);
            }}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeEffect === effect.id
                ? 'bg-violet-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {lang === 'ko' ? effect.nameKo : effect.name}
          </button>
        ))}
      </div>

      {/* Demo Container */}
      <div className="relative max-w-2xl mx-auto">
        {/* Side by Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Without Effect */}
          <div className="space-y-2">
            <div className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {lang === 'ko' ? '효과 없음' : 'Without Effect'}
            </div>
            <div
              className="aspect-video rounded-xl overflow-hidden bg-gray-900 border-2 border-gray-700"
            >
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                alt="Mountain landscape"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center text-xs text-gray-400">
              {lang === 'ko' ? '정적인 이미지' : 'Static image'}
            </div>
          </div>

          {/* With Effect */}
          <div className="space-y-2">
            <div className="text-center text-sm font-medium text-violet-500">
              {lang === 'ko' ? effects.find(e => e.id === activeEffect)?.nameKo : effects.find(e => e.id === activeEffect)?.name}
            </div>
            <div
              className="aspect-video rounded-xl overflow-hidden bg-gray-900 border-2 border-violet-500"
            >
              <img
                key={key}
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                alt="Mountain landscape with Ken Burns"
                style={getAnimationStyle(activeEffect)}
              />
            </div>
            <div className="text-center text-xs text-violet-400">
              {lang === 'ko' ? '역동적인 움직임' : 'Dynamic motion'}
            </div>
          </div>
        </div>

        {/* Play/Replay Button */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setKey(k => k + 1)}
            className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-2"
          >
            🔄 {lang === 'ko' ? '다시 재생' : 'Replay'}
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              isPlaying
                ? 'bg-yellow-500 text-yellow-900'
                : 'bg-green-500 text-white'
            }`}
          >
            {isPlaying ? (
              <>⏸️ {lang === 'ko' ? '일시정지' : 'Pause'}</>
            ) : (
              <>▶️ {lang === 'ko' ? '자동 재생' : 'Auto Play'}</>
            )}
          </button>
        </div>
      </div>

      {/* Effect Description */}
      <div className="text-center max-w-xl mx-auto">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {lang === 'ko'
            ? 'Ken Burns 효과는 정적인 이미지에 자연스러운 카메라 움직임을 추가하여 영상에 생동감을 더합니다. CapCut으로 내보낼 때 자동으로 적용됩니다.'
            : 'Ken Burns effect adds natural camera movement to static images, bringing your video to life. Automatically applied when exporting to CapCut.'}
        </p>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes kenBurnsZoomIn {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.3);
          }
        }

        @keyframes kenBurnsZoomOut {
          from {
            transform: scale(1.3);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes kenBurnsPanLeft {
          from {
            transform: scale(1.2) translateX(10%);
          }
          to {
            transform: scale(1.2) translateX(-10%);
          }
        }

        @keyframes kenBurnsPanRight {
          from {
            transform: scale(1.2) translateX(-10%);
          }
          to {
            transform: scale(1.2) translateX(10%);
          }
        }

        @keyframes kenBurnsZoomInPanRight {
          from {
            transform: scale(1) translateX(-5%);
          }
          to {
            transform: scale(1.3) translateX(5%);
          }
        }
      `}</style>
    </div>
  );
}
