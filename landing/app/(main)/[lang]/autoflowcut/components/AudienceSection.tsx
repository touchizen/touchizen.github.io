import { Language, TranslationKey } from '@/lib/i18n';

const audiences: Record<string, { icon: string; title: Record<string, string>; desc: Record<string, string> }[]> = {
  all: [
    {
      icon: '🎭',
      title: { en: 'Faceless YouTube Creators', ko: '얼굴 없는 YouTube 크리에이터', ja: 'フェイスレスYouTubeクリエイター', de: 'Gesichtslose YouTube-Creator' },
      desc: { en: 'Automate the entire AI image + video to CapCut pipeline for narration and slideshow channels.', ko: '나레이션/슬라이드쇼 채널을 위한 AI 이미지+비디오 → CapCut 파이프라인 전체 자동화.', ja: 'ナレーション・スライドショーチャンネルのAI画像+動画→CapCutパイプラインを完全自動化。', de: 'Automatisieren Sie die gesamte KI-Bild+Video zu CapCut Pipeline für Narrations- und Slideshow-Kanäle.' },
    },
    {
      icon: '📖',
      title: { en: 'AI Story & Bedtime Story Channels', ko: 'AI 스토리 & 잠자리 동화 채널', ja: 'AIストーリー＆おやすみ童話チャンネル', de: 'KI-Story & Gute-Nacht-Geschichte Kanäle' },
      desc: { en: 'Keep character consistency with references, generate videos for key scenes, export everything to CapCut.', ko: '레퍼런스로 캐릭터 일관성 유지, 핵심 씬에 비디오 생성, 모든 것을 CapCut으로 내보내기.', ja: 'リファレンスでキャラクター一貫性を維持、キーシーンに動画生成、すべてをCapCutにエクスポート。', de: 'Charakterkonsistenz mit Referenzen beibehalten, Videos für Schlüsselszenen generieren, alles nach CapCut exportieren.' },
    },
    {
      icon: '📱',
      title: { en: 'Shorts, Reels & TikTok Creators', ko: '쇼츠, 릴스 & 틱톡 크리에이터', ja: 'ショート、リール＆TikTokクリエイター', de: 'Shorts, Reels & TikTok Creator' },
      desc: { en: 'Quickly turn AI-generated scenes into short-form video projects with mixed image and video content.', ko: 'AI 생성 씬을 이미지+비디오 혼합 숏폼 영상 프로젝트로 빠르게 변환.', ja: 'AI生成シーンを画像+動画ミックスのショートフォーム動画プロジェクトに素早く変換。', de: 'KI-generierte Szenen schnell in Kurzform-Videoprojekte mit gemischtem Bild- und Videoinhalt umwandeln.' },
    },
    {
      icon: '🎓',
      title: { en: 'Educators & Course Creators', ko: '교육 콘텐츠 제작자', ja: '教育コンテンツ制作者', de: 'Pädagogen & Kursersteller' },
      desc: { en: 'Turn scripts or subtitles into illustrated video lessons with AI images and animated video scenes.', ko: '스크립트/자막을 AI 이미지와 애니메이션 비디오 씬이 포함된 영상 강의로 변환.', ja: 'スクリプトや字幕をAI画像とアニメーション動画シーン付きの映像レッスンに変換。', de: 'Skripte oder Untertitel in illustrierte Videolektionen mit KI-Bildern und animierten Videoszenen umwandeln.' },
    },
  ],
};

export default function AudienceSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-4">
            👥 {lang === 'ko' ? '이런 분께 추천합니다' : lang === 'ja' ? 'こんな方におすすめ' : lang === 'de' ? 'Empfohlen für' : 'Who Is This For?'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {lang === 'ko' ? '이런 분께 추천합니다' : lang === 'ja' ? 'こんな方におすすめ' : lang === 'de' ? 'Empfohlen für' : 'Who Is This For?'}
            </span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {audiences.all.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {item.title[lang] || item.title.en}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.desc[lang] || item.desc.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
