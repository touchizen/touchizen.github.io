'use client';

import { useState, useRef, useEffect } from 'react';
import { blogOnlyLanguages, languages, type BlogLanguage, type Language } from '@/lib/i18n';

const SITE_CODES: readonly Language[] = languages.map((l) => l.code);

/** The menu's entries for `codes`: the site's four unless the page has more (drama pages add Spanish). */
export function languageMenu<L extends BlogLanguage = Language>(codes: readonly L[] = SITE_CODES as readonly L[]) {
  return [...languages, ...blogOnlyLanguages].filter((l): l is { code: L; name: string; country: string } => codes.includes(l.code as L));
}

interface LanguageToggleProps<L extends BlogLanguage> {
  lang: L;
  onChange: (lang: L) => void;
  /** Languages to offer — the site's four by default. */
  languages?: readonly L[];
}

export default function LanguageToggle<L extends BlogLanguage = Language>({ lang, onChange, languages: codes }: LanguageToggleProps<L>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = languageMenu(codes);
  const currentLang = options.find((l) => l.code === lang) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectLanguage = (code: L) => {
    localStorage.setItem('language', code);
    onChange(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className={`fi fi-${currentLang.country.toLowerCase()} rounded-sm`} style={{ width: '1.25rem', height: '0.9rem' }} />
        <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          {options.map((language) => (
            <button
              key={language.code}
              onClick={() => selectLanguage(language.code)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                lang === language.code
                  ? 'text-primary-500 font-semibold'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className={`fi fi-${language.country.toLowerCase()} rounded-sm`} style={{ width: '1.25rem', height: '0.9rem' }} />
              <span>{language.name}</span>
              {lang === language.code && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
