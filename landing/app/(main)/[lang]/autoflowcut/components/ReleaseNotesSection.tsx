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
    latestTitle: 'v2.1.0 - 듀얼 생성 모드 · 멀티 에디터 내보내기 · 오픈소스',
    latestSummary:
      'v2.x는 Flow 로그인과 API 키 두 가지 생성 모드, CapCut·Premiere Pro·Vrew 멀티 에디터 내보내기, AGPL v3 오픈소스를 갖춘 라인입니다. v2.1.0은 프리뷰 모니터 마스터 음소거/볼륨과 Flow @멘션 개선을 담았습니다.',
    latestHighlights: [
      {
        title: '듀얼 생성 모드 (Flow 로그인 / API 키)',
        desc: '저비용 구독으로 무료 생성하는 Flow 로그인 모드와, 빠른 대량 작업에 맞는 내 API 키(BYOK) 모드를 상단 토글로 자유롭게 전환합니다.',
      },
      {
        title: '멀티 에디터 내보내기',
        desc: 'CapCut, Adobe Premiere Pro(.prproj), Vrew(.vrew) 프로젝트로 원클릭 내보내기를 지원합니다.',
      },
      {
        title: 'AGPL v3 오픈소스',
        desc: 'AutoFlowCut은 AGPL v3 오픈소스입니다. GitHub에서 코드 확인·셀프호스팅·기여가 가능합니다.',
      },
      {
        title: '프리뷰 모니터 마스터 컨트롤',
        desc: '프리뷰 영상과 나레이션/보이스/SFX 오디오 트랙을 하나의 마스터 음소거·볼륨 슬라이더로 제어합니다(전체화면 포함).',
      },
      {
        title: 'Flow @멘션 생성 개선',
        desc: 'T2V/R2V에서 @멘션 캐릭터를 지원하고, @멘션 씬을 병렬 생성하도록 개선했습니다.',
      },
      {
        title: '한국어 @멘션 조사 처리',
        desc: '@멘션 뒤에 붙는 은/는/이/가 같은 조사를 자동으로 분리해 레퍼런스 이미지가 들어간 한국어 프롬프트를 자연스럽게 작성할 수 있습니다.',
      },
    ],
    recentTitle: '지원 중인 이전 릴리즈',
    recentSummary: '다운로드 가능한 2.x 라인을 기본 목록에 표시합니다.',
    recent: [
      {
        version: 'v2.0.0',
        title: '듀얼 생성 모드 · 멀티 에디터 도입',
        summary: 'Flow 로그인/API 키 듀얼 생성 모드와 CapCut·Premiere·Vrew 멀티 에디터 내보내기를 도입한 릴리즈입니다.',
      },
      {
        version: 'v1.1.0',
        title: '배치 생성 속도와 프롬프트 경험 개선',
        summary: '대량 생성 작업을 더 예측 가능하게 만들고, 기본 이미지 모델(Nano Banana 2)과 한국어 프롬프트 작성 경험을 다듬었습니다.',
      },
    ],
    previousTitle: '레거시 이력 및 바이너리 제공 중단',
    previousSummary: 'v0.9.15 및 이전은 Google Flow 웹 워크플로우 기반이라 현재 바이너리를 제공하지 않습니다.',
    showMore: '레거시 이력 보기',
    githubLabel: 'GitHub Releases에서 전체 보기',
    older: [
      {
        version: 'v0.9.15 및 이전',
        title: '레거시 바이너리 제공 중단',
        items: [
          '이전 버전은 Google Flow 웹 워크플로우를 사용했습니다.',
          'Google Flow 접근이 차단되거나 변경되어 해당 바이너리는 모두 제거했습니다.',
          '새 설치와 재설치는 Gemini/Veo API 기반 v1.0.0 이상을 사용해 주세요.',
        ],
      },
      {
        version: 'v0.9.14',
        title: '레퍼런스 이미지 전달 핫픽스',
        items: [
          'Flow 요청에서 레퍼런스 이미지를 imageInputs[] 형식으로 전달',
          '응답 매칭 로직을 여러 포맷에 대응하도록 보강',
        ],
      },
      {
        version: 'v0.9.13',
        title: 'SRT/CSV 트랙 분리와 자막 안정화',
        items: [
          'SRT 전용 트랙 모델과 CSV 장면 모델을 분리',
          'SRT 재가져오기, MCP 업데이트, CapCut 자막 내보내기 경로를 보강',
          '비디오 포스터 썸네일과 lazy loading으로 미리보기 성능 개선',
        ],
      },
      {
        version: 'v0.9.12',
        title: 'SRT/Text/CSV 순차 가져오기 개선',
        items: [
          '여러 입력 파일을 순서대로 병합할 때 기존 필드를 보존',
          'SRT 기반 스토리 입력과 CSV 편집 흐름을 더 유연하게 연결',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Release Notes',
    title: 'Version History',
    subtitle: 'The latest version gets the detail; older releases stay compact until you need the full history.',
    latestLabel: 'Current version',
    latestTitle: 'v2.1.0 - Dual generation modes, multi-editor export, open source',
    latestSummary:
      'The v2.x line adds two generation modes (Flow login and API key), multi-editor export to CapCut, Premiere Pro, and Vrew, and AGPL v3 open source. v2.1.0 brings preview-monitor master mute/volume and Flow @mention improvements.',
    latestHighlights: [
      {
        title: 'Dual generation modes (Flow login / API key)',
        desc: 'Switch anytime from the top toggle: Flow login for free generation on a low-cost subscription, or your own API key (BYOK) for faster, pay-as-you-go bulk work.',
      },
      {
        title: 'Multi-editor export',
        desc: 'One-click export to CapCut, Adobe Premiere Pro (.prproj), or Vrew (.vrew) projects.',
      },
      {
        title: 'Open source (AGPL v3)',
        desc: 'AutoFlowCut is open source under AGPL v3 — inspect the code, self-host, or contribute on GitHub.',
      },
      {
        title: 'Preview monitor master controls',
        desc: 'A single master mute button and volume slider control both the preview video and the narration/voice/SFX audio tracks, including in fullscreen.',
      },
      {
        title: 'Flow @mention generation',
        desc: 'Flow login now supports @mention characters in T2V/R2V generation and parallelizes @mention scenes.',
      },
      {
        title: 'Korean @mention particles',
        desc: 'Korean particles such as eun/neun/i/ga are split automatically after @mentions, so reference-image prompts stay natural.',
      },
    ],
    recentTitle: 'Supported Previous Releases',
    recentSummary: 'Downloadable 2.x releases are shown in the default list.',
    recent: [
      {
        version: 'v2.0.0',
        title: 'Dual modes and multi-editor export',
        summary: 'Introduced the Flow login / API key dual generation modes and multi-editor export to CapCut, Premiere Pro, and Vrew.',
      },
      {
        version: 'v1.1.0',
        title: 'Faster batches and cleaner prompt handling',
        summary: 'More predictable batch generation, updated image defaults (Nano Banana 2), and smoother Korean prompt editing with reference mentions.',
      },
    ],
    previousTitle: 'Legacy History and Removed Binaries',
    previousSummary: 'v0.9.15 and earlier used the Google Flow web workflow, so those binaries are no longer provided.',
    showMore: 'Show legacy history',
    githubLabel: 'View all on GitHub Releases',
    older: [
      {
        version: 'v0.9.15 and earlier',
        title: 'Legacy binaries were removed',
        items: [
          'Earlier versions depended on the Google Flow web workflow.',
          'Because Google Flow access is now blocked or changed, those binaries were removed.',
          'For new installs or reinstalls, use v1.0.0 or later with the Gemini/Veo API workflow.',
        ],
      },
      {
        version: 'v0.9.14',
        title: 'Reference image hotfix',
        items: [
          'Reference images are sent through imageInputs[] in Flow requests',
          'Response matching handles both supported formats more reliably',
        ],
      },
      {
        version: 'v0.9.13',
        title: 'SRT/CSV track separation and subtitle reliability',
        items: [
          'Dedicated SRT track model separated from CSV scene data',
          'Stronger SRT re-import, MCP update, and CapCut subtitle export paths',
          'Video poster thumbnails and lazy loading improved preview performance',
        ],
      },
      {
        version: 'v0.9.12',
        title: 'SRT/Text/CSV sequential import improvements',
        items: [
          'Sequential file imports preserve existing fields across merges',
          'SRT story input and CSV editing workflows were connected more flexibly',
        ],
      },
    ],
  },
  ja: {
    eyebrow: 'リリースノート',
    title: 'バージョン別アップデート',
    subtitle: '最新バージョンは詳しく、過去バージョンは必要なときに展開して確認できます。',
    latestLabel: '現在のバージョン',
    latestTitle: 'v2.1.0 - デュアル生成モード・マルチエディターエクスポート・オープンソース',
    latestSummary:
      'v2.x系は、Flowログインとキーの2つの生成モード、CapCut・Premiere Pro・Vrewへのマルチエディターエクスポート、AGPL v3オープンソースを備えたラインです。v2.1.0はプレビューモニターのマスターミュート/音量とFlow @メンション改善を含みます。',
    latestHighlights: [
      {
        title: 'デュアル生成モード（Flowログイン / キー）',
        desc: '上部トグルでいつでも切り替え。低コスト定期購入で無料生成できるFlowログイン、または高速な大量作業向けの自分のキー（BYOK）を選べます。',
      },
      {
        title: 'マルチエディターエクスポート',
        desc: 'CapCut、Adobe Premiere Pro（.prproj）、Vrew（.vrew）のプロジェクトへワンクリックでエクスポートできます。',
      },
      {
        title: 'オープンソース（AGPL v3）',
        desc: 'AutoFlowCutはAGPL v3のオープンソースです。GitHubでコードの確認・セルフホスト・貢献ができます。',
      },
      {
        title: 'プレビューモニターのマスター操作',
        desc: '1つのマスターミュートボタンと音量スライダーで、プレビュー動画とナレーション/ボイス/SFXの音声トラックを（全画面でも）まとめて制御します。',
      },
      {
        title: 'Flow @メンション生成',
        desc: 'FlowログインでT2V/R2V生成の@メンションキャラクターに対応し、@メンションシーンを並列生成するよう改善しました。',
      },
      {
        title: '韓国語@メンション助詞対応',
        desc: '@メンション直後の韓国語助詞を自動分離し、参照画像つきプロンプトを自然に書けるようにしました。',
      },
    ],
    recentTitle: 'サポート中の過去リリース',
    recentSummary: 'ダウンロード可能な2.x系を標準リストに表示します。',
    recent: [
      {
        version: 'v2.0.0',
        title: 'デュアルモードとマルチエディター導入',
        summary: 'Flowログイン/キーのデュアル生成モードと、CapCut・Premiere・Vrewへのマルチエディターエクスポートを導入したリリースです。',
      },
      {
        version: 'v1.1.0',
        title: 'バッチ生成とプロンプト体験を改善',
        summary: '大量生成をより予測しやすくし、既定の画像モデル（Nano Banana 2）と韓国語プロンプト編集を整えました。',
      },
    ],
    previousTitle: 'レガシー履歴とバイナリ提供終了',
    previousSummary: 'v0.9.15以前はGoogle FlowのWebワークフローを使用していたため、現在バイナリは提供していません。',
    showMore: 'レガシー履歴を見る',
    githubLabel: 'GitHub Releasesで全て見る',
    older: [
      {
        version: 'v0.9.15以前',
        title: 'レガシーバイナリの提供終了',
        items: [
          '以前のバージョンはGoogle FlowのWebワークフローに依存していました。',
          'Google Flowへのアクセスがブロックまたは変更されたため、該当バイナリは削除しました。',
          '新規インストールや再インストールには、Gemini/Veo APIベースのv1.0.0以降を使用してください。',
        ],
      },
      {
        version: 'v0.9.14',
        title: '参照画像送信のホットフィックス',
        items: [
          'Flowリクエストで参照画像をimageInputs[]として送信',
          '複数のレスポンス形式に対応するマッチングを改善',
        ],
      },
      {
        version: 'v0.9.13',
        title: 'SRT/CSVトラック分離と字幕安定化',
        items: [
          'SRT専用トラックモデルとCSVシーンデータを分離',
          'SRT再インポート、MCP更新、CapCut字幕出力経路を強化',
          '動画ポスターサムネイルとlazy loadingでプレビュー性能を改善',
        ],
      },
      {
        version: 'v0.9.12',
        title: 'SRT/Text/CSV連続インポート改善',
        items: [
          '複数ファイルを順番に取り込む際に既存フィールドを保持',
          'SRTストーリー入力とCSV編集フローをより柔軟に接続',
        ],
      },
    ],
  },
  de: {
    eyebrow: 'Release Notes',
    title: 'Versionsverlauf',
    subtitle: 'Die aktuelle Version ist ausführlich, ältere Releases bleiben kompakt und lassen sich bei Bedarf öffnen.',
    latestLabel: 'Aktuelle Version',
    latestTitle: 'v2.1.0 - Duale Generierungsmodi, Multi-Editor-Export, Open Source',
    latestSummary:
      'Die v2.x-Linie bringt zwei Generierungsmodi (Flow-Login und API-Schlüssel), Multi-Editor-Export nach CapCut, Premiere Pro und Vrew sowie AGPL-v3-Open-Source. v2.1.0 ergänzt Master-Stummschaltung/Lautstärke im Vorschaumonitor und Flow-@Mention-Verbesserungen.',
    latestHighlights: [
      {
        title: 'Duale Generierungsmodi (Flow-Login / API-Schlüssel)',
        desc: 'Jederzeit über den oberen Umschalter wechseln: Flow-Login für kostenlose Generierung im günstigen Abo oder Ihr eigener API-Schlüssel (BYOK) für schnellere, nutzungsbasierte Massenarbeit.',
      },
      {
        title: 'Multi-Editor-Export',
        desc: 'Ein-Klick-Export in CapCut-, Adobe-Premiere-Pro- (.prproj) oder Vrew- (.vrew) Projekte.',
      },
      {
        title: 'Open Source (AGPL v3)',
        desc: 'AutoFlowCut ist Open Source unter AGPL v3 — Code einsehen, selbst hosten oder auf GitHub beitragen.',
      },
      {
        title: 'Master-Steuerung im Vorschaumonitor',
        desc: 'Ein Master-Stummschalter und Lautstärkeregler steuern sowohl das Vorschauvideo als auch die Narrations-/Voice-/SFX-Tonspuren, auch im Vollbild.',
      },
      {
        title: 'Flow-@Mention-Generierung',
        desc: 'Flow-Login unterstützt jetzt @Mention-Charaktere in der T2V/R2V-Generierung und parallelisiert @Mention-Szenen.',
      },
      {
        title: 'Koreanische @Mention-Partikel',
        desc: 'Koreanische Partikel nach @Mentions werden automatisch getrennt, damit Prompts mit Referenzbildern natürlicher bleiben.',
      },
    ],
    recentTitle: 'Unterstützte frühere Releases',
    recentSummary: 'In der Standardliste stehen herunterladbare 2.x-Releases.',
    recent: [
      {
        version: 'v2.0.0',
        title: 'Duale Modi und Multi-Editor-Export',
        summary: 'Führte die dualen Generierungsmodi (Flow-Login / API-Schlüssel) und den Multi-Editor-Export nach CapCut, Premiere Pro und Vrew ein.',
      },
      {
        version: 'v1.1.0',
        title: 'Schnellere Batches und bessere Prompts',
        summary: 'Berechenbarere Batch-Generierung, aktualisiertes Standard-Bildmodell (Nano Banana 2) und verbesserte koreanische Prompt-Bearbeitung mit Referenz-Mentions.',
      },
    ],
    previousTitle: 'Legacy-Historie und entfernte Binaries',
    previousSummary: 'v0.9.15 und früher nutzten den Google-Flow-Web-Workflow; diese Binaries werden nicht mehr bereitgestellt.',
    showMore: 'Legacy-Historie anzeigen',
    githubLabel: 'Alle auf GitHub Releases ansehen',
    older: [
      {
        version: 'v0.9.15 und früher',
        title: 'Legacy-Binaries wurden entfernt',
        items: [
          'Frühere Versionen hingen vom Google-Flow-Web-Workflow ab.',
          'Da der Zugriff auf Google Flow blockiert oder geändert wurde, wurden diese Binaries entfernt.',
          'Für neue Installationen oder Reinstalls bitte v1.0.0 oder neuer mit Gemini/Veo-API-Workflow verwenden.',
        ],
      },
      {
        version: 'v0.9.14',
        title: 'Hotfix für Referenzbilder',
        items: [
          'Referenzbilder werden in Flow-Anfragen über imageInputs[] gesendet',
          'Antwort-Matching verarbeitet mehrere unterstützte Formate zuverlässiger',
        ],
      },
      {
        version: 'v0.9.13',
        title: 'SRT/CSV-Trennung und stabilere Untertitel',
        items: [
          'Eigenes SRT-Track-Modell getrennt von CSV-Szenendaten',
          'Stärkere SRT-Reimporte, MCP-Updates und CapCut-Untertitelexporte',
          'Video-Poster-Thumbnails und Lazy Loading verbessern die Vorschauleistung',
        ],
      },
      {
        version: 'v0.9.12',
        title: 'SRT/Text/CSV-Import in Sequenz',
        items: [
          'Mehrere Importe bewahren bestehende Felder beim Zusammenführen',
          'SRT-Story-Eingabe und CSV-Bearbeitung wurden flexibler verbunden',
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
