#!/usr/bin/env python3
# Builds the IncoCode logo and favicon as plain SVG paths from Manrope ExtraBold (800), mirroring the
# CSS proportions of the design: switch 0.56em high, 0.115em border, 0.25em knob, tracking -0.05em.
# Outputs: design/logo/logo-{dark,light}.svg, the favicon tile (design/logo/favicon-tile.svg and
# public/favicon.svg) and app/assets/icons/logo.svg (currentColor + theme accents, used in the header;
# its knobs have the classes logo-knob-off / logo-knob-on for the intro and click animations).
# Run from the repo root: python3 design/logo/build-logo.py  (requires: pip install fonttools brotli)
import re
import urllib.request
from io import BytesIO

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

CSS_URL = 'https://fonts.googleapis.com/css2?family=Manrope:wght@800&text=incode'

DARK = {'fg': '#f4f6f8', 'blue': '#6196ff', 'orange': '#ffaa72'}
LIGHT = {'fg': '#14202e', 'blue': '#2f6bea', 'orange': '#e9783a'}
TILE = '#1e252d'

TRACKING = -0.05
LINE_HEIGHT = 0.75
SWITCH_HEIGHT = 0.56
SWITCH_BORDER = 0.115
KNOB = 0.25
PAD = 0.02


def load_font():
    request = urllib.request.Request(CSS_URL, headers={'User-Agent': 'Mozilla/5.0'})
    css = urllib.request.urlopen(request).read().decode()
    font_url = re.search(r'url\((https://[^)]+)\)', css).group(1)
    return TTFont(BytesIO(urllib.request.urlopen(font_url).read()))


def pair_kerning(font, chars):
    pairs = {}
    for lookup in font['GPOS'].table.LookupList.Lookup:
        for sub in lookup.SubTable:
            if lookup.LookupType == 9:
                sub = sub.ExtSubTable
            if sub.LookupType != 2:
                continue
            if sub.Format == 1:
                for first, pair_set in zip(sub.Coverage.glyphs, sub.PairSet):
                    for record in pair_set.PairValueRecord:
                        value = getattr(record.Value1, 'XAdvance', 0) or 0
                        pairs.setdefault((first, record.SecondGlyph), value)
            elif sub.Format == 2:
                class1, class2 = sub.ClassDef1.classDefs, sub.ClassDef2.classDefs
                for first in sub.Coverage.glyphs:
                    for second in chars:
                        record = sub.Class1Record[class1.get(first, 0)].Class2Record[class2.get(second, 0)]
                        value = getattr(record.Value1, 'XAdvance', 0) or 0
                        if value:
                            pairs.setdefault((first, second), value)
    return pairs


class Type:
    def __init__(self, font):
        self.font = font
        self.upm = font['head'].unitsPerEm
        self.glyph_set = font.getGlyphSet()
        self.cmap = font.getBestCmap()
        self.kerning = pair_kerning(font, [self.cmap[ord(c)] for c in 'incode'])

    def name(self, char):
        return self.cmap[ord(char)]

    def box(self, char):
        glyph = self.font['glyf'][self.name(char)]
        return glyph.xMin / self.upm, glyph.yMin / self.upm, glyph.xMax / self.upm, glyph.yMax / self.upm

    def path(self, char, x, baseline):
        pen = SVGPathPen(self.glyph_set, ntos=lambda value: f'{value:.4f}'.rstrip('0').rstrip('.'))
        scale = 1 / self.upm
        self.glyph_set[self.name(char)].draw(TransformPen(pen, (scale, 0, 0, -scale, x, baseline)))
        return pen.getCommands()

    def advance(self, char, next_char=None):
        kern = self.kerning.get((self.name(char), self.name(next_char)), 0) if next_char else 0
        return (self.font['hmtx'][self.name(char)][0] + kern) / self.upm + TRACKING

    def run(self, chars, x, baseline):
        paths = []
        for index, char in enumerate(chars):
            paths.append(self.path(char, x, baseline))
            x += self.advance(char, chars[index + 1] if index + 1 < len(chars) else None)
        return paths, x


def switch(x, baseline, width, knob_right, inset):
    top = baseline - SWITCH_HEIGHT
    inner = SWITCH_HEIGHT - SWITCH_BORDER
    outline = (x + SWITCH_BORDER / 2, top + SWITCH_BORDER / 2, width - SWITCH_BORDER, inner)
    knob_x = x + width - SWITCH_BORDER - inset - KNOB / 2 if knob_right else x + SWITCH_BORDER + inset + KNOB / 2
    return outline, (knob_x, top + SWITCH_HEIGHT / 2)


