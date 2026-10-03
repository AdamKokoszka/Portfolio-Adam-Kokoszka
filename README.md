# IncoCode — Adam Kokoszka

Personal portfolio of Adam Kokoszka, Senior Frontend Developer — [incocode.com](https://incocode.com).

Built with [Nuxt](https://nuxt.com) (static generation), Vue 3, TypeScript, Tailwind CSS v4 and
`@nuxtjs/i18n` (Polish at `/`, English at `/en`).

## Requirements

- Node.js — version from [`.nvmrc`](./.nvmrc) (`nvm use`)
- npm

## Getting started

```bash
nvm use
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

## Scripts

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

## Quality gates

- **CI** (GitHub Actions): lint, format check, type-check, static build.
- **Lighthouse CI**: audits `/` and `/en` on every PR — accessibility and SEO must score ≥ 95,
  performance and best practices warn below 90. Reports are uploaded as a workflow artifact.
- **SEO**: sitemap (`/sitemap_index.xml`), `robots.txt`, `hreflang` and canonical links are
  generated at build time.

## Analytics

[Umami Cloud](https://umami.is) - website ID and tracked domains are in `runtimeConfig.public`
(`nuxt.config.ts`). Only the production hosts are counted, never localhost or deploy previews.

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

## Contributing

- One branch per task (`feat/…`, `fix/…`, `chore/…`), merged to `main` via pull request.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) — enforced by
  commitlint on `commit-msg`.
- Staged files are linted and formatted on `pre-commit` (Husky + lint-staged).
- CI runs lint, format check, type-check and a static build on every pull request.

Code conventions and project structure are documented in [`CLAUDE.md`](./CLAUDE.md).
