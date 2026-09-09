import { describe, expect, it } from 'vitest';
import { buildSummary, GROWTH_WINDOWS } from './summary';
import type { Snapshot } from './gains';

const snap = (date: string, stars: Record<string, number>): Snapshot => ({ date, stars });

const history: Snapshot[] = [
  snap('2026-06-11', { 'a/one': 100 }),
  snap('2026-08-10', { 'a/one': 500 }),
  snap('2026-09-02', { 'a/one': 700 }),
  snap('2026-09-09', { 'a/one': 900, 'b/two': 40 }),
];

const meta = { 'a/one': { description: 'first', language: 'Rust' } };

describe('buildSummary', () => {
  it('produces one window per configured span', () => {
    const summary = buildSummary(history, meta, { asOf: '2026-09-09', generatedAt: 'T' });

    expect(Object.keys(summary.windows)).toEqual(GROWTH_WINDOWS.map(String));
  });

  it('attaches metadata and derives the repo url', () => {
    const summary = buildSummary(history, meta, { asOf: '2026-09-09', generatedAt: 'T' });

    expect(summary.windows[7].entries[0]).toEqual({
      repo: 'a/one',
      stars: 900,
      gained: 200,
      estimated: false,
      url: 'https://github.com/a/one',
      description: 'first',
      language: 'Rust',
    });
  });

  // A repo can enter the snapshots before the next metadata refresh lands.
  it('still lists a repo that has no metadata yet', () => {
    const summary = buildSummary(history, {}, { asOf: '2026-09-09', generatedAt: 'T' });
    const entry = summary.windows[7].entries.find((e) => e.repo === 'b/two');

    expect(entry).toMatchObject({
      repo: 'b/two',
      url: 'https://github.com/b/two',
      description: '',
      language: null,
    });
  });

  it('carries the honesty flags of each window through', () => {
    const summary = buildSummary(history, meta, { asOf: '2026-09-09', generatedAt: 'T' });

    expect(summary.windows[30]).toMatchObject({
      days: 30,
      actualDays: 30, // 2026-08-10 -> 2026-09-09
      complete: true,
      baselineDate: '2026-08-10',
    });
    expect(summary.windows[90]).toMatchObject({
      days: 90,
      complete: true,
      baselineDate: '2026-06-11',
    });
  });

  it('marks a window the snapshots cannot reach back far enough to fill', () => {
    const young = [snap('2026-09-05', { 'a/one': 10 }), snap('2026-09-09', { 'a/one': 90 })];
    const summary = buildSummary(young, {}, { asOf: '2026-09-09', generatedAt: 'T' });

    expect(summary.windows[90]).toMatchObject({ complete: false, actualDays: 4 });
    expect(summary.windows[90].entries[0].gained).toBe(80);
  });

  it('records the coverage the page needs to caption itself', () => {
    const summary = buildSummary(history, meta, { asOf: '2026-09-09', generatedAt: 'when' });

    expect(summary.generatedAt).toBe('when');
    expect(summary.latestDate).toBe('2026-09-09');
    expect(summary.firstDate).toBe('2026-06-11');
    expect(summary.snapshotCount).toBe(4);
  });

  it('caps each window so the published file stays small', () => {
    const wide: Record<string, number> = {};
    const base: Record<string, number> = {};
    for (let i = 0; i < 150; i++) {
      base[`r/${i}`] = 0;
      wide[`r/${i}`] = i;
    }
    const summary = buildSummary(
      [snap('2026-09-01', base), snap('2026-09-09', wide)],
      {},
      { asOf: '2026-09-09', generatedAt: 'T', limit: 100 }
    );

    expect(summary.windows[7].entries).toHaveLength(100);
    expect(summary.windows[7].entries[0].repo).toBe('r/149');
  });

  it('survives having no snapshots at all', () => {
    const summary = buildSummary([], {}, { asOf: '2026-09-09', generatedAt: 'T' });

    expect(summary.latestDate).toBeNull();
    expect(summary.firstDate).toBeNull();
    expect(summary.snapshotCount).toBe(0);
    expect(summary.windows[7].entries).toEqual([]);
  });
});
