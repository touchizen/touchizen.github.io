'use client';

import { Language, translations, TranslationKey } from '@/lib/i18n';

interface PricingProps {
  lang: Language;
}

export default function Pricing({ lang }: PricingProps) {
  const t = (key: TranslationKey) => translations[lang][key];

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
      gradient: 'from-gray-500 to-gray-600',
    },
    {
      name: t('pricing_pro'),
      desc: t('pricing_pro_desc'),
      price: '$9.99',
      period: '/mo',
      features: [
        t('pricing_pro_feature1'),
        t('pricing_pro_feature2'),
        t('pricing_pro_feature3'),
      ],
      cta: t('pricing_cta_pro'),
      highlighted: true,
      gradient: 'from-primary-500 to-accent-500',
    },
  ];

  return (
    <section id="pricing" className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('pricing_title')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t('pricing_subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl card-hover animate-fade-in stagger-${index + 1} ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
              }`}
              style={{ opacity: 0 }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                  POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                  {plan.desc}
                </p>
              </div>

              <div className="text-center mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={`text-lg ${plan.highlighted ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? 'text-white' : 'text-primary-500'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={plan.highlighted ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95 ${
                  plan.highlighted
                    ? 'bg-white text-primary-600 hover:bg-gray-100'
                    : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
