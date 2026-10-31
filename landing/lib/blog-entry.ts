import { DRAMA, categoryListPath } from './blog-categories';
import { languages, type Language } from './i18n';

// No node modules: the /blog/ redirect page runs this in the browser.

const SITE_CODES: readonly string[] = languages.map((l) => l.code);

/**
 * Where /blog/ sends a reader: the saved language, else the browser's, else English. Spanish has no blog hub —
 * only the drama blog is in Spanish — so Spanish readers land on the Spanish drama list.
 */
export function blogEntryPath(saved: string | null, browserLang: string): string {
  // Only a saved blog language counts — an empty, stale or foreign value falls through to the browser's.
  const known = (code: string | null) => code === 'es' || SITE_CODES.includes(code ?? '');
  const pick = known(saved) ? saved! : browserLang.toLowerCase().slice(0, 2);
  if (pick === 'es') return categoryListPath(DRAMA, 'es');
  const lang: Language = SITE_CODES.includes(pick) ? (pick as Language) : 'en';
  return `/${lang}/blog/`;
}
