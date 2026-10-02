import type { Technology } from '~/types/technologies'

export const TECH_CATEGORIES = ['frontend', 'tools', 'ai'] as const

export const TECHNOLOGIES: readonly Technology[] = [
  { id: 'vue', name: 'Vue.js', icon: 'logos:vue', category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', icon: 'logos:typescript-icon', category: 'frontend' },
  { id: 'javascript', name: 'JavaScript', icon: 'logos:javascript', category: 'frontend' },
  { id: 'pinia', name: 'Pinia', icon: 'logos:pinia', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', category: 'frontend' },
  { id: 'primevue', name: 'PrimeVue', icon: 'simple-icons:primevue', category: 'frontend' },
  { id: 'vue-i18n', name: 'Vue I18n', icon: 'ic:translate', category: 'frontend' },
  { id: 'axios', name: 'Axios', icon: 'simple-icons:axios', category: 'frontend' },
  { id: 'vite', name: 'Vite', icon: 'logos:vitejs', category: 'tools' },
  { id: 'git', name: 'Git', icon: 'logos:git-icon', category: 'tools' },
  { id: 'claude', name: 'Claude / Claude Code', icon: 'logos:claude-icon', category: 'ai' },
  { id: 'chatgpt', name: 'ChatGPT', icon: 'simple-icons:openai', category: 'ai' },
]
