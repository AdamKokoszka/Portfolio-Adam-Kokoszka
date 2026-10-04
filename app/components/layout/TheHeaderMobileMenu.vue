<script setup lang="ts">
import { SECTION_IDS } from '~/data/navigation'
import type { TheHeaderMobileMenuEmits, TheHeaderMobileMenuProps } from '~/types/layout'

const props = defineProps<TheHeaderMobileMenuProps>()

defineEmits<TheHeaderMobileMenuEmits>()

const { t } = useI18n()
const sectionHref = useSectionHref()

const items = computed(() =>
  SECTION_IDS.map((id) => ({
    id,
    href: sectionHref(id),
    number: sectionNumber(id),
    ariaCurrent: props.activeId === id ? ('location' as const) : undefined,
  })),
)

const panelClass = computed(() =>
  props.isScrolled ? 'top-[calc(100%+0.5rem)] md:top-[calc(100%+0.75rem)]' : 'top-full',
)
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-smooth"
    leave-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0">
    <div
      v-if="open"
      class="pointer-events-auto lg:hidden">
      <div
        class="fixed inset-0 bg-ink/60"
        aria-hidden="true"
        @click="$emit('close')" />

      <div
        class="absolute inset-x-0 border-b border-line bg-base shadow-card"
        :class="panelClass">
        <nav
          :aria-label="t('header.mobileNavLabel')"
          class="container flex flex-col pt-2 pb-5">
          <a
            v-for="{ id, href, number, ariaCurrent } in items"
            :key="id"
            :href="href"
            :aria-current="ariaCurrent"
            class="flex items-baseline gap-4 border-b border-line py-3.75 text-xl font-semibold tracking-[-0.01em] text-fg aria-[current=location]:text-accent-fg md:py-4 md:text-[1.375rem]"
            @click="$emit('close')">
            <span class="min-w-5.5 text-xs font-bold tracking-[0.14em] text-accent-fg">
              {{ number }}
            </span>
            {{ t(`nav.${id}`) }}
          </a>
          <LanguageSwitcher class="pt-4" />
        </nav>
      </div>
    </div>
  </Transition>
</template>
