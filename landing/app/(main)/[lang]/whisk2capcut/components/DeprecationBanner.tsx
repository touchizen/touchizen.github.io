import { Language } from '@/lib/i18n';

const messages: Record<Language, { title: string; desc: string; cta: string }> = {
  ko: {
    title: '⚠️ Whisk2CapCut 서비스 종료 안내',
    desc: 'Google Whisk 종료(4/30)에 따라 Whisk2CapCut도 서비스를 종료합니다. Google Flow AI 기반의 AutoFlowCut으로 전환해 주세요!',
    cta: 'AutoFlowCut으로 이동',
  },
  en: {
    title: '⚠️ Whisk2CapCut End of Service Notice',
    desc: 'Google Whisk is shutting down on April 30. Whisk2CapCut will also be discontinued. Please switch to AutoFlowCut, powered by Google Flow AI!',
    cta: 'Switch to AutoFlowCut',
  },
  ja: {
    title: '⚠️ Whisk2CapCut サービス終了のお知らせ',
    desc: 'Google Whisk終了(4/30)に伴い、Whisk2CapCutもサービスを終了します。Google Flow AI搭載のAutoFlowCutへ移行してください！',
    cta: 'AutoFlowCutに移行する',
  },
  de: {
    title: '⚠️ Whisk2CapCut Einstellung des Dienstes',
    desc: 'Google Whisk wird am 30. April eingestellt. Whisk2CapCut wird ebenfalls beendet. Bitte wechseln Sie zu AutoFlowCut mit Google Flow AI!',
    cta: 'Zu AutoFlowCut wechseln',
  },
};

export default function DeprecationBanner({ lang }: { lang: Language }) {
  const m = messages[lang];

  return (
    <div className="relative z-40 mt-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
      <div className="container-custom px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <div className="flex-1">
            <p className="font-bold text-lg">{m.title}</p>
            <p className="text-sm text-white/90">{m.desc}</p>
          </div>
          <a
            href={`/${lang}/autoflowcut`}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-orange-600 rounded-xl font-bold text-sm hover:bg-orange-50 transition-all shrink-0"
          >
            {m.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
