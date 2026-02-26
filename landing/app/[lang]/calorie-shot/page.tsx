'use client';

import { useRouter, useParams } from 'next/navigation';
import { Language, languages, translations, TranslationKey } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CalorieShotPage() {
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;

  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';

  const t = (key: TranslationKey) => translations[lang][key];

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}/calorie-shot`);
  };

  const features = [
    { title: 'calorieshot_feat1_title', desc: 'calorieshot_feat1_desc', icon: '🤖' },
    { title: 'calorieshot_feat2_title', desc: 'calorieshot_feat2_desc', icon: '📊' },
    { title: 'calorieshot_feat3_title', desc: 'calorieshot_feat3_desc', icon: '🎯' },
    { title: 'calorieshot_feat4_title', desc: 'calorieshot_feat4_desc', icon: '📝' },
    { title: 'calorieshot_feat5_title', desc: 'calorieshot_feat5_desc', icon: '💡' },
    { title: 'calorieshot_feat6_title', desc: 'calorieshot_feat6_desc', icon: '📤' },
  ];

  const steps = [
    { title: 'calorieshot_step1_title', desc: 'calorieshot_step1_desc', num: '1', icon: '👤' },
    { title: 'calorieshot_step2_title', desc: 'calorieshot_step2_desc', num: '2', icon: '📷' },
    { title: 'calorieshot_step3_title', desc: 'calorieshot_step3_desc', num: '3', icon: '⚡' },
    { title: 'calorieshot_step4_title', desc: 'calorieshot_step4_desc', num: '4', icon: '✅' },
  ];

  const screenshots = [
    { key: 'calorieshot_ss_home', file: 'home' },
    { key: 'calorieshot_ss_camera', file: 'camera' },
    { key: 'calorieshot_ss_result', file: 'result' },
    { key: 'calorieshot_ss_history', file: 'history' },
    { key: 'calorieshot_ss_pricing', file: 'pricing' },
  ];

  return (
    <main className="min-h-screen">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container-custom px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              📱 {t('calorieshot_platform_badge' as TranslationKey)}
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl flex items-center justify-center text-5xl md:text-6xl shadow-lg">
                📸
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                {t('calorieshot_hero_title' as TranslationKey)}
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-bold text-green-500 dark:text-green-400 mb-4">
              {t('calorieshot_hero_slogan' as TranslationKey)}
            </p>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('calorieshot_hero_subtitle' as TranslationKey)}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#features" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/25">
                {t('calorieshot_hero_cta_secondary' as TranslationKey)}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                3{lang === 'ko' ? '초' : lang === 'ja' ? '秒' : lang === 'de' ? 'Sek' : 'sec'}
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? 'AI 분석 속도' : lang === 'ja' ? 'AI分析速度' : lang === 'de' ? 'KI-Analysezeit' : 'AI Analysis Speed'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                8+
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? '영양 성분 분석' : lang === 'ja' ? '栄養素分析' : lang === 'de' ? 'Nährstoffanalysen' : 'Nutrients Analyzed'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-2">
                24h
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? '일일 섭취 추적' : lang === 'ja' ? '毎日の摂取追跡' : lang === 'de' ? 'Tägliches Tracking' : 'Daily Intake Tracking'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {t('calorieshot_screenshots_title' as TranslationKey)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                {t('calorieshot_screenshots_title' as TranslationKey)}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('calorieshot_screenshots_subtitle' as TranslationKey)}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {screenshots.map((ss, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-full aspect-[9/19.5] bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg mb-3 relative">
                    <img
                      src={`/images/thumbnails/calorie-shot/${ss.file}_${lang}.png`}
                      alt={t(ss.key as TranslationKey)}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                        const placeholder = document.createElement('div');
                        placeholder.className = 'text-center p-4';
                        placeholder.innerHTML = `<div class="text-4xl mb-2">📱</div><div class="text-xs text-gray-500">${t(ss.key as TranslationKey)}</div>`;
                        target.parentElement!.appendChild(placeholder);
                      }}
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    {t(ss.key as TranslationKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              🚀 {lang === 'ko' ? '사용 방법' : lang === 'ja' ? '使い方' : lang === 'de' ? 'So funktioniert es' : 'How It Works'}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                {lang === 'ko' ? '4단계로 쉽게' : lang === 'ja' ? '4ステップで簡単に' : lang === 'de' ? 'Einfach in 4 Schritten' : 'Easy in 4 Steps'}
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {step.num}
                  </div>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {t(step.title as TranslationKey)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(step.desc as TranslationKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              ✨ {lang === 'ko' ? '주요 기능' : lang === 'ja' ? '主な機能' : lang === 'de' ? 'Hauptfunktionen' : 'Key Features'}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                {lang === 'ko' ? '강력한 기능' : lang === 'ja' ? 'パワフルな機能' : lang === 'de' ? 'Leistungsstarke Funktionen' : 'Powerful Features'}
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="text-3xl mb-4">{feat.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {t(feat.title as TranslationKey)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(feat.desc as TranslationKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Analysis Demo */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                  {lang === 'ko' ? '이렇게 분석해요' : lang === 'ja' ? 'こんな風に分析します' : lang === 'de' ? 'So analysieren wir' : 'How We Analyze'}
                </span>
              </h2>
            </div>

            {/* Demo Card */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-3xl">
                  🍜
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {lang === 'ko' ? '김치 돼지 찌개' : lang === 'ja' ? 'キムチ豚チゲ' : lang === 'de' ? 'Kimchi-Schweinefleisch-Eintopf' : 'Kimchi Pork Stew'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                      AI {lang === 'ko' ? '분석' : lang === 'ja' ? '分析' : lang === 'de' ? 'Analyse' : 'Analysis'}
                    </span>
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">348</div>
                  <div className="text-sm text-gray-500">kcal</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                {lang === 'ko' ? '1인분 (약 350g) 기준' : lang === 'ja' ? '1人前 (約350g) 基準' : lang === 'de' ? 'Pro Portion (ca. 350g)' : 'Per serving (approx. 350g)'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 font-mono">
                = 40×4 + 20×4 + 12×9 = 160 + 80 + 108 = 348kcal
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-xl">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full border-4 border-orange-400 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">40g</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {lang === 'ko' ? '탄수화물' : lang === 'ja' ? '炭水化物' : lang === 'de' ? 'Kohlenhydrate' : 'Carbs'}
                  </p>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-xl">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full border-4 border-green-500 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">20g</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {lang === 'ko' ? '단백질' : lang === 'ja' ? 'タンパク質' : lang === 'de' ? 'Protein' : 'Protein'}
                  </p>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-xl">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full border-4 border-red-400 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">12g</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {lang === 'ko' ? '지방' : lang === 'ja' ? '脂質' : lang === 'de' ? 'Fett' : 'Fat'}
                  </p>
                </div>
              </div>

              {/* Detail Nutrients */}
              <div className="border-t border-gray-200 dark:border-gray-700 mb-6">
                {[
                  { label: { ko: '나트륨', ja: 'ナトリウム', de: 'Natrium', en: 'Sodium' }, value: '1,200mg' },
                  { label: { ko: '당류', ja: '糖類', de: 'Zucker', en: 'Sugar' }, value: '5g' },
                  { label: { ko: '콜레스테롤', ja: 'コレステロール', de: 'Cholesterin', en: 'Cholesterol' }, value: '45mg' },
                  { label: { ko: '식이섬유', ja: '食物繊維', de: 'Ballaststoffe', en: 'Fiber' }, value: '3g' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700/50">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.label[lang]}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 flex items-start gap-3">
                <span className="text-lg">💡</span>
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                  {lang === 'ko'
                    ? '김치찌개는 단백질이 풍부하고 발효 식품의 유산균이 장 건강에 좋아요. 나트륨이 높을 수 있으니 국물은 적당히!'
                    : lang === 'ja'
                    ? 'キムチチゲはタンパク質が豊富で、発酵食品の乳酸菌が腸の健康に良いです。ナトリウムが高い場合があるので、スープは適度に！'
                    : lang === 'de'
                    ? 'Kimchi-Eintopf ist reich an Protein und die Milchsäurebakterien fermentierter Lebensmittel sind gut für die Darmgesundheit. Der Natriumgehalt kann hoch sein, also essen Sie die Brühe in Maßen!'
                    : 'Kimchi stew is rich in protein and the probiotics from fermented foods are great for gut health. Sodium can be high, so go easy on the broth!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container-custom px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {lang === 'ko'
              ? '지금 바로 시작하세요!'
              : lang === 'ja'
              ? '今すぐ始めましょう！'
              : lang === 'de'
              ? 'Starten Sie jetzt!'
              : 'Start Now!'}
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {lang === 'ko'
              ? '음식 사진 한 장으로 칼로리 관리를 시작하세요. 무료 분석 3회를 제공합니다.'
              : lang === 'ja'
              ? '食べ物の写真1枚でカロリー管理を始めましょう。無料分析3回を提供します。'
              : lang === 'de'
              ? 'Beginnen Sie mit dem Kalorienmanagement mit nur einem Foto. 3 kostenlose Analysen inklusive.'
              : 'Start managing calories with just one photo. We offer 3 free analyses.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold text-lg shadow-lg">
              📱 {t('calorieshot_platform_badge' as TranslationKey)}
            </div>
          </div>
          <p className="text-sm text-white/60 mt-4">
            * {lang === 'ko'
              ? 'AI 추정치이며, 실제 칼로리와 차이가 있을 수 있습니다.'
              : lang === 'ja'
              ? 'AI推定値であり、実際のカロリーと異なる場合があります。'
              : lang === 'de'
              ? 'KI-Schätzwerte. Tatsächliche Kalorien können abweichen.'
              : 'AI estimates may differ from actual calories.'}
          </p>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
