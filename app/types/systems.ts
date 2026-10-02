export type SystemCardVariant = 'featured' | 'compact'

export interface SystemItem {
  id: string
  image: string
  isCurrent?: boolean
}

export interface SectionSystemsCardProps {
  system: SystemItem
  variant?: SystemCardVariant
}
