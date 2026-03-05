import { Language, TranslationKey } from '@/lib/i18n';

export default function DemoVideoSection({ lang, t }: { lang: Language; t: (key: TranslationKey) => string }) {
  return (
      <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-700 dark:text-red-300 text-sm font-medium mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                {lang === 'ko' ? '데모 영상' : lang === 'ja' ? 'デモ動画' : lang === 'de' ? 'Demo-Video' : 'Demo Video'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">
                  {lang === 'ko' ? '1분 만에 이해하기' : lang === 'ja' ? '1分で理解する' : lang === 'de' ? 'In 1 Minute verstehen' : 'Understand in 1 Minute'}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {lang === 'ko' ? '실제 사용 과정을 영상으로 확인하세요' : lang === 'ja' ? '実際の使用プロセスを動画でご確認ください' : lang === 'de' ? 'Sehen Sie den tatsächlichen Nutzungsprozess im Video' : 'Watch the actual usage process in the video'}
              </p>
            </div>

            {/* YouTube Video Placeholder */}
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700">
              {/* TODO: Replace this placeholder with actual YouTube embed */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                <svg className="w-20 h-20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <p className="text-lg font-medium">
                  {lang === 'ko' ? '데모 영상 준비 중...' : lang === 'ja' ? 'デモ動画準備中...' : lang === 'de' ? 'Demo-Video wird vorbereitet...' : 'Demo video coming soon...'}
                </p>
                <p className="text-sm mt-2">
                  {lang === 'ko' ? 'YouTube 영상 ID를 여기에 추가하세요' : lang === 'ja' ? 'ここにYouTube動画IDを追加' : lang === 'de' ? 'YouTube-Video-ID hier hinzufügen' : 'Add YouTube video ID here'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
