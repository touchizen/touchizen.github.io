import type { Metadata } from 'next';
import { Language } from '@/lib/i18n';

type Props = { params: { lang: Language } };

export function generateMetadata({ params }: Props): Metadata {
  const lang = params.lang;
  const baseUrl = 'https://touchizen.com';

  const titles: Record<Language, string> = {
    en: 'Neon Rail - A Rhythm Ride Through the Night | Bring Your Own Music',
    ko: '네온 레일 - 밤을 달리는 리듬 게임 | 내 음악을 채보로',
    ja: 'ネオンレイル - 夜を駆けるリズムゲーム | 自分の曲を譜面に',
    de: 'Neon Rail - Ein Rhythmusritt durch die Nacht | Deine eigene Musik',
  };

  const descriptions: Record<Language, string> = {
    en: 'Four pads, one rail through a neon night. Thirteen built-in tracks, and any MP3 or MIDI on your phone becomes a playable chart in seconds.',
    ko: '네 개의 패드, 네온 밤을 가르는 레일 하나. 내장 13곡에 더해, 폰에 있는 MP3·MIDI 를 몇 초 만에 칠 수 있는 채보로 만듭니다.',
    ja: '4つのパッド、ネオンの夜を走る一本のレール。内蔵13曲に加えて、スマホのMP3やMIDIが数秒で譜面になります。',
    de: 'Vier Pads, eine Schiene durch die Neonnacht. Dreizehn eingebaute Stücke, und jede MP3 oder MIDI auf dem Telefon wird in Sekunden zu einem spielbaren Chart.',
  };

  // 앱 서랍의 "앱 공유하기" 가 이 주소를 보낸다 — 카카오톡·슬랙이 보여주는 카드가 이 메타다.
  // ⛔ 자식 레이아웃의 `openGraph` 는 부모 것을 **통째로 대체한다**(합쳐지지 않는다). 여기에
  // `images` 가 없으면 결과 HTML 에 `og:image` 가 **아예 안 생기고**, 크롤러는 사이트 파비콘으로
  // 떨어진다 — mathshorts 에서 실제로 그랬고, 그래서 `neonrail.metadata.test.ts` 가 네 언어 전부에
  // 대해 images 가 비어있지 않은지 문다.
  // `summary_large_image` 카드라 1.91:1 이 필요하다. ⛔ 정사각 아이콘을 그 비율 가운데 놓기만 하면
  // 카드의 3분의 2가 빈 배경이 된다 — 아이콘·이름·문구 옆에 **폰에서 뽑은 실제 플레이 화면**을
  // 같이 넣어 채운다(`scripts/og-neonrail.py` 가 만든다).
  const ogImage = `${baseUrl}/images/neonrail/og-${lang}.png`;

  return {
    metadataBase: new URL(baseUrl),
    title: titles[lang],
    description: descriptions[lang],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: `${baseUrl}/${lang}/neonrail`,
      siteName: 'Touchizen',
      type: 'website',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: titles[lang],
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: [ogImage],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
