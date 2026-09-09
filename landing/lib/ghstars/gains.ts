// Star growth over a window, derived from the daily snapshots.
//
// GitHub does not serve historical star counts, so growth can only be measured
// against snapshots we took ourselves. Early on there simply are not enough of
// them, and the honest answer is a short window that says it is short —
// `actualDays` and `complete` exist so the UI can never claim 90 days of
// history it does not have.

import { daysBefore, daysBetween } from './window';

export type Snapshot = {
  date: string;
  stars: Record<string, number>;
};

export type Gain = {
  repo: string;
  stars: number;
  gained: number;
  /** True when the repo was absent from the baseline, so `gained` is an upper bound. */
  estimated: boolean;
};

export type GainsResult = {
  gains: Gain[];
  latestDate: string | null;
  baselineDate: string | null;
  requestedDays: number;
  actualDays: number;
  /** True when the baseline reaches back at least as far as the window asked. */
  complete: boolean;
};

export type GainsOptions = {
  asOf: string;
  windowDays: number;
  limit?: number;
};

const EMPTY = (requestedDays: number): GainsResult => ({
  gains: [],
  latestDate: null,
  baselineDate: null,
  requestedDays,
  actualDays: 0,
  complete: false,
});

export function computeGains(snapshots: Snapshot[], options: GainsOptions): GainsResult {
  const { asOf, windowDays, limit } = options;

  const usable = snapshots
    .filter((s) => s.date <= asOf)
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  const latest = usable[usable.length - 1];
  if (!latest) return EMPTY(windowDays);

  const cutoff = daysBefore(asOf, windowDays);
  const older = usable.slice(0, -1);

  // The cutoff is inclusive: a snapshot taken exactly on it is a valid baseline.
  const onOrBeforeCutoff = older.filter((s) => s.date <= cutoff);
  const baseline = onOrBeforeCutoff[onOrBeforeCutoff.length - 1] ?? older[0];

  if (!baseline) {
    return { ...EMPTY(windowDays), latestDate: latest.date };
  }

  const gains = Object.entries(latest.stars)
    .map(([repo, stars]) => {
      const before = baseline.stars[repo];
      return {
        repo,
        stars,
        gained: stars - (before ?? 0),
        estimated: before === undefined,
      };
    })
    .sort((a, b) => b.gained - a.gained || (a.repo < b.repo ? -1 : a.repo > b.repo ? 1 : 0));

  return {
    gains: limit === undefined ? gains : gains.slice(0, limit),
    latestDate: latest.date,
    baselineDate: baseline.date,
    requestedDays: windowDays,
    actualDays: daysBetween(baseline.date, latest.date),
    complete: baseline.date <= cutoff,
  };
}
