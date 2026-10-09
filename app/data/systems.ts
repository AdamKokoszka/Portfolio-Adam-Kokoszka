import type { SystemItem } from '~/types/systems'

export const FEATURED_SYSTEM: SystemItem = {
  id: 'insurance',
  image: '/images/systems/multiagencja-ubezpieczeniowa.webp',
  isCurrent: true,
}

export const PRORMS_SYSTEMS: readonly SystemItem[] = [
  { id: 'prorms', image: '/images/systems/prorms.webp', imagePosition: 'object-[90%_50%]' },
  {
    id: 'proRmsBackoffice',
    image: '/images/systems/backoffice-prorms.webp',
    imagePosition: 'object-[60%_50%]',
  },
]