def outline_svg(outline, stroke):
    x, y, w, h = outline
    return (f'<rect x="{x:.4f}" y="{y:.4f}" width="{w:.4f}" height="{h:.4f}" rx="{h / 2:.4f}" '
            f'fill="none" stroke="{stroke}" stroke-width="{SWITCH_BORDER}"/>')


def knob_svg(center, fill, css_class=''):
    attr = f' class="{css_class}"' if css_class else ''
    return f'<circle{attr} cx="{center[0]:.4f}" cy="{center[1]:.4f}" r="{KNOB / 2:.4f}" fill="{fill}"/>'


def build_logo(t):
    line1, x = t.run('inc', 0, 0)
    off = switch(x + 0.03, 0, 0.9, False, 0.06)
    off_right = x + 0.03 + 0.9
    line2, x = t.run('c', 0, LINE_HEIGHT)
    on = switch(x + 0.03, LINE_HEIGHT, 0.9, True, 0.06)
    de, x_end = t.run('de', x + 0.03 + 0.9 + 0.05, LINE_HEIGHT)
    e_left = x_end - t.advance('e')
    right = max(off_right, e_left + t.box('e')[2])
    left = min(t.box('i')[0], t.box('c')[0])
    top = -max(t.box('i')[3], t.box('d')[3] - LINE_HEIGHT)
    bottom = LINE_HEIGHT - min(t.box(c)[1] for c in 'cde')
    view = f'{left - PAD:.4f} {top - PAD:.4f} {right - left + PAD * 2:.4f} {bottom - top + PAD * 2:.4f}'
    letters = ' '.join(line1 + line2 + de)
    for name, palette in (('logo-dark', DARK), ('logo-light', LIGHT)):
        shapes = (outline_svg(off[0], palette['fg']) + knob_svg(off[1], palette['blue'])
                  + outline_svg(on[0], palette['fg']) + knob_svg(on[1], palette['orange']))
        with open(f'design/logo/{name}.svg', 'w') as file:
            file.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" role="img" aria-label="IncoCode">'
                       f'<path d="{letters}" fill="{palette["fg"]}"/>{shapes}</svg>\n')
    with open('app/assets/icons/logo.svg', 'w') as file:
        file.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" aria-hidden="true">'
                   f'<path d="{letters}" fill="currentColor"/>'
                   f'{outline_svg(off[0], "currentColor")}{knob_svg(off[1], "var(--c-accent)", "logo-knob-off")}'
                   f'{outline_svg(on[0], "currentColor")}{knob_svg(on[1], "var(--c-warm)", "logo-knob-on")}</svg>\n')
    return view


def favicon_group(t, palette):
    paths, x = t.run('c', 0, 0)
    outline, knob = switch(x + 0.10, 0, 0.76, True, 0.04)
    left, bottom_y, _, top_y = t.box('c')
    right = outline[0] + outline[2] + SWITCH_BORDER / 2
    top = min(-top_y, -SWITCH_HEIGHT)
    bottom = -bottom_y
    scale = 56 / (right - left)
    tx = (64 - (right - left) * scale) / 2 - left * scale
    ty = (64 - (bottom - top) * scale) / 2 - top * scale
    return (f'<g transform="translate({tx:.3f} {ty:.3f}) scale({scale:.3f})">'
            f'<path d="{" ".join(paths)}" fill="{palette["fg"]}"/>'
            f'{outline_svg(outline, palette["fg"])}{knob_svg(knob, palette["blue"])}</g>')


def build_favicons(t):
    # A transparent favicon follows the OS color scheme, not the tab bar, so it can vanish
    # (dark OS + light browser theme); the dark tile stays visible on every tab bar.
    tile = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
            f'<rect width="64" height="64" rx="14" fill="{TILE}"/>{favicon_group(t, DARK)}</svg>\n')
    for path in ('public/favicon.svg', 'design/logo/favicon-tile.svg'):
        with open(path, 'w') as file:
            file.write(tile)


if __name__ == '__main__':
    type_ = Type(load_font())
    view = build_logo(type_)
    build_favicons(type_)
    width, height = view.split()[2:]
    print(f'logo viewBox: {view} - keep --aspect-logo in main.css at {width} / {height}')
