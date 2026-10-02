import type { Technology } from '~/types/technologies'

export const TECH_CATEGORIES = ['frontend', 'tools', 'ai'] as const

export const TECHNOLOGIES: readonly Technology[] = [
  { id: 'vue', name: 'Vue.js', icon: 'logos:vue', url: 'https://vuejs.org', category: 'frontend' },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: 'logos:typescript-icon',
    url: 'https://www.typescriptlang.org',
    category: 'frontend',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'logos:javascript',
    url: 'https://developer.mozilla.org/docs/Web/JavaScript',
    category: 'frontend',
  },
  {
    id: 'pinia',
    name: 'Pinia',
    icon: 'logos:pinia',
    url: 'https://pinia.vuejs.org',
    category: 'frontend',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: 'logos:tailwindcss-icon',
    url: 'https://tailwindcss.com',
    category: 'frontend',
  },
  {
    id: 'primevue',
    name: 'PrimeVue',
    icon: 'simple-icons:primevue',
    url: 'https://primevue.org',
    category: 'frontend',
  },
  {
    id: 'vue-i18n',
    name: 'Vue I18n',
    icon: 'ic:translate',
    url: 'https://vue-i18n.intlify.dev',
    category: 'frontend',
  },
  {
    id: 'axios',
    name: 'Axios',
    icon: 'simple-icons:axios',
    url: 'https://axios-http.com',
    category: 'frontend',
  },
  { id: 'vite', name: 'Vite', icon: 'logos:vitejs', url: 'https://vite.dev', category: 'tools' },
  { id: 'git', name: 'Git', icon: 'logos:git-icon', url: 'https://git-scm.com', category: 'tools' },
  {
    id: 'claude',
    name: 'Claude / Claude Code',
    icon: 'logos:claude-icon',
    url: 'https://claude.ai',
    category: 'ai',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: 'simple-icons:openai',
    url: 'https://chatgpt.com',
    category: 'ai',
  },
]
