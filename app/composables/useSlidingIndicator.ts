import type { MaybeElementRef } from '@vueuse/core'

export const useSlidingIndicator = (container: MaybeElementRef, activeKey: Ref<string | null>) => {
  const offset = ref(0)
  const width = ref(0)

  const measure = () => {
    const el = unrefElement(container)
    const active = el?.querySelector<HTMLElement>('[aria-current]')
    if (!active) {
      width.value = 0
      return
    }
    offset.value = active.offsetLeft
    width.value = active.offsetWidth
  }

  watch(activeKey, () => nextTick(measure))
  useResizeObserver(container, measure)

  const indicatorStyle = computed(() => ({
    '--indicator-x': `${offset.value}px`,
    '--indicator-w': `${width.value}px`,
  }))

  const isVisible = computed(() => width.value > 0)

  return { indicatorStyle, isVisible }
}
