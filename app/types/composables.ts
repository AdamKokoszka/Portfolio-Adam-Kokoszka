export interface TypewriterDelays {
  type?: number
  erase?: number
  hold?: number
  gap?: number
}

export interface PointerCssVarsOptions {
  x?: string
  y?: string
}

export type CategoryFilter<C extends string> = 'all' | C

export interface LayoutTransitionOptions {
  fadeOut?: number
  fadeIn?: number
  resize?: number
}

export interface HorizontalScrollOptions {
  step?: number
  minStep?: number
}

export interface MobileMenuOptions {
  closeAt: string
  onEscape?: () => void
}
