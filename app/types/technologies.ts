import type { TECH_CATEGORIES } from '~/data/technologies'
import type { CategoryFilter } from './composables'

export type TechCategory = (typeof TECH_CATEGORIES)[number]

export type TechFilter = CategoryFilter<TechCategory>

export interface Technology {
  id: string
  name: string
  icon: string
  color?: string
  url: string
  category: TechCategory
}

export interface SectionStackFiltersProps {
  counts: Record<TechFilter, number>
}
