// How long the browser may hold the star snapshot before asking for it again.
//
// The snapshot is not live data: `.github/workflows/collect-stars.yml` commits
// `data/summary.json` on a schedule, and the page reads it straight from the
// raw CDN. So the only sensible TTL is one tied to how often that commit
// happens. It was 5 minutes against a daily commit, which meant a visitor who
// left the tab open re-downloaded an unchanged file up to 288 times a day.
//
// `freshness.test.ts` reads the workflow's own cron and holds this value inside
// one collection cycle, so the two cannot drift apart silently.

/** Repo-root-relative path of the job that writes the snapshot. */
export const COLLECT_WORKFLOW = '.github/workflows/collect-stars.yml';

/** 12 hours — half a collection cycle, so a new snapshot is never more than that away. */
export const SUMMARY_TTL_MS = 12 * 60 * 60 * 1000;

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

// A wildcard or a stepped wildcard ("every N") → the step, in units of that
// field. Anything else is unknown.
function step(field: string): number | null {
  if (field === '*') return 1;
  const m = /^\*\/(\d+)$/.exec(field);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isInteger(n) && n > 0 ? n : null;
}

/** A single fixed value, e.g. the `17` of `17 3 * * *`. */
function fixed(field: string): number | null {
  return /^\d+$/.test(field) ? Number(field) : null;
}

/**
 * How often a cron expression fires, in milliseconds — or `null` when the shape
 * is one this does not model.
 *
 * Only the shapes the site actually uses are modelled: a fixed time each day, a
 * step in the minute field, or a step in the hour field. Lists, ranges and any
 * day-of-month or day-of-week restriction change the real interval, so they
 * return `null` on purpose. Guessing would turn the agreement test into a
 * decoration; a `null` makes it fail and makes the next person extend this.
 */
export function cronIntervalMs(cron: string): number | null {
  const fields = cron.trim().split(/\s+/);
  if (fields.length !== 5) return null;
  const [minute, hour, dom, month, dow] = fields;
  if (dom !== '*' || month !== '*' || dow !== '*') return null;

  const minuteStep = step(minute);
  if (minuteStep !== null) {
    // A minute step only repeats every hour if the hour field is open.
    return hour === '*' ? minuteStep * MINUTE : null;
  }
  if (fixed(minute) === null) return null;

  const hourStep = step(hour);
  if (hourStep !== null) return hourStep * HOUR;
  // A fixed minute at a fixed hour, every day.
  return fixed(hour) === null ? null : 24 * HOUR;
}
