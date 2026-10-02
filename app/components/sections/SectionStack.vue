<script setup lang="ts">
import { TECHNOLOGIES } from '~/data/technologies'
import type { TechFilter } from '~/types/technologies'

const { t } = useI18n()

const number = sectionNumber('stack')

const activeFilter = ref<TechFilter>('all')
const isExpanded = ref(false)
const track = useTemplateRef('track')
const reducedMotion = usePreferredReducedMotion()

const visibleTechnologies = computed(() =>
  activeFilter.value === 'all'
    ? TECHNOLOGIES
    : TECHNOLOGIES.filter((tech) => tech.category === activeFilter.value),
)

const COUNTS = {
  all: TECHNOLOGIES.length,
  frontend: TECHNOLOGIES.filter((tech) => tech.category === 'frontend').length,
  tools: TECHNOLOGIES.filter((tech) => tech.category === 'tools').length,
  ai: TECHNOLOGIES.filter((tech) => tech.category === 'ai').length,
} satisfies Record<TechFilter, number>

const trackClass = computed(() =>
  isExpanded.value
    ? 'grid grid-cols-3 gap-3 md:grid-cols-[repeat(auto-fill,minmax(9.375rem,1fr))] md:gap-4'
    : 'flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] -mr-5 pr-5 md:mr-0 md:pr-0.5',
)

const tileClass = computed(() =>
  isExpanded.value ? 'h-31 md:h-41' : 'h-34 w-31 shrink-0 snap-start md:h-41 md:w-37.5',
)

const scrollTrack = (direction: 1 | -1) => {
  const el = track.value
  if (!el) return
  el.scrollBy({
    left: direction * Math.max(200, el.clientWidth * 0.75),
    behavior: reducedMotion.value === 'reduce' ? 'auto' : 'smooth',
  })
}

const scrollPrev = () => scrollTrack(-1)
const scrollNext = () => scrollTrack(1)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

watch(activeFilter, () => track.value?.scrollTo({ left: 0 }))
</script>

<template>
  <section
    id="stack"
    class="relative overflow-hidden bg-base py-18 md:py-28"
    aria-labelledby="stack-title">
    <svg
      class="pointer-events-none absolute -bottom-50 -left-55 size-130 scale-60 text-accent md:scale-100"
      viewBox="0 0 520 520"
      fill="none"
      aria-hidden="true">
      <circle
        cx="260"
        cy="260"
        r="258"
        stroke="currentColor"
        stroke-opacity=".10" />
      <circle
        cx="260"
        cy="260"
        r="200"
        stroke="currentColor"
        stroke-opacity=".14" />
      <circle
        cx="260"
        cy="260"
        r="142"
        stroke="currentColor"
        stroke-opacity=".18"
        stroke-dasharray="4 8" />
    </svg>
    <div
      class="pointer-events-none absolute top-16 left-[2.5%] size-18 bg-dots md:size-25"
      aria-hidden="true" />
    <div
      class="pointer-events-none absolute right-[8%] bottom-10 h-25 w-55 bg-dots [mask-image:linear-gradient(135deg,#000_30%,transparent_90%)]"
      aria-hidden="true" />
    <BaseGhostNumber :number="number" />

    <div
      v-reveal
      class="relative z-10 container">
      <div class="mb-5.5 flex items-center justify-between gap-6 md:mb-9 md:items-end">
        <div>
          <BaseEyebrow :number="number">
            {{ t('nav.stack') }}
          </BaseEyebrow>
          <h2
            id="stack-title"
            class="text-[1.75rem]/[1.15] font-semibold tracking-[-0.02em] text-fg md:text-[2.375rem]/[1.15]">
            {{ t('stack.title') }}
          </h2>
        </div>
        <div
          v-if="!isExpanded"
          class="flex gap-2 md:gap-3">
          <BaseIconButton
            size="lg"
            :label="t('stack.previous')"
            @click="scrollPrev">
            <Icon
              name="ic:chevron-left"
              class="size-5"
              aria-hidden="true" />
          </BaseIconButton>
          <BaseIconButton
            size="lg"
            :label="t('stack.next')"
            @click="scrollNext">
            <Icon
              name="ic:chevron-right"
              class="size-5"
              aria-hidden="true" />
          </BaseIconButton>
        </div>
      </div>

      <SectionStackFilters
        v-model="activeFilter"
        class="mb-5.5 md:mb-7"
        :counts="COUNTS" />

      <ul
        id="stack-list"
        ref="track"
        tabindex="0"
        class="m-0 list-none p-0.5 pb-3"
        :class="trackClass"
        :aria-label="t('stack.listLabel')">
        <BaseCard
          v-for="tech in visibleTechnologies"
          :key="tech.id"
          as="li"
          class="flex flex-col items-center justify-center gap-3 rounded-[1.125rem] px-2.5 text-center text-sm font-semibold text-fg md:gap-4 md:text-[0.9375rem]"
          :class="tileClass">
          <div class="flex flex-col items-center gap-3 md:gap-4">
            <Icon
              :name="tech.icon"
              class="size-11.5 md:size-14"
              aria-hidden="true" />
            <span>{{ tech.name }}</span>
          </div>
        </BaseCard>
      </ul>

      <div class="mt-6.5 flex justify-center md:mt-9">
        <BaseButton
          variant="ghost"
          size="sm"
          aria-controls="stack-list"
          :aria-expanded="isExpanded"
          @click="toggleExpanded">
          {{ isExpanded ? t('stack.collapse') : t('stack.showAll') }}
          <Icon
            v-if="isExpanded"
            name="ic:chevron-up"
            aria-hidden="true" />
          <Icon
            v-else
            name="ic:arrow-right"
            aria-hidden="true" />
        </BaseButton>
      </div>
    </div>
  </section>
</template>
