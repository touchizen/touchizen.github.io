'use client';

import { useState, useEffect } from 'react';

const colors = {
  bg: '#1a202c',
  bgSecondary: '#2d3748',
  text: '#e2e8f0',
  textSecondary: '#a0aec0',
  primary: '#4299e1',
  success: '#48bb78',
  warning: '#ecc94b',
  error: '#f56565',
  border: '#4a5568',
};

interface WorkflowDemoProps {
  lang?: 'ko' | 'en' | 'ja' | 'de';
}

export default function WorkflowDemo({ lang = 'ko' }: WorkflowDemoProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const getText = (ko: string, en: string, ja?: string, de?: string) => {
    if (lang === 'ko') return ko;
    if (lang === 'ja') return ja || en;
    if (lang === 'de') return de || en;
    return en;
  };

  const steps = [
    {
      id: 0,
      title: getText('1. 프롬프트 입력', '1. Enter Prompts', '1. プロンプト入力', '1. Prompts eingeben'),
      desc: getText('장면 설명을 한 줄씩 입력하세요', 'Enter scene descriptions line by line', 'シーンの説明を1行ずつ入力', 'Szenenbeschreibungen eingeben'),
    },
    {
      id: 1,
      title: getText('2. 이미지 생성', '2. Generate Images', '2. 画像生成', '2. Bilder generieren'),
      desc: getText('AI가 각 장면의 이미지를 생성합니다', 'AI generates images for each scene', 'AIが各シーンの画像を生成', 'KI generiert Bilder für jede Szene'),
    },
    {
      id: 2,
      title: getText('3. CapCut 내보내기', '3. Export to CapCut', '3. CapCutへエクスポート', '3. Nach CapCut exportieren'),
      desc: getText('완성된 프로젝트를 내보냅니다', 'Export completed project', '完成したプロジェクトをエクスポート', 'Fertiges Projekt exportieren'),
    },
  ];

  // Auto-play animation
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <div className="space-y-6">
      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-4">
        {steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => {
              setActiveStep(i);
              setIsAutoPlaying(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeStep === i
                ? 'bg-violet-600 text-white scale-105'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              activeStep === i ? 'bg-white text-violet-600' : 'bg-gray-400 dark:bg-gray-500 text-white'
            }`}>
              {i + 1}
            </span>
            <span className="hidden md:inline">{step.title.split('. ')[1]}</span>
          </button>
        ))}
      </div>

      {/* Demo Area */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700 mx-auto"
        style={{
          backgroundColor: colors.bg,
          maxWidth: '600px',
          fontFamily: "'Nunito', -apple-system, sans-serif",
          fontSize: '13px',
        }}
      >
        {/* Mini Header */}
        <div
          className="flex items-center justify-between px-3 py-2 border-b"
          style={{ borderColor: colors.border, backgroundColor: colors.bgSecondary }}
        >
          <div className="flex items-center gap-2">
            <img src="/images/whisk2capcut.svg" alt="Logo" className="w-5 h-5 rounded" />
            <span className="font-bold text-sm" style={{ color: colors.text }}>Whisk2CapCut</span>
          </div>
          <div className="flex gap-1">
            {activeStep === 2 && (
              <span
                className="px-2 py-1 text-xs rounded animate-pulse"
                style={{ backgroundColor: colors.success + '30', color: colors.success }}
              >
                ✅ {lang === 'ko' ? '완료!' : 'Done!'}
              </span>
            )}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-4" style={{ minHeight: '280px' }}>
          {/* Step 1: Prompt Input */}
          {activeStep === 0 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex gap-1 mb-3">
                <span
                  className="px-3 py-1.5 text-xs font-semibold rounded-t"
                  style={{ backgroundColor: colors.bgSecondary, color: colors.primary, border: `1px solid ${colors.border}` }}
                >
                  📝 {lang === 'ko' ? '프롬프트' : 'Prompt'}
                </span>
              </div>
              <div
                className="rounded-lg p-3"
                style={{ backgroundColor: colors.bgSecondary }}
              >
                <div
                  className="rounded-lg p-3 font-mono text-sm"
                  style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
                >
                  <TypewriterText
                    lines={[
                      'A wise king sits on golden throne',
                      'Beautiful queen enters the room',
                      'They discuss important matters',
                      'Young prince practices sword fighting',
                    ]}
                    lang={lang}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs" style={{ color: colors.textSecondary }}>
                  <span>4 {lang === 'ko' ? '씬' : 'scenes'}</span>
                  <span className="animate-pulse">|</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Generating */}
          {activeStep === 1 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex gap-1 mb-3">
                <span
                  className="px-3 py-1.5 text-xs font-semibold rounded-t"
                  style={{ backgroundColor: colors.bgSecondary, color: colors.primary, border: `1px solid ${colors.border}` }}
                >
                  📋 {lang === 'ko' ? '씬목록' : 'Scenes'} (4)
                </span>
              </div>
              <div
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: colors.bgSecondary }}
              >
                {[
                  { id: 1, status: 'done', text: 'King on throne' },
                  { id: 2, status: 'done', text: 'Queen enters' },
                  { id: 3, status: 'generating', text: 'Discussion' },
                  { id: 4, status: 'pending', text: 'Prince training' },
                ].map((scene, i) => (
                  <div
                    key={scene.id}
                    className="flex items-center gap-3 px-3 py-2"
                    style={{ borderBottom: `1px solid ${colors.border}40` }}
                  >
                    <span style={{ color: colors.textSecondary }}>{scene.id}</span>
                    <div className="flex-1 truncate" style={{ color: colors.text }}>{scene.text}</div>
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-sm"
                      style={{
                        backgroundColor: scene.status === 'done' ? colors.success + '20' : colors.bg,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {scene.status === 'done' && '🖼️'}
                      {scene.status === 'generating' && <span className="animate-spin">⚙️</span>}
                      {scene.status === 'pending' && <span style={{ color: colors.textSecondary }}>⏳</span>}
                    </div>
                  </div>
                ))}
              </div>
              {/* Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs" style={{ color: colors.textSecondary }}>
                  <span style={{ color: colors.warning }}>⚙️ {lang === 'ko' ? '생성 중...' : 'Generating...'}</span>
                  <span>2.5/4</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.bg }}>
                  <div
                    className="h-full rounded-full animate-pulse"
                    style={{
                      width: '62%',
                      background: `linear-gradient(90deg, ${colors.success}, ${colors.primary})`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Export */}
          {activeStep === 2 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex gap-1 mb-3">
                <span
                  className="px-3 py-1.5 text-xs font-semibold rounded-t"
                  style={{ backgroundColor: colors.bgSecondary, color: colors.primary, border: `1px solid ${colors.border}` }}
                >
                  📋 {lang === 'ko' ? '씬목록' : 'Scenes'} (4)
                </span>
              </div>
              {/* All Done */}
              <div
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: colors.bgSecondary }}
              >
                {[1, 2, 3, 4].map(id => (
                  <div
                    key={id}
                    className="flex items-center gap-3 px-3 py-2"
                    style={{ borderBottom: `1px solid ${colors.border}40` }}
                  >
                    <span style={{ color: colors.textSecondary }}>{id}</span>
                    <div className="flex-1" style={{ color: colors.text }}>Scene {id}</div>
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-sm"
                      style={{ backgroundColor: colors.success + '20', border: `1px solid ${colors.border}` }}
                    >
                      🖼️
                    </div>
                  </div>
                ))}
              </div>
              {/* Export Button */}
              <button
                className="w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 animate-pulse"
                style={{
                  background: `linear-gradient(90deg, ${colors.primary}, #667eea)`,
                  color: 'white',
                }}
              >
                📦 {lang === 'ko' ? 'CapCut으로 내보내기' : 'Export to CapCut'}
              </button>
              {/* Download indicator */}
              <div
                className="text-center text-xs py-2 rounded-lg"
                style={{ backgroundColor: colors.success + '20', color: colors.success }}
              >
                ✅ {lang === 'ko' ? 'project_capcut.zip 다운로드 완료!' : 'project_capcut.zip downloaded!'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Step Description */}
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {steps[activeStep].desc}
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// Typewriter effect component
function TypewriterText({ lines, lang }: { lines: string[]; lang: string }) {
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const timer = setTimeout(() => {
      if (currentChar < lines[currentLine].length) {
        setDisplayLines(prev => {
          const newLines = [...prev];
          newLines[currentLine] = lines[currentLine].slice(0, currentChar + 1);
          return newLines;
        });
        setCurrentChar(c => c + 1);
      } else {
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
        setDisplayLines(prev => [...prev, '']);
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, lines]);

  // Reset on remount
  useEffect(() => {
    setDisplayLines(['']);
    setCurrentLine(0);
    setCurrentChar(0);
  }, []);

  return (
    <div className="space-y-1">
      {displayLines.map((line, i) => (
        <div key={i}>{line || '\u00A0'}</div>
      ))}
    </div>
  );
}
