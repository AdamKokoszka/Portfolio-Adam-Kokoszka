import type { TECH_CATEGORIES } from '~/data/technologies'

export type TechCategory = (typeof TECH_CATEGORIES)[number]

export type TechFilter = 'all' | TechCategory

export interface Technology {
  id: string
  name: string
  icon: string
  url: string
  category: TechCategory
}

export interface SectionStackFiltersProps {
  counts: Record<TechFilter, number>
}
