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
import WhiskIntroSection from './components/WhiskIntroSection';
import TimeSavingSection from './components/TimeSavingSection';
import WorkflowPipelineSection from './components/WorkflowPipelineSection';
import FeaturesSection from './components/FeaturesSection';
import AudienceSection from './components/AudienceSection';
import WhySection from './components/WhySection';
import HowItWorksSection from './components/HowItWorksSection';
import InputGuideSection from './components/InputGuideSection';
import ExportGuideSection from './components/ExportGuideSection';
import DesktopAppSection from './components/DesktopAppSection';
import PricingSection from './components/PricingSection';
import TrustSection from './components/TrustSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';

export default function Whisk2CapCutPage() {
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;

  // Validate lang parameter
  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';

  const t = (key: TranslationKey) => translations[lang][key];

  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}/whisk2capcut`);
  };

  const plans = [
    {
      name: t('pricing_free'),
      desc: t('pricing_free_desc'),
      price: '$0',
      period: '',
      features: [
        t('pricing_free_feature1'),
        t('pricing_free_feature2'),
        t('pricing_free_feature3'),
      ],
      cta: t('pricing_cta_free'),
      highlighted: false,
    },
    {
      name: t('pricing_pro'),
      desc: t('pricing_pro_desc'),
      price: '$4.99',
      period: lang === 'ko' ? '/월' : '/mo',
      yearlyPrice: '$39.99',
      yearlyPeriod: lang === 'ko' ? '/년' : '/yr',
      saveText: t('pricing_pro_save'),
      features: [
        t('pricing_pro_feature1'),
        t('pricing_pro_feature2'),
        t('pricing_pro_feature3'),
      ],
      cta: t('pricing_cta_pro'),
      highlighted: true,
    },
  ];

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />

      <HeroSection lang={lang} t={t} />
      <ScreenshotGallerySection lang={lang} t={t} />
      <DemoVideoSection lang={lang} t={t} />
      <InstallationSection lang={lang} t={t} isMac={isMac} />
      <WhatIsSection lang={lang} t={t} />
      <WhiskIntroSection lang={lang} t={t} />
      <TimeSavingSection lang={lang} t={t} />
      <WorkflowPipelineSection lang={lang} t={t} />
      <FeaturesSection lang={lang} t={t} />
      <AudienceSection lang={lang} t={t} />
      <WhySection lang={lang} t={t} />
      <HowItWorksSection lang={lang} t={t} />
      <InputGuideSection lang={lang} t={t} />
      <ExportGuideSection lang={lang} t={t} />
      <DesktopAppSection lang={lang} t={t} isMac={isMac} />
      <PricingSection lang={lang} t={t} plans={plans} />
      <TrustSection lang={lang} t={t} />
      <FAQSection lang={lang} t={t} />
      <CTASection lang={lang} t={t} />

      <Footer lang={lang} />
    </main>
  );
}
