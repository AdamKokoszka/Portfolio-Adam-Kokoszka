# CLAUDE.md

Personal portfolio of Adam Kokoszka (brand **IncoCode**, domain `incocode.com`).
Single-page site, statically generated, Polish by default with an English version.

## Stack

- **Nuxt 4** (static generation via `nuxt generate`), **Vue 3** with `<script setup lang="ts">`
- **TypeScript** in strict mode
- **Tailwind CSS v4** (CSS-first config in `app/assets/css/main.css`, no `tailwind.config`)
- **@nuxtjs/i18n**: `pl` (default, served at `/`) and `en` (served at `/en`); `/pl` redirects to `/`
- **@nuxtjs/color-mode** (dark default, `.dark` / `.light` class on `<html>`, no flash)
- **@nuxt/fonts** (Manrope, self-hosted at build time; Caveat and JetBrains Mono are subset files in
  `app/assets/fonts`, see Fonts), **@nuxt/image** (`<NuxtImg>` / `<NuxtPicture>`, avif/webp) — use
  these instead of raw `<img>` / font links for raster images
- **@nuxtjs/sitemap** + **@nuxtjs/robots** (site URL in `site.url`); per-page SEO via `useSeoMeta`
  with texts from i18n (`meta.*`)
- **ESLint** (`@nuxt/eslint`, flat config) + **Prettier** (with Tailwind class sorting)
- **Umami Cloud** analytics (cookieless, see Analytics)
- **Lighthouse CI** in GitHub Actions (`lighthouserc.json`): a11y & SEO ≥ 0.95 are hard gates
- Node version: see `.nvmrc` (24 LTS). Package manager: **npm** only.
- Deploy target: Netlify (static). No tests in this project.
- Editor used by the author: WebStorm.

## Design source

The visual spec is the author's private claude.ai Design canvas **"IncoCode Portfolio"**
(artboards: desktop 1440 / mobile 390, dark / light). Match it, but heavy decorative animations
may be simplified first and polished later. The "Systems" section uses the AI-generated images
(never real client screenshots) with an "illustrative image" caption.

## Commands

```bash
npm run dev           # dev server
npm run generate      # static build → .output/public
npm run preview       # preview the production build
npm run lint          # ESLint
npm run lint:fix
npm run format        # Prettier write
npm run typecheck     # vue-tsc via nuxt typecheck
npm run check         # lint + format:check + typecheck (run before every commit/PR)
```

## Project structure

```
app/
  app.vue              # root: <NuxtLayout> + <NuxtPage />
  error.vue            # localized 404 / error page (noindex)
  layouts/default.vue  # <html lang>, canonical + hreflang, analytics, progress bar,
                       #   TheHeader + page + TheFooter
  pages/index.vue      # the whole one-page site: Section* components in order
  pages/privacy.vue    # privacy policy (/polityka-prywatnosci, /en/privacy-policy), noindex
  components/
    base/              # generic, reusable UI primitives  → BaseButton, BaseCard, BaseSplitText
    common/            # shared app-specific widgets      → ThemeToggle, CopyButton, SocialLinks
    layout/            # one-per-page chrome              → TheHeader, TheFooter
    sections/<name>/   # one folder per page section with its children
                       #   hero/ → SectionHero, SectionHeroEditor, SectionHeroVisual
  composables/<group>/ # useX() logic grouped by purpose (auto-imported via `imports.dirs`):
                       #   motion/ (animation, pointer, theme transition), interaction/
                       #   (menu, scroll, filters, clipboard), site/ (SEO, analytics)
  utils/               # pure helpers and constants (auto-imported) → sectionNumber, ICONS
  plugins/             # Nuxt plugins                     → reveal (v-reveal directive)
  data/                # typed static data (no copy!)     → experience.ts, technologies.ts
  types/               # ALL TS types/interfaces - never declared inside components,
                       #   composables, plugins or data files. One file per folder
                       #   (base, common, layout, composables, plugins) or per domain
                       #   (navigation, hero, experience, technologies, systems: data types
                       #   + that section's component props). Component types are named
                       #   `<Component>Props/Emits`
  assets/css/main.css  # Tailwind import, design tokens (@theme), themes, custom utilities
  assets/icons/        # UI icons inlined by <BaseIcon name> (see utils/icons.ts)
  assets/icons/tech/   # technology logos, hashed URLs via TECH_LOGOS (export-tech-logos.mjs)
  assets/fonts/        # subset Caveat / JetBrains Mono (design/fonts/subset.sh)
i18n/locales/          # pl.json, en.json — ALL user-facing text
public/                # favicon set, site.webmanifest, og-image.jpg, _redirects
public/images/         # raster images served through @nuxt/image (portrait, logos, systems)
design/                # sources + scripts of generated assets: logo/, og-image/, favicon/,
                       #   fonts/, icons/
```

