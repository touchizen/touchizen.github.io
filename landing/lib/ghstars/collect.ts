// Pure helpers for the daily collector. The network and the filesystem live in
// scripts/collect-stars.ts; everything decidable without them lives here.

import type { RepoSummary } from './github';
import type { MetaIndex } from './summary';
import { GROWTH_WINDOWS } from './summary';
import { daysBefore } from './window';

export type MergedPages = {
  stars: Record<string, number>;
  meta: MetaIndex;
};

export function mergeSearchPages(pages: RepoSummary[][]): MergedPages {
  const stars: Record<string, number> = {};
  const meta: MetaIndex = {};

  for (const page of pages) {
    for (const item of page) {
      // Pools overlap, and a count can tick up between two requests in the same
      // run. Taking the highest keeps a repo's series monotonic for the right
      // reason rather than by luck of ordering.
      const seen = stars[item.repo];
      stars[item.repo] = seen === undefined ? item.stars : Math.max(seen, item.stars);
      meta[item.repo] = { description: item.description, language: item.language };
    }
  }

  return { stars, meta };
}

export type RetentionOptions = {
  asOf: string;
  keepDays: number;
};

const LONGEST_WINDOW = Math.max(...GROWTH_WINDOWS);

export function staleSnapshotDates(dates: string[], { asOf, keepDays }: RetentionOptions): string[] {
  if (keepDays <= LONGEST_WINDOW) {
    throw new Error(
      `keepDays must exceed the longest growth window (${LONGEST_WINDOW}), got: ${keepDays}`
    );
  }

  const edge = daysBefore(asOf, keepDays);
  return dates.filter((date) => date < edge);
}

// Both data files are rewritten in full every day. Search results arrive in
// ranking order, which shifts constantly, so without a stable key order each
// rewrite looks like a wholesale change to git and packs badly. Sorted keys
// turn a daily rewrite back into a small delta.
export function sortKeys<T>(record: Record<string, T>): Record<string, T> {
  return Object.fromEntries(
    Object.entries(record).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  );
}
