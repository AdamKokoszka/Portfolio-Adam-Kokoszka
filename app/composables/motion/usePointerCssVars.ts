import type { MaybeElementRef } from '@vueuse/core'
import type { PointerCssVarsOptions } from '~/types/composables'

export const usePointerCssVars = (
  target: MaybeElementRef,
  { x = '--pointer-x', y = '--pointer-y' }: PointerCssVarsOptions = {},
) => {
  let frame = 0
  let lastEvent: PointerEvent | null = null

  const update = () => {
    frame = 0
    const el = unrefElement(target)
    if (!el || !lastEvent) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty(x, `${lastEvent.clientX - rect.left}px`)
    el.style.setProperty(y, `${lastEvent.clientY - rect.top}px`)
  }

  useEventListener(
    () => unrefElement(target),
    'pointermove',
    (event: PointerEvent) => {
      lastEvent = event
      if (!frame) frame = requestAnimationFrame(update)
    },
    { passive: true },
  )

  onScopeDispose(() => cancelAnimationFrame(frame))
}
