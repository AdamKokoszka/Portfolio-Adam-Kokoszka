import type { MaybeElementRef } from '@vueuse/core'

// Endless loops keep ticking off screen and cost frames while scrolling on slower phones.
export const useLoopsPaused = (target: MaybeElementRef) => {
  const isVisible = useElementVisibility(target, { initialValue: true })

  return computed(() => (isVisible.value ? '' : 'loops-paused'))
}
