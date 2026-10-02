import type { CategoryFilter } from '~/types/composables'

export const useCategoryFilter = <C extends string, T extends { category: C }>(
  items: readonly T[],
  categories: readonly C[],
) => {
  const activeFilter = ref('all') as Ref<CategoryFilter<C>>

  const filteredItems = computed(() =>
    activeFilter.value === 'all'
      ? items
      : items.filter((item) => item.category === activeFilter.value),
  )

  const counts = Object.fromEntries([
    ['all', items.length],
    ...categories.map((category) => [
      category,
      items.filter((item) => item.category === category).length,
    ]),
  ]) as Record<CategoryFilter<C>, number>

  return { activeFilter, filteredItems, counts }
}
