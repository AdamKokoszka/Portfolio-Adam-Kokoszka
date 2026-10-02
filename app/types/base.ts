export type ButtonVariant = 'primary' | 'ghost'

export type ButtonSize = 'md' | 'sm'

export type EyebrowTone = 'accent' | 'warm' | 'peach'

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
}

export interface BaseGhostNumberProps {
  number: string
}