Create folders only when they get their first file.

## Conventions

### Components

- Always `<script setup lang="ts">`; block order: `script` → `template` → `style`.
- Component files and names in **PascalCase**, always **multi-word**.
- Prefixes: `Base*` for generic primitives, `The*` for single-instance layout parts,
  `Section*` for page sections. Child components are named after their parent
  (`SectionExperience` → `SectionExperienceCard`).
- Components are auto-imported **by file name only** (`pathPrefix: false`):
  `components/common/ThemeToggle.vue` → `<ThemeToggle>`. File names must therefore be unique.
- Props/emits: typed with interfaces from `app/types/` — `defineProps<BaseButtonProps>()`,
  `defineEmits<TheHeaderMobileMenuEmits>()`. Required props have no `?`; optional props with a
  default use `const props = withDefaults(defineProps<XProps>(), { … })`. Props are never
  destructured (enforced by `vue/define-props-destructuring`) — use `props.x` in the script and
  the plain name in the template. Props and events in camelCase.
- Keep components small and presentational; move logic to composables.
- Prefer Tailwind utilities in the template; never add `<style>` blocks (see Styling & theming)
  and no inline `style` except dynamic CSS variables.

### Code style

- Formatting is fully owned by Prettier (`npm run format`), with Vue style-guide settings:
  elements with more than one attribute put **one attribute per line**, the closing `>` stays on
  the last attribute line (`bracketSameLine`), single-attribute elements stay on one line.
  `htmlWhitespaceSensitivity: ignore` — never rely on whitespace between inline elements; use
  `gap` / margins.
- Attribute order follows `vue/attributes-order` (`v-for`, `v-if`, `ref`/`key`, other attributes,
  `v-model`, events last); empty elements are self-closing.
- **Modern JS: arrow functions only** — `const toggle = () => {}`, no `function` declarations or
  function expressions (enforced: `func-style`, `prefer-arrow-callback`). Composables too:
  `export const useX = () => {}`.
- **Keep templates declarative**: no long ternaries, string building or formatting logic in the
  template — move them to `computed` / derived data in `<script setup>` (e.g. `headerClass`).
  Event handlers are named functions (`@click="toggleMenu"`), not inline assignments.
- **No comments by default.** Code should explain itself through naming. Add a comment only for a
  genuinely non-obvious _why_ (e.g. a hosting quirk) — never to restate what the code does, and
  no JSDoc on component props.

### Page sections

Every section follows the same pattern (see `SectionAbout.vue`):

- `<section :id>` with the id from `SECTION_IDS` (`app/data/navigation.ts`), `aria-labelledby`
  pointing at its `<h2>`, `relative overflow-clip` (not `overflow-hidden`: that makes the section a
  scroll container and freezes the scroll-driven animations inside it), its own background and `py-18 md:py-28`.
- Number from `sectionNumber('<id>')` (auto-imported util) — used by `<BaseEyebrow>` and
  `<BaseGhostNumber>` so numbering always follows the section order.
- Links to sections go through `useSectionHref()` (`/#about`, `/en#about`), so the header and
  menu also work from sub-pages (privacy policy, 404).
