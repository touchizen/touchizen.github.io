#!/usr/bin/env python3
"""datrans 링크 미리보기 카드를 만든다 — 언어마다 한 장.

    python3 landing/scripts/og-datrans.py
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
ICON = os.path.join(HERE, '..', 'public', 'images', 'datrans', 'icon.png')
OUT = os.path.join(HERE, '..', 'public', 'images', 'datrans')
FONT = '/System/Library/Fonts/AppleSDGothicNeo.ttc'

# Visual preview frame from translated sample
SAMPLE = os.path.join(HERE, '..', '..', 'pdftrans-android', 'docs', 'qa', 'free-corpus-100-2026-09-11', 'visual', 'wcag-20-translated.png')

TITLES = {
    'ko': ('다번역 (DaTrans)', '원문 레이아웃 그대로 번역하는 AI 리더', '무료 온디바이스 번역 • 클라우드 AI 번역'),
    'en': ('DaTrans', 'AI PDF & EPUB Layout-Preserving Translator', 'Free On-Device Translation • Cloud AI Translation'),
    'ja': ('DaTrans (ダ・トランス)', 'レイアウトを崩さない AI ドキュメント翻訳', '無料オンデバイス翻訳 • クラウドAI翻訳'),
    'de': ('DaTrans', 'Layouttreuer KI-Übersetzer für PDF & EPUB', 'Kostenlose On-Device-Übersetzung • Cloud-KI'),
}

W, H = 1200, 630


def rounded(im, r):
    mask = Image.new('L', im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, im.size[0] - 1, im.size[1] - 1], radius=r, fill=255)
    out = im.convert('RGBA')
    out.putalpha(mask)
    return out


def main():
    os.makedirs(OUT, exist_ok=True)
    icon_src = Image.open(ICON).convert('RGBA')
    sample_src = Image.open(SAMPLE).convert('RGBA') if os.path.exists(SAMPLE) else None

    for lang, (title, sub, badge) in TITLES.items():
        # Gradient dark blue / slate background
        card = Image.new('RGBA', (W, H))
        d = ImageDraw.Draw(card)
        for y in range(H):
            t = y / (H - 1)
            r = round(15 + 10 * t)
            g = round(23 + 15 * t)
            b = round(42 + 25 * t)
            d.line([(0, y), (W, y)], fill=(r, g, b, 255))

        # Sample document preview on right side
        if sample_src:
            sw, sh = 360, round(360 * sample_src.height / sample_src.width)
            if sh > 480:
                sh = 480
                sw = round(480 * sample_src.width / sample_src.height)
            sample_resized = sample_src.resize((sw, sh), Image.LANCZOS)
            sx = W - sw - 80
            sy = (H - sh) // 2

            # Glow effect behind document
            glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
            ImageDraw.Draw(glow).rounded_rectangle(
                [sx - 20, sy - 20, sx + sw + 20, sy + sh + 20],
                radius=30,
                fill=(59, 130, 246, 80)
            )
            card.alpha_composite(glow.filter(ImageFilter.GaussianBlur(35)))
            card.alpha_composite(rounded(sample_resized, 16), (sx, sy))

        # Icon on left
        isz = 150
        ix = 80
        iy = 130
        icon_resized = icon_src.resize((isz, isz), Image.LANCZOS)

        # Icon subtle glow
        glow_icon = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(glow_icon).rounded_rectangle(
            [ix - 15, iy - 15, ix + isz + 15, iy + isz + 15],
            radius=40,
            fill=(37, 99, 235, 100)
        )
        card.alpha_composite(glow_icon.filter(ImageFilter.GaussianBlur(30)))
        card.alpha_composite(rounded(icon_resized, 32), (ix, iy))

        # Text rendering
        dr = ImageDraw.Draw(card)
        ty = iy + isz + 35
        dr.text((ix, ty), title, font=ImageFont.truetype(FONT, 64, index=2), fill=(255, 255, 255, 255))
        dr.text((ix, ty + 78), sub, font=ImageFont.truetype(FONT, 32, index=0), fill=(203, 213, 225, 255))
        dr.text((ix, ty + 128), badge, font=ImageFont.truetype(FONT, 24, index=0), fill=(96, 165, 250, 255))

        out_path = os.path.join(OUT, f'og-{lang}.png')
        card.convert('RGB').save(out_path, optimize=True)
        print('Wrote', out_path)


if __name__ == '__main__':
    main()
