import type { MaybeElementRef } from '@vueuse/core'
import type { PointerParallaxOptions } from '~/types/composables'

export const usePointerParallax = (
  target: MaybeElementRef,
  { smoothing = 0.045 }: PointerParallaxOptions = {},
) => {
  const isFinePointer = useMediaQuery('(pointer: fine)')
  const reducedMotion = usePreferredReducedMotion()
  const isEnabled = computed(() => isFinePointer.value && reducedMotion.value !== 'reduce')

  const current = { x: 0, y: 0 }
  const goal = { x: 0, y: 0 }
  let frame = 0

  const render = () => {
    const el = unrefElement(target)
    current.x += (goal.x - current.x) * smoothing
    current.y += (goal.y - current.y) * smoothing
    const isSettled = Math.abs(goal.x - current.x) < 0.001 && Math.abs(goal.y - current.y) < 0.001
    if (isSettled) {
      current.x = goal.x
      current.y = goal.y
    }
    el?.style.setProperty('--parallax-x', current.x.toFixed(4))
    el?.style.setProperty('--parallax-y', current.y.toFixed(4))
    frame = isSettled ? 0 : requestAnimationFrame(render)
  }

  const start = () => {
    if (!frame) frame = requestAnimationFrame(render)
  }

  useEventListener(
    () => unrefElement(target),
    'pointermove',
    (event: PointerEvent) => {
      if (!isEnabled.value) return
      goal.x = event.clientX / window.innerWidth - 0.5
      goal.y = event.clientY / window.innerHeight - 0.5
      start()
    },
    { passive: true },
  )

  useEventListener(
    () => unrefElement(target),
    'pointerleave',
    () => {
      goal.x = 0
      goal.y = 0
      start()
    },
    { passive: true },
  )

  onScopeDispose(() => cancelAnimationFrame(frame))
}
