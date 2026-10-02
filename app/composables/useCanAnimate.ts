import type { MaybeElementRef } from '@vueuse/core'

export const useCanAnimate = (target: MaybeElementRef) => {
  const isVisible = useElementVisibility(target)
  const documentVisibility = useDocumentVisibility()
  const reducedMotion = usePreferredReducedMotion()

  return computed(
    () =>
      isVisible.value && documentVisibility.value === 'visible' && reducedMotion.value !== 'reduce',
  )
}
