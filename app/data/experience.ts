import type { EducationItem, ExperienceItem } from '~/types/experience'

export const EXPERIENCE: readonly ExperienceItem[] = [
  {
    id: 'antologic',
    logo: '/images/logos/antologic.webp',
    logoFit: 'tight',
    isFeatured: true,
    roles: [
      { id: 'senior', from: '2025-08', to: null },
      { id: 'regular', from: '2023-02', to: '2025-07' },
      { id: 'junior', from: '2022-03', to: '2023-01' },
    ],
  },
  {
    id: 'i4s',
    logo: '/images/logos/i4s-innovation-solutions.webp',
    logoFit: 'tight',
    roles: [{ id: 'frontend', from: '2020-02', to: '2022-03' }],
  },
  {
    id: 'emediator',
    logo: '/images/logos/emediator.webp',
    logoFit: 'tight',
    roles: [{ id: 'frontend', from: '2017-07', to: '2017-08' }],
  },
]

export const EDUCATION: readonly EducationItem[] = [
  {
    id: 'wsti',
    logo: '/images/logos/wsti-katowice.svg',
    logoFit: 'padded',
    from: '2018',
    to: '2021',
  },
  {
    id: 'zsl',
    logo: '/images/logos/zsl-gliwice.webp',
    logoFit: 'padded',
    from: '2014',
    to: '2018',
  },
]
