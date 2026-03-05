import { Language, TranslationKey } from '@/lib/i18n';

export default function TimeSavingSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('time_save_badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                {t('time_save_title')}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t('time_save_subtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-10">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    {lang === 'ko' ? '수작업' : 'Manual Work'}
                  </div>
                  <div className="text-5xl md:text-6xl font-bold text-red-500">
                    4{lang === 'ko' ? '시간+' : 'hr+'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {lang === 'ko' ? '이미지 편집, 배치, 타임라인 설정' : 'Edit, arrange, setup timeline'}
                  </div>
                </div>

                <div className="flex items-center">
                  <svg className="w-12 h-12 text-green-500 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                <div className="text-center">
                  <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-2 uppercase tracking-wide">
                    Whisk2CapCut
                  </div>
                  <div className="text-5xl md:text-6xl font-bold text-green-500">
                    &lt;1{lang === 'ko' ? '분' : 'min'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {lang === 'ko' ? '자동 변환 완료' : 'Auto conversion done'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-violet-500">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {lang === 'ko' ? '이미지를 ~10분에 생성' : 'images in ~10 min'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">
                    {lang === 'ko' ? '4시간+' : '4+ hrs'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {lang === 'ko' ? '수작업 시간 절약' : 'manual work saved'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-500">
                    {lang === 'ko' ? '1클릭' : '1 Click'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {lang === 'ko' ? 'CapCut 프로젝트로 내보내기' : 'export to CapCut project'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {t('time_save_desc')}
            </p>
          </div>
        </div>
      </section>
  );
}
