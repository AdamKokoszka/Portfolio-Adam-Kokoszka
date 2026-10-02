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

## Contributing

- One branch per task (`feat/…`, `fix/…`, `chore/…`), merged to `main` via pull request.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) — enforced by
  commitlint on `commit-msg`.
- Staged files are linted and formatted on `pre-commit` (Husky + lint-staged).
- CI runs lint, format check, type-check and a static build on every pull request.

Code conventions and project structure are documented in [`CLAUDE.md`](./CLAUDE.md).
