'use client';

import { useState, useEffect } from 'react';
import { translations, Language } from '@/lib/i18n';

// Plugin color palette (from actual plugin CSS)
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

// Status icons
const statusIcons: Record<string, string> = {
  pending: '⏳',
  generating: '⚙️',
  done: '✅',
  error: '❌',
};

interface PluginMockupProps {
  lang?: Language;
  variant?: 'full' | 'compact' | 'generating';
  interactive?: boolean;
}

export default function PluginMockup({
  lang = 'ko',
  variant = 'full',
  interactive = false
}: PluginMockupProps) {
  const [activeTab, setActiveTab] = useState<'prompt' | 'list'>('list');
  const [showRef, setShowRef] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  const i18n = translations[lang];

  // Sample scene data - localized
  const sampleScenes = [
    { id: 1, prompt: 'A wise old king sits on golden throne in ancient palace', subtitle: i18n.mockup_sub1, duration: 4, status: 'done', character: i18n.mockup_char_king, scene: i18n.mockup_scene_palace },
    { id: 2, prompt: 'Beautiful queen enters through ornate palace doors', subtitle: i18n.mockup_sub2, duration: 3, status: 'done', character: i18n.mockup_char_queen, scene: i18n.mockup_scene_palace },
    { id: 3, prompt: 'King and queen discuss important matters together', subtitle: i18n.mockup_sub3, duration: 4, status: 'generating', character: `${i18n.mockup_char_king};${i18n.mockup_char_queen}`, scene: i18n.mockup_scene_palace },
    { id: 4, prompt: 'Young prince practices sword fighting in courtyard', subtitle: i18n.mockup_sub4, duration: 3, status: 'pending', character: i18n.mockup_char_prince, scene: i18n.mockup_scene_courtyard },
    { id: 5, prompt: 'Royal advisor delivers urgent message to the king', subtitle: i18n.mockup_sub5, duration: 4, status: 'pending', character: i18n.mockup_char_advisor, scene: i18n.mockup_scene_palace },
  ];

  // Reference items - localized
  const refItems = [
    `👑 ${i18n.mockup_char_king}`,
    `👸 ${i18n.mockup_char_queen}`,
    `🏰 ${i18n.mockup_scene_palace}`
  ];

  // Animation for generating status
  useEffect(() => {
    if (variant === 'generating') {
      const timer = setInterval(() => {
        setAnimationFrame(f => (f + 1) % 3);
      }, 500);
      return () => clearInterval(timer);
    }
  }, [variant]);

  const texts = {
    ko: {
      prompt: '📝 프롬프트',
      list: '📋 씬목록',
      ref: '🖼️ Ref',
      import: '📂 가져오기',
      time: '시간',
      promptCol: '프롬프트',
      tags: '태그',
      image: '이미지',
      generating: '생성 중',
      start: '✨ 생성 시작',
      export: '📦 CapCut',
      settings: '⚙️',
      progress: '진행률',
      scenes: '씬',
    },
    en: {
      prompt: '📝 Prompt',
      list: '📋 Scenes',
      ref: '🖼️ Ref',
      import: '📂 Import',
      time: 'Time',
      promptCol: 'Prompt',
      tags: 'Tags',
      image: 'Image',
      generating: 'Generating',
      start: '✨ Start',
      export: '📦 CapCut',
      settings: '⚙️',
      progress: 'Progress',
      scenes: 'scenes',
    },
    ja: {
      prompt: '📝 プロンプト',
      list: '📋 シーン',
      ref: '🖼️ Ref',
      import: '📂 インポート',
      time: '時間',
      promptCol: 'プロンプト',
      tags: 'タグ',
      image: '画像',
      generating: '生成中',
      start: '✨ 開始',
      export: '📦 CapCut',
      settings: '⚙️',
      progress: '進行',
      scenes: 'シーン',
    },
    de: {
      prompt: '📝 Prompt',
      list: '📋 Szenen',
      ref: '🖼️ Ref',
      import: '📂 Import',
      time: 'Zeit',
      promptCol: 'Prompt',
      tags: 'Tags',
      image: 'Bild',
      generating: 'Generieren',
      start: '✨ Start',
      export: '📦 CapCut',
      settings: '⚙️',
      progress: 'Fortschritt',
      scenes: 'Szenen',
    },
  };

  const t = texts[lang] || texts.en;

  // Calculate progress
  const doneCount = sampleScenes.filter(s => s.status === 'done').length;
  const generatingCount = sampleScenes.filter(s => s.status === 'generating').length;
  const progress = Math.round(((doneCount + generatingCount * 0.5) / sampleScenes.length) * 100);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
      style={{
        backgroundColor: colors.bg,
        fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: '13px',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: colors.border, backgroundColor: colors.bgSecondary }}
      >
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-600 rounded" style={{ color: colors.textSecondary }}>
            ☰
          </button>
          <div className="flex items-center gap-2">
            <img src="/images/whisk2capcut.svg" alt="Logo" className="w-5 h-5 rounded" />
            <span className="font-bold text-sm" style={{ color: colors.text }}>Whisk2CapCut</span>
          </div>
          <span className="px-2 py-0.5 text-xs rounded" style={{ backgroundColor: colors.success + '30', color: colors.success }}>
            🔑 Connected
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 text-xs rounded flex items-center gap-1"
            style={{
              backgroundColor: colors.primary + '20',
              color: colors.primary,
              border: `1px solid ${colors.primary}40`
            }}
          >
            {t.export}
          </button>
          <button
            className="px-2 py-1 text-xs rounded"
            style={{ color: colors.textSecondary, border: `1px solid ${colors.border}` }}
          >
            {t.settings}
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="p-3" style={{ backgroundColor: colors.bg }}>
        {/* Tabs Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1">
            <button
              onClick={() => interactive && setActiveTab('prompt')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t transition-colors ${
                activeTab === 'prompt' ? 'border-b-0' : ''
              }`}
              style={{
                backgroundColor: activeTab === 'prompt' ? colors.bgSecondary : 'transparent',
                color: activeTab === 'prompt' ? colors.primary : colors.textSecondary,
                border: `1px solid ${colors.border}`,
                borderBottom: activeTab === 'prompt' ? `1px solid ${colors.bgSecondary}` : `1px solid ${colors.border}`,
              }}
            >
              {t.prompt}
            </button>
            <button
              onClick={() => interactive && setActiveTab('list')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t transition-colors`}
              style={{
                backgroundColor: activeTab === 'list' ? colors.bgSecondary : 'transparent',
                color: activeTab === 'list' ? colors.primary : colors.textSecondary,
                border: `1px solid ${colors.border}`,
                borderBottom: activeTab === 'list' ? `1px solid ${colors.bgSecondary}` : `1px solid ${colors.border}`,
              }}
            >
              {t.list} ({sampleScenes.length})
            </button>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => interactive && setShowRef(!showRef)}
              className="px-2 py-1.5 text-xs rounded"
              style={{
                color: showRef ? colors.primary : colors.textSecondary,
                border: `1px solid ${colors.border}`,
                backgroundColor: showRef ? colors.primary + '20' : 'transparent',
              }}
            >
              {t.ref} (3)
            </button>
            <button
              className="px-2 py-1.5 text-xs rounded"
              style={{
                color: colors.textSecondary,
                border: `1px solid ${colors.border}`
              }}
            >
              {t.import}
            </button>
          </div>
        </div>

        {/* Reference Panel (collapsible) */}
        {showRef && (
          <div
            className="mb-3 p-2 rounded-lg grid grid-cols-3 gap-2"
            style={{ backgroundColor: colors.bgSecondary }}
          >
            {refItems.map((ref, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: colors.bg, border: `1px dashed ${colors.border}` }}
              >
                {ref.split(' ')[0]}
                <span className="text-xs ml-1" style={{ color: colors.textSecondary }}>{ref.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'prompt' ? (
          /* Prompt Input Tab */
          <div
            className="rounded-lg p-3"
            style={{ backgroundColor: colors.bgSecondary }}
          >
            <textarea
              readOnly
              className="w-full h-32 rounded-lg p-2 text-sm resize-none"
              style={{
                backgroundColor: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
              value={`A wise old king sits on golden throne
Beautiful queen enters through doors
King and queen discuss matters
Young prince practices sword fighting
Royal advisor delivers urgent message`}
            />
            <div className="flex justify-between mt-2 text-xs" style={{ color: colors.textSecondary }}>
              <span>5 {t.scenes}</span>
              <span>↵ = new scene</span>
            </div>
          </div>
        ) : (
          /* Scene List Tab */
          <div
            className="rounded-lg overflow-hidden"
            style={{ backgroundColor: colors.bgSecondary }}
          >
            {/* Table Header */}
            <div
              className="grid gap-2 px-2 py-1.5 text-xs font-semibold"
              style={{
                gridTemplateColumns: '24px 50px 1fr 80px 48px',
                color: colors.textSecondary,
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <span>#</span>
              <span>{t.time}</span>
              <span>{t.promptCol}</span>
              <span>{t.tags}</span>
              <span>{t.image}</span>
            </div>

            {/* Table Body */}
            <div className="max-h-48 overflow-y-auto">
              {sampleScenes.slice(0, variant === 'compact' ? 3 : 5).map((scene) => (
                <div
                  key={scene.id}
                  className="grid gap-2 px-2 py-2 text-xs items-center hover:bg-gray-700/30 transition-colors"
                  style={{
                    gridTemplateColumns: '24px 50px 1fr 80px 48px',
                    borderBottom: `1px solid ${colors.border}40`,
                  }}
                >
                  {/* ID */}
                  <span style={{ color: colors.textSecondary }}>{scene.id}</span>

                  {/* Time */}
                  <span style={{ color: colors.text }}>{scene.duration}s</span>

                  {/* Prompt */}
                  <div className="truncate">
                    <div className="truncate" style={{ color: colors.text }}>{scene.prompt}</div>
                    <div className="truncate text-xs" style={{ color: colors.textSecondary }}>
                      {scene.subtitle}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1 flex-wrap">
                    <span
                      className="px-1.5 py-0.5 rounded text-xs"
                      style={{ backgroundColor: colors.primary + '30', color: colors.primary }}
                    >
                      {scene.character.split(';')[0]}
                    </span>
                  </div>

                  {/* Image */}
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center text-lg"
                    style={{
                      backgroundColor: scene.status === 'done' ? colors.success + '20' : colors.bg,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    {scene.status === 'generating' ? (
                      <span className="animate-spin">⚙️</span>
                    ) : scene.status === 'done' ? (
                      '🖼️'
                    ) : (
                      <span style={{ color: colors.textSecondary }}>⏳</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Config Row */}
        <div className="flex items-center gap-3 mt-3 text-xs" style={{ color: colors.textSecondary }}>
          <div className="flex items-center gap-1">
            <span>Ratio:</span>
            <select
              className="px-2 py-1 rounded text-xs"
              style={{ backgroundColor: colors.bgSecondary, color: colors.text, border: `1px solid ${colors.border}` }}
              defaultValue="16:9"
            >
              <option>16:9</option>
              <option>9:16</option>
              <option>1:1</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <span>Seed:</span>
            <input
              type="text"
              className="w-16 px-2 py-1 rounded text-xs"
              style={{ backgroundColor: colors.bgSecondary, color: colors.text, border: `1px solid ${colors.border}` }}
              defaultValue="random"
              readOnly
            />
          </div>
          <div className="flex items-center gap-1">
            <span>Mode:</span>
            <select
              className="px-2 py-1 rounded text-xs"
              style={{ backgroundColor: colors.bgSecondary, color: colors.text, border: `1px solid ${colors.border}` }}
              defaultValue="parallel"
            >
              <option>parallel</option>
              <option>sequential</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            className="flex-1 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            style={{
              background: variant === 'generating'
                ? `linear-gradient(90deg, ${colors.warning}, ${colors.warning}dd)`
                : `linear-gradient(90deg, ${colors.primary}, #667eea)`,
              color: 'white',
            }}
          >
            {variant === 'generating' ? (
              <>⏸️ {lang === 'ko' ? '일시정지' : 'Pause'}</>
            ) : (
              <>{t.start}</>
            )}
          </button>
          {variant === 'generating' && (
            <button
              className="px-4 py-2 rounded-lg font-semibold text-sm"
              style={{
                backgroundColor: colors.error + '20',
                color: colors.error,
                border: `1px solid ${colors.error}40`,
              }}
            >
              ⏹️ Stop
            </button>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div
        className="px-3 py-2 border-t"
        style={{ borderColor: colors.border, backgroundColor: colors.bgSecondary }}
      >
        <div className="flex items-center justify-between text-xs mb-1">
          <span style={{ color: colors.textSecondary }}>
            {variant === 'generating' ? (
              <span style={{ color: colors.warning }}>
                ⚙️ {t.generating}{'.'.repeat(animationFrame + 1)}
              </span>
            ) : (
              <span style={{ color: colors.success }}>✅ Ready</span>
            )}
          </span>
          <span style={{ color: colors.text }}>{doneCount}/{sampleScenes.length} {t.scenes}</span>
        </div>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: colors.bg }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${colors.success}, ${colors.primary})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
