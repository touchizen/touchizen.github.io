'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Language, languages } from '@/lib/i18n';
import { readCache, writeCache, type CacheStorage } from '@/lib/ghstars/cache';
import { SUMMARY_TTL_MS } from '@/lib/ghstars/freshness';
import {
  classifyError,
  parseSearchResponse,
  searchCacheKey,
  searchUrl,
  type RepoSummary,
  type SearchErrorKind,
} from '@/lib/ghstars/github';
import {
  classifySummaryStatus,
  GROWTH_WINDOWS,
  type Summary,
  type SummaryEntry,
  type SummaryStatus,
} from '@/lib/ghstars/summary';
import { strings } from './strings';

// Read straight from the raw CDN rather than from this site's own build output.
// The collector commits a snapshot daily; going to the source means that commit
// is live within that CDN's own cache without redeploying the site at all.
const SUMMARY_URL =
  'https://raw.githubusercontent.com/touchizen/touchizen.github.io/main/data/summary.json';

// Stays here, and stays short: this one guards the GitHub *search* API, which
// allows ten requests a minute per visitor IP and answers with live star counts.
// It has nothing to do with the snapshot's cadence, which is why the summary TTL
// lives in `lib/ghstars/freshness.ts` next to the test that ties it to the cron.
const SEARCH_TTL_MS = 10 * 60 * 1000;

const PERIOD_OPTIONS = [1, 3, 6, 12];
const STAR_OPTIONS = [1000, 5000, 10000, 50000];

// localStorage throws outright in a private window or with site data blocked;
// the cache helpers swallow that, so this only has to hand them the accessors.
const browserStorage: CacheStorage = {
  getItem: (key) => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value),
};

const compact = (n: number) => n.toLocaleString('en-US');

