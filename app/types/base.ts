import type { LogoFit } from './experience'

export type ButtonVariant = 'primary' | 'ghost'

export type ButtonSize = 'md' | 'sm'

export type EyebrowTone = 'accent' | 'warm' | 'peach'

export type EyebrowTag = 'p' | 'h2'

export interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
}

export interface BaseIconButtonProps {
  label: string
}

export interface BaseEyebrowProps {
  number: string
  tone?: EyebrowTone
  as?: EyebrowTag
}

export interface BaseGhostNumberProps {
  number: string
}

export interface BaseCardProps {
  isStrong?: boolean
  as?: string
}

export interface BaseLogoTileProps {
  src: string
  alt: string
  fit?: LogoFit
}

export interface BaseWavesProps {
  width: number
  height: number
  lines?: number
  spread?: number
}
