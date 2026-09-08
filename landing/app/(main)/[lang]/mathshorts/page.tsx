'use client';

import { useRouter, useParams } from 'next/navigation';
import { Language, languages } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 앱의 서랍에서 공유하는 링크가 이 페이지다. Play 주소를 직접 공유하지 않는 이유:
// iOS 가 나오면 한 링크로 두 스토어를 안내할 수 있어야 하고, 스토어에 아직 없는
// 나라에서도 무엇인지는 보여줄 수 있어야 한다.
const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.touchizen.mathvid';

type Copy = {
  tagline: string;
  lead: string;
  playCta: string;
  iosCta: string;
  iosNote: string;
  featuresTitle: string;
  features: { icon: string; title: string; desc: string }[];
  privacy: string;
  deleteAccount: string;
};

const COPY: Record<Language, Copy> = {
  ko: {
    tagline: '수식이 움직이는 영상',
    lead: '수학 문제를 사진으로 찍거나 수식을 직접 입력하면, 단계별 풀이와 함께 짧은 세로 영상을 만들어 줍니다.',
    playCta: 'Google Play에서 받기',
    iosCta: 'iOS 준비 중',
    iosNote: 'iPhone 버전은 준비하고 있습니다.',
    featuresTitle: '무엇을 하나요',
    features: [
      { icon: '📷', title: '찍거나, 입력하거나', desc: '교과서를 찍으면 수식을 읽어 옵니다. 읽은 내용은 확인하고 고칠 수 있어, 잘못 읽었을 때 그대로 진행되지 않습니다.' },
      { icon: '🎬', title: '풀이를 영상으로', desc: '푼 과정이 짧은 세로 영상이 됩니다. 만들어진 영상은 기기에 저장되고 원하면 공유할 수 있습니다.' },
      { icon: '📈', title: '공식이 움직인다', desc: '이차함수·삼각함수·지수와 로그·정규분포·타원과 나선·리사주 곡선이 자라나는 모습을 그립니다.' },
      { icon: '🪐', title: '물리는 검증된 장면으로', desc: '케플러의 세 법칙, 훅의 법칙, 단진동, 진행파, 포물선 운동 등 24가지 법칙에 전용 애니메이션이 있습니다. 시간에 따라 속도가 달라지는 운동도 실제 물리로 계산합니다.' },
      { icon: '👀', title: '만들기 전에 미리 보기', desc: '영상을 만들기 전에 미리 볼 수 있습니다. 크레딧은 확인한 뒤에 쓰입니다.' },
      { icon: '🔒', title: '영상은 기기에만', desc: '만든 영상과 편집 내용은 기기에만 저장되며 서버로 올라가지 않습니다.' },
    ],
    privacy: '개인정보처리방침',
    deleteAccount: '계정 삭제',
  },
  en: {
    tagline: 'Formulas that move',
    lead: 'Photograph a maths problem or type a formula, and MathShorts works through it step by step and turns the result into a short vertical video.',
    playCta: 'Get it on Google Play',
    iosCta: 'iOS coming soon',
    iosNote: 'An iPhone version is in the works.',
    featuresTitle: 'What it does',
    features: [
      { icon: '📷', title: 'Photograph it, or type it', desc: 'Point the camera at a textbook and the app reads the expression. You see what it read and can correct it, so a misread never carries on quietly.' },
      { icon: '🎬', title: 'Solutions as video', desc: 'The worked solution becomes a short vertical video, stored on your device and shareable if you want.' },
      { icon: '📈', title: 'Formulas that move', desc: 'Quadratics, trigonometric functions, exponentials and logarithms, the normal distribution, ellipses, spirals and Lissajous curves are animated as they are drawn.' },
      { icon: '🪐', title: 'Physics with verified scenes', desc: "Kepler's three laws, Hooke's law, harmonic motion, travelling waves and projectile motion are among 24 laws with their own animation. Motion whose speed varies over time is computed from the physics." },
      { icon: '👀', title: 'Preview before you spend', desc: 'You can preview a video before it is made. Credits are spent after you have seen it.' },
      { icon: '🔒', title: 'Videos stay on your device', desc: 'Videos you create and your edits stay on your device and are never uploaded to our servers.' },
    ],
    privacy: 'Privacy policy',
    deleteAccount: 'Delete account',
  },
  ja: {
    tagline: '数式が動く動画',
    lead: '数学の問題を撮影するか数式を入力すると、手順の解説とともに短い縦型動画をつくります。',
    playCta: 'Google Play で入手',
    iosCta: 'iOS 準備中',
    iosNote: 'iPhone 版は準備中です。',
    featuresTitle: 'できること',
    features: [
      { icon: '📷', title: '撮る、または入力する', desc: '教科書を撮ると数式を読み取ります。読み取り結果は確認して修正できます。' },
      { icon: '🎬', title: '解説を動画に', desc: '解いた手順が短い縦型動画になります。端末に保存され、共有もできます。' },
      { icon: '📈', title: '数式が動く', desc: '二次関数・三角関数・指数と対数・正規分布・楕円と螺旋・リサージュ曲線が描かれていきます。' },
      { icon: '🪐', title: '物理は検証済みの場面で', desc: 'ケプラーの三法則、フックの法則、単振動、進行波、放物運動など24の法則に専用アニメーションがあります。' },
      { icon: '👀', title: 'つくる前にプレビュー', desc: '動画をつくる前に確認できます。クレジットは確認したあとに使われます。' },
      { icon: '🔒', title: '動画は端末にだけ', desc: 'つくった動画と編集内容は端末にのみ保存され、サーバーには送信されません。' },
    ],
    privacy: 'プライバシーポリシー',
    deleteAccount: 'アカウント削除',
  },
  de: {
    tagline: 'Formeln, die sich bewegen',
    lead: 'Fotografieren Sie eine Matheaufgabe oder tippen Sie eine Formel — MathShorts rechnet Schritt für Schritt und macht daraus ein kurzes Hochkant-Video.',
    playCta: 'Bei Google Play laden',
    iosCta: 'iOS in Vorbereitung',
    iosNote: 'Eine iPhone-Version ist in Arbeit.',
    featuresTitle: 'Was die App macht',
    features: [
      { icon: '📷', title: 'Fotografieren oder tippen', desc: 'Richten Sie die Kamera auf ein Schulbuch — die App liest den Ausdruck. Sie sehen das Ergebnis und können es korrigieren.' },
      { icon: '🎬', title: 'Lösungen als Video', desc: 'Der Lösungsweg wird ein kurzes Hochkant-Video, auf dem Gerät gespeichert und teilbar.' },
      { icon: '📈', title: 'Formeln in Bewegung', desc: 'Parabeln, Winkelfunktionen, Exponential- und Logarithmusfunktionen, Normalverteilung, Ellipsen und Spiralen werden beim Zeichnen animiert.' },
      { icon: '🪐', title: 'Physik mit geprüften Szenen', desc: 'Keplers drei Gesetze, das Hookesche Gesetz, harmonische Schwingung, Wellen und Wurfbewegung gehören zu 24 Gesetzen mit eigener Animation.' },
      { icon: '👀', title: 'Vorschau vor dem Erstellen', desc: 'Sie können ein Video vorab ansehen. Credits werden erst danach verbraucht.' },
      { icon: '🔒', title: 'Videos bleiben auf dem Gerät', desc: 'Erstellte Videos und Bearbeitungen bleiben auf Ihrem Gerät und werden nie hochgeladen.' },
    ],
    privacy: 'Datenschutzrichtlinie',
    deleteAccount: 'Konto löschen',
  },
};

export default function MathShortsPage() {
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;
  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';
  const c = COPY[lang];

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}/mathshorts`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />

      <section className="px-6 pt-16 pb-12 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-8 h-24 w-24 overflow-hidden rounded-3xl shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/mathshorts/icon.png" alt="MathShorts" className="h-full w-full object-cover" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            {c.tagline}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {c.lead}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              {c.playCta}
            </a>
            <span className="rounded-xl border border-gray-300 px-8 py-4 font-semibold text-gray-400 dark:border-gray-700 dark:text-gray-500">
              {c.iosCta}
            </span>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{c.iosNote}</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            {c.featuresTitle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-gray-50 p-6 dark:bg-gray-800">
                <div className="mb-3 text-3xl">{f.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 text-center">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 text-sm">
          <a href={`/${lang}/privacy`} className="text-blue-600 underline dark:text-blue-400">
            {c.privacy}
          </a>
          <a href={`/${lang}/delete-account`} className="text-blue-600 underline dark:text-blue-400">
            {c.deleteAccount}
          </a>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
