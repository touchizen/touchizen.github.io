'use client';

import { useRouter, useParams } from 'next/navigation';
import { Language, languages } from '@/lib/i18n';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;

  // Validate lang parameter
  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}`);
  };

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />
      <Hero lang={lang} />
      <Products lang={lang} />
      <Features lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
