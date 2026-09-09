import { describe, expect, it } from 'vitest';
import { buildSearchQuery, daysBefore, daysBetween, monthsBefore } from './window';

describe('monthsBefore', () => {
  it('subtracts whole months within a year', () => {
    expect(monthsBefore('2026-09-09', 3)).toBe('2026-06-09');
  });

  it('rolls back across the year boundary', () => {
    expect(monthsBefore('2026-01-15', 1)).toBe('2025-12-15');
    expect(monthsBefore('2026-02-10', 14)).toBe('2024-12-10');
  });

  // Mar 31 has no counterpart in February. Clamping to the last valid day is the
  // only answer that keeps the window from silently jumping into March.
  it('clamps to the last day of a shorter target month', () => {
    expect(monthsBefore('2026-03-31', 1)).toBe('2026-02-28');
    expect(monthsBefore('2024-03-31', 1)).toBe('2024-02-29'); // leap year
    expect(monthsBefore('2026-01-31', 2)).toBe('2025-11-30');
  });

  // A %4 rule alone gets 1900 wrong; a %100 rule alone gets 2000 wrong.
  it('applies the full leap rule at century boundaries', () => {
    expect(monthsBefore('1900-03-31', 1)).toBe('1900-02-28'); // divisible by 100, not a leap year
    expect(monthsBefore('2000-03-31', 1)).toBe('2000-02-29'); // divisible by 400, a leap year
  });

  it('treats a zero-month window as the same day', () => {
    expect(monthsBefore('2026-09-09', 0)).toBe('2026-09-09');
  });

  it('rejects malformed dates instead of guessing', () => {
    expect(() => monthsBefore('2026-9-9', 1)).toThrow();
    expect(() => monthsBefore('not-a-date', 1)).toThrow();
    expect(() => monthsBefore('2026-13-01', 1)).toThrow();
    expect(() => monthsBefore('2026-02-30', 1)).toThrow();
  });

  it('rejects a negative window', () => {
    expect(() => monthsBefore('2026-09-09', -1)).toThrow();
  });
});

describe('daysBefore', () => {
  it('subtracts days across a month boundary', () => {
    expect(daysBefore('2026-03-01', 1)).toBe('2026-02-28');
    expect(daysBefore('2024-03-01', 1)).toBe('2024-02-29');
  });

  it('subtracts days across a year boundary', () => {
    expect(daysBefore('2026-01-01', 1)).toBe('2025-12-31');
    expect(daysBefore('2026-01-05', 90)).toBe('2025-10-07');
  });

  it('treats zero days as the same day', () => {
    expect(daysBefore('2026-09-09', 0)).toBe('2026-09-09');
  });
});

describe('buildSearchQuery', () => {
  it('asks for repos created after the cutoff with at least the star floor', () => {
    expect(buildSearchQuery({ asOf: '2026-09-09', monthsBack: 3, minStars: 10000 })).toBe(
      'created:>2026-06-09 stars:>=10000'
    );
  });

  it('rejects a star floor below zero', () => {
    expect(() => buildSearchQuery({ asOf: '2026-09-09', monthsBack: 3, minStars: -1 })).toThrow();
  });
});

describe('daysBetween', () => {
  it('counts the days from the earlier date to the later one', () => {
    expect(daysBetween('2026-09-01', '2026-09-09')).toBe(8);
  });

  it('counts zero for the same day', () => {
    expect(daysBetween('2026-09-09', '2026-09-09')).toBe(0);
  });

  it('counts across month and year boundaries', () => {
    expect(daysBetween('2026-02-27', '2026-03-01')).toBe(2); // 2026 is not a leap year
    expect(daysBetween('2024-02-27', '2024-03-01')).toBe(3); // 2024 is
    expect(daysBetween('2025-12-31', '2026-01-01')).toBe(1);
  });

  it('goes negative when the arguments are the wrong way round', () => {
    expect(daysBetween('2026-09-09', '2026-09-01')).toBe(-8);
  });
});
