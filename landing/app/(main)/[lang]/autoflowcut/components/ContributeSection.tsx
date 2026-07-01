import { Language, TranslationKey } from '@/lib/i18n';

export default function ContributeSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  const cards = [
    { title: 'autoflowcut_contribute_bug_title', desc: 'autoflowcut_contribute_bug_desc', icon: '🐞', color: 'from-amber-500 to-orange-600' },
    { title: 'autoflowcut_contribute_plugin_title', desc: 'autoflowcut_contribute_plugin_desc', icon: '🔌', color: 'from-violet-500 to-fuchsia-600' },
  ];

  return (
    <section id="contribute" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
            💚 {t('autoflowcut_contribute_badge' as TranslationKey)}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {t('autoflowcut_contribute_title' as TranslationKey)}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('autoflowcut_contribute_subtitle' as TranslationKey)}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {t(card.title as TranslationKey)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t(card.desc as TranslationKey)}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-500 max-w-2xl mx-auto mt-8">
          {t('autoflowcut_contribute_note' as TranslationKey)}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <a
            href="https://github.com/touchizen/AutoFlowCut"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            {t('autoflowcut_contribute_cta_github' as TranslationKey)}
          </a>
          <a
            href="https://discord.gg/DTMMs8TZDN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            {t('autoflowcut_contribute_cta_discord' as TranslationKey)}
          </a>
        </div>
      </div>
    </section>
  );
}
