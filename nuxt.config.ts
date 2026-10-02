import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  routeRules: {
    // Polish lives at the root; `/pl` would duplicate it.
    '/pl': { redirect: { to: '/', statusCode: 301 } },
    '/pl/**': { redirect: { to: '/', statusCode: 301 } },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },

  eslint: {
    config: {
      // Formatting is owned by Prettier.
      stylistic: false,
    },
  },

  i18n: {
    baseUrl: 'https://incocode.com',
    defaultLocale: 'pl',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'pl', language: 'pl-PL', name: 'Polski', file: 'pl.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
  },
})
