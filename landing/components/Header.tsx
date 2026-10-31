'use client';

import { useState, useEffect, type KeyboardEvent } from 'react';
import { blogTranslations, siteLanguage, type BlogLanguage, type Language, type TranslationKey } from '@/lib/i18n';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { BLOG_CATEGORIES, categoryListPath, type BlogCategory } from '@/lib/blog-categories';

interface HeaderProps<L extends BlogLanguage> {
  lang: L;
  onLanguageChange: (lang: L) => void;
  /** Languages the language menu offers — the site's four unless the page has more (drama pages: Spanish). */
  languages?: readonly L[];
  categories?: readonly BlogCategory[];
}

/**
 * Products and Features point at sections of the home page (/{lang}/#products), so they work from a blog post too.
 * Where the current page has the section itself — the home page, a product page's own #features — the click
 * stays on the page as before.
 */
export function followSection(
  event: { preventDefault(): void },
  href: string,
  doc: Pick<Document, 'getElementById'> = document,
  loc: { hash: string } = window.location,
) {
  const id = href.split('#')[1];
  if (!id || !doc.getElementById(id)) return;
  event.preventDefault();
  loc.hash = id;
}

/** One link per blog category list — the desktop dropdown and the mobile menu share it. */
export function BlogCategoryLinks({ lang, categories, className = '' }: { lang: BlogLanguage; categories: readonly BlogCategory[]; className?: string }) {
  return (
    <div className={className}>
      {categories.map((category) => (
        <a
          key={category.id}
          href={categoryListPath(category, lang)}
          className="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium whitespace-nowrap"
        >
          {blogTranslations[lang][category.nameKey]}
        </a>
      ))}
    </div>
  );
}

/** The blog dropdown opens on hover or on focus inside it; Escape drops that focus so it closes. */
export function closeMenuOnEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') (e.target as HTMLElement).blur?.();
}

export default function Header<L extends BlogLanguage = Language>({ lang, onLanguageChange, languages, categories = BLOG_CATEGORIES }: HeaderProps<L>) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = (key: TranslationKey) => blogTranslations[lang][key];
  // A blog-only language (Spanish) has no home or hub of its own — those links go to the English site.
  const site = siteLanguage(lang);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section links lead to the home page's sections (a blog-only language: the English home) — see followSection.
  const navItems = [
    { key: 'nav_products' as TranslationKey, href: `/${site}/#products`, section: true },
    { key: 'nav_features' as TranslationKey, href: `/${site}/#features`, section: true },
    { key: 'nav_blog' as TranslationKey, href: `/${site}/blog/`, section: false },
  ];
  // A single category needs no menu: the blog link already leads to it.
  const blogMenu = categories.length > 1;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-gray-200 dark:border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <a href={`/${site}`} className="flex items-center gap-3">
            <img
              src="/images/touchizen.png"
              alt="Touchizen"
              className="w-10 h-10 rounded-lg"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text leading-tight">Touchizen</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{t('brand_slogan' as TranslationKey)}</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const opensMenu = item.key === 'nav_blog' && blogMenu;
              const link = (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={item.section ? (e) => followSection(e, item.href) : undefined}
                  aria-haspopup={opensMenu || undefined}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
                >
                  {t(item.key)}
                </a>
              );
              if (!opensMenu) return link;
              return (
                <div key={item.key} className="relative group" onKeyDown={closeMenuOnEscape}>
                  {link}
                  <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block">
                    <BlogCategoryLinks lang={lang} categories={categories} className="glass rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2 shadow-lg" />
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <LanguageToggle lang={lang} onChange={onLanguageChange} languages={languages} />
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 px-4 border-t border-gray-200 dark:border-gray-800 glass">
            {navItems.map((item) => (
              <div key={item.key}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (item.section) followSection(e, item.href);
                  }}
                  className="block py-3 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
                >
                  {t(item.key)}
                </a>
                {item.key === 'nav_blog' && blogMenu && <BlogCategoryLinks lang={lang} categories={categories} className="pl-4 pb-2" />}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
