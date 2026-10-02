import type { SystemItem } from '~/types/systems'

export const FEATURED_SYSTEM: SystemItem = {
  id: 'insurance',
  image: '/images/systems/multiagencja-ubezpieczeniowa.webp',
  isCurrent: true,
}

export const PRORMS_SYSTEMS: readonly SystemItem[] = [
  { id: 'prorms', image: '/images/systems/prorms.webp' },
  { id: 'proRmsBackoffice', image: '/images/systems/backoffice-prorms.webp' },
]
