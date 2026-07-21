import { Language } from '@/lib/i18n';

type ReleaseCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  latestLabel: string;
  latestTitle: string;
  latestSummary: string;
  latestHighlights: Array<{ title: string; desc: string }>;
  recentTitle: string;
  recentSummary: string;
  recent: Array<{ version: string; title: string; summary: string }>;
  previousTitle: string;
  previousSummary: string;
  showMore: string;
  githubLabel: string;
  older: Array<{ version: string; title: string; items: string[] }>;
};

const releaseCopy: Record<Language, ReleaseCopy> = {
  ko: {
    eyebrow: '릴리즈 노트',
    title: '버전별 업데이트 이력',
    subtitle: '최신 버전은 자세히, 이전 버전은 핵심 변경만 빠르게 확인할 수 있습니다.',
    latestLabel: '현재 버전',
    latestTitle: 'v3.1.0 - Story 오디오, 다시 만들었습니다',
    latestSummary:
      'v3.1.0은 Story 모드의 오디오 단계를 새로 짰습니다. 모든 provider 키를 한 곳에서 관리하고, 성우 단위로 다시 생성하며, Gemini TTS 음성을 일관되게 유지합니다 — 그리고 20여 건의 수정.',
    latestHighlights: [
      {
        title: 'API 키 설정 통합',
        desc: 'Gemini · Typecast · ElevenLabs · Google TTS 키를 설정의 "API 키" 탭 하나로 모으고, 오디오 생성에 필요한 키는 그 자리에서 바로 입력합니다.',
      },
      {
        title: '성우 단위 강제 재생성',
        desc: '성우를 우클릭하면 그 화자의 대사 전체를 새 음성으로 다시 생성합니다.',
      },
      {
        title: 'Gemini TTS 음성 일관성',
        desc: '성우별 고정 seed로 같은 화자가 문장이 달라도 같은 목소리를 유지하고, 짧은 문장·감정 표현의 400 오류를 고쳤습니다.',
      },
      {
        title: '실시간 토큰 사용량',
        desc: '생성 중 토큰 사용량이 Claude · Codex 엔진별로 라이브로 올라갑니다.',
      },
      {
        title: '프롬프트 점진 스트리밍',
        desc: '프롬프트 스텝의 출력이 고스트 텍스트로 실시간 표시됩니다.',
      },
      {
        title: '공백 포함 이름 멘션',
        desc: '`@{이름}` 문법으로 공백이 들어간 캐릭터 이름도 멘션할 수 있습니다.',
      },
    ],
    recentTitle: '최근 릴리즈',
    recentSummary: '3.x 라인의 릴리즈입니다. 이전 3.x 빌드를 쓰고 있다면 3.1.0으로 업데이트해 주세요.',
    recent: [
      {
        version: 'v3.0.4',
        title: '한국어 외 계정 · Windows 자막 · 대용량 프로젝트',
        summary: '계정 언어와 무관하게 Flow 캐릭터 멘션이 동작하고, 에러 메시지가 앱 언어를 따르며, Windows .srt가 올바르게 분할되고, 아주 긴 프로젝트도 멈추지 않습니다.',
      },
      {
        version: 'v3.0.2',
        title: '프라이버시 · 생성 안정화 수정',
        summary: '오류 리포트에서 로그인 토큰 · API 키 · 프롬프트 · 캐릭터 이름을 제거하고, v3.0.0의 생성 실패 등 안정성 문제를 고친 빌드입니다.',
      },
      {
        version: 'v3.0.0',
        title: 'Story 모드 도입',
        summary: '앱 안에서 대본을 쓰고 영상까지 끝내는 Story 모드, 화자별 TTS · 효과음, 첫 Intel 맥 빌드를 담은 릴리즈입니다.',
      },
    ],
    previousTitle: '이전 릴리즈 및 레거시 바이너리',
    previousSummary: 'v2.1.0 이하 릴리즈와, 더 이상 배포하지 않는 레거시 Flow 시절 빌드입니다.',
    showMore: '이전 릴리즈 보기',
    githubLabel: 'GitHub Releases에서 전체 보기',
    older: [
      {
        version: 'v2.1.0',
        title: '프리뷰 마스터 컨트롤 · Flow @멘션',
        items: [
          '마지막 2.x 릴리즈 — 프리뷰 모니터 마스터 음소거/볼륨 추가',
          '@멘션(캐릭터) 비디오 생성 수정',
          'v3.x Story 모드의 직전 기반',
        ],
      },
      {
        version: 'v2.0.0',
        title: '듀얼 생성 모드 · 멀티 에디터 내보내기',
        items: [
          'Flow 로그인(무료)과 내 Gemini/Veo API 키(BYOK)를 상단 토글로 전환하는 이중 생성 모드',
          'CapCut에 더해 Adobe Premiere Pro(.prproj) · Vrew(.vrew) 내보내기 추가',
          '대상 에디터가 설치되어 있지 않으면 내보내기 시 다운로드 페이지로 안내',
        ],
      },
      {
        version: 'v1.1.0',
        title: '@멘션 레퍼런스 · 배치 생성 가속',
        items: [
          '프롬프트에 @멘션으로 레퍼런스 이미지를 인라인 첨부 (한국어 조사 자동 분리 포함)',
          '이미지/비디오 동시 생성 수를 분리하고 생성 전 랜덤 딜레이 제거',
          '기본 이미지 모델을 Nano Banana 2로 업그레이드',
        ],
      },
      {
        version: 'v1.0.0',
        title: 'Gemini/Veo 공식 API 전환',
        items: [
          'Flow 웹 자동화를 버리고 Google 공식 Gemini/Veo API 직접 연결로 전환',
          'I2V / T2V 트랙이 분리된 타임라인 영상 프리뷰',
          'I2V와 T2V를 별도 트랙으로 CapCut에 한 번에 내보내기',
        ],
      },
      {
        version: 'v0.9.15 및 이전',
        title: '레거시 바이너리 제공 중단',
        items: [
          '이전 버전은 Google Flow 웹 워크플로우를 사용했습니다.',
          'Google Flow 접근이 차단되거나 변경되어 해당 바이너리는 모두 제거했습니다.',
          '새 설치와 재설치는 Gemini/Veo API 기반 v1.0.0 이상을 사용해 주세요.',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Release Notes',
    title: 'Version History',
    subtitle: 'The latest version gets the detail; older releases stay compact until you need the full history.',
    latestLabel: 'Current version',
    latestTitle: 'v3.1.0 - Story audio, redone',
    latestSummary:
      'v3.1.0 rebuilds the audio stage of Story mode: every provider key in one place, per-speaker regeneration, and consistent Gemini TTS voices — plus 20+ fixes.',
    latestHighlights: [
      {
        title: 'Unified API-key settings',
        desc: 'Gemini, Typecast, ElevenLabs, and Google TTS keys live in one Settings tab, and the key you need is entered right where audio generation asks for it.',
      },
      {
        title: 'Per-speaker force-regenerate',
        desc: "Right-click a speaker to regenerate all of that speaker's lines with a new voice.",
      },
      {
        title: 'Consistent Gemini TTS voices',
        desc: 'A per-voice seed keeps the same speaker sounding the same from line to line, and short-text and emotion 400 errors are fixed.',
      },
      {
        title: 'Live token usage',
        desc: 'Token usage rises live during generation, per Claude or Codex engine.',
      },
      {
        title: 'Progressive prompt streaming',
        desc: 'The prompt step streams its output live as ghost text.',
      },
      {
        title: 'Mentions with spaces',
        desc: 'Use `@{name}` to mention character names that contain spaces.',
      },
    ],
    recentTitle: 'Recent Releases',
    recentSummary: 'The 3.x line. On an earlier 3.x build? Update to 3.1.0.',
    recent: [
      {
        version: 'v3.0.4',
        title: 'Non-Korean accounts, Windows subtitles, big projects',
        summary: 'Flow character mentions work on any account language, error messages follow your app language, Windows .srt files import correctly, and very long projects no longer freeze.',
      },
      {
        version: 'v3.0.2',
        title: 'Privacy and generation reliability fixes',
        summary: 'Strips the sign-in token, API key, prompts, and character names from error reports, and fixes the v3.0.0 generation failures and related stability issues.',
      },
      {
        version: 'v3.0.0',
        title: 'Story mode introduced',
        summary: 'Write a script and finish a video without leaving the app — Story mode, per-speaker TTS and sound effects, and the first Intel Mac build.',
      },
    ],
    previousTitle: 'Older Releases and Removed Legacy Binaries',
    previousSummary: 'v2.1.0 and earlier, plus the legacy Flow-era builds that are no longer distributed.',
    showMore: 'Show older releases',
    githubLabel: 'View all on GitHub Releases',
    older: [
      {
        version: 'v2.1.0',
        title: 'Preview master controls and Flow @mention',
        items: [
          'The last 2.x release — preview-monitor master mute/volume',
          'Fixes for @mention (character) video generation',
          'The immediate base for v3.x Story mode',
        ],
      },
      {
        version: 'v2.0.0',
        title: 'Dual generation modes and multi-editor export',
        items: [
          'Flow login (free) or your own Gemini/Veo API key (BYOK), switchable from the top toggle',
          'Adobe Premiere Pro (.prproj) and Vrew (.vrew) export added alongside CapCut',
          'Export points you to the editor download page when it is not installed',
        ],
      },
      {
        version: 'v1.1.0',
        title: '@mention references and faster batches',
        items: [
          '@mention in prompts attaches reference images inline, with Korean particle handling',
          'Separate image/video concurrency limits and no more random start delays',
          'Default image model upgraded to Nano Banana 2',
        ],
      },
      {
        version: 'v1.0.0',
        title: 'Official Gemini/Veo API migration',
        items: [
          'Replaced Flow web automation with a direct connection to the Google Gemini/Veo API',
          'Timeline video preview with separate I2V / T2V lanes',
          'I2V and T2V exported as separate CapCut tracks in a single pass',
        ],
      },
      {
        version: 'v0.9.15 and earlier',
        title: 'Legacy binaries were removed',
        items: [
          'Earlier versions depended on the Google Flow web workflow.',
          'Because Google Flow access is now blocked or changed, those binaries were removed.',
          'For new installs or reinstalls, use v1.0.0 or later with the Gemini/Veo API workflow.',
        ],
      },
    ],
  },
  ja: {
    eyebrow: 'リリースノート',
    title: 'バージョン別アップデート',
    subtitle: '最新バージョンは詳しく、過去バージョンは必要なときに展開して確認できます。',
    latestLabel: '現在のバージョン',
    latestTitle: 'v3.1.0 - Storyの音声を作り直し',
    latestSummary:
      'v3.1.0はストーリーモードの音声ステップを作り直しました。すべてのプロバイダーキーを1か所で管理し、話者単位で再生成し、Gemini TTSの声を一貫させます — そして20件以上の修正。',
    latestHighlights: [
      {
        title: 'APIキー設定を統合',
        desc: 'Gemini・Typecast・ElevenLabs・Google TTSのキーを設定の「APIキー」タブ1つにまとめ、音声生成に必要なキーはその場で入力できます。',
      },
      {
        title: '話者単位の強制再生成',
        desc: '話者を右クリックすると、その話者のセリフ全体を新しい音声で再生成します。',
      },
      {
        title: 'Gemini TTS音声の一貫性',
        desc: '話者ごとの固定シードで同じ話者の声を保ち、短文・感情表現の400エラーを修正しました。',
      },
      {
        title: 'リアルタイムのトークン使用量',
        desc: '生成中のトークン使用量がClaude・Codexエンジン別にライブで増えます。',
      },
      {
        title: 'プロンプトの逐次ストリーミング',
        desc: 'プロンプトステップの出力がゴーストテキストとしてリアルタイム表示されます。',
      },
      {
        title: 'スペースを含む名前のメンション',
        desc: '`@{名前}`記法でスペースを含むキャラクター名もメンションできます。',
      },
    ],
    recentTitle: '最近のリリース',
    recentSummary: '3.x系のリリースです。以前の3.xビルドをお使いの場合は3.1.0へ更新してください。',
    recent: [
      {
        version: 'v3.0.4',
        title: '韓国語以外のアカウント・Windows字幕・大規模プロジェクト',
        summary: 'アカウント言語に関係なくFlowキャラクターメンションが動作し、エラーメッセージがアプリ言語に従い、Windowsの.srtが正しく分割され、非常に長いプロジェクトでも固まりません。',
      },
      {
        version: 'v3.0.2',
        title: 'プライバシーと生成安定化の修正',
        summary: 'エラーレポートからログイントークン・APIキー・プロンプト・キャラクター名を除去し、v3.0.0の生成失敗などの安定性問題を修正したビルドです。',
      },
      {
        version: 'v3.0.0',
        title: 'ストーリーモード導入',
        summary: 'アプリ内で台本を書いて動画まで仕上げるストーリーモード、話者別TTS・効果音、初のIntel Macビルドを含むリリースです。',
      },
    ],
    previousTitle: '過去のリリースとレガシーバイナリ',
    previousSummary: 'v2.1.0以前のリリースと、提供を終了したレガシーFlow時代のビルドです。',
    showMore: '過去のリリースを見る',
    githubLabel: 'GitHub Releasesで全て見る',
    older: [
      {
        version: 'v2.1.0',
        title: 'プレビューのマスター操作とFlow @メンション',
        items: [
          '最後の2.xリリース — プレビューモニターのマスターミュート/音量',
          '@メンション（キャラクター）動画生成の修正',
          'v3.x ストーリーモードの直前の基盤',
        ],
      },
      {
        version: 'v2.0.0',
        title: 'デュアル生成モードとマルチエディターエクスポート',
        items: [
          'Flowログイン（無料）と自分のGemini/Veo APIキー（BYOK）を上部トグルで切り替えるデュアル生成モード',
          'CapCutに加えてAdobe Premiere Pro（.prproj）・Vrew（.vrew）エクスポートを追加',
          '対象エディターが未インストールの場合、エクスポート時にダウンロードページへ案内',
        ],
      },
      {
        version: 'v1.1.0',
        title: '@メンション参照とバッチ生成の高速化',
        items: [
          'プロンプトの@メンションで参照画像をインライン添付（韓国語助詞の自動分離を含む）',
          '画像/動画の同時生成数を分離し、生成前のランダム待機を撤廃',
          '既定の画像モデルをNano Banana 2にアップグレード',
        ],
      },
      {
        version: 'v1.0.0',
        title: 'Gemini/Veo公式APIへの移行',
        items: [
          'FlowのWeb自動化をやめ、Google公式Gemini/Veo APIへ直接接続',
          'I2V / T2Vのレーンを分けたタイムライン動画プレビュー',
          'I2VとT2Vを別トラックとしてCapCutへ一度にエクスポート',
        ],
      },
      {
        version: 'v0.9.15以前',
        title: 'レガシーバイナリの提供終了',
        items: [
          '以前のバージョンはGoogle FlowのWebワークフローに依存していました。',
          'Google Flowへのアクセスがブロックまたは変更されたため、該当バイナリは削除しました。',
          '新規インストールや再インストールには、Gemini/Veo APIベースのv1.0.0以降を使用してください。',
        ],
      },
    ],
  },
  de: {
    eyebrow: 'Release Notes',
    title: 'Versionsverlauf',
    subtitle: 'Die aktuelle Version ist ausführlich, ältere Releases bleiben kompakt und lassen sich bei Bedarf öffnen.',
    latestLabel: 'Aktuelle Version',
    latestTitle: 'v3.1.0 - Story-Audio, neu gemacht',
    latestSummary:
      'v3.1.0 baut die Audio-Stufe des Story-Modus neu auf: alle Anbieter-Schlüssel an einem Ort, Regenerierung pro Sprecher und konsistente Gemini-TTS-Stimmen — plus 20+ Fixes.',
    latestHighlights: [
      {
        title: 'Vereinheitlichte Schlüssel-Einstellungen',
        desc: 'Gemini-, Typecast-, ElevenLabs- und Google-TTS-Schlüssel liegen in einem Einstellungen-Tab; den benötigten Schlüssel geben Sie direkt bei der Audiogenerierung ein.',
      },
      {
        title: 'Regenerierung pro Sprecher',
        desc: 'Rechtsklick auf einen Sprecher regeneriert alle seine Zeilen mit einer neuen Stimme.',
      },
      {
        title: 'Konsistente Gemini-TTS-Stimmen',
        desc: 'Ein Seed pro Stimme hält denselben Sprecher gleich klingend; 400-Fehler bei kurzen Texten und Emotionen sind behoben.',
      },
      {
        title: 'Live-Token-Nutzung',
        desc: 'Die Token-Nutzung steigt während der Generierung live, je nach Claude- oder Codex-Engine.',
      },
      {
        title: 'Progressives Prompt-Streaming',
        desc: 'Der Prompt-Schritt streamt seine Ausgabe live als Ghost-Text.',
      },
      {
        title: 'Mentions mit Leerzeichen',
        desc: 'Mit `@{name}` lassen sich Charakternamen mit Leerzeichen erwähnen.',
      },
    ],
    recentTitle: 'Neuere Releases',
    recentSummary: 'Die 3.x-Linie. Auf einem früheren 3.x-Build? Bitte auf 3.1.0 aktualisieren.',
    recent: [
      {
        version: 'v3.0.4',
        title: 'Nicht-koreanische Konten, Windows-Untertitel, große Projekte',
        summary: 'Flow-Charakter-Mentions funktionieren unabhängig von der Kontosprache, Fehlermeldungen folgen der App-Sprache, Windows-.srt-Dateien werden korrekt aufgeteilt, und sehr lange Projekte frieren nicht mehr ein.',
      },
      {
        version: 'v3.0.2',
        title: 'Datenschutz- und Stabilitäts-Fixes',
        summary: 'Entfernt Anmelde-Token, API-Schlüssel, Prompts und Figurennamen aus Fehlerberichten und behebt die Generierungsausfälle aus v3.0.0 samt zugehöriger Stabilitätsprobleme.',
      },
      {
        version: 'v3.0.0',
        title: 'Story-Modus eingeführt',
        summary: 'Ein Skript schreiben und ein Video fertigstellen, ohne die App zu verlassen — Story-Modus, TTS pro Sprecher und Soundeffekte sowie der erste Intel-Mac-Build.',
      },
    ],
    previousTitle: 'Ältere Releases und entfernte Legacy-Binaries',
    previousSummary: 'v2.1.0 und früher sowie die Legacy-Builds aus der Flow-Ära, die nicht mehr verteilt werden.',
    showMore: 'Ältere Releases anzeigen',
    githubLabel: 'Alle auf GitHub Releases ansehen',
    older: [
      {
        version: 'v2.1.0',
        title: 'Master-Steuerung der Vorschau und Flow-@Mention',
        items: [
          'Das letzte 2.x-Release — Master-Stummschaltung/Lautstärke im Vorschaumonitor',
          'Fixes für die @Mention-(Charakter-)Videogenerierung',
          'Die unmittelbare Basis für den v3.x-Story-Modus',
        ],
      },
      {
        version: 'v2.0.0',
        title: 'Duale Generierungsmodi und Multi-Editor-Export',
        items: [
          'Flow-Login (kostenlos) oder eigener Gemini/Veo-API-Schlüssel (BYOK), umschaltbar über den oberen Umschalter',
          'Export nach Adobe Premiere Pro (.prproj) und Vrew (.vrew) zusätzlich zu CapCut',
          'Ist der Ziel-Editor nicht installiert, führt der Export zur Download-Seite',
        ],
      },
      {
        version: 'v1.1.0',
        title: '@Mention-Referenzen und schnellere Batches',
        items: [
          '@Mention im Prompt hängt Referenzbilder inline an, inklusive Handhabung koreanischer Partikel',
          'Getrennte Limits für Bild-/Video-Parallelität und keine zufälligen Startverzögerungen mehr',
          'Standard-Bildmodell auf Nano Banana 2 angehoben',
        ],
      },
      {
        version: 'v1.0.0',
        title: 'Umstieg auf die offizielle Gemini/Veo-API',
        items: [
          'Flow-Web-Automatisierung ersetzt durch eine direkte Verbindung zur offiziellen Google-Gemini/Veo-API',
          'Timeline-Videovorschau mit getrennten I2V-/T2V-Spuren',
          'I2V und T2V in einem Durchgang als getrennte CapCut-Spuren exportiert',
        ],
      },
      {
        version: 'v0.9.15 und früher',
        title: 'Legacy-Binaries wurden entfernt',
        items: [
          'Frühere Versionen hingen vom Google-Flow-Web-Workflow ab.',
          'Da der Zugriff auf Google Flow blockiert oder geändert wurde, wurden diese Binaries entfernt.',
          'Für neue Installationen oder Reinstalls bitte v1.0.0 oder neuer mit Gemini/Veo-API-Workflow verwenden.',
        ],
      },
    ],
  },
};

export default function ReleaseNotesSection({ lang }: { lang: Language }) {
  const copy = releaseCopy[lang];
  const releasesUrl = 'https://github.com/touchizen/AutoFlowCut/releases';

  return (
    <section id="release-notes" className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-4">
            🗒️ {copy.eyebrow}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {copy.title}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            {copy.subtitle}
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          <article className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/40 dark:to-blue-950/30 rounded-2xl border border-cyan-200 dark:border-cyan-800 p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-cyan-600 text-white rounded-full text-xs font-bold mb-3">
                  {copy.latestLabel}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {copy.latestTitle}
                </h3>
              </div>
              <a
                href={releasesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm font-semibold transition-all hover:-translate-y-0.5"
              >
                {copy.githubLabel}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              {copy.latestSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {copy.latestHighlights.map((item) => (
                <div
                  key={item.title}
                  className="bg-white/80 dark:bg-gray-900/70 rounded-xl border border-white/80 dark:border-gray-800 p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <section className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="mb-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {copy.recentTitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {copy.recentSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {copy.recent.map((release) => (
                <article
                  key={release.version}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
                >
                  <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                    {release.version}
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    {release.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {release.summary}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <details className="group bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <summary className="flex cursor-pointer list-none flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {copy.previousTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {copy.previousSummary}
                </p>
              </div>
              <span className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm">
                {copy.showMore}
                <svg
                  className="w-4 h-4 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>

            <div className="border-t border-gray-200 dark:border-gray-800 p-6 space-y-4">
              {copy.older.map((release) => (
                <article
                  key={release.version}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between mb-3">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {release.title}
                    </h4>
                    <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                      {release.version}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {release.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
