import { describe, expect, it } from 'vitest';
import { mergeSearchPages, sortKeys, staleSnapshotDates } from './collect';
import type { RepoSummary } from './github';

const r = (repo: string, over: Partial<RepoSummary> = {}): RepoSummary => ({
  repo,
  stars: 100,
  url: `https://github.com/${repo}`,
  description: 'd',
  language: 'Go',
  createdAt: '2026-01-01',
  ...over,
});

describe('mergeSearchPages', () => {
  it('folds pages into one star index and one metadata index', () => {
    const merged = mergeSearchPages([
      [r('a/one', { stars: 10, description: 'first', language: 'Rust' })],
      [r('b/two', { stars: 20, description: 'second', language: null })],
    ]);

    expect(merged.stars).toEqual({ 'a/one': 10, 'b/two': 20 });
    expect(merged.meta).toEqual({
      'a/one': { description: 'first', language: 'Rust' },
      'b/two': { description: 'second', language: null },
    });
  });

  // The pools overlap by design: a young repo can also clear the established
  // star floor, and counting it twice would corrupt nothing but confuse totals.
  it('keeps one entry when the same repo appears in two pools', () => {
    const merged = mergeSearchPages([[r('dup/repo', { stars: 500 })], [r('dup/repo', { stars: 500 })]]);

    expect(Object.keys(merged.stars)).toEqual(['dup/repo']);
  });

  it('takes the highest count when pages disagree mid-run', () => {
    const merged = mergeSearchPages([[r('dup/repo', { stars: 500 })], [r('dup/repo', { stars: 507 })]]);

    expect(merged.stars['dup/repo']).toBe(507);
  });

  it('returns empty indexes for no pages', () => {
    expect(mergeSearchPages([])).toEqual({ stars: {}, meta: {} });
    expect(mergeSearchPages([[]])).toEqual({ stars: {}, meta: {} });
  });
});

describe('staleSnapshotDates', () => {
  it('names the dates that fell outside the retention window', () => {
    const dates = ['2026-01-01', '2026-06-01', '2026-09-08'];

    expect(staleSnapshotDates(dates, { asOf: '2026-09-09', keepDays: 100 })).toEqual(['2026-01-01']);
  });

  it('keeps a snapshot sitting exactly on the retention edge', () => {
    expect(staleSnapshotDates(['2026-06-01'], { asOf: '2026-09-09', keepDays: 100 })).toEqual([]);
  });

  it('keeps everything when nothing is old enough', () => {
    expect(staleSnapshotDates(['2026-09-08'], { asOf: '2026-09-09', keepDays: 400 })).toEqual([]);
  });

  // Deleting the baseline out from under the longest window would silently
  // shorten every ranking on the page.
  it('never prunes below what the longest growth window needs', () => {
    expect(() => staleSnapshotDates([], { asOf: '2026-09-09', keepDays: 30 })).toThrow();
  });
});

describe('sortKeys', () => {
  it('orders keys so a daily rewrite diffs against yesterday instead of reshuffling', () => {
    const shuffled = { 'z/last': 1, 'a/first': 2, 'm/mid': 3 };

    expect(Object.keys(sortKeys(shuffled))).toEqual(['a/first', 'm/mid', 'z/last']);
  });

  it('keeps the values attached to their keys', () => {
    expect(sortKeys({ b: 2, a: 1 })).toEqual({ a: 1, b: 2 });
  });

  it('handles an empty object', () => {
    expect(sortKeys({})).toEqual({});
  });

  it('produces byte-identical JSON for two objects built in different orders', () => {
    const one = sortKeys({ 'a/x': 1, 'b/y': 2 });
    const two = sortKeys({ 'b/y': 2, 'a/x': 1 });

    expect(JSON.stringify(one)).toBe(JSON.stringify(two));
  });
});
