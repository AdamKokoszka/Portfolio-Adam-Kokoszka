import tailwindcss from '@tailwindcss/vite'

const SITE_URL = 'https://incocode.com'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@vueuse/nuxt',
  ],

  devtools: { enabled: true },

  components: [{ path: '~/components', pathPrefix: false }],

  css: ['~/assets/css/main.css'],

  site: {
    url: SITE_URL,
    name: 'IncoCode - Adam Kokoszka',
  },

  routeRules: {
    '/pl': { redirect: { to: '/', statusCode: 301 } },
    '/pl/**': { redirect: { to: '/', statusCode: 301 } },
  },

  nitro: {
    prerender: {
      // `en.html` instead of `en/index.html`, so `/en` is served as-is (no trailing-slash redirect).
      autoSubfolderIndex: false,
      // Leave `/pl` to the host-level 301 instead of a prerendered meta-refresh page.
      ignore: ['/pl'],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },

  fonts: {
    defaults: {
      subsets: ['latin', 'latin-ext'],
    },
    families: [
      { name: 'Manrope', provider: 'google', weights: [300, 400, 500, 600, 700] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400], subsets: ['latin'] },
      { name: 'Caveat', provider: 'google', weights: [600] },
    ],
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'theme',
  },

  icon: {
    mode: 'svg',
    customCollections: [{ prefix: 'ic', dir: './app/assets/icons' }],
    clientBundle: { scan: true, includeCustomCollections: true },
  },

  image: {
    format: ['avif', 'webp'],
    quality: 80,
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },

  i18n: {
    baseUrl: SITE_URL,
    defaultLocale: 'pl',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'pl', language: 'pl-PL', name: 'Polski', file: 'pl.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
  },
})
