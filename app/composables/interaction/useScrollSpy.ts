const ACTIVE_LINE_RATIO = 0.45
const ACTIVE_LINE_MAX_PX = 480
const BOTTOM_OFFSET_PX = 4

export const useScrollSpy = <T extends string>(ids: readonly T[]) => {
  const sections = shallowRef<{ id: T; el: HTMLElement }[]>([])
  const { y, arrivedState } = useWindowScroll({ offset: { bottom: BOTTOM_OFFSET_PX } })
  const { height } = useWindowSize()

  const collectSections = () => {
    sections.value = ids.flatMap((id) => {
      const el = document.getElementById(id)
      return el ? [{ id, el }] : []
    })
  }

  onMounted(collectSections)
  onScopeDispose(useNuxtApp().hook('page:finish', collectSections))

  // The line is capped so a tall window still marks the section scrolled to, and the page
  // bottom activates the last section, which is too short to reach the line.
  const activeId = computed<T | null>(() => {
    if (!sections.value.length || !y.value) return null
    if (arrivedState.bottom) return sections.value.at(-1)?.id ?? null
    const line = Math.min(height.value * ACTIVE_LINE_RATIO, ACTIVE_LINE_MAX_PX)
    const current = sections.value
      .map(({ id, el }) => ({ id, rect: el.getBoundingClientRect() }))
      .findLast(({ rect }) => rect.top <= line)
    return current && current.rect.bottom > line ? current.id : null
  })

  return { activeId }
}
