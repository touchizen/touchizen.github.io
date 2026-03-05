import { Language, TranslationKey } from '@/lib/i18n';

export default function FAQSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section id="faq" className="section-padding">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('faq_title')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('faq_subtitle')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'faq_q1', a: 'faq_a1' },
              { q: 'faq_q2', a: 'faq_a2' },
              { q: 'faq_q3', a: 'faq_a3' },
              { q: 'faq_q4', a: 'faq_a4' },
              { q: 'faq_q5', a: 'faq_a5' },
              { q: 'faq_q6', a: 'faq_a6' },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-gray-900 dark:text-white pr-4">
                    {t(faq.q as TranslationKey)}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                  {t(faq.a as TranslationKey)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
  );
}
