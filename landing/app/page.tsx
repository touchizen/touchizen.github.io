'use client';

import { useState, useEffect } from 'react';
import { Language, detectLanguage } from '@/lib/i18n';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLang(detectLanguage());
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={setLang} />
      <Hero lang={lang} />
      <Products lang={lang} />
      <Features lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
