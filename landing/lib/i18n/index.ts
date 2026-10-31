import { en } from './en';
import { ko } from './ko';
import { ja } from './ja';
import { de } from './de';
import { es } from './es';

export type Language = 'en' | 'ko' | 'ja' | 'de';

/**
 * A blog page's language: the site's four, plus Spanish, which only the drama blog has (its
 * BlogCategory.languages). Kept apart from Language so the rest of the site stays four languages.
 */
export type BlogLanguage = Language | 'es';

// country = ISO 3166-1 alpha-2 (uppercase) — used as badge text since flag emojis
// don't render on Windows. Displayed as a styled badge in LanguageToggle.
export const languages: { code: Language; name: string; country: string }[] = [
  { code: 'en', name: 'English', country: 'US' },
  { code: 'ko', name: '한국어', country: 'KR' },
  { code: 'ja', name: '日本語', country: 'JP' },
  { code: 'de', name: 'Deutsch', country: 'DE' },
];

/** Language menu entries of the languages only some blog categories have. */
export const blogOnlyLanguages: { code: BlogLanguage; name: string; country: string }[] = [
  { code: 'es', name: 'Español', country: 'ES' },
];

export const translations = {
  en,
  ko,
  ja,
  de,
} as const;

export type TranslationKey = keyof typeof translations.en;

/** The words of a page in any blog language. Spanish has those the drama pages show; the rest are English. */
export const blogTranslations: Record<BlogLanguage, Record<TranslationKey, string>> = {
  ...translations,
  es: { ...en, ...es },
};

/** The language a page in `lang` links the rest of the site in: its own, or English for a blog-only language. */
export function siteLanguage(lang: BlogLanguage): Language {
  return lang === 'es' ? 'en' : lang;
}

export function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('language');
  if (saved === 'en' || saved === 'ko' || saved === 'ja' || saved === 'de') return saved;

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ko')) return 'ko';
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('de')) return 'de';
  return 'en';
}

export function getTranslation(lang: Language, key: TranslationKey): string {
  return translations[lang][key];
}
