import { describe, expect, it } from 'vitest';
import { classifyError, parseSearchResponse, searchCacheKey, searchUrl } from './github';

const item = (over: Record<string, unknown> = {}) => ({
  full_name: 'owner/name',
  stargazers_count: 1234,
  html_url: 'https://github.com/owner/name',
  description: 'a thing',
  language: 'TypeScript',
  created_at: '2026-07-15T00:00:00Z',
  ...over,
});

describe('parseSearchResponse', () => {
  it('keeps only the fields the page renders', () => {
    const parsed = parseSearchResponse({ total_count: 1, items: [item()] });

    expect(parsed).toEqual([
      {
        repo: 'owner/name',
        stars: 1234,
        url: 'https://github.com/owner/name',
        description: 'a thing',
        language: 'TypeScript',
        createdAt: '2026-07-15',
      },
    ]);
  });

  // Both of these turn up in real results — `andrewyng/openworker` ships an
  // empty description, and plenty of repos have no detected language.
  it('normalises a null description and a null language', () => {
    const [parsed] = parseSearchResponse({
      items: [item({ description: null, language: null })],
    });

    expect(parsed.description).toBe('');
    expect(parsed.language).toBeNull();
  });

  // Each guard needs a row that trips only that guard; a fixture missing three
  // fields at once is caught by whichever check happens to run first.
  it.each([
    ['a non-string full_name', { full_name: 42 }],
    ['a stringified star count', { stargazers_count: '1234' }],
    ['a missing star count', { stargazers_count: undefined }],
    ['a non-string html_url', { html_url: null }],
    ['a missing created_at', { created_at: undefined }],
  ])('rejects an entry with %s', (_label, over) => {
    expect(parseSearchResponse({ items: [item(over)] })).toEqual([]);
  });

  it('skips a malformed entry rather than failing the whole page', () => {
    const parsed = parseSearchResponse({
      items: [item(), { full_name: 'broken/one' }, item({ full_name: 'other/name' })],
    });

    expect(parsed.map((p) => p.repo)).toEqual(['owner/name', 'other/name']);
  });

  it('returns nothing for an empty result set', () => {
    expect(parseSearchResponse({ total_count: 0, items: [] })).toEqual([]);
  });

  // The message reaches the page, so a raw "items.map is not a function" from a
  // dropped guard is not the same outcome as a rejected payload.
  it.each([
    ['null', null],
    ['an error body', { message: 'Not Found' }],
    ['a non-array items field', { items: 'nope' }],
    ['an items field that is an object', { items: { 0: 'x' } }],
  ])('throws a recognisable error for %s', (_label, payload) => {
    expect(() => parseSearchResponse(payload)).toThrow(
      /not a GitHub repository search response/
    );
  });
});

describe('classifyError', () => {
  // 403 is what an over-quota unauthenticated browser actually gets back, and
  // telling the visitor "wait a minute" only works if we recognise it.
  it('recognises the rate limit', () => {
    expect(classifyError(403)).toBe('rate_limited');
    expect(classifyError(429)).toBe('rate_limited');
  });

  it('recognises a query GitHub refused to run', () => {
    expect(classifyError(422)).toBe('invalid_query');
  });

  it('falls back to unknown for anything else', () => {
    expect(classifyError(500)).toBe('unknown');
    expect(classifyError(404)).toBe('unknown');
  });
});

describe('searchUrl / searchCacheKey', () => {
  const win = { asOf: '2026-09-09', monthsBack: 3, minStars: 10000 };

  it('encodes the query into a sortable search url', () => {
    expect(searchUrl(win)).toBe(
      'https://api.github.com/search/repositories' +
        '?q=created%3A%3E2026-06-09%20stars%3A%3E%3D10000&sort=stars&order=desc&per_page=50'
    );
  });

  // A key that ignored one of the knobs would serve a 3-month answer to a
  // 6-month question for as long as the entry lived.
  it('gives every distinct question its own cache key', () => {
    const keys = new Set([
      searchCacheKey(win),
      searchCacheKey({ ...win, monthsBack: 6 }),
      searchCacheKey({ ...win, minStars: 5000 }),
      searchCacheKey({ ...win, asOf: '2026-09-10' }),
    ]);

    expect(keys.size).toBe(4);
  });

  it('gives the same question the same key', () => {
    expect(searchCacheKey(win)).toBe(searchCacheKey({ ...win }));
  });
});
