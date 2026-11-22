import type { Locale } from 'vue-i18n'
import type { IconName } from '~/types/base'

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

export interface SideProjectImage {
  src: Record<Locale, string>
  width: number
  height: number
}

export interface SideProject {
  id: string
  href: Record<Locale, string>
  mark: string
  laptop: SideProjectImage
  phone: SideProjectImage
}

export interface SectionSystemsSideProjectProps {
  project: SideProject
}

export interface SectionSystemsDividerProps {
  icon: IconName
  iconClass: string
}
