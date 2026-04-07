import { Language } from '@/lib/i18n';

const messages: Record<Language, { title: string; desc: string; cta: string }> = {
  ko: {
    title: '⚠️ Whisk2CapCut 서비스 종료 안내',
    desc: 'Whisk2CapCut은 2025년 4월 30일부로 서비스가 종료됩니다. 더 강력한 AutoFlowCut으로 전환해 주세요!',
    cta: 'AutoFlowCut으로 이동',
  },
  en: {
    title: '⚠️ Whisk2CapCut End of Service Notice',
    desc: 'Whisk2CapCut will be discontinued on April 30, 2025. Please switch to the more powerful AutoFlowCut!',
    cta: 'Switch to AutoFlowCut',
  },
  ja: {
    title: '⚠️ Whisk2CapCut サービス終了のお知らせ',
    desc: 'Whisk2CapCutは2025年4月30日をもってサービスを終了します。より強力なAutoFlowCutへの移行をお願いします！',
    cta: 'AutoFlowCutに移行する',
  },
  de: {
    title: '⚠️ Whisk2CapCut Einstellung des Dienstes',
    desc: 'Whisk2CapCut wird am 30. April 2025 eingestellt. Bitte wechseln Sie zum leistungsstärkeren AutoFlowCut!',
    cta: 'Zu AutoFlowCut wechseln',
  },
};

export default function DeprecationBanner({ lang }: { lang: Language }) {
  const m = messages[lang];

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
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
