export type ButtonVariant = 'primary' | 'ghost'

export type ButtonSize = 'md' | 'sm'

export interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
}

export interface BaseIconButtonProps {
  label: string
}
