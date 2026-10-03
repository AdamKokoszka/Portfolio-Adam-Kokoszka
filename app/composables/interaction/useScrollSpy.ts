export const useScrollSpy = <T extends string>(ids: readonly T[]) => {
  const targets = shallowRef<HTMLElement[]>([])
  const visibleIds = ref(new Set<string>())

  useIntersectionObserver(
    targets,
    (entries) => {
      const next = new Set(visibleIds.value)
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) next.add(target.id)
        else next.delete(target.id)
      })
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
