# CLAUDE.md

Personal portfolio of Adam Kokoszka (brand **IncoCode**, domain `incocode.com`).
Single-page site, statically generated, Polish by default with an English version.

## Stack

- **Nuxt 4** (static generation via `nuxt generate`), **Vue 3** with `<script setup lang="ts">`
- **TypeScript** in strict mode
- **Tailwind CSS v4** (CSS-first config in `app/assets/css/main.css`, no `tailwind.config`)
- **@nuxtjs/i18n**: `pl` (default, served at `/`) and `en` (served at `/en`); `/pl` redirects to `/`
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

- Design tokens (colors, fonts, radii, shadows) are defined once in `main.css` (`@theme` + CSS
  variables for dark/light). Never hard-code hex values in components.
- Dark theme is the default; light theme toggled via a class on `<html>`.
- Respect `prefers-reduced-motion` for every animation. Mobile-first; check 390px and 1440px.

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
