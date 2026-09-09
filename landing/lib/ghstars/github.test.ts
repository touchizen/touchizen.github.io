import { describe, expect, it } from 'vitest';
import { classifyError, parseSearchResponse } from './github';

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

  it('skips a malformed entry rather than failing the whole page', () => {
    const parsed = parseSearchResponse({
      items: [item(), { full_name: 'broken/one' }, item({ full_name: 'other/name' })],
    });

    expect(parsed.map((p) => p.repo)).toEqual(['owner/name', 'other/name']);
  });

  it('returns nothing for an empty result set', () => {
    expect(parseSearchResponse({ total_count: 0, items: [] })).toEqual([]);
  });

  it('throws when the payload is not a search response at all', () => {
    expect(() => parseSearchResponse(null)).toThrow();
    expect(() => parseSearchResponse({ message: 'Not Found' })).toThrow();
    expect(() => parseSearchResponse({ items: 'nope' })).toThrow();
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
