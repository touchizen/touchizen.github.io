// Date maths for the search window.
//
// Everything here works on `YYYY-MM-DD` strings and never touches the local
// clock: `monthsBefore` is plain integer arithmetic and `daysBefore` goes
// through `Date.UTC`. A window that shifted with the runner's timezone would
// put the cutoff on the wrong day for half the planet.

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year: number, month: number): number {
  if (month === 2 && isLeapYear(year)) return 29;
  return DAYS_IN_MONTH[month - 1];
}

type YMD = { year: number; month: number; day: number };

function parseIsoDate(iso: string): YMD {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) throw new Error(`expected a YYYY-MM-DD date, got: ${iso}`);

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (month < 1 || month > 12) throw new Error(`month out of range: ${iso}`);
  if (day < 1 || day > daysInMonth(year, month)) throw new Error(`day out of range: ${iso}`);

  return { year, month, day };
}

function formatIsoDate({ year, month, day }: YMD): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function monthsBefore(iso: string, months: number): string {
  if (!Number.isInteger(months) || months < 0) {
    throw new Error(`months must be a non-negative integer, got: ${months}`);
  }

  const { year, month, day } = parseIsoDate(iso);
  const zeroBased = year * 12 + (month - 1) - months;
  const targetYear = Math.floor(zeroBased / 12);
  const targetMonth = (zeroBased % 12) + 1;

  return formatIsoDate({
    year: targetYear,
    month: targetMonth,
    // Mar 31 minus one month has no exact answer; the last day of the shorter
    // month is the only one that keeps the window from spilling forward.
    day: Math.min(day, daysInMonth(targetYear, targetMonth)),
  });
}

export function daysBefore(iso: string, days: number): string {
  if (!Number.isInteger(days) || days < 0) {
    throw new Error(`days must be a non-negative integer, got: ${days}`);
  }

  const { year, month, day } = parseIsoDate(iso);
  const shifted = new Date(Date.UTC(year, month - 1, day) - days * 86_400_000);

  return formatIsoDate({
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
  });
}

export function daysBetween(from: string, to: string): number {
  const a = parseIsoDate(from);
  const b = parseIsoDate(to);
  const ms = Date.UTC(b.year, b.month - 1, b.day) - Date.UTC(a.year, a.month - 1, a.day);
  return Math.round(ms / 86_400_000);
}

export type SearchWindow = {
  asOf: string;
  monthsBack: number;
  minStars: number;
};

export function buildSearchQuery({ asOf, monthsBack, minStars }: SearchWindow): string {
  if (!Number.isInteger(minStars) || minStars < 0) {
    throw new Error(`minStars must be a non-negative integer, got: ${minStars}`);
  }

  return `created:>${monthsBefore(asOf, monthsBack)} stars:>=${minStars}`;
}
