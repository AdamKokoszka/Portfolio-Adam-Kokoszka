// Exports the technology logos used in the "Tech stack" section to public/icons/tech.
// Run with `node design/icons/export-tech-logos.mjs` after adding a technology.
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
import logos from '@iconify-json/logos/icons.json' with { type: 'json' }
import simpleIcons from '@iconify-json/simple-icons/icons.json' with { type: 'json' }

const OUT = 'public/icons/tech'

const ICONIFY_LOGOS = {
  vue: [logos, 'vue'],
  javascript: [logos, 'javascript'],
  typescript: [logos, 'typescript-icon'],
  tailwind: [logos, 'tailwindcss-icon'],
  nuxt: [logos, 'nuxt-icon'],
  primevue: [simpleIcons, 'primevue'],
  claude: [logos, 'claude-icon'],
  pinia: [logos, 'pinia'],
  chatgpt: [simpleIcons, 'openai'],
  vite: [logos, 'vitejs'],
  zod: [logos, 'zod'],
  axios: [simpleIcons, 'axios'],
  echarts: [simpleIcons, 'apacheecharts'],
  git: [logos, 'git-icon'],
  'gitlab-ci': [logos, 'gitlab-icon'],
  docker: [logos, 'docker-icon'],
  eslint: [logos, 'eslint'],
  prettier: [logos, 'prettier'],
  nodejs: [logos, 'nodejs-icon'],
  express: [simpleIcons, 'express'],
  mongodb: [logos, 'mongodb-icon'],
}

const LOCAL_ICONS = {
  github: 'app/assets/icons/github.svg',
  'vue-i18n': 'design/icons/translate.svg',
  'vee-validate': 'design/icons/vee-validate.svg',
}

mkdirSync(OUT, { recursive: true })

for (const [id, [collection, name]] of Object.entries(ICONIFY_LOGOS)) {
  const icon = collection.icons[name]
  const width = icon.width ?? collection.width ?? 24
  const height = icon.height ?? collection.height ?? 24
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${icon.body}</svg>\n`
  writeFileSync(`${OUT}/${id}.svg`, svg)
}

for (const [id, source] of Object.entries(LOCAL_ICONS)) {
  copyFileSync(source, `${OUT}/${id}.svg`)
}
