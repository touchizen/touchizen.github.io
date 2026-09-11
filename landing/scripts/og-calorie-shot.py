#!/usr/bin/env python3
"""calorie-shot 링크 미리보기 카드를 만든다 — 언어마다 한 장.

    python3 landing/scripts/og-calorie-shot.py

⛔ 이 페이지는 `og_{lang}.png` 를 가리키면서 **그 파일이 없어 404** 였다(2026-09-11 실측).
   링크를 걸면 카드가 비고 크롤러가 사이트 파비콘으로 떨어진다.

이름·문구는 레이아웃의 `titles` 를 그대로 쪼갠다(`이름 - 문구 | 꼬리`) — 카피를 새로 짓지
않는다. 그림은 저장소에 이미 있는 앱 스크린샷이다.
⚠ 스크린샷의 바탕이 #E8E8E8 이라 카드 바탕을 같은 색으로 둔다 — 다르면 네모 이음매가 보인다.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
SHOTS = os.path.join(HERE, '..', 'public', 'images', 'thumbnails', 'calorie-shot')
FONT = '/System/Library/Fonts/AppleSDGothicNeo.ttc'

TITLES = {
    'en': 'Calorie Shot - AI Food Calorie Analyzer | Snap & Know',
    'ko': '칼로리샷 - AI 음식 칼로리 분석 | 찍으면 바로 알려주는',
    'ja': 'カロリーショット - AI食品カロリー分析 | 撮るだけでわかる',
    'de': 'Calorie Shot - KI-Lebensmittel-Kalorienanalyse | Foto & Ergebnis',
}

W, H = 1200, 630
GROUND = (232, 232, 232)     # 스크린샷의 바탕과 같은 색
INK = (26, 26, 34)
INK_FAINT = (92, 92, 108)
ACCENT = (37, 99, 235)       # 앱 UI 의 파랑


def split_title(t):
    name, rest = t.split(' - ', 1)
    return name, rest.split(' | ', 1)[0]


def main():
    for lang, title in TITLES.items():
        name, tag = split_title(title)
        card = Image.new('RGBA', (W, H), GROUND + (255,))

        shot = Image.open(os.path.join(SHOTS, f'result_{lang}.png')).convert('RGBA')
        h = 560
        w = round(shot.width * h / shot.height)
        shot = shot.resize((w, h), Image.LANCZOS)
        sx, sy = W - w - 90, (H - h) // 2

        glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(glow).ellipse(
            [sx - 70, sy - 30, sx + w + 70, sy + h + 30], fill=ACCENT + (60,))
        card.alpha_composite(glow.filter(ImageFilter.GaussianBlur(70)))
        card.alpha_composite(shot, (sx, sy))

        d = ImageDraw.Draw(card)
        # 이름이 길면 줄여 잡는다 — 독일어가 가장 길다.
        size = 76 if len(name) <= 14 else 60
        d.text((90, 250), name, font=ImageFont.truetype(FONT, size, index=2), fill=INK + (255,))
        d.text((90, 250 + size + 34), tag,
               font=ImageFont.truetype(FONT, 34, index=0), fill=INK_FAINT + (255,))

        out = os.path.join(SHOTS, f'og_{lang}.png')
        card.convert('RGB').save(out, optimize=True)
        print('wrote', out)


if __name__ == '__main__':
    main()
