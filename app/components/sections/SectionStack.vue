<script setup lang="ts">
import { TECH_CATEGORIES, TECHNOLOGIES } from '~/data/technologies'
import type { TechFilter } from '~/types/technologies'

const LAYOUTS = {
  carousel: {
    track:
      'flex snap-x snap-mandatory scroll-px-1 gap-4 overflow-x-auto [scrollbar-width:none] -mt-2 -ml-1 -mr-5 pt-2 pl-1 pr-5 pb-3 md:-mr-1 md:pr-1',
    tile: 'h-34 w-31 shrink-0 snap-start md:h-41 md:w-37.5',
  },
  grid: {
    track:
      'flex flex-wrap justify-center gap-3 -m-1 p-1 md:gap-4 lg:mx-auto lg:max-w-[calc(6*9.375rem+5*1rem+0.5rem)]',
    tile: 'h-31 w-[calc((100%-1.5rem)/3)] shrink-0 md:h-41 md:w-37.5',
  },
} as const

const { t } = useI18n()

const number = sectionNumber('stack')

const track = useTemplateRef('track')
const viewport = useTemplateRef('viewport')

const isExpanded = ref(false)
const layout = computed(() => LAYOUTS[isExpanded.value ? 'grid' : 'carousel'])
const toggleLabel = computed(() => (isExpanded.value ? t('stack.collapse') : t('stack.showAll')))

const {
  activeFilter,
  filteredItems: filteredTechnologies,
  counts,
} = useCategoryFilter(TECHNOLOGIES, TECH_CATEGORIES)

const tiles = computed(() =>
  filteredTechnologies.value.map((tech) => ({
    ...tech,
    logoStyle: { '--logo': `url(${tech.logo})` },
  })),
)

const { scrollPrev, scrollNext, scrollToStart } = useHorizontalScroll(track)
const { run: transitionLayout } = useLayoutTransition(viewport)

const setFilter = (filter: TechFilter) => {
  if (filter === activeFilter.value) return
  transitionLayout(() => {
    activeFilter.value = filter
    scrollToStart()
  })
}

const toggleExpanded = () =>
  transitionLayout(() => {
    isExpanded.value = !isExpanded.value
  })
</script>

<template>
  <section
    id="stack"
    class="relative overflow-hidden bg-base py-18 md:py-28"
    aria-labelledby="stack-title">
    <SectionStackOrbits />
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
          <BaseEyebrow
            data-reveal
            :number="number">
            {{ t('nav.stack') }}
          </BaseEyebrow>
          <h2
            id="stack-title"
            data-reveal="chars"
            class="text-[1.75rem]/[1.15] font-semibold tracking-[-0.02em] text-fg md:text-[2.375rem]/[1.15]">
            <BaseSplitText :text="t('stack.title')" />
          </h2>
        </div>
        <div
          v-if="!isExpanded"
          data-reveal="fade"
          class="flex gap-2 md:gap-3">
          <BaseIconButton
            size="lg"
            :label="t('stack.previous')"
            @click="scrollPrev">
            <BaseIcon
              name="chevron-left"
              class="size-5"
              aria-hidden="true" />
          </BaseIconButton>
          <BaseIconButton
            size="lg"
            :label="t('stack.next')"
            @click="scrollNext">
            <BaseIcon
              name="chevron-right"
              class="size-5"
              aria-hidden="true" />
          </BaseIconButton>
        </div>
      </div>

      <SectionStackFilters
        data-reveal
        :model-value="activeFilter"
        class="mb-5.5 md:mb-7"
        :counts="counts"
        @update:model-value="setFilter" />

      <div ref="viewport">
        <ul
          id="stack-list"
          ref="track"
          tabindex="0"
          class="m-0 list-none"
          :class="layout.track"
          :aria-label="t('stack.listLabel')">
          <BaseCard
            v-for="tech in tiles"
            :key="tech.id"
            data-reveal="scale"
            as="li"
            class="rounded-[1.125rem]"
            :class="layout.tile">
            <a
              :href="tech.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex size-full flex-col items-center justify-center gap-3 rounded-[inherit] px-2.5 text-center text-sm font-semibold text-fg md:gap-4 md:text-ui">
              <span
                v-if="tech.isMono"
                class="size-10 bg-current [mask-image:var(--logo)] mask-contain mask-center mask-no-repeat transition-transform duration-700 ease-spring group-hover/card:-translate-y-1 group-hover/card:scale-110 md:size-12"
                :class="tech.color"
                :style="tech.logoStyle"
                aria-hidden="true" />
              <img
                v-else
                :src="tech.logo"
                alt=""
                width="48"
                height="48"
                loading="lazy"
                class="size-10 object-contain transition-transform duration-700 ease-spring group-hover/card:-translate-y-1 group-hover/card:scale-110 md:size-12" />
              {{ tech.name }}
              <span class="sr-only">{{ t('common.newTab') }}</span>
            </a>
          </BaseCard>
        </ul>
      </div>

      <div
        data-reveal="fade"
        class="mt-6.5 flex justify-center md:mt-9">
        <BaseButton
          variant="ghost"
          size="sm"
          aria-controls="stack-list"
          data-umami-event="stack-toggle"
          :aria-expanded="isExpanded"
          @click="toggleExpanded">
          {{ toggleLabel }}
          <BaseIcon
            v-if="isExpanded"
            name="chevron-up"
            class="size-5"
            aria-hidden="true" />
          <BaseIcon
            v-else
            name="arrow-right"
            class="size-5"
            aria-hidden="true" />
        </BaseButton>
      </div>
    </div>
  </section>
</template>
