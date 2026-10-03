import type { MaybeElementRef } from '@vueuse/core'
import type { HorizontalScrollOptions } from '~/types/composables'

export const useHorizontalScroll = (
  target: MaybeElementRef<HTMLElement | null | undefined>,
  { step = 0.75, minStep = 200 }: HorizontalScrollOptions = {},
) => {
  const reducedMotion = usePreferredReducedMotion()

  const scrollByStep = (direction: 1 | -1) => {
    const el = unrefElement(target)
    el?.scrollBy({
      left: direction * Math.max(minStep, el.clientWidth * step),
      behavior: reducedMotion.value === 'reduce' ? 'auto' : 'smooth',
    })
  }

  const scrollPrev = () => scrollByStep(-1)
  const scrollNext = () => scrollByStep(1)
  const scrollToStart = () => unrefElement(target)?.scrollTo({ left: 0 })

  return { scrollPrev, scrollNext, scrollToStart }
}
