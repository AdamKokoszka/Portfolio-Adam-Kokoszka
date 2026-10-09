const ACTIVE_LINE_RATIO = 0.45
const ACTIVE_LINE_MAX_PX = 480
const BOTTOM_OFFSET_PX = 4

export const useScrollSpy = <T extends string>(ids: readonly T[]) => {
  const sections = shallowRef<{ id: T; el: HTMLElement }[]>([])
  const activeId = ref<T | null>(null)

  // The line is capped so a tall window still marks the section scrolled to, and the page
  // bottom activates the last section, which is too short to reach the line.
  const update = () => {
    const { scrollY, innerHeight } = window
    if (!sections.value.length || !scrollY) {
      activeId.value = null
      return
    }
    const isAtBottom =
      scrollY + innerHeight >= document.documentElement.scrollHeight - BOTTOM_OFFSET_PX
    if (isAtBottom) {
      activeId.value = sections.value.at(-1)?.id ?? null
      return
    }
    const line = Math.min(innerHeight * ACTIVE_LINE_RATIO, ACTIVE_LINE_MAX_PX)
    const current = sections.value
      .map(({ id, el }) => ({ id, rect: el.getBoundingClientRect() }))
      .findLast(({ rect }) => rect.top <= line)
    activeId.value = current && current.rect.bottom > line ? current.id : null
  }

  const collectSections = () => {
    sections.value = ids.flatMap((id) => {
      const el = document.getElementById(id)
      return el ? [{ id, el }] : []
    })
    update()
  }

  onMounted(collectSections)
  onScopeDispose(useNuxtApp().hook('page:finish', collectSections))

  useScrollFrame(update)

  return { activeId }
}
