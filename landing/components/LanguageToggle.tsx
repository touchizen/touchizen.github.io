'use client';

import { Language } from '@/lib/i18n';

interface LanguageToggleProps {
  lang: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageToggle({ lang, onChange }: LanguageToggleProps) {
  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'ko' : 'en';
    localStorage.setItem('language', newLang);
    onChange(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
      aria-label={`Switch to ${lang === 'en' ? 'Korean' : 'English'}`}
    >
      {lang === 'en' ? 'KO' : 'EN'}
    </button>
  );
}
