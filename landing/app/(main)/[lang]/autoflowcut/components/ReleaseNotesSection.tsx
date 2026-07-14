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
    latestTitle: 'v3.0.2 - Story 모드: 대본 한 편에서 영상 한 편까지',
    latestSummary:
      'v3.x는 앱 안에서 대본을 쓰고 영상까지 끝내는 Story 모드를 도입한 라인입니다. v3.0.2는 현재 배포 중인 빌드로, v3.0.0의 Story 모드 위에 오류 리포팅 프라이버시 수정과 생성 안정화 수정을 더했습니다.',
    latestHighlights: [
      {
        title: 'Story 모드 (대본 → 영상, 한 앱에서)',
        desc: 'AI로 대본을 쓰거나(Claude · Codex) 직접 쓴 대본을 가져온 뒤, 리서치 · 시놉시스 · 씬 분리 · 음성 · 효과음까지 하나의 파이프라인으로 이어갑니다.',
      },
      {
        title: '화자별 TTS + 효과음 자동 추출',
        desc: 'Typecast · ElevenLabs · Gemini를 화자별로 지정하고 성우를 검색·미리듣기합니다. 효과음은 대본에서 자동으로 뽑아 씬에 배치합니다.',
      },
      {
        title: '캐릭터 레퍼런스 자동 등록 · @멘션 지정',
        desc: '대본 속 인물이 레퍼런스 카드로 자동 등록되고, 프롬프트에서 @멘션으로 씬에 붙여 넣습니다.',
      },
      {
        title: '전체 실행 (자동 파이프라인)',
        desc: '믿을 만한 스텝에 \'자동\'을 켜두고 \'전체 실행\'을 누르면 파이프라인이 끝까지 알아서 돕니다.',
      },
      {
        title: 'Intel(x64) 맥 지원',
        desc: 'Apple Silicon(arm64)과 함께 Intel(x64) 맥용 빌드를 처음 제공합니다. M1 이상은 arm64, Intel 맥은 x64를 받으세요.',
      },
      {
        title: '프라이버시 수정 (v3.0.2)',
        desc: '오류 리포트에서 로그인 토큰 · API 키 · 프롬프트 · 캐릭터 이름이 제거됩니다. 파일 경로는 계정 이름만 가려지고, 나머지 경로는 진단을 위해 남습니다.',
      },
    ],
    recentTitle: '최근 릴리즈',
    recentSummary: '3.x 릴리즈와 마지막 2.x 릴리즈입니다. 3.0.0 · 3.0.1 사용 중이라면 3.0.2로 업데이트해 주세요.',
    recent: [
      {
        version: 'v3.0.1',
        title: '생성 실패 긴급 수정',
        summary: 'v3.0.0에서 모든 씬의 생성이 실패하던 문제를 수정했습니다. v3.0.2로 대체되었으니 아직 쓰고 계시면 업데이트해 주세요.',
      },
      {
        version: 'v3.0.0',
        title: 'Story 모드 도입',
        summary: 'Story 모드, 화자별 TTS · 효과음, 첫 Intel 맥 빌드를 담은 릴리즈입니다. v3.0.2로 대체되었으니 아직 쓰고 계시면 업데이트해 주세요.',
      },
      {
        version: 'v2.1.0',
        title: '프리뷰 마스터 컨트롤 · Flow @멘션',
        summary: '마지막 2.x 릴리즈입니다. 프리뷰 모니터 마스터 음소거/볼륨과 @멘션(캐릭터) 비디오 생성 수정을 담았습니다.',
      },
    ],
    previousTitle: '이전 릴리즈 및 레거시 바이너리',
    previousSummary: 'v2.0.0 이하 릴리즈와, 더 이상 배포하지 않는 레거시 Flow 시절 빌드입니다.',
    showMore: '이전 릴리즈 보기',
    githubLabel: 'GitHub Releases에서 전체 보기',
    older: [
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
    latestTitle: 'v3.0.2 - Story mode: from a script to a finished video',
    latestSummary:
      'The v3.x line introduced Story mode — take a story from a blank page to a finished video without leaving the app. v3.0.2 is the current build: it adds the error-reporting privacy fix and the generation reliability fixes on top of the Story mode shipped in v3.0.0.',
    latestHighlights: [
      {
        title: 'Story mode (script to video in one app)',
        desc: 'Let the AI write the script (Claude · Codex) or import your own, then carry it through research, synopsis, scene splitting, voice, and sound effects in a single pipeline.',
      },
      {
        title: 'Per-speaker TTS and automatic sound effects',
        desc: 'Assign Typecast, ElevenLabs, or Gemini per speaker and preview voices in a picker. Sound effects are pulled out of the script automatically and placed on scenes.',
      },
      {
        title: 'Character references, registered and @mentioned',
        desc: 'Characters in your script register themselves as reference cards; drop them into a scene with an @mention in the prompt.',
      },
      {
        title: '"Run all" auto-pipeline',
        desc: 'Tick "auto" on the steps you trust, hit "Run all", and the pipeline carries itself to the end.',
      },
      {
        title: 'Intel (x64) Mac support',
        desc: 'The first Intel Mac build ships alongside Apple Silicon. On M1 and later grab arm64; on an Intel Mac grab x64.',
      },
      {
        title: 'Privacy fix (v3.0.2)',
        desc: 'Error reports no longer carry your sign-in token, API key, prompts, or character names. File paths keep only the account name redacted — the rest of the path is retained for diagnostics.',
      },
    ],
    recentTitle: 'Recent Releases',
    recentSummary: 'The 3.x releases plus the last 2.x release. If you are on 3.0.0 or 3.0.1, please update to 3.0.2.',
    recent: [
      {
        version: 'v3.0.1',
        title: 'Generation fix (critical)',
        summary: 'Fixed generation failing on every scene in v3.0.0. Superseded by v3.0.2 — please update if you are still on it.',
      },
      {
        version: 'v3.0.0',
        title: 'Story mode introduced',
        summary: 'Brought Story mode, per-speaker TTS and sound effects, and the first Intel Mac build. Superseded by v3.0.2 — please update if you are still on it.',
      },
      {
        version: 'v2.1.0',
        title: 'Preview master controls and Flow @mention',
        summary: 'The last 2.x release: preview-monitor master mute/volume and fixes for @mention (character) video generation.',
      },
    ],
    previousTitle: 'Older Releases and Removed Legacy Binaries',
    previousSummary: 'v2.0.0 and earlier, plus the legacy Flow-era builds that are no longer distributed.',
    showMore: 'Show older releases',
    githubLabel: 'View all on GitHub Releases',
    older: [
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
    latestTitle: 'v3.0.2 - ストーリーモード：台本から完成動画まで',
    latestSummary:
      'v3.x系は、アプリ内で台本から完成動画までを仕上げるストーリーモードを導入したラインです。v3.0.2は現在の配布ビルドで、v3.0.0のストーリーモードにエラーレポートのプライバシー修正と生成の安定化修正を加えています。',
    latestHighlights: [
      {
        title: 'ストーリーモード（台本から動画まで1つのアプリで）',
        desc: 'AIに台本を書かせる（Claude · Codex）か自分の台本を取り込み、リサーチ・シノプシス・シーン分割・音声・効果音までを1つのパイプラインで進めます。',
      },
      {
        title: '話者別TTSと効果音の自動抽出',
        desc: 'Typecast・ElevenLabs・Geminiを話者ごとに指定し、ピッカーで声を検索・試聴できます。効果音は台本から自動で抽出してシーンに配置します。',
      },
      {
        title: 'キャラクター参照の自動登録と@メンション指定',
        desc: '台本の登場人物が参照カードとして自動登録され、プロンプトの@メンションでシーンに割り当てられます。',
      },
      {
        title: '「一括実行」自動パイプライン',
        desc: '任せられるステップに「自動」をオンにして「一括実行」を押せば、パイプラインが最後まで自走します。',
      },
      {
        title: 'Intel（x64）Mac対応',
        desc: 'Apple Siliconに加え、初のIntel Mac向けビルドを提供します。M1以降はarm64、Intel Macはx64をお選びください。',
      },
      {
        title: 'プライバシー修正（v3.0.2）',
        desc: 'エラーレポートからログイントークン・APIキー・プロンプト・キャラクター名が除去されます。ファイルパスはアカウント名のみが伏せられ、残りは診断のために保持されます。',
      },
    ],
    recentTitle: '最近のリリース',
    recentSummary: '3.x系のリリースと最後の2.xリリースです。3.0.0・3.0.1をお使いの場合は3.0.2へ更新してください。',
    recent: [
      {
        version: 'v3.0.1',
        title: '生成失敗の緊急修正',
        summary: 'v3.0.0ですべてのシーンの生成が失敗する問題を修正しました。v3.0.2に置き換わっているため、まだお使いの場合は更新してください。',
      },
      {
        version: 'v3.0.0',
        title: 'ストーリーモード導入',
        summary: 'ストーリーモード、話者別TTSと効果音、初のIntel Macビルドを含むリリースです。v3.0.2に置き換わっているため、まだお使いの場合は更新してください。',
      },
      {
        version: 'v2.1.0',
        title: 'プレビューのマスター操作とFlow @メンション',
        summary: '最後の2.xリリースです。プレビューモニターのマスターミュート/音量と、@メンション（キャラクター）動画生成の修正を含みます。',
      },
    ],
    previousTitle: '過去のリリースとレガシーバイナリ',
    previousSummary: 'v2.0.0以前のリリースと、提供を終了したレガシーFlow時代のビルドです。',
    showMore: '過去のリリースを見る',
    githubLabel: 'GitHub Releasesで全て見る',
    older: [
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
    latestTitle: 'v3.0.2 - Story-Modus: vom Skript zum fertigen Video',
    latestSummary:
      'Die v3.x-Linie führte den Story-Modus ein — vom leeren Blatt bis zum fertigen Video, ohne die App zu verlassen. v3.0.2 ist der aktuelle Build: Er ergänzt den Story-Modus aus v3.0.0 um den Datenschutz-Fix beim Fehlerreporting und um Stabilitäts-Fixes bei der Generierung.',
    latestHighlights: [
      {
        title: 'Story-Modus (vom Skript zum Video in einer App)',
        desc: 'Die KI schreibt das Skript (Claude · Codex) oder Sie importieren Ihr eigenes — und führen es durch Recherche, Synopsis, Szenenaufteilung, Stimme und Soundeffekte in einer einzigen Pipeline.',
      },
      {
        title: 'TTS pro Sprecher und automatische Soundeffekte',
        desc: 'Typecast, ElevenLabs oder Gemini pro Sprecher zuweisen und Stimmen im Picker suchen und anhören. Soundeffekte werden automatisch aus dem Skript gezogen und auf Szenen gelegt.',
      },
      {
        title: 'Charakter-Referenzen automatisch registriert und per @Mention zugewiesen',
        desc: 'Figuren aus Ihrem Skript registrieren sich selbst als Referenzkarten; per @Mention im Prompt landen sie in der Szene.',
      },
      {
        title: '„Alles ausführen“ — automatische Pipeline',
        desc: 'Setzen Sie „Auto“ bei den Schritten, denen Sie vertrauen, drücken Sie „Alles ausführen“, und die Pipeline läuft bis zum Ende durch.',
      },
      {
        title: 'Unterstützung für Intel-(x64-)Macs',
        desc: 'Neben Apple Silicon gibt es erstmals einen Intel-Mac-Build. Ab M1 nehmen Sie arm64, auf Intel-Macs x64.',
      },
      {
        title: 'Datenschutz-Fix (v3.0.2)',
        desc: 'Fehlerberichte enthalten kein Anmelde-Token, keinen API-Schlüssel, keine Prompts und keine Figurennamen mehr. In Dateipfaden wird nur der Kontoname geschwärzt — der übrige Pfad bleibt für die Diagnose erhalten.',
      },
    ],
    recentTitle: 'Neuere Releases',
    recentSummary: 'Die 3.x-Releases sowie das letzte 2.x-Release. Wer 3.0.0 oder 3.0.1 nutzt, sollte auf 3.0.2 aktualisieren.',
    recent: [
      {
        version: 'v3.0.1',
        title: 'Kritischer Generierungs-Fix',
        summary: 'Behebt, dass in v3.0.0 die Generierung bei jeder Szene fehlschlug. Durch v3.0.2 abgelöst — bitte aktualisieren, falls noch im Einsatz.',
      },
      {
        version: 'v3.0.0',
        title: 'Story-Modus eingeführt',
        summary: 'Brachte den Story-Modus, TTS pro Sprecher und Soundeffekte sowie den ersten Intel-Mac-Build. Durch v3.0.2 abgelöst — bitte aktualisieren, falls noch im Einsatz.',
      },
      {
        version: 'v2.1.0',
        title: 'Master-Steuerung der Vorschau und Flow-@Mention',
        summary: 'Das letzte 2.x-Release: Master-Stummschaltung/Lautstärke im Vorschaumonitor und Fixes für die @Mention-(Charakter-)Videogenerierung.',
      },
    ],
    previousTitle: 'Ältere Releases und entfernte Legacy-Binaries',
    previousSummary: 'v2.0.0 und früher sowie die Legacy-Builds aus der Flow-Ära, die nicht mehr verteilt werden.',
    showMore: 'Ältere Releases anzeigen',
    githubLabel: 'Alle auf GitHub Releases ansehen',
    older: [
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
