import type { MobileMenuOptions } from '~/types/composables'

export const useMobileMenu = ({ closeAt, onEscape }: MobileMenuOptions) => {
  const isOpen = ref(false)
  const isScrollLocked = useScrollLock(import.meta.client ? document.body : null)
  const isPastBreakpoint = useMediaQuery(closeAt)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const close = () => {
    isOpen.value = false
  }

  watch(isOpen, (open) => {
    isScrollLocked.value = open
  })

  watch(isPastBreakpoint, (isPast) => {
    if (isPast) close()
  })

  onKeyStroke('Escape', () => {
    if (!isOpen.value) return
    close()
    onEscape?.()
  })

  return { isOpen, toggle, close }
}
