import type { MaybeElementRef } from '@vueuse/core'
import type { LayoutTransitionOptions } from '~/types/composables'

export const useLayoutTransition = (
  target: MaybeElementRef<HTMLElement | null | undefined>,
  { fadeOut = 200, fadeIn = 500, resize = 600 }: LayoutTransitionOptions = {},
) => {
  const reducedMotion = usePreferredReducedMotion()
  let isRunning = false

  const run = async (update: () => void) => {
    const el = unrefElement(target)
    if (!el || isRunning || reducedMotion.value === 'reduce') return update()

    isRunning = true
    const hide = el.animate({ opacity: [1, 0] }, { duration: fadeOut, fill: 'forwards' })
    await hide.finished

    const from = el.offsetHeight
    update()
    await nextTick()
    const to = el.offsetHeight

    el.style.overflow = 'hidden'
    const show = el.animate({ opacity: [0, 1] }, { duration: fadeIn, easing: EASE_SMOOTH })
    const grow = el.animate(
      { height: [`${from}px`, `${to}px`] },
      { duration: resize, easing: EASE_SMOOTH },
    )
    hide.cancel()

    await Promise.all([show.finished, grow.finished])
    el.style.overflow = ''
    isRunning = false
  }

  return { run }
}
