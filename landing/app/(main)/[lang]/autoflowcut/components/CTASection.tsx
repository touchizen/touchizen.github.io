import { Language, TranslationKey } from '@/lib/i18n';
import { msStoreUrl } from '@/lib/storeUrl';

export default function CTASection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  const winStoreUrl = msStoreUrl('https://apps.microsoft.com/detail/9PNZVP54WRSM', lang);

  return (
    <section className="section-padding bg-gradient-to-br from-cyan-500 to-blue-600">
      <div className="container-custom px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-6">🎥</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('autoflowcut_cta_title' as TranslationKey)}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t('autoflowcut_cta_subtitle' as TranslationKey)}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Microsoft Store */}
            <a
              href={winStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-cyan-600 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 active:scale-95 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t('autoflowcut_cta_download' as TranslationKey)}
            </a>
            {/* Release notes */}
            <a
              href="https://github.com/touchizen/AutoFlowCut/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 text-white/70 hover:text-white rounded-2xl font-medium text-base transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h7l3 3v13H7V4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 4v4h4M9 13h6M9 17h4" />
              </svg>
              {t('autoflowcut_cta_github' as TranslationKey)}
            </a>
          </div>

          {/* API workflow badge */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/70 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {lang === 'ko' ? '무료 다운로드 · 내 API 키 사용' : lang === 'ja' ? '無料ダウンロード · 自分のAPIキー' : lang === 'de' ? 'Kostenloser Download · eigener API-Schlüssel' : 'Free download · BYO API key'}
          </div>
        </div>
      </div>
    </section>
  );
}
