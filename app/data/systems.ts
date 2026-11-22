import type { SideProject, SystemItem } from '~/types/systems'

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

export const SIDE_PROJECT: SideProject = {
  id: 'dartsbull',
  href: { pl: 'https://dartsbull.com', en: 'https://dartsbull.com/en' },
  mark: '/images/dartsbull/mark.svg',
  laptop: {
    src: { pl: '/images/dartsbull/laptop-pl.webp', en: '/images/dartsbull/laptop-en.webp' },
    width: 1600,
    height: 1000,
  },
  phone: {
    src: { pl: '/images/dartsbull/phone-pl.webp', en: '/images/dartsbull/phone-en.webp' },
    width: 600,
    height: 1298,
  },
}
