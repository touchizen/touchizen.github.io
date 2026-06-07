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
    latestTitle: 'v1.1.0 - 배치 생성 속도와 프롬프트 경험 개선',
    latestSummary:
      'v1.1.0은 대량 생성 작업을 더 예측 가능하게 만들고, 기본 이미지 모델과 한국어 프롬프트 작성 경험을 최신 상태로 맞춘 업데이트입니다.',
    latestHighlights: [
      {
        title: 'Nano Banana 2 기본 적용',
        desc: '기본 이미지 모델을 gemini-3.1-flash-image 기반 Nano Banana 2로 전환하고, 메인 프로세스 기본값까지 동기화했습니다.',
      },
      {
        title: '이미지/비디오 동시 생성 분리',
        desc: '이미지와 Veo 비디오의 동시 생성 수를 따로 설정할 수 있으며, 비디오는 기본 4개까지 슬라이딩 윈도우 방식으로 처리됩니다.',
      },
      {
        title: '무작위 대기 제거',
        desc: '7~15초 랜덤 딜레이 대신 설정 기반 큐 처리로 바꿔 긴 배치에서도 작업 흐름이 더 또렷해졌습니다.',
      },
      {
        title: 'Veo 작업 안정성 보강',
        desc: '무한 폴링 방지, NaN 동시성 값 차단, 인증 오류 카운트 처리를 보강해 실패 상황을 더 안전하게 다룹니다.',
      },
      {
        title: '한국어 @멘션 조사 처리',
        desc: '@멘션 뒤에 붙는 은/는/이/가 같은 조사를 자동으로 분리해 레퍼런스 이미지가 들어간 한국어 프롬프트를 자연스럽게 작성할 수 있습니다.',
      },
    ],
    recentTitle: '지원 중인 이전 릴리즈',
    recentSummary: '다운로드 가능한 API 기반 1.x 라인만 기본 목록에 표시합니다.',
    recent: [
      {
        version: 'v1.0.1',
        title: '프롬프트 레퍼런스와 미디어 미리보기 보강',
        summary: '@멘션으로 레퍼런스 이미지를 프롬프트에 직접 연결하고, 비디오 미리보기와 I2V 복원 경로를 다듬었습니다.',
      },
      {
        version: 'v1.0.0',
        title: '공식 Gemini/Veo API 기반 첫 공개 버전',
        summary: 'Google Flow 웹 자동화에서 완전 API 기반으로 전환했습니다. 이미지 100장 기준 약 2~5분 생성이 가능해진 첫 안정 릴리즈입니다.',
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
    latestTitle: 'v1.1.0 - Faster batches and cleaner prompt handling',
    latestSummary:
      'v1.1.0 focuses on more predictable batch generation, updated image defaults, and smoother Korean prompt editing with reference mentions.',
    latestHighlights: [
      {
        title: 'Nano Banana 2 by default',
        desc: 'The default image model now uses Nano Banana 2 on gemini-3.1-flash-image, with the main-process default kept in sync.',
      },
      {
        title: 'Separate image/video concurrency',
        desc: 'Image and Veo video concurrency can be tuned independently, with video generation using a sliding window and a default of 4 jobs.',
      },
      {
        title: 'Random waits removed',
        desc: 'The old 7-15 second random delay has been replaced with settings-based queue execution for clearer long-batch behavior.',
      },
      {
        title: 'Veo stability fixes',
        desc: 'Polling guards, NaN concurrency checks, and authentication error counting were tightened for safer failure handling.',
      },
      {
        title: 'Korean @mention particles',
        desc: 'Korean particles such as eun/neun/i/ga are split automatically after @mentions, so reference-image prompts stay natural.',
      },
    ],
    recentTitle: 'Supported Previous Releases',
    recentSummary: 'Only downloadable API-based 1.x releases are shown in the default list.',
    recent: [
      {
        version: 'v1.0.1',
        title: 'Reference prompts and media previews',
        summary: '@mentions attach reference images inside prompts, with better video preview behavior and corrected I2V restore routing.',
      },
      {
        version: 'v1.0.0',
        title: 'First public Gemini/Veo API release',
        summary: 'The first stable release after the full move from Google Flow web automation to API-based generation, reaching about 100 images in about 2-5 minutes.',
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
    latestTitle: 'v1.1.0 - バッチ生成とプロンプト体験を改善',
    latestSummary:
      'v1.1.0は、大量生成の予測しやすさ、画像モデルの既定値、韓国語プロンプト編集を整えたアップデートです。',
    latestHighlights: [
      {
        title: 'Nano Banana 2を標準化',
        desc: '既定の画像モデルをgemini-3.1-flash-imageベースのNano Banana 2へ変更し、メインプロセス側の既定値も同期しました。',
      },
      {
        title: '画像/動画の同時生成を分離',
        desc: '画像とVeo動画の同時生成数を別々に設定でき、動画は既定4件のスライディングウィンドウで処理します。',
      },
      {
        title: 'ランダム待機を削除',
        desc: '7〜15秒のランダム待機をやめ、設定値に基づくキュー処理で長いバッチの流れを把握しやすくしました。',
      },
      {
        title: 'Veo処理の安定性を強化',
        desc: '無限ポーリング防止、NaN同時実行値のガード、認証エラーのカウント処理を改善しました。',
      },
      {
        title: '韓国語@メンション助詞対応',
        desc: '@メンション直後の韓国語助詞を自動分離し、参照画像つきプロンプトを自然に書けるようにしました。',
      },
    ],
    recentTitle: 'サポート中の過去リリース',
    recentSummary: 'ダウンロード可能なAPIベースの1.x系のみを標準リストに表示します。',
    recent: [
      {
        version: 'v1.0.1',
        title: '参照プロンプトとメディアプレビューを改善',
        summary: '@メンションで参照画像をプロンプトに直接添付し、動画プレビューとI2V復元経路を改善しました。',
      },
      {
        version: 'v1.0.0',
        title: 'Gemini/Veo APIベースの初回公開版',
        summary: 'Google FlowのWeb自動化から完全APIベースへ移行し、画像100枚を約2〜5分で生成できるようになった初回安定版です。',
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
    latestTitle: 'v1.1.0 - Schnellere Batches und bessere Prompts',
    latestSummary:
      'v1.1.0 macht Batch-Generierung berechenbarer, aktualisiert das Standard-Bildmodell und verbessert koreanische Prompts mit Referenz-Mentions.',
    latestHighlights: [
      {
        title: 'Nano Banana 2 als Standard',
        desc: 'Das Standard-Bildmodell nutzt jetzt Nano Banana 2 auf Basis von gemini-3.1-flash-image; der Main-Process-Standard wurde synchronisiert.',
      },
      {
        title: 'Separate Bild-/Video-Parallelität',
        desc: 'Bild- und Veo-Video-Parallelität lassen sich getrennt einstellen; Videos laufen standardmäßig mit 4 Jobs im Sliding-Window-Verfahren.',
      },
      {
        title: 'Zufällige Wartezeiten entfernt',
        desc: 'Die früheren 7-15 Sekunden Zufallswartezeit wurden durch eine einstellungsbasierte Queue ersetzt.',
      },
      {
        title: 'Stabilere Veo-Jobs',
        desc: 'Polling-Grenzen, NaN-Checks für Parallelität und Auth-Fehlerzählung wurden für sicherere Fehlerfälle gehärtet.',
      },
      {
        title: 'Koreanische @Mention-Partikel',
        desc: 'Koreanische Partikel nach @Mentions werden automatisch getrennt, damit Prompts mit Referenzbildern natürlicher bleiben.',
      },
    ],
    recentTitle: 'Unterstützte frühere Releases',
    recentSummary: 'In der Standardliste stehen nur herunterladbare API-basierte 1.x-Releases.',
    recent: [
      {
        version: 'v1.0.1',
        title: 'Referenz-Prompts und Medienvorschau',
        summary: '@Mentions hängen Referenzbilder direkt an Prompts an; Videovorschau und I2V-Wiederherstellung wurden verbessert.',
      },
      {
        version: 'v1.0.0',
        title: 'Erstes öffentliches Gemini/Veo-API-Release',
        summary: 'Das erste stabile Release nach dem vollständigen Wechsel von Google-Flow-Web-Automation zu API-basierter Generierung, mit etwa 100 Bildern in ca. 2-5 Minuten.',
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
