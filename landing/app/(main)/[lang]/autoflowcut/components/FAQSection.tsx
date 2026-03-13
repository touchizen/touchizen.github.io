import { Language, TranslationKey } from '@/lib/i18n';

export default function FAQSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  const faqs = [
    { q: 'autoflowcut_faq_q1', a: 'autoflowcut_faq_a1' },
    { q: 'autoflowcut_faq_q2', a: 'autoflowcut_faq_a2' },
    { q: 'autoflowcut_faq_q3', a: 'autoflowcut_faq_a3' },
    { q: 'autoflowcut_faq_q4', a: 'autoflowcut_faq_a4' },
    { q: 'autoflowcut_faq_q5', a: 'autoflowcut_faq_a5' },
    { q: 'autoflowcut_faq_q6', a: 'autoflowcut_faq_a6' },
  ];

  return (
    <section id="faq" className="section-padding">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-4">
            💬 FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {t('autoflowcut_faq_title' as TranslationKey)}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t('autoflowcut_faq_subtitle' as TranslationKey)}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    Q
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white pr-4">
                    {t(faq.q as TranslationKey)}
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 pl-[4.25rem] text-gray-600 dark:text-gray-400 leading-relaxed">
                {t(faq.a as TranslationKey)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
