# IncoCode - Adam Kokoszka

Personal portfolio of Adam Kokoszka, Senior Frontend Developer (Vue.js).
Live at **[incocode.com](https://incocode.com)** (Polish) and [incocode.com/en](https://incocode.com/en) (English).

<p>
  <img src="docs/screenshot-desktop.jpg" alt="Portfolio home page on desktop" width="72%">
  <img src="docs/screenshot-mobile.jpg" alt="Portfolio home page on mobile" width="22%">
</p>

## Stack

- **Nuxt 4** with static generation, **Vue 3** (`<script setup>`) and strict **TypeScript**
- **Tailwind CSS v4** with a CSS-first config and design tokens, dark and light themes
- **@nuxtjs/i18n** - Polish at `/`, English at `/en`
- **@nuxt/image** on the Netlify Image CDN (AVIF / WebP, responsive `srcset`)
- **@nuxtjs/sitemap**, **@nuxtjs/robots**, JSON-LD structured data
- **Umami** - cookieless analytics, no consent banner needed
- **ESLint**, **Prettier**, **commitlint** and **Husky**; CI on GitHub Actions with Lighthouse CI

No animation library: scroll reveals, the hero intro, parallax and scroll-driven effects are plain
CSS plus a few small composables, and all of them respect `prefers-reduced-motion`.

## Quality

Lighthouse on the production site at the time of writing:

|         | Performance | Accessibility | Best practices | SEO |
| ------- | ----------- | ------------- | -------------- | --- |
| Desktop | 100         | 100           | 100            | 100 |
| Mobile  | 94          | 100           | 100            | 100 |

- **CI** (GitHub Actions): lint, format check, type-check and a static build on every pull request.
- **Lighthouse CI**: audits `/` and `/en` on every PR - accessibility and SEO must score ≥ 95,
  performance and best practices warn below 90. Reports are uploaded as a workflow artifact.
- **SEO**: sitemap (`/sitemap_index.xml`), `robots.txt`, `hreflang` and canonical links are
  generated at build time.

## Getting started

Requires Node.js from [`.nvmrc`](./.nvmrc) and npm.

```bash
nvm use
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

| Script                 | Description                               |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Start the dev server                      |
| `npm run generate`     | Build the static site to `.output/public` |
| `npm run preview`      | Preview the production build              |
| `npm run lint`         | Lint with ESLint                          |
| `npm run lint:fix`     | Lint and auto-fix                         |
| `npm run format`       | Format with Prettier                      |
| `npm run format:check` | Check formatting                          |
| `npm run typecheck`    | Type-check with vue-tsc                   |
| `npm run check`        | Lint + format check + type-check          |

## Project structure

```
app/
  components/   base primitives, layout, one folder per page section
  composables/  motion, interaction and site logic
  data/         typed static data (no copy)
  pages/        home page and privacy policy
  types/        all TypeScript types
i18n/locales/   all user-facing text (pl.json, en.json)
public/         images, favicons, redirects
design/         scripts that generate icons, fonts and the OG image
```

Code conventions are documented in [`CLAUDE.md`](./CLAUDE.md).

## Analytics

[Umami Cloud](https://umami.is) - website ID and tracked domains are in `runtimeConfig.public`
(`nuxt.config.ts`). Only incocode.com is counted, never localhost or deploy previews.

## Deployment

The site is deployed to [Netlify](https://www.netlify.com) from `main`. Netlify runs
`npm run generate` with its `netlify-static` preset and publishes `dist` (see
[`netlify.toml`](./netlify.toml)); images are resized by the Netlify Image CDN. Every pull request
gets its own deploy preview.

## Editor setup

**WebStorm** (Settings → Languages & Frameworks):

- _Node.js_ → interpreter from `.nvmrc` (`~/.nvm/versions/node/v24.x`), package manager `npm`
- _JavaScript → Code Quality Tools → ESLint_ → **Automatic ESLint configuration**, ✓ _Run eslint --fix on save_
- _JavaScript → Prettier_ → **Automatic Prettier configuration**, ✓ _Run on save_
- _Style Sheets → Tailwind CSS_ is detected automatically
- `.editorconfig` is picked up out of the box

**VS Code**: recommended extensions and settings are in [`.vscode/`](./.vscode).

## Workflow

- One branch per task (`feat/…`, `fix/…`, `chore/…`), merged to `main` via pull request.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) - enforced by
  commitlint on `commit-msg`.
- Staged files are linted and formatted on `pre-commit` (Husky + lint-staged).

## License

All rights reserved. The code is public to show how the site is built; the content, photos,
illustrations and design may not be reused without permission.
