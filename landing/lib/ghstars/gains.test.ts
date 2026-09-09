import { describe, expect, it } from 'vitest';
import { computeGains, type Snapshot } from './gains';

const snap = (date: string, stars: Record<string, number>): Snapshot => ({ date, stars });

describe('computeGains', () => {
  const history = [
    snap('2026-06-11', { 'a/one': 100, 'b/two': 5000 }),
    snap('2026-09-09', { 'a/one': 900, 'b/two': 5100 }),
    snap('2026-08-10', { 'a/one': 500, 'b/two': 5050 }),
  ];

  it('measures growth against the snapshot on or before the cutoff', () => {
    const result = computeGains(history, { asOf: '2026-09-09', windowDays: 30 });

    expect(result.baselineDate).toBe('2026-08-10');
    expect(result.gains).toEqual([
      { repo: 'a/one', stars: 900, gained: 400, estimated: false },
      { repo: 'b/two', stars: 5100, gained: 50, estimated: false },
    ]);
  });

  // The cutoff is inclusive. With `<` instead of `<=` this window would silently
  // reach one snapshot further back and overstate every repo's growth.
  it('accepts a snapshot that lands exactly on the cutoff', () => {
    const result = computeGains(history, { asOf: '2026-09-09', windowDays: 90 });

    expect(result.baselineDate).toBe('2026-06-11'); // 2026-09-09 minus 90 days
    expect(result.complete).toBe(true);
    expect(result.gains[0]).toEqual({ repo: 'a/one', stars: 900, gained: 800, estimated: false });
  });

  it('sorts by growth, breaking ties by repo name so the order never wobbles', () => {
    const tied = [
      snap('2026-09-01', { 'z/last': 10, 'a/first': 10, 'm/mid': 10 }),
      snap('2026-09-09', { 'z/last': 60, 'a/first': 60, 'm/mid': 99 }),
    ];

    const result = computeGains(tied, { asOf: '2026-09-09', windowDays: 8 });

    expect(result.gains.map((g) => g.repo)).toEqual(['m/mid', 'a/first', 'z/last']);
  });

  it('flags a repo with no baseline as estimated instead of dropping it', () => {
    const arrival = [
      snap('2026-09-01', { 'old/repo': 100 }),
      snap('2026-09-09', { 'old/repo': 150, 'new/repo': 4000 }),
    ];

    const result = computeGains(arrival, { asOf: '2026-09-09', windowDays: 8 });

    expect(result.gains).toEqual([
      { repo: 'new/repo', stars: 4000, gained: 4000, estimated: true },
      { repo: 'old/repo', stars: 150, gained: 50, estimated: false },
    ]);
  });

  it('drops a repo that fell out of the latest snapshot', () => {
    const departure = [
      snap('2026-09-01', { 'gone/repo': 100, 'kept/repo': 100 }),
      snap('2026-09-09', { 'kept/repo': 200 }),
    ];

    const result = computeGains(departure, { asOf: '2026-09-09', windowDays: 8 });

    expect(result.gains.map((g) => g.repo)).toEqual(['kept/repo']);
  });

  it('reports a loss rather than clamping it to zero', () => {
    const unstarred = [
      snap('2026-09-01', { 'sinking/repo': 900 }),
      snap('2026-09-09', { 'sinking/repo': 850 }),
    ];

    const result = computeGains(unstarred, { asOf: '2026-09-09', windowDays: 8 });

    expect(result.gains[0].gained).toBe(-50);
  });

  // A 90-day tab backed by 9 days of history must say so. This is the whole
  // reason `actualDays` and `complete` exist.
  it('falls back to the earliest snapshot and admits the window is short', () => {
    const young = [
      snap('2026-08-31', { 'a/one': 100 }),
      snap('2026-09-09', { 'a/one': 700 }),
    ];

    const result = computeGains(young, { asOf: '2026-09-09', windowDays: 90 });

    expect(result.complete).toBe(false);
    expect(result.baselineDate).toBe('2026-08-31');
    expect(result.requestedDays).toBe(90);
    expect(result.actualDays).toBe(9);
    expect(result.gains[0].gained).toBe(600);
  });

  it('ignores snapshots newer than asOf', () => {
    const withFuture = [
      snap('2026-09-01', { 'a/one': 100 }),
      snap('2026-09-09', { 'a/one': 200 }),
      snap('2026-09-20', { 'a/one': 9999 }),
    ];

    const result = computeGains(withFuture, { asOf: '2026-09-09', windowDays: 8 });

    expect(result.latestDate).toBe('2026-09-09');
    expect(result.gains[0]).toEqual({ repo: 'a/one', stars: 200, gained: 100, estimated: false });
  });

  it('returns an empty result when there is nothing to compare', () => {
    const result = computeGains([], { asOf: '2026-09-09', windowDays: 30 });

    expect(result.gains).toEqual([]);
    expect(result.complete).toBe(false);
    expect(result.actualDays).toBe(0);
  });

  it('treats a lone snapshot as zero elapsed days, not as growth from nothing', () => {
    const result = computeGains([snap('2026-09-09', { 'a/one': 500 })], {
      asOf: '2026-09-09',
      windowDays: 30,
    });

    expect(result.actualDays).toBe(0);
    expect(result.complete).toBe(false);
    expect(result.gains).toEqual([]);
  });

  it('applies the limit after ranking, not before', () => {
    const many = [
      snap('2026-09-01', { 'a/one': 0, 'b/two': 0, 'c/three': 0 }),
      snap('2026-09-09', { 'a/one': 10, 'b/two': 300, 'c/three': 200 }),
    ];

    const result = computeGains(many, { asOf: '2026-09-09', windowDays: 8, limit: 2 });

    expect(result.gains.map((g) => g.repo)).toEqual(['b/two', 'c/three']);
  });
});
