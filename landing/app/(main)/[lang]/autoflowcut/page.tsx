'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Language, languages, translations, TranslationKey } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Section components
import HeroSection from './components/HeroSection';
import ScreenshotGallerySection from './components/ScreenshotGallerySection';
import DemoVideoSection from './components/DemoVideoSection';
import InstallationSection from './components/InstallationSection';
import WhatIsSection from './components/WhatIsSection';
import FlowIntroSection from './components/FlowIntroSection';
import WorkflowSection from './components/WorkflowSection';
import StoryPipelineSection from './components/StoryPipelineSection';
import TimeSavingSection from './components/TimeSavingSection';
import FeaturesSection from './components/FeaturesSection';
import VideoGenerationSection from './components/VideoGenerationSection';
import ComparisonSection from './components/ComparisonSection';
import AudienceSection from './components/AudienceSection';
import HowItWorksSection from './components/HowItWorksSection';
import InputGuideSection from './components/InputGuideSection';
import ExportGuideSection from './components/ExportGuideSection';
import TrustSection from './components/TrustSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';

export default function AutoFlowCutPage() {
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;

  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';

  const t = (key: TranslationKey) => translations[lang][key];

  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}/autoflowcut`);
  };

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />

      <HeroSection lang={lang} t={t} />
      <DemoVideoSection lang={lang} t={t} />
      <ScreenshotGallerySection lang={lang} t={t} />
      <InstallationSection lang={lang} t={t} isMac={isMac} />
      <WhatIsSection lang={lang} t={t} />
      <FlowIntroSection lang={lang} t={t} />
      <WorkflowSection lang={lang} t={t} />
      <StoryPipelineSection lang={lang} t={t} />
      <TimeSavingSection lang={lang} t={t} />
      <FeaturesSection lang={lang} t={t} />
      <VideoGenerationSection lang={lang} t={t} />
      <ComparisonSection lang={lang} t={t} />
      <AudienceSection lang={lang} t={t} />
      <HowItWorksSection lang={lang} t={t} />
      <InputGuideSection lang={lang} t={t} />
      <ExportGuideSection lang={lang} t={t} />
      <TrustSection lang={lang} t={t} />
      <FAQSection lang={lang} t={t} />
      <CTASection lang={lang} t={t} />

      <Footer lang={lang} />
    </main>
  );
}
