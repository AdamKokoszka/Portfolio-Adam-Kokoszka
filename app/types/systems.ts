export type SystemCardVariant = 'featured' | 'compact'

export interface SystemItem {
  id: string
  image: string
  imagePosition?: string
  isCurrent?: boolean
}

export interface SectionSystemsCardProps {
  system: SystemItem
  variant?: SystemCardVariant
}
