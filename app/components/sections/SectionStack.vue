<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
import { TECHNOLOGIES } from '~/data/technologies'
import type { TechFilter } from '~/types/technologies'

const { t } = useI18n()

const number = sectionNumber('stack')

const activeFilter = ref<TechFilter>('all')
const isExpanded = ref(false)
const track = useTemplateRef('track')
const viewport = useTemplateRef('viewport')
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
    ? 'flex flex-wrap justify-center gap-3 -m-1 p-1 md:gap-4 lg:mx-auto lg:max-w-[calc(6*9.375rem+5*1rem+0.5rem)]'
    : 'flex snap-x snap-mandatory scroll-px-1 gap-4 overflow-x-auto [scrollbar-width:none] -mt-2 -ml-1 -mr-5 pt-2 pl-1 pr-5 pb-3 md:-mr-1 md:pr-1',
)

const tileClass = computed(() =>
  isExpanded.value
    ? 'h-31 w-[calc((100%-1.5rem)/3)] shrink-0 md:h-41 md:w-37.5'
    : 'h-34 w-31 shrink-0 snap-start md:h-41 md:w-37.5',
)

const HEIGHT_TRANSITION_CLASSES = [
  'overflow-hidden',
  'transition-[height]',
  'duration-[600ms]',
  'ease-smooth',
]

const FADE_DURATION = 200
const HEIGHT_DURATION = 600

const isListHidden = ref(false)

const switchLayout = async (update: () => void) => {
  const el = viewport.value
  if (!el || reducedMotion.value === 'reduce') return update()

  isListHidden.value = true
  await promiseTimeout(FADE_DURATION)

  const from = el.offsetHeight
  update()
  await nextTick()
  const to = el.offsetHeight

  el.style.height = `${from}px`
  el.classList.add(...HEIGHT_TRANSITION_CLASSES)
  el.getBoundingClientRect()
  el.style.height = `${to}px`
  isListHidden.value = false

  await promiseTimeout(HEIGHT_DURATION)
  el.style.height = ''
  el.classList.remove(...HEIGHT_TRANSITION_CLASSES)
}

const listClass = computed(() => [
  trackClass.value,
  isListHidden.value ? 'opacity-0 duration-200' : 'opacity-100 duration-500',
])

const setFilter = (filter: TechFilter) => {
  if (filter === activeFilter.value) return
  return switchLayout(() => {
    activeFilter.value = filter
    track.value?.scrollTo({ left: 0 })
  })
}

const ORBITS = [
  {
    size: 'size-71',
    duration: '[animation-duration:22s]',
    delays: ['[animation-delay:-4s]', '[animation-delay:-15s]'],
  },
  {
    size: 'size-100',
    duration: '[animation-duration:30s] [animation-direction:reverse]',
    delays: ['[animation-delay:-22s]', '[animation-delay:-7s]'],
  },
  {
    size: 'size-129',
    duration: '[animation-duration:38s]',
    delays: ['[animation-delay:-30s]', '[animation-delay:-11s]'],
  },
] as const

const ORBIT_DOT_CLASSES = [
  'size-2 bg-accent shadow-[0_0_10px_3px_rgb(97_150_255/0.45)]',
  'size-1.75 bg-peach shadow-[0_0_10px_3px_rgb(255_170_114/0.45)]',
] as const

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

const toggleExpanded = () =>
  switchLayout(() => {
    isExpanded.value = !isExpanded.value
  })
</script>

<template>
  <section
    id="stack"
    class="relative overflow-hidden bg-base py-18 md:py-28"
    aria-labelledby="stack-title">
    <div
      class="pointer-events-none absolute -bottom-50 -left-55 size-130 origin-bottom-left scale-60 text-accent md:scale-100"
      aria-hidden="true">
      <svg
        class="absolute inset-0 size-full"
        viewBox="0 0 520 520"
        fill="none">
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
      <span
        v-for="orbit in ORBITS"
        :key="orbit.size"
        class="absolute top-1/2 left-1/2 -translate-1/2 rounded-full"
        :class="orbit.size">
        <span
          v-for="(delay, index) in orbit.delays"
          :key="delay"
          class="absolute inset-0 animate-spin rounded-full"
          :class="[orbit.duration, delay]">
          <span
            class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 rounded-full"
            :class="ORBIT_DOT_CLASSES[index]" />
        </span>
      </span>
    </div>
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
        :model-value="activeFilter"
        class="mb-5.5 md:mb-7"
        :counts="COUNTS"
        @update:model-value="setFilter" />

      <div ref="viewport">
        <ul
          id="stack-list"
          ref="track"
          tabindex="0"
          class="m-0 list-none transition-opacity ease-smooth"
          :class="listClass"
          :aria-label="t('stack.listLabel')">
          <BaseCard
            v-for="tech in visibleTechnologies"
            :key="tech.id"
            as="li"
            class="rounded-[1.125rem]"
            :class="tileClass">
            <a
              :href="tech.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex size-full flex-col items-center justify-center gap-3 rounded-[inherit] px-2.5 text-center text-sm font-semibold text-fg md:gap-4 md:text-[0.9375rem]">
              <Icon
                :name="tech.icon"
                class="size-11.5 md:size-14"
                aria-hidden="true" />
              {{ tech.name }}
              <span class="sr-only">{{ t('common.newTab') }}</span>
            </a>
          </BaseCard>
        </ul>
      </div>

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
