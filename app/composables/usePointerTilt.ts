import type { MaybeElementRef } from '@vueuse/core'
import type { PointerTiltOptions } from '~/types/composables'

export const usePointerTilt = (
  target: MaybeElementRef,
  { maxDegrees = 3 }: PointerTiltOptions = {},
) => {
  const isFinePointer = useMediaQuery('(pointer: fine)')
  const reducedMotion = usePreferredReducedMotion()
  const isEnabled = computed(() => isFinePointer.value && reducedMotion.value !== 'reduce')

  let frame = 0
  let lastEvent: PointerEvent | null = null

  const setTilt = (el: HTMLElement | SVGElement, x: number, y: number) => {
    el.style.setProperty('--tilt-x', `${x.toFixed(2)}deg`)
    el.style.setProperty('--tilt-y', `${y.toFixed(2)}deg`)
  }

  const update = () => {
    frame = 0
    const el = unrefElement(target)
    if (!el || !lastEvent) return
    const rect = el.getBoundingClientRect()
    const offsetX = (lastEvent.clientX - rect.left) / rect.width - 0.5
    const offsetY = (lastEvent.clientY - rect.top) / rect.height - 0.5
    setTilt(el, -offsetY * 2 * maxDegrees, offsetX * 2 * maxDegrees)
  }

  useEventListener(
    () => unrefElement(target),
    'pointermove',
    (event: PointerEvent) => {
      if (!isEnabled.value) return
      lastEvent = event
      if (!frame) frame = requestAnimationFrame(update)
    },
    { passive: true },
  )

  useEventListener(
    () => unrefElement(target),
    'pointerleave',
    () => {
      cancelAnimationFrame(frame)
      frame = 0
      const el = unrefElement(target)
      if (el) setTilt(el, 0, 0)
    },
    { passive: true },
  )

  onScopeDispose(() => cancelAnimationFrame(frame))
}
