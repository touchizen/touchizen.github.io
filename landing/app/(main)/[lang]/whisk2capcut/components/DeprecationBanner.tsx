import { Language } from '@/lib/i18n';

const messages: Record<Language, { title: string; desc: string }> = {
  ko: {
    title: '⚠️ Whisk2CapCut 서비스 종료 안내',
    desc: 'Google Whisk 종료(4/30)에 따라 Whisk2CapCut도 서비스를 종료했습니다.',
  },
  en: {
    title: '⚠️ Whisk2CapCut End of Service Notice',
    desc: 'Google Whisk shut down on April 30, so Whisk2CapCut has been discontinued as well.',
  },
  ja: {
    title: '⚠️ Whisk2CapCut サービス終了のお知らせ',
    desc: 'Google Whisk終了(4/30)に伴い、Whisk2CapCutもサービスを終了しました。',
  },
  de: {
    title: '⚠️ Whisk2CapCut Einstellung des Dienstes',
    desc: 'Google Whisk wurde am 30. April eingestellt, daher wurde auch Whisk2CapCut beendet.',
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
        </div>
      </div>
    </div>
  );
}
