export type IconName =
  | 'arrow-right'
  | 'arrow-up'
  | 'briefcase'
  | 'check'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'close'
  | 'copy'
  | 'github'
  | 'graduation-cap'
  | 'link'
  | 'linkedin'
  | 'mail'
  | 'menu'
  | 'moon'
  | 'pause'
  | 'play'
  | 'sun'

export interface BaseIconProps {
  name: IconName
}

export type LogoFit = 'tight' | 'padded'

export type ButtonVariant = 'primary' | 'ghost'

export type ButtonSize = 'md' | 'sm'

export type EyebrowTone = 'accent' | 'warm' | 'peach'

export type EyebrowTag = 'p' | 'h2'

export interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
}

export type IconButtonSize = 'md' | 'lg'

export interface BaseIconButtonProps {
  label: string
  size?: IconButtonSize
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
  height?: number
}

export interface WaveShape {
  width: number
  height: number
  lines: number
  spread: number
}

export interface BaseWavesProps {
  width: number
  height: number
  lines?: number
  spread?: number
}
