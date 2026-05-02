import type { Language } from './i18n';

/**
 * Append Microsoft Store locale query params so the store listing opens in
 * the visitor's language. Default is English (`hl=en-us&gl=US`); only Korean
 * visitors land on the Korean listing (`hl=ko-kr&gl=KR`).
 *
 * The publisher's primary store locale is Korean, so without explicit `hl`
 * params English/Japanese/German visitors would see Korean text.
 */
export function msStoreUrl(detailUrl: string, lang: Language): string {
  const params = lang === 'ko' ? '?hl=ko-kr&gl=KR' : '?hl=en-us&gl=US';
  return `${detailUrl}${params}`;
}
