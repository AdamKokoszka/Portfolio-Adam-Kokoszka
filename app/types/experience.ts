import type { LogoFit } from './base'

export interface ExperienceRole {
  id: string
  from: string
  to: string | null
}

export interface ExperienceItem {
  id: string
  logo: string
  logoFit: LogoFit
  logoHeight?: number
  isFeatured?: boolean
  roles: readonly ExperienceRole[]
  highlights: readonly string[]
}

export interface EducationItem {
  id: string
  logo: string
  logoFit: LogoFit
  logoHeight?: number
  from: string
  to: string
}

export interface SectionExperienceTimelineProps {
  companyId: string
  roles: readonly ExperienceRole[]
}
