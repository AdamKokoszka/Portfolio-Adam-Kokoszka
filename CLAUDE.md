# CLAUDE.md

Personal portfolio of Adam Kokoszka (brand **IncoCode**, domain `incocode.com`).
Single-page site, statically generated, Polish by default with an English version.

## Stack

- **Nuxt 4** (static generation via `nuxt generate`), **Vue 3** with `<script setup lang="ts">`
- **TypeScript** in strict mode
- **Tailwind CSS v4** (CSS-first config in `app/assets/css/main.css`, no `tailwind.config`)
- **@nuxtjs/i18n**: `pl` (default, served at `/`) and `en` (served at `/en`); `/pl` redirects to `/`
- **@nuxtjs/color-mode** (dark default, `.dark` / `.light` class on `<html>`, no flash) and
  **@nuxt/icon** (local SVG collection `ic:`)
- **@nuxt/fonts** (Manrope, JetBrains Mono, Caveat — self-hosted at build time), **@nuxt/image**
  (`<NuxtImg>` / `<NuxtPicture>`, avif/webp) — use these instead of raw `<img>` / font links
- **@nuxtjs/sitemap** + **@nuxtjs/robots** (site URL in `site.url`); per-page SEO via `useSeoMeta`
  with texts from i18n (`meta.*`)
- **ESLint** (`@nuxt/eslint`, flat config) + **Prettier** (with Tailwind class sorting)
- **Lighthouse CI** in GitHub Actions (`lighthouserc.json`): a11y & SEO ≥ 0.95 are hard gates
- Node version: see `.nvmrc` (24 LTS). Package manager: **npm** only.
- Deploy target: Netlify (static). No tests in this project.
- Editor used by the author: WebStorm.

## Design source

The visual spec is the claude.ai Design canvas **"IncoCode Portfolio"**:
https://claude.ai/artifact/7YUfCvBK1iKvq547QtdVns
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
  app.vue              # root: <html lang>, hreflang, <NuxtPage />
  pages/               # routes (index.vue is the whole one-page site)
  components/
    base/              # generic, reusable UI primitives  → BaseButton, BaseEyebrow
    common/            # shared app-specific widgets      → ThemeToggle, LanguageSwitcher
    layout/            # one-per-page chrome              → TheHeader, TheFooter
    sections/          # page sections                    → SectionHero, SectionAbout
  composables/         # useX() logic                     → useTheme, useScrollSpy
  data/                # typed static data (no copy!)     → experience.ts, technologies.ts
  types/               # shared TS types
  assets/css/main.css  # Tailwind import + design tokens (@theme), themes
  assets/images/       # images processed by the build
i18n/locales/          # pl.json, en.json — ALL user-facing text
public/                # files served as-is (favicon, og image, robots.txt)
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
- Props/emits: type-based (`defineProps<{ … }>()`, `defineEmits<{ … }>()`), props in camelCase,
  events in camelCase. Use `withDefaults` / destructuring defaults, never `required` + default.
- Keep components small and presentational; move logic to composables.
- Prefer Tailwind utilities in the template; use `<style scoped>` only for things utilities
  can't express (complex keyframes, masks). No inline `style` except dynamic CSS variables.

### Naming

- Composables: `useCamelCase`, file `app/composables/useCamelCase.ts`.
- Types/interfaces: `PascalCase`; no `I` prefix. Constants: `SCREAMING_SNAKE_CASE` only for
  true module-level constants.
- Variables/functions: `camelCase`; booleans read as questions (`isOpen`, `hasError`).
- i18n keys: nested by section, camelCase (`hero.title`, `experience.items.antologic.role`).

### Text & i18n

- **No hard-coded user-facing text in templates** (enforced by `vue/no-bare-strings-in-template`).
  Every string lives in both `pl.json` and `en.json`. Polish is the source language; English
  translations are written by Claude.
- Static data in `app/data/` holds structure only (ids, dates, logos, links); text comes from i18n.

### Styling & theming

- **Tailwind only — no `<style>` blocks.** Allowed exceptions: things utilities genuinely can't
  express (complex keyframes, masks). Reusable visual patterns become a `@utility` in `main.css`
  or a component — never copy-pasted class soup across components.
- Design tokens live once in `app/assets/css/main.css`. Theme colors are CSS variables
  (`--c-*`) swapped by `.dark` / `.light` on `<html>` (@nuxtjs/color-mode, dark by default)
  and by `.theme-inverted` (inverted section). Use the **semantic utilities**, never hex values
  and normally no `dark:` / `light:` variants:
  - surfaces: `bg-base`, `bg-alt`, `bg-surface`, `bg-surface-raised`, `bg-sunken`, `bg-hero`
  - text: `text-fg`, `text-fg-muted`, `text-fg-soft`; borders: `border-line`
  - accent: `bg-accent`, `text-accent-fg`, `text-on-accent`, `bg-accent-soft`, `border-accent-line`
  - warm accent: `text-warm`, `text-warm-fg`, `bg-warm-soft`
  - fixed dark "Systems" palette: `bg-ink`, `bg-ink-surface`, `text-ink-*`, `bg-peach`, …
  - helpers: `border-gradient`, `border-gradient-strong` (fill follows `--card-bg`, default
    surface), `bg-dots`, `bg-grid`, `shadow-card`, `container` (page width + gutters)
  - fonts: `font-sans` (Manrope), `font-mono` (JetBrains Mono), `font-hand` (Caveat);
    easing: `ease-smooth`, `ease-rise`
- Breakpoints follow the design: base = phone, `md` ≥ 760px (tablet), `lg` ≥ 1100px (desktop).
  Build every component mobile-first for all three at once; check 390px and 1440px.
- Icons: SVGs from the design in `app/assets/icons/*.svg`, used as
  `<Icon name="ic:<file>" />` (@nuxt/icon, bundled, inherits `currentColor`). Decorative icons
  get `aria-hidden="true"`.
- Respect `prefers-reduced-motion` (globally reduced in `main.css`; JS-driven motion must check it).

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

The author uses a company GitLab elsewhere. Never modify global git config. This repo has a
repo-local identity (`adam.kokoszka.it@gmail.com`) and a repo-local credential helper
(`gh auth git-credential` scoped to `https://github.com`).
