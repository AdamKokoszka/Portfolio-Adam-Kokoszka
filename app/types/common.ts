import type { NuxtError } from '#app'

export interface CopyButtonProps {
  text: string
  label: string
}

export type RevealVariant =
  'up' | 'soft' | 'scale' | 'fade' | 'draw' | 'flight' | 'sharpen' | 'group'

export interface SocialLinksProps {
  placement: 'hero' | 'contact'
}

export interface ErrorPageProps {
  error: NuxtError
}
