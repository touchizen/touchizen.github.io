// Daily star snapshot collector.
//
// GitHub serves no star history, so this is the only place the history comes
// from: one snapshot per day, appended and never rewritten. Missing a day
// leaves a gap that can never be backfilled, which is why the workflow that
// runs this is scheduled rather than triggered by a push.
//
// Output lives in the repository's `data/` directory and is read straight from
// raw.githubusercontent.com by the page, so a collector commit is live within
// the CDN's five-minute cache and never needs a site rebuild.

import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeSearchPages, sortKeys, staleSnapshotDates } from '../lib/ghstars/collect';
import { parseSearchResponse, SEARCH_ENDPOINT, type RepoSummary } from '../lib/ghstars/github';
import { buildSummary, type MetaIndex } from '../lib/ghstars/summary';
import type { Snapshot } from '../lib/ghstars/gains';
import { monthsBefore } from '../lib/ghstars/window';

const REPO_ROOT = fileURLToPath(new URL('../..', import.meta.url));
const DATA_DIR = path.join(REPO_ROOT, 'data');
const DAYS_DIR = path.join(DATA_DIR, 'days');

const PER_PAGE = 100;
const MAX_PAGES = 10; // GitHub caps search results at 1000 per query.
const KEEP_DAYS = 400;
const REQUEST_SPACING_MS = 2_500; // 30 authenticated search requests per minute.

// Two pools, because "fastest growing" and "biggest" are different questions and
// the page answers both. Young repos are where a 10k-star quarter actually
// happens; the established floor keeps the giants in the series too.
const pools = (asOf: string) => [
  `created:>${monthsBefore(asOf, 12)} stars:>=1000`,
  'stars:>=20000',
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function headers(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchPool(query: string): Promise<RepoSummary[][]> {
  const pages: RepoSummary[][] = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = `${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${PER_PAGE}&page=${page}`;
    const response = await fetch(url, { headers: headers() });

    if (!response.ok) {
      throw new Error(`search failed (${response.status}) for "${query}": ${await response.text()}`);
    }

    const items = parseSearchResponse(await response.json());
    pages.push(items);
    console.log(`  page ${page}: ${items.length} repos`);

    if (items.length < PER_PAGE) break;
    if (page < MAX_PAGES) await sleep(REQUEST_SPACING_MS);
  }

  return pages;
}

async function readSnapshots(): Promise<Snapshot[]> {
  let files: string[];
  try {
    files = await readdir(DAYS_DIR);
  } catch {
    return [];
  }

  const snapshots: Snapshot[] = [];
  for (const file of files.filter((f) => f.endsWith('.json')).sort()) {
    snapshots.push(JSON.parse(await readFile(path.join(DAYS_DIR, file), 'utf8')) as Snapshot);
  }
  return snapshots;
}

async function readMeta(): Promise<MetaIndex> {
  try {
    return JSON.parse(await readFile(path.join(DATA_DIR, 'meta.json'), 'utf8')) as MetaIndex;
  } catch {
    return {};
  }
}

async function main(): Promise<void> {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  console.log(`collecting for ${today}${process.env.GITHUB_TOKEN ? '' : ' (unauthenticated)'}`);

  const pages: RepoSummary[][] = [];
  for (const query of pools(today)) {
    console.log(`pool: ${query}`);
    pages.push(...(await fetchPool(query)));
    await sleep(REQUEST_SPACING_MS);
  }

  const { stars, meta } = mergeSearchPages(pages);
  const repoCount = Object.keys(stars).length;
  if (repoCount === 0) throw new Error('collected zero repos; refusing to write an empty snapshot');
  console.log(`merged ${repoCount} repos`);

  await mkdir(DAYS_DIR, { recursive: true });
  // Rewriting today's file makes a same-day rerun idempotent; every other day
  // is append-only, which is what keeps the git history small.
  await writeFile(
    path.join(DAYS_DIR, `${today}.json`),
    JSON.stringify({ date: today, stars: sortKeys(stars) } satisfies Snapshot, null, 1)
  );

  const mergedMeta = { ...(await readMeta()), ...meta };
  await writeFile(path.join(DATA_DIR, 'meta.json'), JSON.stringify(sortKeys(mergedMeta), null, 1));

  const snapshots = await readSnapshots();
  for (const stale of staleSnapshotDates(
    snapshots.map((s) => s.date),
    { asOf: today, keepDays: KEEP_DAYS }
  )) {
    await rm(path.join(DAYS_DIR, `${stale}.json`), { force: true });
    console.log(`pruned ${stale}`);
  }

  const summary = buildSummary(
    snapshots.filter((s) => !staleSnapshotDates([s.date], { asOf: today, keepDays: KEEP_DAYS }).length),
    mergedMeta,
    { asOf: today, generatedAt: now.toISOString() }
  );
  await writeFile(path.join(DATA_DIR, 'summary.json'), JSON.stringify(summary));

  console.log(
    `wrote summary: ${summary.snapshotCount} snapshots, ` +
      Object.values(summary.windows)
        .map((w) => `${w.days}d${w.complete ? '' : '*'}=${w.entries.length}`)
        .join(' ')
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
