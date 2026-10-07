<script setup lang="ts">
import { TECH_CATEGORIES } from '~/data/technologies'
import type { SectionStackFiltersProps, TechFilter } from '~/types/technologies'

defineProps<SectionStackFiltersProps>()

const activeFilter = defineModel<TechFilter>({ required: true })

const { t } = useI18n()

const FILTERS: readonly TechFilter[] = ['all', ...TECH_CATEGORIES]
</script>

<template>
  <div
    role="group"
    class="flex flex-wrap gap-2"
    :aria-label="t('stack.filtersLabel')">
    <button
      v-for="filter in FILTERS"
      :key="filter"
      type="button"
      class="inline-flex h-10.5 shrink-0 press cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-fg-muted duration-200 ease-smooth hover:border-accent-line hover:text-fg aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent md:h-10"
      :aria-pressed="activeFilter === filter"
      @click="activeFilter = filter">
      {{ t(`stack.filters.${filter}`) }}
      <small class="text-xs opacity-70">{{ counts[filter] }}</small>
    </button>
  </div>
</template>