- Heading block: `<BaseEyebrow :number>` + `<h2>`; nav label `t('nav.<id>')` is the eyebrow text.
- Content wrapper gets `v-reveal`; the elements inside that should animate get `data-reveal`
  (`up` default, `scale` for cards and panels, `fade` for dividers and captions, `draw` for SVG
  strokes (length measured at runtime, no `pathLength` - unreliable in Safari), `soft` for section headings (the
  About heading uses `group` + `<BaseSplitText>` letters), `sharpen` for system cards, `flight`
  for an SVG element moving along its `offset-path`, `group` when only the children animate -
  the experience timeline, the tech tile wave). Variants that add `is-revealed` let children
  animate with `in-[.is-revealed]:animate-*`; SVG children are observed through their `<svg>`
  (Safari's IntersectionObserver is unreliable on paths); the class is removed after the entrance, so
  elements rendered later (carousel, expand, filters) appear without animation. Each element is revealed when it
  scrolls into view; elements entering together are staggered (90 ms steps, max 10). Optional
  `data-reveal-delay="<ms>"` adds to the stagger. Elements already in view on load, or with
  reduced motion, are never hidden. A wrapper without `data-reveal` children animates itself.

### Naming

- Composables: `useCamelCase`, file `app/composables/<group>/useCamelCase.ts`. Shared constants (e.g. `DESKTOP_MEDIA_QUERY`) live in `app/utils/`.
- Types/interfaces: `PascalCase`; no `I` prefix. Constants: `SCREAMING_SNAKE_CASE` only for
  true module-level constants.
- Variables/functions: `camelCase`; booleans read as questions (`isOpen`, `hasError`).
- i18n keys: nested by section, camelCase (`hero.title`, `experience.items.antologic.role`).

### Text & i18n

- **No hard-coded user-facing text in templates** (enforced by `vue/no-bare-strings-in-template`).
  Every string lives in both `pl.json` and `en.json`. Polish is the source language; English
  translations are written by Claude.
- Translation strings use vue-i18n message syntax: `{ } @ $ |` are special — write literal braces
  as `{'{'}` / `{'}'}`. Rich text (bold, highlight) goes through `<I18nT>` slots, never `v-html`.
- In copy use a plain hyphen `-`, not an em dash. Write full, natural sentences (no colon lists or
  shorthand); the current project in the present tense, finished ones in the past tense.
- `p` and `li` get `text-wrap: pretty` globally (no lone last word); a short ending that still
  breaks off on narrow phones is glued with a non-breaking space in the translation.
- Static data in `app/data/` holds structure only (ids, dates, logos, links); text comes from i18n
  (experience highlights: ids in `experience.ts`, text in `experience.companies.<id>.highlights`).

### Styling & theming

- **Tailwind only — no `<style>` blocks.** Allowed exceptions: things utilities genuinely can't
  express (complex keyframes, masks). Reusable visual patterns become a `@utility` in `main.css`
  or a component — never copy-pasted class soup across components.
- Design tokens live once in `app/assets/css/main.css`. Theme colors are CSS variables
  (`--c-*`) swapped by `.dark` / `.light` on `<html>` (@nuxtjs/color-mode, dark by default)
  and by `.theme-inverted` (inverted section). Use the **semantic utilities**, never hex values
  and normally no `dark:` / `light:` variants:
  - surfaces: `bg-base`, `bg-alt`, `bg-surface`, `bg-sunken`, `bg-hero`, `panel-surface`
  - text: `text-fg`, `text-fg-muted`, `text-fg-soft`; borders: `border-line`
  - accent: `bg-accent`, `text-accent-fg`, `text-on-accent`, `bg-accent-soft`, `border-accent-line`
  - warm accent: `text-warm`, `text-warm-fg`, `bg-warm-soft`
  - fixed dark "Systems" palette: `.theme-ink` + `bg-ink`, `bg-ink-surface`, `text-ink-*`, `bg-peach`
  - never `text-base`: it collides with the `base` color and sets the color instead of 16px - use
    `text-[1rem]` (also with a line height: `text-[1rem]/[1.7]`)
  - typography steps between Tailwind defaults: `text-micro` (11px), `text-caption` (13px),
    `text-ui` (15px); other one-off sizes may stay arbitrary (`text-[2.375rem]`)
  - shadows: `shadow-card`, `shadow-card-hover`, `shadow-panel`, `shadow-disc`, `shadow-editor`,
    `shadow-logo`, `shadow-badge`, glows `shadow-glow-accent(-sm)`, `shadow-glow-peach(-sm)`
  - helpers: `border-gradient`, `border-gradient-strong` (fill follows `--card-bg`, default
    surface), `bg-dots`, `bg-glow`, `beam-border`, `container` (page width + gutters)
  - fonts: `font-sans` (Manrope), `font-mono` (JetBrains Mono), `font-hand` (Caveat);
    easing: `ease-smooth`, `ease-rise`
- Breakpoints follow the design: base = phone, `md` ≥ 760px (tablet), `lg` ≥ 1100px (desktop).
  Build every component mobile-first for all three at once; check 390px and 1440px.
- UI icons: SVGs from the design in `app/assets/icons/*.svg`, rendered inline with
  `<BaseIcon name="<file>" class="size-5" />` (inherit `currentColor`; add the new file name to
  `IconName` in `types/base.ts`). Always give a size class (icons in `BaseButton` use `size-5`).
  Decorative icons get `aria-hidden="true"`. No icon library: @nuxt/icon cost ~19 KB gz of JS.
- Technology logos are `app/assets/icons/tech/<id>.svg` (matched to the technology `id` through
  `TECH_LOGOS`, so they get hashed, long-cached URLs), exported from Iconify (and
  `design/icons/*.svg`) by `node design/icons/export-tech-logos.mjs`. Single-color logos are
  marked `isMono` and drawn as a CSS mask so they follow the theme color.
- Motion layers (no animation library - CSS + small composables, ~0 KB):
  - scroll reveals: `v-reveal` + `data-reveal` (see Page sections), keyframes `reveal-*`
  - scroll-linked (CSS scroll-driven animations, progressive enhancement - Firefox shows the
    static state): `scroll-progress` (top bar), `scroll-drift` (ghost numbers)
  - logo: `animate-logo-switch` intro after load, `animate-logo-swap-*` on click (see Logo)
  - hero intro: blurred mask rise of the name, `animate-enter-blur` copy, `animate-pop` disc,
    `animate-portrait` circle reveal, `animate-draw` orbit, `animate-slide-tilt` editor
  - pointer: `usePointerCssVars` (card spotlight), `usePointerParallax` + `parallax-<px>` (hero
    depth layers, eased, a few px only); fine pointers only; springy hovers with `ease-spring`
  - text: `<BaseSplitText>` (letters, screen readers get the plain text), `<BaseScrollHighlight>`
    (words light up with scroll, CSS view timeline)
  - nav: `useSlidingIndicator` (glowing line under the active section); `useScrollSpy` marks the
    section under a line at 45% of the viewport (max 480px), and the last one at the page bottom
  - the sticky header must not get vertical margins: they collapse through its wrapper, grow the
    page while scrolling and stop Chrome's smooth anchor scroll short of the bottom
  - theme switch: `useThemeTransition` (View Transitions circle from the toggle)
  - loops: `animate-float`, `animate-orbit`, `animate-glide`, `animate-ping`, `beam-border`
- Interaction timing (after Emil Kowalski's guidance): hover color changes `duration-200`; pressable
  buttons use the `press` utility (transitions colors + `scale`, `scale: 0.97` on `:active`, off with
  reduced motion). Only animate `transform` / `opacity` where possible.
- Reduced motion keeps comprehension, not movement: `v-reveal` items only fade in (`reveal-gentle`,
  exempt from the global kill switch), no translate, stagger or stroke drawing.
- Animation tokens whose timing reads per-element variables (`--reveal-delay`, `--step`,
  `--char-index`) must live in `@theme inline`; in `@theme` they resolve on `:root` and every
  stagger collapses to 0.
- Respect `prefers-reduced-motion` (globally reduced in `main.css`; JS-driven motion must check it).

### Images

- Raster images live in `public/images/` and are rendered with `<NuxtImg>`. Locally they go through
  IPX; on Netlify through the Netlify Image CDN, which supports only `fit: cover | contain | fill`
  (no `inside` / `outside`) — prefer sizing by `width` only. SVGs are rendered with plain `<img>`.
- `sizes` always uses screen prefixes, including the base one (`xs:100vw sm:100vw md:50vw lg:570px`);
  an unprefixed `vw` value produces 1px / 2px srcset candidates. `image.screens` in `nuxt.config`
  must keep the full list (xs–xxl), only md / lg are tuned to the design breakpoints.
- After adding or changing images, verify the generated URLs return 200 on the deploy preview.
- Source images go through TinyPNG / similar before being committed (keep repo history small).
- Above-the-fold images: `loading="eager"` + `fetchpriority="high"` + `sizes`; everything else
  `loading="lazy"`.

### SEO

- Page meta lives in `usePageSeo()` (`app/composables/site/usePageSeo.ts`): title, description,
  Open Graph (incl. `og:url`, `og:locale`), Twitter card and JSON-LD (`Person`, `WebSite`,
  `ProfilePage`). Static facts are in
  `app/data/seo.ts`; all copy comes from i18n (`meta.*`). Absolute URLs are built from
  `useSiteConfig().url` (`site.url` in `nuxt.config`, i.e. `https://incocode.com`).
- `<html lang>`, canonical and hreflang links come from `useLocaleHead()` in `layouts/default.vue`,
  so they also apply to `error.vue` (custom 404 / error page, `noindex`).
- The sitemap lists only meaningful images (portrait, OG image) via `routeRules` in
  `nuxt.config`; automatic image discovery is off so logos and icons stay out of it.
- Icons and manifest are global in `nuxt.config` `app.head`: `favicon.svg`, `favicon.ico`,
  `apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest`. The favicon is "c" + a switch
  on a dark tile (a transparent one follows the OS scheme, not the tab bar, and can vanish).

### Logo

- The logo is "inco / code" in Manrope 800 with two switches ("inc" off, blue knob; "c[o]de" on,
  orange knob). All logo files are generated as plain SVG paths by
  `python3 design/logo/build-logo.py` (fonttools): `design/logo/logo-{dark,light}.svg`,
  `app/assets/icons/logo.svg` (currentColor + `--c-accent` / `--c-warm` knobs, used through
  `<BaseIcon name="logo" class="aspect-logo h-…">`) and the favicon tile (`public/favicon.svg`,
  `design/logo/favicon-tile.svg`); then `node design/favicon/build-icons.mjs` renders the rasters.
  Keep `--aspect-logo` in `main.css` in sync with the viewBox the script prints.
- Header logo motion (`useLogoAnimation`): the bottom switch turns on once after the window `load`
  event (waits in the "off" state until then), clicking the logo swaps both switches and back.
- `public/og-image.jpg` (1200×630) is rendered from `design/og-image/og-image.html`:
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --virtual-time-budget=8000 --window-size=1200,630 --screenshot=og.png design/og-image/og-image.html`,
  then converted to JPEG (~60 KB). It shows `design/logo/logo-dark.svg`, so re-render it after a logo change.
- Large images use `<NuxtPicture format="avif,webp">`; give every `<img>` explicit `width` and
  `height` (Lighthouse "unsized images").

### Domains

- incocode.com is the primary domain on Netlify; incocode.pl, adamkokoszka.pl and adamkokoszka.com
  (with www) are domain aliases redirected to it by host rules in `public/_redirects`, as is
  portfolioadamkokoszka.netlify.app (deploy previews keep their own URLs). Every domain lands on
  the Polish home page (deeper paths keep their path); English is reached via the language
  switcher or `/en`. No automatic language detection. They
  must live there, not in `netlify.toml`: Nitro copies `public/_redirects` above its own rules,
  which end with a `/* /404.html 404` catch-all that would otherwise match first.
- DNS stays at OVH: `A @ 75.2.60.5`, `CNAME www portfolioadamkokoszka.netlify.app.`; MX records
  belong to OVH mail and stay untouched.

### Analytics

- Umami Cloud (cookieless, no consent banner), loaded by `useAnalytics()` in
  `layouts/default.vue`. The website ID and the tracked hosts live in
  `runtimeConfig.public.umamiWebsiteId` / `umamiDomains` (overridable with
  `NUXT_PUBLIC_UMAMI_*`); only incocode.com is counted (not localhost or deploy previews).
- Clicks worth knowing about are tracked declaratively with `data-umami-event="<kebab-name>"`
  (+ `data-umami-event-<key>` for details) - no JS calls. Current events: `cta-contact`,
  `cta-experience`, `email-click`, `email-copy`, `social-github` / `social-linkedin`
  (`placement`), `stack-toggle`, `theme-toggle` (`to`).
- Hash changes (`/#top`, `/#stack`) are not counted as page views (`data-exclude-hash`).

### Performance notes

- Bundled assets (logos, fonts) are not prefetched: the `build:manifest` hook in `nuxt.config`
  clears `assets`, otherwise every logo is fetched before first paint and delays the LCP.
- The hero portrait (LCP) is a hand-built `<picture>` in `SectionHeroVisual` (via `useImage().getSizes`):
  quality 80 on desktop, 70 below `lg` (LCP on slow phones), each with its own `media` preload and
  `fetchpriority="high"`. Going above 80 adds bytes, not detail (the source is already compressed). Don't inline the CSS
  (`features.inlineStyles`): Nuxt puts the ~80 KB style block above the preload and the LCP gets
  slower for real users, even though the simulated PageSpeed score barely moves.
- The hero visual is scaled with `zoom` (0.62 / 0.8 / 0.9): keep the portrait offsets multiples of
  10px and without parallax, so it lands on whole pixels - otherwise it renders blurry on 1x
  screens (Windows at 100%), invisible on Retina.
- Measure with Lighthouse in both modes (simulated = PageSpeed, devtools = real throttling),
  median of 5+ runs; the simulated mobile score sits around 0.90 because of a lab artifact
  (JS executes before first paint on fast hosts), real-throttled is ~0.97.

### Fonts

- Manrope is served by @nuxt/fonts (Google, self-hosted at build time).
- Caveat (handwritten notes) and JetBrains Mono (hero code editor) are **subset to the glyphs
  actually used** and bundled from `app/assets/fonts/` (`@font-face` in `main.css`, hashed URLs; @nuxt/fonts
  is told to skip them with `provider: 'none'`). Together ~20 KB instead of ~93 KB.
- **When the handwritten notes or the editor text change, regenerate the subsets** with
  `design/fonts/subset.sh` — characters outside the subset fall back to a system font.

### Accessibility

- Semantic HTML (`<button>`, `<a href>`, landmarks, headings in order), visible focus states,
  `aria-label` on icon-only controls, decorative SVGs `aria-hidden="true"`, alt text via i18n.

### TypeScript

- No `any`; use `import type` / inline `type` imports. Unused vars only with `_` prefix.

## Git workflow

- Branch per task/view element: `feat/hero-section`, `fix/header-menu`, `chore/…`, `docs/…`.
- Open a PR to `main`; CI (lint, format, typecheck, generate) must pass.
- **Conventional Commits in English**: `feat:`, `fix:`, `chore:`, `refactor:`, `style:`, `docs:`,
  `ci:`, `perf:`; optional scope (`feat(hero): …`). Enforced by commitlint.
- **Do not add any Claude / AI attribution** (no `Co-Authored-By`, no "Generated with" lines)
  to commits or PRs.
- Husky runs lint-staged (ESLint + Prettier) on pre-commit and commitlint on commit-msg.

## Git auth (important)

Never modify global git config. This repo has a repo-local identity (`adam.kokoszka.it@gmail.com`) and a repo-local credential helper
(`gh auth git-credential` scoped to `https://github.com`).
