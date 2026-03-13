'use client';

import { useRouter, useParams } from 'next/navigation';
import { Language, languages, translations, TranslationKey } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import HeroSection from './components/HeroSection';
import WhatIsSection from './components/WhatIsSection';
import FeaturesSection from './components/FeaturesSection';
import WorkflowSection from './components/WorkflowSection';
import ComparisonSection from './components/ComparisonSection';
import AudienceSection from './components/AudienceSection';
import HowItWorksSection from './components/HowItWorksSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';

export default function AutoFlowCutPage() {
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;

  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';

  const t = (key: TranslationKey) => translations[lang][key];

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}/autoflowcut`);
  };

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />

      <HeroSection lang={lang} t={t} />
      <WhatIsSection lang={lang} t={t} />
      <WorkflowSection lang={lang} t={t} />
      <FeaturesSection lang={lang} t={t} />
      <ComparisonSection lang={lang} t={t} />
      <AudienceSection lang={lang} t={t} />
      <HowItWorksSection lang={lang} t={t} />
      <FAQSection lang={lang} t={t} />
      <CTASection lang={lang} t={t} />

      <Footer lang={lang} />
    </main>
  );
}
