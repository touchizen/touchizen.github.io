import { Language, TranslationKey } from '@/lib/i18n';

export default function HowItWorksSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  const steps = [
    {
      num: '01',
      title: lang === 'ko' ? '프롬프트 입력 & 레퍼런스 설정' : lang === 'ja' ? 'プロンプト入力＆リファレンス設定' : lang === 'de' ? 'Prompts eingeben & Referenzen festlegen' : 'Enter Prompts & Set References',
      desc: lang === 'ko' ? 'TXT, CSV, SRT 파일에서 씬 프롬프트를 가져오고, 캐릭터/배경/스타일 레퍼런스를 태그별로 매칭합니다.' : lang === 'ja' ? 'TXT、CSV、SRTファイルからシーンプロンプトをインポートし、キャラクター/背景/スタイルリファレンスをタグ別にマッチング。' : lang === 'de' ? 'Importieren Sie Szenen-Prompts aus TXT-, CSV-, SRT-Dateien und matchen Sie Charakter-/Hintergrund-/Stil-Referenzen nach Tags.' : 'Import scene prompts from TXT, CSV, SRT files and match character/background/style references by tags.',
      icon: '📝',
    },
    {
      num: '02',
      title: lang === 'ko' ? 'AI 이미지 일괄 생성' : lang === 'ja' ? 'AI画像一括生成' : lang === 'de' ? 'KI-Bilder stapelweise generieren' : 'Batch Generate AI Images',
      desc: lang === 'ko' ? 'Google Flow AI가 레퍼런스를 활용해 일관된 스타일로 100장 이상의 이미지를 자동 생성합니다. 에러 자동 재시도 포함.' : lang === 'ja' ? 'Google Flow AIがリファレンスを活用して一貫したスタイルで100枚以上の画像を自動生成。エラー自動リトライ付き。' : lang === 'de' ? 'Google Flow AI generiert automatisch 100+ Bilder in konsistentem Stil mit Referenzen. Automatische Fehlerwiederholung inklusive.' : 'Google Flow AI auto-generates 100+ images with consistent style using references. Auto-retry on errors included.',
      icon: '🖼️',
    },
    {
      num: '03',
      title: lang === 'ko' ? 'AI 비디오 생성 (T2V / I2V)' : lang === 'ja' ? 'AI動画生成（T2V / I2V）' : lang === 'de' ? 'KI-Videos generieren (T2V / I2V)' : 'Generate AI Videos (T2V / I2V)',
      desc: lang === 'ko' ? '선택한 씬에 텍스트에서 비디오(T2V) 또는 이미지에서 비디오(I2V)를 생성합니다. 씬별로 이미지/비디오 중 최적의 미디어를 선택.' : lang === 'ja' ? '選択したシーンにテキストから動画（T2V）または画像から動画（I2V）を生成。シーンごとに画像/動画から最適なメディアを選択。' : lang === 'de' ? 'Generieren Sie Text-to-Video (T2V) oder Image-to-Video (I2V) für ausgewählte Szenen. Wählen Sie pro Szene das optimale Medium.' : 'Generate Text-to-Video (T2V) or Image-to-Video (I2V) for selected scenes. Choose the optimal media per scene.',
      icon: '🎬',
    },
    {
      num: '04',
      title: lang === 'ko' ? '미디어 선택 & 씬 편집' : lang === 'ja' ? 'メディア選択＆シーン編集' : lang === 'de' ? 'Medien auswählen & Szenen bearbeiten' : 'Select Media & Edit Scenes',
      desc: lang === 'ko' ? '씬 목록에서 이미지, T2V, I2V 중 내보낼 미디어를 선택합니다. duration이 자동 조정되고, 자막도 편집 가능.' : lang === 'ja' ? 'シーンリストで画像、T2V、I2Vからエクスポートするメディアを選択。デュレーション自動調整、字幕も編集可能。' : lang === 'de' ? 'Wählen Sie in der Szenenliste das zu exportierende Medium aus Bild, T2V, I2V. Dauer wird automatisch angepasst, Untertitel bearbeitbar.' : 'Select export media from image, T2V, I2V in the scene list. Duration auto-adjusts and subtitles are editable.',
      icon: '🎯',
    },
    {
      num: '05',
      title: lang === 'ko' ? 'CapCut 프로젝트 내보내기' : lang === 'ja' ? 'CapCutプロジェクトエクスポート' : lang === 'de' ? 'CapCut-Projekt exportieren' : 'Export CapCut Project',
      desc: lang === 'ko' ? '원클릭으로 타임라인, 미디어, 자막, Ken Burns 애니메이션이 포함된 완성된 CapCut 프로젝트를 내보냅니다. 바로 편집 시작!' : lang === 'ja' ? 'ワンクリックでタイムライン、メディア、字幕、Ken Burnsアニメーション付きの完成CapCutプロジェクトをエクスポート。すぐ編集開始！' : lang === 'de' ? 'Ein Klick exportiert ein komplettes CapCut-Projekt mit Timeline, Medien, Untertiteln und Ken Burns-Animationen. Sofort mit der Bearbeitung starten!' : 'One click exports a complete CapCut project with timeline, media, subtitles, and Ken Burns animations. Start editing immediately!',
      icon: '✂️',
    },
  ];

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            🚀 {lang === 'ko' ? '상세 사용 방법' : lang === 'ja' ? '詳しい使い方' : lang === 'de' ? 'Detaillierte Anleitung' : 'Detailed How-To'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {lang === 'ko' ? '5단계로 완성' : lang === 'ja' ? '5ステップで完成' : lang === 'de' ? 'In 5 Schritten fertig' : 'Complete in 5 Steps'}
            </span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-6 items-start">
              {/* Step number line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 h-full min-h-[40px] bg-gradient-to-b from-cyan-300 to-transparent dark:from-cyan-700 mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm flex-1 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{step.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
