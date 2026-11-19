import { Language } from '@/lib/i18n';

const REPO_URL = 'https://github.com/touchizen/AutoFlowCut';

const messages: Record<Language, { title: string; desc: string; cta: string }> = {
  ko: {
    title: '⚠️ AutoFlowCut 운영 종료 안내',
    desc: 'AutoFlowCut은 더 이상 운영하지 않습니다. 앞으로 업데이트·버그 수정·지원은 없습니다. 소스 코드는 GitHub에 MIT 라이선스로 공개되어 있습니다.',
    cta: 'GitHub에서 소스 보기',
  },
  en: {
    title: '⚠️ AutoFlowCut is no longer maintained',
    desc: 'Development and support have ended — there will be no further updates, bug fixes or support. The source code remains available on GitHub under the MIT License.',
    cta: 'View source on GitHub',
  },
  ja: {
    title: '⚠️ AutoFlowCut 運営終了のお知らせ',
    desc: 'AutoFlowCutの運営は終了しました。今後のアップデート・不具合修正・サポートはありません。ソースコードはGitHubでMITライセンスのもと公開しています。',
    cta: 'GitHubでソースを見る',
  },
  de: {
    title: '⚠️ AutoFlowCut wird nicht mehr gepflegt',
    desc: 'Entwicklung und Support wurden eingestellt — es gibt keine weiteren Updates, Fehlerbehebungen oder Support. Der Quellcode bleibt auf GitHub unter der MIT-Lizenz verfügbar.',
    cta: 'Quellcode auf GitHub',
  },
};

export default function RetiredBanner({ lang }: { lang: Language }) {
  const m = messages[lang];

  return (
    <div data-afc-retired className="relative z-40 mt-16 bg-gradient-to-r from-amber-700 to-orange-700 text-white">
      <div className="container-custom px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <div className="flex-1">
            <p className="font-bold text-lg">{m.title}</p>
            <p className="text-sm text-white">{m.desc}</p>
          </div>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-orange-800 rounded-xl font-bold text-sm hover:bg-orange-50 transition-all shrink-0"
          >
            {m.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
