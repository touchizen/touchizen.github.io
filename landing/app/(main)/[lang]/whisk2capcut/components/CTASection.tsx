import { Language, TranslationKey } from '@/lib/i18n';

export default function CTASection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding bg-gradient-to-br from-violet-500 to-purple-600">
        <div className="container-custom px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('whisk2capcut_cta_title')}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t('whisk2capcut_cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Desktop App - Primary */}
            <a
              href="https://github.com/touchizen/whisk2capcut-desktop/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 active:scale-95"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('whisk2capcut_cta_desktop' as TranslationKey)}
            </a>
            {/* Chrome Extension - Secondary */}
            <a
              href="https://chromewebstore.google.com/detail/whisk2capcut/bipgbkcmomdhfclabgdgepdhdfekcldl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white border-2 border-white/40 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 active:scale-95"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001-3.952 6.848c.404.037.812.057 1.227.057 6.627 0 12-5.373 12-12 0-1.19-.176-2.339-.5-3.424z" />
              </svg>
              {t('whisk2capcut_cta_chrome' as TranslationKey)}
            </a>
          </div>
        </div>
      </section>
  );
}
