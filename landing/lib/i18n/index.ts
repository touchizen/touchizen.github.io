import { en } from './en';
import { ko } from './ko';
import { ja } from './ja';
import { de } from './de';

export type Language = 'en' | 'ko' | 'ja' | 'de';

// country = ISO 3166-1 alpha-2 (uppercase) — used as badge text since flag emojis
// don't render on Windows. Displayed as a styled badge in LanguageToggle.
export const languages: { code: Language; name: string; country: string }[] = [
  { code: 'en', name: 'English', country: 'US' },
  { code: 'ko', name: '한국어', country: 'KR' },
  { code: 'ja', name: '日本語', country: 'JP' },
  { code: 'de', name: 'Deutsch', country: 'DE' },
];

export const translations = {
  en,
  ko,
  ja,
  de,
} as const;

export type TranslationKey = keyof typeof translations.en;

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
