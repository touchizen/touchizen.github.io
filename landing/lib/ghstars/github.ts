// Parsing for GitHub's repository search response.
//
// The search endpoint is called unauthenticated straight from the browser: it
// sends `access-control-allow-origin: *` and allows 10 requests per minute per
// visitor IP. That budget is per visitor rather than per site, which is exactly
// why this runs client-side instead of behind a proxy.

import { buildSearchQuery, type SearchWindow } from './window';

export const SEARCH_ENDPOINT = 'https://api.github.com/search/repositories';

export type RepoSummary = {
  repo: string;
  stars: number;
  url: string;
  description: string;
  language: string | null;
  createdAt: string;
};

export type SearchErrorKind = 'rate_limited' | 'invalid_query' | 'unknown';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toSummary(raw: unknown): RepoSummary | null {
  if (!isRecord(raw)) return null;
  if (typeof raw.full_name !== 'string') return null;
  if (typeof raw.stargazers_count !== 'number') return null;
  if (typeof raw.html_url !== 'string') return null;
  if (typeof raw.created_at !== 'string') return null;

  return {
    repo: raw.full_name,
    stars: raw.stargazers_count,
    url: raw.html_url,
    description: typeof raw.description === 'string' ? raw.description : '',
    language: typeof raw.language === 'string' ? raw.language : null,
    createdAt: raw.created_at.slice(0, 10),
  };
}

export function parseSearchResponse(payload: unknown): RepoSummary[] {
  if (!isRecord(payload) || !Array.isArray(payload.items)) {
    throw new Error('not a GitHub repository search response');
  }

  // One weird row should cost that row, not the whole listing.
  return payload.items.map(toSummary).filter((s): s is RepoSummary => s !== null);
}

export function classifyError(status: number): SearchErrorKind {
  if (status === 403 || status === 429) return 'rate_limited';
  if (status === 422) return 'invalid_query';
  return 'unknown';
}

export const SEARCH_PAGE_SIZE = 50;

// The whole question in one string, so a cache entry can never answer a
// different one than the one it was stored for.
export function searchCacheKey(window: SearchWindow): string {
  return `search:${buildSearchQuery(window)}`;
}

export function searchUrl(window: SearchWindow): string {
  const query = encodeURIComponent(buildSearchQuery(window));
  return `${SEARCH_ENDPOINT}?q=${query}&sort=stars&order=desc&per_page=${SEARCH_PAGE_SIZE}`;
}