function StarRow({
  rank,
  repo,
  url,
  description,
  language,
  primary,
  secondary,
  estimatedNote,
}: {
  rank: number;
  repo: string;
  url: string;
  description: string;
  language: string | null;
  primary: string;
  secondary: string;
  estimatedNote?: string;
}) {
  return (
    <li className="flex gap-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <span className="w-8 shrink-0 text-sm tabular-nums text-gray-400 dark:text-gray-500 pt-1">
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-gray-900 dark:text-white hover:underline break-all"
        >
          {repo}
        </a>
        {description && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
          {language && <span>{language}</span>}
          <span>{secondary}</span>
          {estimatedNote && <span className="italic">{estimatedNote}</span>}
        </div>
      </div>
      <span className="shrink-0 text-right font-semibold tabular-nums text-gray-900 dark:text-white">
        {primary}
      </span>
    </li>
  );
}

export default function GhStarsPage() {
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;
  const lang: Language = languages.some((l) => l.code === paramLang)
    ? (paramLang as Language)
    : 'en';
  const s = strings[lang];

  const [tab, setTab] = useState<'new' | 'growth'>('new');

  const [months, setMonths] = useState(3);
  const [minStars, setMinStars] = useState(10000);
  const [results, setResults] = useState<RepoSummary[] | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorKind, setErrorKind] = useState<SearchErrorKind | null>(null);

  const [summary, setSummary] = useState<Summary | null>(null);
  const [summaryStatus, setSummaryStatus] = useState<SummaryStatus | null>(null);
  const [windowDays, setWindowDays] = useState<number>(GROWTH_WINDOWS[1]);

  const runSearch = useCallback(async () => {
    const win = {
      asOf: new Date().toISOString().slice(0, 10),
      monthsBack: months,
      minStars,
    };

    setErrorKind(null);

    // The search API allows ten requests a minute per visitor IP, so a repeated
    // question is answered from the last answer rather than from the network.
    const hit = readCache<RepoSummary[]>(
      browserStorage,
      searchCacheKey(win),
      Date.now(),
      SEARCH_TTL_MS
    );
    if (hit) {
      setResults(hit);
      setFromCache(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(searchUrl(win), {
        headers: { Accept: 'application/vnd.github+json' },
      });

      if (!response.ok) {
        setErrorKind(classifyError(response.status));
        return;
      }

      const items = parseSearchResponse(await response.json());
      writeCache(browserStorage, searchCacheKey(win), items, Date.now());
      setResults(items);
      setFromCache(false);
    } catch {
      setErrorKind('unknown');
    } finally {
      setLoading(false);
    }
  }, [months, minStars]);

  useEffect(() => {
    if (tab !== 'growth' || summary) return;

    const cached = readCache<Summary>(browserStorage, 'summary', Date.now(), SUMMARY_TTL_MS);
    if (cached) {
      setSummary(cached);
      return;
    }

    let cancelled = false;
    fetch(SUMMARY_URL)
      .then(async (response) => {
        if (cancelled) return;

        const status = classifySummaryStatus(response.status);
        setSummaryStatus(status);
        if (status !== 'ok') return;

        const json = (await response.json()) as Summary;
        writeCache(browserStorage, 'summary', json, Date.now());
        setSummary(json);
      })
      .catch(() => {
        if (!cancelled) setSummaryStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [tab, summary]);

  const errorMessage =
    errorKind === 'rate_limited'
      ? s.errorRateLimited
      : errorKind === 'invalid_query'
        ? s.errorInvalid
        : errorKind
          ? s.errorGeneric
          : null;

  const activeWindow = summary?.windows?.[windowDays];
  const growthEntries: SummaryEntry[] = activeWindow?.entries ?? [];

  const tabButton = (id: 'new' | 'growth', label: string) => (
    <button
      key={id}
      onClick={() => setTab(id)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        tab === id
          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {label}
    </button>
  );

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={(next) => router.push(`/${next}/ghstars`)} />

      <section className="pt-32 pb-20">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">{s.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{s.subtitle}</p>

            <div className="flex gap-2 mb-8">
              {tabButton('new', s.tabNew)}
              {tabButton('growth', s.tabGrowth)}
            </div>

            {tab === 'new' ? (
              <>
                <div className="flex flex-wrap items-end gap-4 mb-6">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="block mb-1">{s.labelPeriod}</span>
                    <select
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
                    >
                      {PERIOD_OPTIONS.map((m) => (
                        <option key={m} value={m}>
                          {m} {s.unitMonths}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="block mb-1">{s.labelMinStars}</span>
                    <select
                      value={minStars}
                      onChange={(e) => setMinStars(Number(e.target.value))}
                      className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
                    >
                      {STAR_OPTIONS.map((n) => (
                        <option key={n} value={n}>
                          ★ {compact(n)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    onClick={runSearch}
                    disabled={loading}
                    className="rounded-lg bg-gray-900 dark:bg-white px-6 py-2 font-medium text-white dark:text-gray-900 disabled:opacity-50"
                  >
                    {loading ? s.searching : s.search}
                  </button>
                </div>

                {errorMessage && (
                  <p className="mb-6 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
                    {errorMessage}
                  </p>
                )}

                {results && (
                  <>
                    <p data-testid="result-count" className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      {s.resultCount(results.length)}
                      {fromCache && ` · ${s.fromCache}`}
                    </p>
                    {results.length === 0 ? (
                      <p className="text-gray-600 dark:text-gray-400">{s.empty}</p>
                    ) : (
                      <ul data-testid="results">
                        {results.map((r, i) => (
                          <StarRow
                            key={r.repo}
                            rank={i + 1}
                            repo={r.repo}
                            url={r.url}
                            description={r.description}
                            language={r.language}
                            primary={`★ ${compact(r.stars)}`}
                            secondary={r.createdAt}
                          />
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">{s.growthIntro}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {GROWTH_WINDOWS.map((days) => (
                    <button
                      key={days}
                      onClick={() => setWindowDays(days)}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                        windowDays === days
                          ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white font-medium'
                          : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {s.growthWindow(days)}
                    </button>
                  ))}
                </div>

                {summaryStatus === 'not_collected_yet' && (
                  <p className="text-gray-600 dark:text-gray-400">{s.growthNoData}</p>
                )}

                {summaryStatus === 'error' && (
                  <p className="rounded-lg bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
                    {s.errorGeneric}
                  </p>
                )}

                {summary && (
                  <>
                    <p data-testid="coverage" className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      {s.growthCoverage(summary.snapshotCount, summary.firstDate ?? '—')}
                    </p>

                    {/* A window backed by fewer days than it advertises says so,
                        rather than presenting a short comparison as a full one. */}
                    {activeWindow && !activeWindow.complete && growthEntries.length > 0 && (
                      <p className="mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 px-4 py-3 text-sm text-blue-800 dark:text-blue-200">
                        {s.growthShort(activeWindow.actualDays, activeWindow.days)}
                      </p>
                    )}

                    {growthEntries.length === 0 ? (
                      <p className="text-gray-600 dark:text-gray-400">{s.growthNoData}</p>
                    ) : (
                      <ul data-testid="growth-results">
                        {growthEntries.map((e, i) => (
                          <StarRow
                            key={e.repo}
                            rank={i + 1}
                            repo={e.repo}
                            url={e.url}
                            description={e.description}
                            language={e.language}
                            primary={`+${compact(e.gained)}`}
                            secondary={`★ ${compact(e.stars)}`}
                            estimatedNote={e.estimated ? s.growthEstimated : undefined}
                          />
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </>
            )}

            <p className="mt-10 text-xs text-gray-400 dark:text-gray-500">{s.method}</p>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
