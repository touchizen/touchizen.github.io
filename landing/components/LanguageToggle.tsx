'use client';

import { useState, useRef, useEffect } from 'react';
import { Language, languages } from '@/lib/i18n';

interface LanguageToggleProps {
  lang: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageToggle({ lang, onChange }: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectLanguage = (code: Language) => {
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
        <span className="inline-flex items-center justify-center w-7 h-5 text-[10px] font-bold bg-primary-500 text-white rounded">
          {currentLang.country}
        </span>
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
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => selectLanguage(language.code)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                lang === language.code
                  ? 'text-primary-500 font-semibold'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="inline-flex items-center justify-center w-7 h-5 text-[10px] font-bold bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded">
                {language.country}
              </span>
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
