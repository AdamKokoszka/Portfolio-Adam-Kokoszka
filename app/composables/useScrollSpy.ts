/**
 * Tracks which of the given sections crosses the middle band of the viewport.
 * Returns `null` while none does (e.g. at the very top of the page).
 */
export function useScrollSpy<T extends string>(ids: readonly T[]) {
  const targets = shallowRef<HTMLElement[]>([])
  const visibleIds = ref(new Set<string>())

  useIntersectionObserver(
    targets,
    (entries) => {
      const next = new Set(visibleIds.value)
      for (const entry of entries) {
        if (entry.isIntersecting) next.add(entry.target.id)
        else next.delete(entry.target.id)
      }
      visibleIds.value = next
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )

  onMounted(() => {
    targets.value = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
  })

  const activeId = computed<T | null>(() => ids.find((id) => visibleIds.value.has(id)) ?? null)

  return { activeId }
}
