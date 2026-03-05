import { Language, TranslationKey } from '@/lib/i18n';

export default function PricingSection({ lang, t, plans }: {
  lang: Language;
  t: (key: TranslationKey) => string;
  plans: Array<{
    name: string;
    desc: string;
    price: string;
    period: string;
    yearlyPrice?: string;
    yearlyPeriod?: string;
    saveText?: string;
    features: string[];
    cta: string;
    highlighted: boolean;
  }>;
}) {
  return (
      <section id="pricing" className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('whisk2capcut_pricing_title')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('whisk2capcut_pricing_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl card-hover ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
                }`}
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
                  <div className="mb-2">
                    <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={`text-lg ${plan.highlighted ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  {'yearlyPrice' in plan && plan.yearlyPrice && (
                    <div className={`text-sm ${plan.highlighted ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                      {lang === 'ko' ? '또는' : 'or'} {plan.yearlyPrice}{plan.yearlyPeriod}
                      <span className="ml-2 px-2 py-0.5 bg-green-400 text-green-900 text-xs font-bold rounded-full">
                        {plan.saveText}
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? 'text-white' : 'text-violet-500'}`}
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

                <a
                  href="https://chromewebstore.google.com/detail/whisk2capcut/bipgbkcmomdhfclabgdgepdhdfekcldl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 active:scale-95 ${
                    plan.highlighted
                      ? 'bg-white text-violet-600 hover:bg-gray-100'
                      : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-lg'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            {t('pricing_purchase_note' as TranslationKey)}
          </p>

          {/* Feature Comparison Table */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              {lang === 'ko' ? '기능 비교' : lang === 'ja' ? '機能比較' : lang === 'de' ? 'Funktionsvergleich' : 'Feature Comparison'}
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      {lang === 'ko' ? '기능' : lang === 'ja' ? '機能' : lang === 'de' ? 'Funktion' : 'Feature'}
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      <div>{lang === 'ko' ? '무료' : lang === 'ja' ? '無料' : lang === 'de' ? 'Kostenlos' : 'Free'}</div>
                      <div className="text-xs font-normal text-gray-500">$0</div>
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-violet-600 dark:text-violet-400">
                      <div>Pro ({lang === 'ko' ? '월간' : lang === 'ja' ? '月額' : lang === 'de' ? 'Monat' : 'Monthly'})</div>
                      <div className="text-xs font-normal">$4.99/{lang === 'ko' ? '월' : lang === 'ja' ? '月' : lang === 'de' ? 'Mo' : 'mo'}</div>
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20">
                      <div>Pro ({lang === 'ko' ? '연간' : lang === 'ja' ? '年額' : lang === 'de' ? 'Jahr' : 'Yearly'})</div>
                      <div className="text-xs font-normal">$39.99/{lang === 'ko' ? '년' : lang === 'ja' ? '年' : lang === 'de' ? 'Jahr' : 'yr'}</div>
                      <div className="text-xs text-green-500 font-semibold">{lang === 'ko' ? '33% 할인' : lang === 'ja' ? '33%オフ' : lang === 'de' ? '33% Rabatt' : '33% OFF'}</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {lang === 'ko' ? 'Whisk 대량 이미지 생성 및 자동저장' : lang === 'ja' ? 'Whisk一括画像生成と自動保存' : lang === 'de' ? 'Whisk Massenbildgenerierung & Auto-Speichern' : 'Whisk Bulk Image Generation & Auto-Save'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-green-500 font-semibold text-sm">
                        {lang === 'ko' ? '무제한' : lang === 'ja' ? '無制限' : lang === 'de' ? 'Unbegrenzt' : 'Unlimited'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-green-500 font-semibold text-sm">
                        {lang === 'ko' ? '무제한' : lang === 'ja' ? '無制限' : lang === 'de' ? 'Unbegrenzt' : 'Unlimited'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center bg-violet-50/50 dark:bg-violet-900/10">
                      <span className="text-green-500 font-semibold text-sm">
                        {lang === 'ko' ? '무제한' : lang === 'ja' ? '無制限' : lang === 'de' ? 'Unbegrenzt' : 'Unlimited'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {lang === 'ko' ? 'CapCut 내보내기' : lang === 'ja' ? 'CapCutエクスポート' : lang === 'de' ? 'CapCut Export' : 'CapCut Export'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-orange-500 font-semibold text-sm">
                        {lang === 'ko' ? '5회/7일' : lang === 'ja' ? '5回/7日' : lang === 'de' ? '5x/7 Tage' : '5x/7 days'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-green-500 font-semibold text-sm">
                        {lang === 'ko' ? '무제한' : lang === 'ja' ? '無制限' : lang === 'de' ? 'Unbegrenzt' : 'Unlimited'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center bg-violet-50/50 dark:bg-violet-900/10">
                      <span className="text-green-500 font-semibold text-sm">
                        {lang === 'ko' ? '무제한' : lang === 'ja' ? '無制限' : lang === 'de' ? 'Unbegrenzt' : 'Unlimited'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {lang === 'ko' ? 'Ken Burns 효과' : lang === 'ja' ? 'Ken Burnsエフェクト' : lang === 'de' ? 'Ken Burns Effekt' : 'Ken Burns Effect'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center bg-violet-50/50 dark:bg-violet-900/10">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {lang === 'ko' ? '자막 자동 삽입' : lang === 'ja' ? '字幕自動挿入' : lang === 'de' ? 'Automatische Untertitel' : 'Auto Subtitle Insertion'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center bg-violet-50/50 dark:bg-violet-900/10">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {lang === 'ko' ? '우선 지원' : lang === 'ja' ? '優先サポート' : lang === 'de' ? 'Prioritäts-Support' : 'Priority Support'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-4 py-4 text-center bg-violet-50/50 dark:bg-violet-900/10">
                      <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-t-2 border-violet-200 dark:border-violet-800">
                    <td className="px-4 py-5 text-sm font-bold text-gray-900 dark:text-white">
                      {lang === 'ko' ? '가격' : lang === 'ja' ? '価格' : lang === 'de' ? 'Preis' : 'Price'}
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">$0</div>
                      <div className="text-xs text-gray-500">{lang === 'ko' ? '영구 무료' : lang === 'ja' ? '永久無料' : lang === 'de' ? 'Für immer kostenlos' : 'Free forever'}</div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">$4.99</div>
                      <div className="text-xs text-gray-500">/{lang === 'ko' ? '월' : lang === 'ja' ? '月' : lang === 'de' ? 'Monat' : 'month'}</div>
                    </td>
                    <td className="px-4 py-5 text-center bg-violet-100/50 dark:bg-violet-900/30">
                      <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">$39.99</div>
                      <div className="text-xs text-gray-500">/{lang === 'ko' ? '년' : lang === 'ja' ? '年' : lang === 'de' ? 'Jahr' : 'year'}</div>
                      <div className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">
                        {lang === 'ko' ? '월 $3.33 (33% 할인)' : lang === 'ja' ? '月額$3.33 (33%オフ)' : lang === 'de' ? '$3.33/Monat (33% Rabatt)' : '$3.33/month (33% OFF)'}
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>
  );
}
