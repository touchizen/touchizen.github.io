// The published artefact the page reads.
//
// `data/summary.json` is derived from the daily snapshots on every collector
// run, so the browser never computes rankings over 90 files — it fetches one
// small document. Each window carries its own coverage flags because early on
// the history is shorter than the window asked for.

import { computeGains, type Snapshot } from './gains';

export const GROWTH_WINDOWS = [7, 30, 90] as const;
export const DEFAULT_ENTRY_LIMIT = 100;

export type RepoMeta = { description: string; language: string | null };
export type MetaIndex = Record<string, RepoMeta>;

export type SummaryEntry = {
  repo: string;
  stars: number;
  gained: number;
  estimated: boolean;
  url: string;
  description: string;
  language: string | null;
};

export type SummaryWindow = {
  days: number;
  actualDays: number;
  complete: boolean;
  baselineDate: string | null;
  entries: SummaryEntry[];
};

export type Summary = {
  generatedAt: string;
  latestDate: string | null;
  firstDate: string | null;
  snapshotCount: number;
  windows: Record<number, SummaryWindow>;
};

export type BuildSummaryOptions = {
  asOf: string;
  generatedAt: string;
  limit?: number;
};

export function buildSummary(
  snapshots: Snapshot[],
  meta: MetaIndex,
  { asOf, generatedAt, limit = DEFAULT_ENTRY_LIMIT }: BuildSummaryOptions
): Summary {
  const dates = snapshots.map((s) => s.date).sort();

  const windows: Record<number, SummaryWindow> = {};
  for (const days of GROWTH_WINDOWS) {
    const result = computeGains(snapshots, { asOf, windowDays: days, limit });

    windows[days] = {
      days,
      actualDays: result.actualDays,
      complete: result.complete,
      baselineDate: result.baselineDate,
      entries: result.gains.map((gain) => ({
        ...gain,
        // Derivable from the name, so the snapshots never have to store it.
        url: `https://github.com/${gain.repo}`,
        description: meta[gain.repo]?.description ?? '',
        language: meta[gain.repo]?.language ?? null,
      })),
    };
  }

  return {
    generatedAt,
    latestDate: dates.length ? dates[dates.length - 1] : null,
    firstDate: dates.length ? dates[0] : null,
    snapshotCount: snapshots.length,
    windows,
  };
}
