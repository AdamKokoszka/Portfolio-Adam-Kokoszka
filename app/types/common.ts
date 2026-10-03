import type { NuxtError } from '#app'

export interface CopyButtonProps {
  text: string
  label: string
}

export interface SocialLinksProps {
  placement: 'hero' | 'contact'
}

export interface ErrorPageProps {
  error: NuxtError
}
