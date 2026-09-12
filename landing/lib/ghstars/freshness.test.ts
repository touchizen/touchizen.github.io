import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { COLLECT_WORKFLOW, cronIntervalMs, SUMMARY_TTL_MS } from './freshness';

const workflowPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../..',
  COLLECT_WORKFLOW
);

/** The `- cron: '…'` lines of the collector workflow, in file order. */
function workflowCrons(): string[] {
  const yaml = readFileSync(workflowPath, 'utf-8');
  // An exec loop rather than a spread of matchAll: this repo's tsconfig target
  // does not allow iterating the iterator matchAll returns.
  const re = /^\s*-\s*cron:\s*['"]([^'"]+)['"]/gm;
  const found: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(yaml)) !== null) found.push(m[1]);
  return found;
}

describe('cronIntervalMs', () => {
  it('reads a once-a-day schedule', () => {
    expect(cronIntervalMs('17 3 * * *')).toBe(24 * 60 * 60 * 1000);
    expect(cronIntervalMs('0 0 * * *')).toBe(24 * 60 * 60 * 1000);
  });

  it('reads a step in the minute field', () => {
    expect(cronIntervalMs('*/5 * * * *')).toBe(5 * 60 * 1000);
    expect(cronIntervalMs('*/30 * * * *')).toBe(30 * 60 * 1000);
  });

  it('reads a step in the hour field', () => {
    expect(cronIntervalMs('0 */6 * * *')).toBe(6 * 60 * 60 * 1000);
    expect(cronIntervalMs('17 */12 * * *')).toBe(12 * 60 * 60 * 1000);
  });

  it('reads an every-minute schedule', () => {
    expect(cronIntervalMs('* * * * *')).toBe(60 * 1000);
  });

  // Returning null rather than guessing is the point: a shape this does not
  // understand must fail the agreement test loudly, not pass it quietly.
  it('returns null for shapes it does not understand', () => {
    for (const cron of [
      '0 3 * * 1', // a weekday restriction changes the real interval
      '0 3 1 * *', // a day-of-month restriction does too
      '0,30 3 * * *', // a list
      '0 3-6 * * *', // a range
      '17 3 * *', // too few fields
      '17 3 * * * *', // too many
      '*/0 * * * *', // a zero step is not a schedule
      'nonsense',
      '',
    ]) {
      expect(cronIntervalMs(cron), cron).toBeNull();
    }
  });
});

describe('summary cache against the collector schedule', () => {
  it('names a workflow that exists and carries exactly one cron', () => {
    const crons = workflowCrons();
    expect(crons).toHaveLength(1);
    expect(cronIntervalMs(crons[0]), crons[0]).not.toBeNull();
  });

  // The snapshot is committed on a schedule, so re-downloading it far more
  // often than it changes buys nothing and spends the visitor's bandwidth and
  // the CDN's goodwill. A 5 minute TTL against a daily commit meant up to 288
  // fetches a day of a file that changed once — that is what this pins shut.
  it('does not refetch the snapshot much faster than it is written', () => {
    const interval = cronIntervalMs(workflowCrons()[0])!;
    expect(SUMMARY_TTL_MS).toBeGreaterThanOrEqual(interval / 4);
  });

  // The other direction. Caching for longer than a full collection cycle means
  // a visitor can sit on a snapshot while a newer one already exists.
  it('never holds a snapshot longer than one collection cycle', () => {
    const interval = cronIntervalMs(workflowCrons()[0])!;
    expect(SUMMARY_TTL_MS).toBeLessThanOrEqual(interval);
  });

  it('is the twelve hours the site asks for', () => {
    expect(SUMMARY_TTL_MS).toBe(12 * 60 * 60 * 1000);
  });
});
