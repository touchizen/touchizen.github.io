#!/usr/bin/env python3
"""neonrail 링크 미리보기 카드를 만든다 — 언어마다 한 장.

    python3 landing/scripts/og-neonrail.py

⛔ **정사각 아이콘만으로는 이 카드를 못 채운다.** 카드는 `summary_large_image`(1.91:1)인데
   아이콘은 1:1 이라, 가운데 놓기만 하면 3분의 2가 빈 배경이 된다. 그래서 아이콘·이름·문구
   옆에 **실제 플레이 화면**을 같이 넣는다. `lib/og-metadata.test.ts` 가 그 실패를 문다.

⚠ 그 프레임(`og-neonrail-frame.png`)은 **실기기에서 뽑은 것**이다(S21, 1080x2400) —
  호스트에서 렌더하면 테스트 폰트가 글자를 네모로 그려 못 쓴다. 원본은 게임 저장소의
  `unity3d/docs/store/screen-2-ride.png`(Play 스토어에 올린 그 장면)이고, 새로 뽑으려면
  폰에서 한 판 돌려 스크린샷을 찍어 이 파일을 갈아 끼운다.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
ICON = os.path.join(HERE, '..', 'public', 'images', 'neonrail', 'icon.png')
FRAME = os.path.join(HERE, 'og-neonrail-frame.png')
OUT = os.path.join(HERE, '..', 'public', 'images', 'neonrail')
FONT = '/System/Library/Fonts/AppleSDGothicNeo.ttc'  # 네 언어를 다 덮는다(확인함)

NAMES = {'ko': '네온 레일', 'en': 'Neon Rail', 'ja': 'ネオンレイル', 'de': 'Neon Rail'}
TAGS = {'ko': '밤의 끝까지, 비트를 타고',
        'en': 'Ride the beat to the end of the night',
        'ja': '夜の果てまで、ビートに乗って',
        'de': 'Reite den Beat bis ans Ende der Nacht'}

W, H = 1200, 630


def rounded(im, r):
    mask = Image.new('L', im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, im.size[0] - 1, im.size[1] - 1],
                                           radius=r, fill=255)
    out = im.convert('RGBA')
    out.putalpha(mask)
    return out


def fitted(draw, text, size, index, limit):
    """글자가 넓이를 넘으면 줄인다 — 독일어 태그라인이 영어보다 한참 길다."""
    while size > 20:
        font = ImageFont.truetype(FONT, size, index=index)
        if draw.textlength(text, font=font) <= limit:
            return font
        size -= 2
    return ImageFont.truetype(FONT, size, index=index)


def main():
    icon_src = Image.open(ICON).convert('RGBA')
    frame = Image.open(FRAME).convert('RGB')
    for lang in NAMES:
        # 바탕 — 게임의 밤 하늘. ⛔ 아이콘의 네온을 배경으로 쓰면 아이콘이 묻힌다.
        bg = Image.new('RGB', (W, H))
        d = ImageDraw.Draw(bg)
        for y in range(H):
            t = y / (H - 1)
            d.line([(0, y), (W, y)],
                   fill=(round(10 + 8 * t), round(8 + 6 * t), round(24 + 16 * t)))
        card = bg.convert('RGBA')

        # 레일 전체와 패드 네 개. ⛔ 크롭 선을 HUD 글자 줄 한가운데에 두지 마라 — 점수 숫자가
        # 원본 y 252~318 에 있어서 y=300 에서 자르면 글자가 반만 남는다(실제로 그랬다). 위는
        # PERFECT 아래·레일 마루 위, 아래는 패드 바닥에 정확히 맞춘다.
        # 크롭 비율을 카드 칸(360:480 = 0.75)에 **정확히** 맞춰 버려지는 부분을 없앤다. 가로를
        # 1080 에서 960 으로 조금 줄이면 필요한 세로가 1440 -> 1280 이 되고, 그 여유 덕에 위는
        # PERFECT(원본 y 804~888) 아래에서, 아래는 패드 바닥(2304)에서 정확히 끊을 수 있다 —
        # 어느 쪽도 글자를 반으로 자르지 않는다.
        cw, ch = 360, 480
        box_w = 960
        box_h = round(box_w * ch / cw)          # 1280
        bottom = 2304                            # 패드의 아래 끝. 그 밑은 진행바·BPM 글자 줄이다.
        left = (frame.width - box_w) // 2
        crop = frame.crop((left, bottom - box_h, left + box_w, bottom))
        shot = crop.resize((cw, ch), Image.LANCZOS)
        vx, vy = W - cw - 70, (H - ch) // 2
        glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(glow).rounded_rectangle(
            [vx - 26, vy - 26, vx + cw + 26, vy + ch + 26], radius=48, fill=(64, 224, 208, 80))
        card.alpha_composite(glow.filter(ImageFilter.GaussianBlur(40)))
        card.alpha_composite(rounded(shot, 26), (vx, vy))

        isz, ix, iy = 168, 82, 150
        card.alpha_composite(rounded(icon_src.resize((isz, isz), Image.LANCZOS), 38), (ix, iy))
        dr = ImageDraw.Draw(card)
        limit = vx - ix - 60
        dr.text((ix, iy + isz + 42), NAMES[lang],
                font=fitted(dr, NAMES[lang], 76, 2, limit), fill=(255, 255, 255, 255))
        dr.text((ix, iy + isz + 150), TAGS[lang],
                font=fitted(dr, TAGS[lang], 38, 0, limit), fill=(150, 226, 218, 255))

        path = os.path.join(OUT, f'og-{lang}.png')
        card.convert('RGB').save(path, optimize=True)
        print('wrote', path)


if __name__ == '__main__':
    main()
