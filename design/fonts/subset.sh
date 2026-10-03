#!/usr/bin/env bash
# Regenerates the subset Caveat / JetBrains Mono fonts in app/assets/fonts.
# Run again whenever the handwritten notes or the hero code editor text change.
# Requires: pip install fonttools brotli; source fonts from Google Fonts (static TTF / WOFF2).
set -euo pipefail

CAVEAT_SRC=${CAVEAT_SRC:?path to Caveat SemiBold font}
MONO_SRC=${MONO_SRC:?path to JetBrains Mono Regular font}
OUT=app/assets/fonts

CAVEAT_TEXT='Keep it simple… Dobre pomysły zaczynają się od rozmowy. Good ideas start with a conversation.'
MONO_TEXT="const developer = { name: 'Adam Kokoszka', focus: ''}; profile.js 1234 frontend Vue.js TypeScript UI/UX performance accessibility AI-assisted dev Claude Code"

chars_in_range() {
  python3 -c "import sys; print(''.join(sorted({c for c in sys.argv[1] if $2})))" "$1"
}

CAVEAT_LATIN=$(chars_in_range "$CAVEAT_TEXT" "ord(c) <= 0xFF or c == '…'")
CAVEAT_LATIN_EXT=$(chars_in_range "$CAVEAT_TEXT" "0x100 <= ord(c) <= 0x24F")

pyftsubset "$CAVEAT_SRC" --text="$CAVEAT_LATIN" --flavor=woff2 --output-file="$OUT/caveat-600-latin.woff2"
pyftsubset "$CAVEAT_SRC" --text="$CAVEAT_LATIN_EXT" --flavor=woff2 --output-file="$OUT/caveat-600-latin-ext.woff2"
pyftsubset "$MONO_SRC" --text="$MONO_TEXT" --flavor=woff2 --output-file="$OUT/jetbrains-mono-400-latin.woff2"
