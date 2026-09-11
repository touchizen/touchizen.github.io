#!/usr/bin/env python3
"""mathshorts 링크 미리보기 카드를 만든다 — 언어마다 한 장.

    python3 landing/scripts/og-mathshorts.py

⛔ **정사각 아이콘만으로는 이 카드를 못 채운다.** 카드는 `summary_large_image`(1.91:1)인데
   아이콘은 1:1 이라, 가운데 놓기만 하면 3분의 2가 빈 배경이 된다. 그래서 아이콘·이름·문구
   옆에 **앱이 실제로 만든 프레임**을 같이 넣는다.

⚠ 그 프레임(`og-mathshorts-frame.png`)은 **실기기에서 뽑은 것**이다 — 호스트에서 렌더하면
  테스트 폰트가 모든 글자를 네모로 그려 못 쓴다. 새로 뽑으려면 폰에서 영상을 만들고
  `ffmpeg -ss <초> -i <mp4> -frames:v 1` 로 한 장 꺼내 이 파일을 갈아 끼운다.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
ICON = os.path.join(HERE, '..', 'public', 'images', 'mathshorts', 'icon.png')
FRAME = os.path.join(HERE, 'og-mathshorts-frame.png')
OUT = os.path.join(HERE, '..', 'public', 'images', 'mathshorts')
FONT = '/System/Library/Fonts/AppleSDGothicNeo.ttc'  # 네 언어를 다 덮는다(확인함)

NAMES = {'ko': '매쓰쇼츠', 'en': 'MathShorts', 'ja': 'マスショーツ', 'de': 'MathShorts'}
TAGS = {'ko': '수식이 움직이는 영상', 'en': 'Formulas that move',
        'ja': '数式が動く動画', 'de': 'Formeln, die sich bewegen'}

W, H = 1200, 630


def rounded(im, r):
    mask = Image.new('L', im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, im.size[0] - 1, im.size[1] - 1],
                                           radius=r, fill=255)
    out = im.convert('RGBA')
    out.putalpha(mask)
    return out


def main():
    icon_src = Image.open(ICON).convert('RGBA')
    frame = Image.open(FRAME).convert('RGB')
    for lang in NAMES:
        # 바탕 — 앱 영상이 쓰는 거의 검정. ⛔ 아이콘의 보라를 배경으로 쓰면 아이콘이 묻힌다.
        bg = Image.new('RGB', (W, H))
        d = ImageDraw.Draw(bg)
        for y in range(H):
            t = y / (H - 1)
            d.line([(0, y), (W, y)],
                   fill=(round(20 - 10 * t), round(18 - 9 * t), round(30 - 14 * t)))
        card = bg.convert('RGBA')

        crop = frame.crop((0, 120, frame.width, 1560))
        cw, ch = 360, 480
        vid = crop.resize((cw, int(cw * crop.height / crop.width)), Image.LANCZOS)
        vid = vid.crop((0, 0, cw, ch))
        vx, vy = W - cw - 70, (H - ch) // 2
        glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(glow).rounded_rectangle(
            [vx - 26, vy - 26, vx + cw + 26, vy + ch + 26], radius=48, fill=(124, 92, 232, 90))
        card.alpha_composite(glow.filter(ImageFilter.GaussianBlur(40)))
        card.alpha_composite(rounded(vid, 26), (vx, vy))

        isz, ix, iy = 168, 82, 150
        card.alpha_composite(icon_src.resize((isz, isz), Image.LANCZOS), (ix, iy))
        dr = ImageDraw.Draw(card)
        dr.text((ix, iy + isz + 42), NAMES[lang],
                font=ImageFont.truetype(FONT, 76, index=2), fill=(255, 255, 255, 255))
        dr.text((ix, iy + isz + 150), TAGS[lang],
                font=ImageFont.truetype(FONT, 38, index=0), fill=(186, 180, 214, 255))

        path = os.path.join(OUT, f'og-{lang}.png')
        card.convert('RGB').save(path, optimize=True)
        print('wrote', path)


if __name__ == '__main__':
    main()
