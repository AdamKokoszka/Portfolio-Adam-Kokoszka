import type { SectionId } from './navigation'

export interface TheHeaderMobileMenuProps {
  open: boolean
  activeId: SectionId | null
  isScrolled: boolean
}

export interface TheHeaderMobileMenuEmits {
  close: []
}
