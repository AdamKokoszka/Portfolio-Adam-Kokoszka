import type { MaybeElementRef } from '@vueuse/core'

export const usePointerParallax = (target: MaybeElementRef) => {
  const isFinePointer = useMediaQuery('(pointer: fine)')
  const reducedMotion = usePreferredReducedMotion()
  const isEnabled = computed(() => isFinePointer.value && reducedMotion.value !== 'reduce')

  let frame = 0
  let lastEvent: PointerEvent | null = null

  const setOffset = (el: HTMLElement | SVGElement, x: number, y: number) => {
    el.style.setProperty('--parallax-x', x.toFixed(3))
    el.style.setProperty('--parallax-y', y.toFixed(3))
  }

  const update = () => {
    frame = 0
    const el = unrefElement(target)
    if (!el || !lastEvent) return
    const rect = el.getBoundingClientRect()
    setOffset(
      el,
      (lastEvent.clientX - rect.left) / rect.width - 0.5,
      (lastEvent.clientY - rect.top) / rect.height - 0.5,
    )
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
      if (el) setOffset(el, 0, 0)
    },
    { passive: true },
  )

  onScopeDispose(() => cancelAnimationFrame(frame))
}
