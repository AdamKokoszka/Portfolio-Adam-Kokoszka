<script setup lang="ts">
import { SECTION_IDS, type SectionId } from '~/data/navigation'

defineProps<{
  open: boolean
  activeId: SectionId | null
  isScrolled: boolean
}>()

defineEmits<{
  close: []
}>()

const { t } = useI18n()
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-smooth"
    leave-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div v-if="open" class="pointer-events-auto lg:hidden">
      <div class="fixed inset-0 bg-ink/60" aria-hidden="true" @click="$emit('close')" />

      <div
        class="absolute inset-x-0 border-b border-line bg-base shadow-card"
        :class="isScrolled ? 'top-[calc(100%+0.5rem)] md:top-[calc(100%+0.75rem)]' : 'top-full'"
      >
        <nav :aria-label="t('header.mobileNavLabel')" class="container flex flex-col pt-2 pb-5">
          <a
            v-for="(id, index) in SECTION_IDS"
            :key="id"
            :href="`#${id}`"
            :aria-current="activeId === id ? 'location' : undefined"
            class="flex items-baseline gap-4 border-b border-line py-3.75 text-xl font-semibold tracking-[-0.01em] text-fg aria-[current=location]:text-accent-fg md:py-4 md:text-[1.375rem]"
            @click="$emit('close')"
          >
            <span class="min-w-5.5 text-xs font-bold tracking-[0.14em] text-accent-fg">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            {{ t(`nav.${id}`) }}
          </a>
          <LanguageSwitcher class="pt-4" />
        </nav>
      </div>
    </div>
  </Transition>
</template>
