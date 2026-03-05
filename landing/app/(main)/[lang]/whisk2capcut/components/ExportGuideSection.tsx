import { Language, TranslationKey } from '@/lib/i18n';
import KenBurnsDemo from '@/components/KenBurnsDemo';
import CapCutTimeline from '@/components/CapCutTimeline';

export default function ExportGuideSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section id="export-guide" className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('export_guide_title')}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('export_guide_subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Export Options */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">⚙️</span>
                {t('export_options_title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'export_opt1_name', desc: 'export_opt1_desc', icon: '📁', default: '-' },
                  { name: 'export_opt2_name', desc: 'export_opt2_desc', icon: '🔍', default: 'ON' },
                  { name: 'export_opt3_name', desc: 'export_opt3_desc', icon: '🎬', default: 'ON' },
                  { name: 'export_opt4_name', desc: 'export_opt4_desc', icon: '💬', default: 'ON' },
                ].map((opt, i) => (
                  <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{opt.icon}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {t(opt.name as TranslationKey)}
                      </span>
                      <span className="ml-auto text-xs px-2 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded">
                        {opt.default}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t(opt.desc as TranslationKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ken Burns Effect - Interactive Demo */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">🎬</span>
                {t('kenburns_title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('kenburns_desc')}
              </p>

              {/* Interactive Ken Burns Demo */}
              <KenBurnsDemo lang={lang} />

              {/* Modes - collapsed info */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span>🎯</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {t('kenburns_mode_pattern')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('kenburns_mode_pattern_desc')}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span>🎲</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {t('kenburns_mode_random')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('kenburns_mode_random_desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Import Steps */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">📥</span>
                {t('import_title')}
              </h3>

              {/* CapCut Project Folder Paths */}
              <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>📁</span>
                  {lang === 'ko' ? 'CapCut 프로젝트 폴더 경로' : 'CapCut Project Folder Path'}
                </h4>
                <div className="space-y-3">
                  {/* macOS */}
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🍎</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">macOS</div>
                      <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 px-3 py-2 rounded-lg font-mono overflow-x-auto">
                        ~/Movies/CapCut/User Data/Projects/com.lveditor.draft/
                      </code>
                    </div>
                  </div>
                  {/* Windows - 3 paths */}
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🪟</span>
                    <div className="flex-1 space-y-2">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Windows</div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">CapCut ({lang === 'ko' ? '기본' : 'Default'})</span>
                        <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 px-3 py-2 rounded-lg font-mono overflow-x-auto mt-1">
                          C:\Users\[{lang === 'ko' ? '사용자명' : 'Username'}]\AppData\Local\CapCut\User Data\Projects\com.lveditor.draft\
                        </code>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">CapCut Pro</span>
                        <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 px-3 py-2 rounded-lg font-mono overflow-x-auto mt-1">
                          C:\Users\[{lang === 'ko' ? '사용자명' : 'Username'}]\AppData\Local\CapCutPro\User Data\Projects\com.lveditor.draft\
                        </code>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Documents</span>
                        <code className="block text-xs bg-gray-900 dark:bg-black text-green-400 px-3 py-2 rounded-lg font-mono overflow-x-auto mt-1">
                          C:\Users\[{lang === 'ko' ? '사용자명' : 'Username'}]\Documents\CapCut\Projects\
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
                  {lang === 'ko'
                    ? '💡 확장 프로그램에서 프리셋(CapCut / CapCut Pro / Documents)을 선택하면 경로가 자동 생성됩니다.'
                    : '💡 Select a preset (CapCut / CapCut Pro / Documents) in the extension to auto-generate the path.'}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  { step: '1', key: 'import_step1' },
                  { step: '2', key: 'import_step2' },
                  { step: '3', key: 'import_step3' },
                  { step: '4', key: 'import_step4' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t(item.key as TranslationKey)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Detailed Guide Link */}
              <a
                href={`/guide/${lang}/whisk2capcut/`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-lg font-medium text-sm hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {lang === 'ko' ? '자세한 가이드 보기' : lang === 'ja' ? '詳細ガイドを見る' : lang === 'de' ? 'Ausführliche Anleitung' : 'View Detailed Guide'}
              </a>
            </div>

            {/* CapCut Preview - Interactive Timeline */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">🎥</span>
                {lang === 'ko' ? 'CapCut에서 보이는 모습' : 'Preview in CapCut'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {lang === 'ko'
                  ? '내보낸 프로젝트를 CapCut에서 열면 이런 모습입니다. 이미지, 자막, 애니메이션이 모두 타임라인에 배치됩니다.'
                  : 'This is how your exported project looks in CapCut. Images, subtitles, and animations are all placed on the timeline.'}
              </p>
              <CapCutTimeline lang={lang} />
            </div>

            {/* Output Structure */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="text-2xl">📂</span>
                {t('output_structure_title')}
              </h3>
              <div className="bg-gray-900 dark:bg-black rounded-xl p-6 font-mono text-sm text-gray-300 overflow-x-auto">
                <pre>{`project_folder/
├── draft_info.json        # CapCut project data
├── draft_meta_info.json   # Project metadata
├── media/                 # Image/Video/SFX files
│   ├── scene_001.png
│   ├── scene_002.png
│   └── ...
└── README.txt             # Import guide`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
