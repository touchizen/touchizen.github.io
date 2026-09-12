'use client';

import { useRouter, useParams } from 'next/navigation';
import { Language, languages } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 앱의 서랍에서 공유하는 링크가 이 페이지다. Play 주소를 직접 공유하지 않는 이유:
// iOS 가 나오면 한 링크로 두 스토어를 안내할 수 있어야 하고, 스토어에 아직 없는
// 나라에서도 무엇인지는 보여줄 수 있어야 한다.
const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.touchizen.neonrail';

// 개인정보처리방침은 Play 콘솔에 등록된 그 주소여야 한다 — Next 쪽 공용 페이지가 아니라
// 네온레일 전용 문서다(지킬 쪽 정적 파일, 한국어/영어 두 장).
const PRIVACY_URL: Record<Language, string> = {
  ko: '/neonrail/privacy.html',
  en: '/neonrail/privacy-en.html',
  ja: '/neonrail/privacy-en.html',
  de: '/neonrail/privacy-en.html',
};

type Copy = {
  tagline: string;
  lead: string;
  playCta: string;
  iosCta: string;
  iosNote: string;
  featuresTitle: string;
  features: { icon: string; title: string; desc: string }[];
  privacy: string;
};

const COPY: Record<Language, Copy> = {
  ko: {
    tagline: '밤의 끝까지, 비트를 타고',
    lead: '네 개의 패드와 네온 밤을 가르는 레일 하나. 노트가 판정선에 닿으면 그 패드를 누르세요. 내장 13곡에 더해, 폰에 있는 MP3 나 MIDI 를 몇 초 만에 칠 수 있는 채보로 만듭니다.',
    playCta: 'Google Play에서 받기',
    iosCta: 'iOS 준비 중',
    iosNote: 'iPhone 버전은 준비하고 있습니다.',
    featuresTitle: '무엇을 하나요',
    features: [
      { icon: '🎧', title: '내 음악이 채보가 된다', desc: '폰에 있는 MP3 나 MIDI 를 고르면 몇 초 만에 칠 수 있는 채보가 됩니다. 손으로 만드는 과정이 없습니다.' },
      { icon: '🛤️', title: '레일을 따라 내려오는 노트', desc: '노트가 곡선 레일을 따라 굽이치며 내려옵니다. 레일이 빨라져도 노트를 읽을 시간은 변하지 않게 맞춰져 있습니다.' },
      { icon: '🎹', title: '음악은 그 자리에서 합성', desc: '음원 파일을 담지 않고 기기에서 직접 소리를 만듭니다. 톱니파를 레조넌트 필터로 깎는 신스라 용량이 거의 들지 않습니다.' },
      { icon: '🎼', title: '클래식 아홉 곡이 들어 있다', desc: '바흐 토카타와 푸가, 모차르트 터키 행진곡, 베토벤 엘리제를 위하여, 사티 짐노페디, 드뷔시 달빛, 조플린 두 곡과 베토벤 비창까지 — 전부 공유저작물입니다.' },
      { icon: '✨', title: '치는 맛을 눈으로', desc: '정확히 친 노트는 판정선 위에서 부채꼴로 튀고, 누르고 있는 동안 패드 밑에서 불꽃이 갈립니다.' },
      { icon: '🔒', title: '기기 밖으로 나가지 않는다', desc: '가져온 곡과 기록은 기기에만 저장됩니다. 계정도, 로그인도, 서버로 올라가는 것도 없습니다.' },
    ],
    privacy: '개인정보처리방침',
  },
  en: {
    tagline: 'Ride the beat to the end of the night',
    lead: 'Four pads and one rail through a neon night. When a note reaches the line, press its pad. Thirteen tracks are built in, and any MP3 or MIDI on your phone becomes a playable chart in seconds.',
    playCta: 'Get it on Google Play',
    iosCta: 'iOS coming soon',
    iosNote: 'An iPhone version is in the works.',
    featuresTitle: 'What it does',
    features: [
      { icon: '🎧', title: 'Your music becomes a chart', desc: 'Pick an MP3 or a MIDI file from your phone and it becomes a playable chart in seconds. Nothing is hand-authored.' },
      { icon: '🛤️', title: 'Notes ride the rail', desc: 'Notes follow a curving rail down towards you. However fast the rail runs, the time you get to read a note stays the same.' },
      { icon: '🎹', title: 'The music is synthesised on the spot', desc: 'No audio files ship with the game; the sound is made on your device. It is a real synth — sawtooth oscillators carved by a resonant filter — so it costs almost no space.' },
      { icon: '🎼', title: 'Nine classical pieces included', desc: "Bach's Toccata and Fugue, Mozart's Rondo alla Turca, Beethoven's Für Elise, Satie's Gymnopédie, Debussy's Clair de Lune, two Joplin rags and Beethoven's Pathétique — all public domain." },
      { icon: '✨', title: 'Hits you can see', desc: 'A note hit cleanly bursts into a fan of sparks above the line, and holding a note grinds sparks under the pad.' },
      { icon: '🔒', title: 'Nothing leaves the device', desc: 'Imported songs and your scores stay on the phone. No account, no sign-in, nothing uploaded.' },
    ],
    privacy: 'Privacy policy',
  },
  ja: {
    tagline: '夜の果てまで、ビートに乗って',
    lead: '4つのパッドと、ネオンの夜を走る一本のレール。ノートが判定線に届いたら、そのパッドを押します。内蔵13曲に加えて、スマホのMP3やMIDIが数秒で譜面になります。',
    playCta: 'Google Play で入手',
    iosCta: 'iOS 準備中',
    iosNote: 'iPhone 版を準備しています。',
    featuresTitle: 'できること',
    features: [
      { icon: '🎧', title: '自分の曲が譜面になる', desc: 'スマホのMP3やMIDIを選ぶと、数秒で遊べる譜面になります。手作業の工程はありません。' },
      { icon: '🛤️', title: 'レールを流れてくるノート', desc: 'ノートは曲がるレールに沿って降りてきます。レールが速くなっても、ノートを読む時間は変わりません。' },
      { icon: '🎹', title: '音楽はその場で合成', desc: '音源ファイルを持たず、端末で音を作ります。ノコギリ波をレゾナントフィルターで削る本物のシンセなので、容量をほとんど使いません。' },
      { icon: '🎼', title: 'クラシック9曲を収録', desc: 'バッハのトッカータとフーガ、モーツァルトのトルコ行進曲、ベートーヴェンのエリーゼのために、サティのジムノペディ、ドビュッシーの月の光、ジョプリン2曲、ベートーヴェンの悲愴 — すべてパブリックドメインです。' },
      { icon: '✨', title: '当たりが目に見える', desc: '正確に叩いたノートは判定線の上で扇状に弾け、押している間はパッドの下で火花が削れます。' },
      { icon: '🔒', title: '端末の外に出ない', desc: '取り込んだ曲も記録も端末だけに保存されます。アカウントもログインも、アップロードもありません。' },
    ],
    privacy: 'プライバシーポリシー',
  },
  de: {
    tagline: 'Reite den Beat bis ans Ende der Nacht',
    lead: 'Vier Pads und eine Schiene durch die Neonnacht. Erreicht eine Note die Linie, drücken Sie ihr Pad. Dreizehn Stücke sind eingebaut, und jede MP3 oder MIDI auf dem Telefon wird in Sekunden zu einem spielbaren Chart.',
    playCta: 'Bei Google Play holen',
    iosCta: 'iOS in Vorbereitung',
    iosNote: 'Eine iPhone-Version ist in Arbeit.',
    featuresTitle: 'Was es kann',
    features: [
      { icon: '🎧', title: 'Ihre Musik wird zum Chart', desc: 'Wählen Sie eine MP3 oder MIDI vom Telefon, und in Sekunden entsteht ein spielbares Chart. Nichts wird von Hand gesetzt.' },
      { icon: '🛤️', title: 'Noten fahren auf der Schiene', desc: 'Die Noten folgen einer geschwungenen Schiene nach unten. Wie schnell die Schiene auch läuft, die Zeit zum Lesen einer Note bleibt gleich.' },
      { icon: '🎹', title: 'Die Musik entsteht im Gerät', desc: 'Es werden keine Audiodateien mitgeliefert; der Klang entsteht auf dem Gerät. Ein echter Synthesizer — Sägezähne, von einem resonanten Filter geformt — und kostet daher fast keinen Speicher.' },
      { icon: '🎼', title: 'Neun klassische Stücke', desc: 'Bachs Toccata und Fuge, Mozarts Rondo alla Turca, Beethovens Für Elise, Saties Gymnopédie, Debussys Clair de Lune, zwei Joplin-Rags und Beethovens Pathétique — alle gemeinfrei.' },
      { icon: '✨', title: 'Treffer, die man sieht', desc: 'Eine sauber getroffene Note zerspringt über der Linie zu einem Funkenfächer, und beim Halten schleifen Funken unter dem Pad.' },
      { icon: '🔒', title: 'Nichts verlässt das Gerät', desc: 'Importierte Titel und Ergebnisse bleiben auf dem Telefon. Kein Konto, keine Anmeldung, nichts wird hochgeladen.' },
    ],
    privacy: 'Datenschutzerklärung',
  },
};

export default function NeonRailPage() {
  const router = useRouter();
  const params = useParams();
  const paramLang = params.lang as string;
  const isValidLang = languages.some((l) => l.code === paramLang);
  const lang: Language = isValidLang ? (paramLang as Language) : 'en';
  const c = COPY[lang];

  const handleLanguageChange = (newLang: Language) => {
    router.push(`/${newLang}/neonrail`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header lang={lang} onLanguageChange={handleLanguageChange} />

      <section className="px-6 pt-16 pb-12 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-8 h-24 w-24 overflow-hidden rounded-3xl shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/neonrail/icon.png" alt="Neon Rail" className="h-full w-full object-cover" />
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
          <a href={PRIVACY_URL[lang]} className="text-blue-600 underline dark:text-blue-400">
            {c.privacy}
          </a>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
