import { Language, TranslationKey } from '@/lib/i18n';
import KenBurnsDemo from '@/components/KenBurnsDemo';

export default function ExportGuideSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section id="export-guide" className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-medium mb-4">
              <span>&#x2702;&#xFE0F;</span>
              {t('autoflowcut_export_badge' as TranslationKey)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {t('autoflowcut_export_title' as TranslationKey)}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t('autoflowcut_export_desc' as TranslationKey)}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-10">
            {/* 4 Export Option Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '\u{1F4C1}', title: 'autoflowcut_export_opt1_title', desc: 'autoflowcut_export_opt1_desc' },
                { icon: '\u{1F50D}', title: 'autoflowcut_export_opt2_title', desc: 'autoflowcut_export_opt2_desc' },
                { icon: '\u{1F4AC}', title: 'autoflowcut_export_opt3_title', desc: 'autoflowcut_export_opt3_desc' },
                { icon: '\u{1F3AC}', title: 'autoflowcut_export_opt4_title', desc: 'autoflowcut_export_opt4_desc' },
              ].map((opt, i) => (
                <div key={i} className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 text-center">
                  <div className="text-3xl mb-3">{opt.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                    {t(opt.title as TranslationKey)}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {t(opt.desc as TranslationKey)}
                  </p>
                </div>
              ))}
            </div>

            {/* Ken Burns Effect - Interactive Demo */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">&#x1F3AC;</span>
                {t('kenburns_title' as TranslationKey)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('kenburns_desc' as TranslationKey)}
              </p>

              <KenBurnsDemo lang={lang} />

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span>&#x1F3AF;</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {t('kenburns_mode_pattern' as TranslationKey)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('kenburns_mode_pattern_desc' as TranslationKey)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span>&#x1F3B2;</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {t('kenburns_mode_random' as TranslationKey)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('kenburns_mode_random_desc' as TranslationKey)}
                  </p>
                </div>
              </div>
            </div>

            {/* Folder Path Section */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span>&#x1F4C1;</span>
                {t('autoflowcut_export_folder_title' as TranslationKey)}
              </h3>

              <div className="space-y-4">
                {/* macOS */}
                <div className="flex items-start gap-3">
                  <span className="text-lg">&#x1F34E;</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">macOS</div>
                    <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 px-3 py-2 rounded-lg font-mono overflow-x-auto">
                      ~/Movies/CapCut/User Data/Projects/com.lveditor.draft/
                    </code>
                  </div>
                </div>

                {/* Windows */}
                <div className="flex items-start gap-3">
                  <span className="text-lg">&#x1FA9F;</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Windows</div>
                    <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 px-3 py-2 rounded-lg font-mono overflow-x-auto">
                      {`%USERPROFILE%\\AppData\\Local\\CapCut\\User Data\\Projects\\com.lveditor.draft\\`}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Import Steps */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">&#x1F4E5;</span>
                {lang === 'ko' ? 'CapCut 가져오기' : 'Import to CapCut'}
              </h3>

              <div className="space-y-4 mb-8">
                {[
                  { step: '1', key: 'autoflowcut_export_import_step1' },
                  { step: '2', key: 'autoflowcut_export_import_step2' },
                  { step: '3', key: 'autoflowcut_export_import_step3' },
                  { step: '4', key: 'autoflowcut_export_import_step4' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t(item.key as TranslationKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Guide Link */}
            <div className="text-center">
              <a
                href={`/guide/${lang}/autoflowcut/`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <span>📖</span>
                {lang === 'ko' ? '전체 가이드 보기' : lang === 'ja' ? '完全ガイドを見る' : lang === 'de' ? 'Vollständige Anleitung' : 'View Full Guide'}
                <span>→</span>
              </a>
            </div>

            {/* Output Structure */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">&#x1F4C2;</span>
                {lang === 'ko' ? '출력 구조' : 'Output Structure'}
              </h3>
              <div className="bg-gray-900 dark:bg-black rounded-xl p-6 font-mono text-sm text-gray-300 overflow-x-auto">
                <pre>{`project_name/
\u251C\u2500\u2500 draft_info.json
\u251C\u2500\u2500 draft_meta_info.json
\u251C\u2500\u2500 media/
\u2502   \u251C\u2500\u2500 scene_001.png
\u2502   \u251C\u2500\u2500 scene_002.mp4
\u2502   \u2514\u2500\u2500 ...
\u2514\u2500\u2500 README.txt`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
