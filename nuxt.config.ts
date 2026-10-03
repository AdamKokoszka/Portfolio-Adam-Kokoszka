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
    '@vueuse/nuxt',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [{ name: 'theme-color', content: '#262e37' }],
    },
  },

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

  experimental: {
    appManifest: false,
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
      { name: 'JetBrains Mono', provider: 'none' },
      { name: 'Caveat', provider: 'none' },
    ],
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'theme',
  },

  image: {
    screens: { xs: 390, sm: 640, md: 760, lg: 1100, xl: 1280, xxl: 1536 },
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
