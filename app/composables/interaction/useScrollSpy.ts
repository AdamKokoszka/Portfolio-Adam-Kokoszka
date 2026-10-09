const ACTIVE_LINE_RATIO = 0.45
const ACTIVE_LINE_MAX_PX = 480
const FOOTER_SHOWN_RATIO = 0.98

// Observers only, no scroll listeners: reading the scroll position in scroll events forced style
// recalcs mid-scroll and made scrolling stutter on slower phones.
export const useScrollSpy = <T extends string>(ids: readonly T[]) => {
  const sections = shallowRef<HTMLElement[]>([])
  const footer = shallowRef<HTMLElement | null>(null)
  const crossingIds = ref(new Set<string>())
  const isFooterShown = ref(false)

  // clientHeight ignores the collapsing mobile address bar, so the observer is not rebuilt mid-scroll.
  // The line is capped so a tall window still marks the section scrolled to.
  const { height } = useWindowSize({ includeScrollbar: false })
  const bandMargin = computed(() => {
    const line = Math.round(Math.min(height.value * ACTIVE_LINE_RATIO, ACTIVE_LINE_MAX_PX))
    return `-${line}px 0px -${Math.max(height.value - line - 1, 0)}px 0px`
  })

  useIntersectionObserver(
    sections,
    (entries) => {
      const next = new Set(crossingIds.value)
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) next.add(target.id)
        else next.delete(target.id)
      })
      crossingIds.value = next
    },
    { rootMargin: bandMargin },
  )

  // The last section is too short to reach the line, so the page bottom (whole footer) activates it.
  useIntersectionObserver(
    footer,
    ([entry]) => {
      isFooterShown.value = (entry?.intersectionRatio ?? 0) >= FOOTER_SHOWN_RATIO
    },
    { threshold: [0, FOOTER_SHOWN_RATIO] },
  )

  const collectTargets = () => {
    crossingIds.value = new Set()
    sections.value = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    footer.value = document.querySelector('footer')
  }

  onMounted(collectTargets)
  onScopeDispose(useNuxtApp().hook('page:finish', collectTargets))

  const activeId = computed<T | null>(() => {
    if (isFooterShown.value && sections.value.length) return ids.at(-1) ?? null
    return ids.find((id) => crossingIds.value.has(id)) ?? null
  })

  return { activeId }
}
