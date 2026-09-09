import type { Language } from '@/lib/i18n';

// Page-local copy. The shared lib/i18n bundle is loaded by every route on the
// site, and none of the other routes need these forty strings.
export type Strings = {
  title: string;
  subtitle: string;
  tabNew: string;
  tabGrowth: string;
  labelPeriod: string;
  labelMinStars: string;
  unitMonths: string;
  search: string;
  searching: string;
  resultCount: (n: number) => string;
  empty: string;
  fromCache: string;
  errorRateLimited: string;
  errorInvalid: string;
  errorGeneric: string;
  growthIntro: string;
  growthWindow: (days: number) => string;
  growthNoData: string;
  growthShort: (actual: number, requested: number) => string;
  growthCoverage: (snapshots: number, first: string) => string;
  growthEstimated: string;
  gained: string;
  stars: string;
  method: string;
};

export const strings: Record<Language, Strings> = {
  en: {
    title: 'GitHub Star Tracker',
    subtitle: 'Repositories that got big fast — and the ones still climbing.',
    tabNew: 'New repos',
    tabGrowth: 'Fastest growing',
    labelPeriod: 'Created within',
    labelMinStars: 'At least',
    unitMonths: 'months',
    search: 'Search',
    searching: 'Searching…',
    resultCount: (n) => `${n} repositories`,
    empty: 'No repository matches those numbers.',
    fromCache: 'from cache',
    errorRateLimited: 'GitHub rate limit reached (10 searches per minute). Try again shortly.',
    errorInvalid: 'GitHub refused that query.',
    errorGeneric: 'Could not reach GitHub.',
    growthIntro:
      'GitHub publishes no star history, so this ranking is built from snapshots taken here once a day.',
    growthWindow: (d) => `Last ${d} days`,
    growthNoData: 'Not enough snapshots yet. The first comparison appears the day after collection starts.',
    growthShort: (actual, requested) =>
      `Only ${actual} days of history so far — this is not yet a full ${requested}-day window.`,
    growthCoverage: (snapshots, first) => `${snapshots} snapshots since ${first}`,
    growthEstimated: 'entered tracking during this window, so its gain is an upper bound',
    gained: 'gained',
    stars: 'stars',
    method: 'Counts come from the GitHub Search API, called directly from your browser with no account and no token.',
  },
  ko: {
    title: 'GitHub 스타 트래커',
    subtitle: '빠르게 큰 저장소, 그리고 지금도 오르는 저장소.',
    tabNew: '신규 저장소',
    tabGrowth: '급상승',
    labelPeriod: '생성 기간',
    labelMinStars: '최소',
    unitMonths: '개월 이내',
    search: '검색',
    searching: '검색 중…',
    resultCount: (n) => `저장소 ${n}개`,
    empty: '해당 조건에 맞는 저장소가 없습니다.',
    fromCache: '캐시',
    errorRateLimited: 'GitHub 요청 한도에 걸렸습니다 (분당 10회). 잠시 후 다시 시도하세요.',
    errorInvalid: 'GitHub가 이 조건을 거부했습니다.',
    errorGeneric: 'GitHub에 연결하지 못했습니다.',
    growthIntro:
      'GitHub는 스타 증가 기록을 제공하지 않습니다. 이 순위는 하루 한 번 직접 수집한 스냅샷으로 계산합니다.',
    growthWindow: (d) => `최근 ${d}일`,
    growthNoData: '아직 스냅샷이 부족합니다. 수집 시작 다음 날부터 비교가 나옵니다.',
    growthShort: (actual, requested) =>
      `지금까지 ${actual}일치만 쌓였습니다 — 아직 ${requested}일 전체 구간이 아닙니다.`,
    growthCoverage: (snapshots, first) => `${first}부터 스냅샷 ${snapshots}개`,
    growthEstimated: '이 구간 도중 수집에 들어와서 증가량은 최대값 기준입니다',
    gained: '증가',
    stars: '스타',
    method: '스타 수는 GitHub 검색 API에서 브라우저가 직접 가져옵니다. 계정도 토큰도 쓰지 않습니다.',
  },
  ja: {
    title: 'GitHub スタートラッカー',
    subtitle: '急成長したリポジトリと、今も伸びているリポジトリ。',
    tabNew: '新規リポジトリ',
    tabGrowth: '急上昇',
    labelPeriod: '作成期間',
    labelMinStars: '最低',
    unitMonths: 'ヶ月以内',
    search: '検索',
    searching: '検索中…',
    resultCount: (n) => `リポジトリ ${n} 件`,
    empty: '条件に合うリポジトリがありません。',
    fromCache: 'キャッシュ',
    errorRateLimited: 'GitHub のレート制限に達しました（毎分10回）。しばらくしてからお試しください。',
    errorInvalid: 'GitHub がこの条件を拒否しました。',
    errorGeneric: 'GitHub に接続できませんでした。',
    growthIntro:
      'GitHub はスター履歴を公開していないため、この順位は1日1回ここで取得したスナップショットから算出しています。',
    growthWindow: (d) => `直近 ${d} 日`,
    growthNoData: 'スナップショットがまだ足りません。収集開始の翌日から比較が表示されます。',
    growthShort: (actual, requested) =>
      `現在 ${actual} 日分のみ — まだ ${requested} 日の完全な期間ではありません。`,
    growthCoverage: (snapshots, first) => `${first} 以降 ${snapshots} 件のスナップショット`,
    growthEstimated: 'この期間の途中で収集対象になったため、増加数は上限値です',
    gained: '増加',
    stars: 'スター',
    method: 'スター数は GitHub 検索 API からブラウザが直接取得します。アカウントもトークンも使いません。',
  },
  de: {
    title: 'GitHub-Star-Tracker',
    subtitle: 'Repositories, die schnell groß wurden — und die, die weiter steigen.',
    tabNew: 'Neue Repositories',
    tabGrowth: 'Am schnellsten wachsend',
    labelPeriod: 'Erstellt innerhalb',
    labelMinStars: 'Mindestens',
    unitMonths: 'Monaten',
    search: 'Suchen',
    searching: 'Suche läuft…',
    resultCount: (n) => `${n} Repositories`,
    empty: 'Kein Repository passt zu diesen Werten.',
    fromCache: 'aus dem Cache',
    errorRateLimited: 'GitHub-Ratenlimit erreicht (10 Suchen pro Minute). Bitte kurz warten.',
    errorInvalid: 'GitHub hat diese Abfrage abgelehnt.',
    errorGeneric: 'GitHub war nicht erreichbar.',
    growthIntro:
      'GitHub veröffentlicht keine Star-Historie, daher entsteht diese Rangliste aus Snapshots, die hier einmal täglich erhoben werden.',
    growthWindow: (d) => `Letzte ${d} Tage`,
    growthNoData: 'Noch zu wenige Snapshots. Der erste Vergleich erscheint am Tag nach dem Start der Erhebung.',
    growthShort: (actual, requested) =>
      `Bisher nur ${actual} Tage Historie — noch kein vollständiger ${requested}-Tage-Zeitraum.`,
    growthCoverage: (snapshots, first) => `${snapshots} Snapshots seit ${first}`,
    growthEstimated: 'kam während dieses Zeitraums in die Erhebung, der Zuwachs ist daher eine Obergrenze',
    gained: 'Zuwachs',
    stars: 'Sterne',
    method: 'Die Zahlen kommen direkt aus der GitHub-Such-API, aufgerufen vom Browser ohne Konto und ohne Token.',
  },
};
