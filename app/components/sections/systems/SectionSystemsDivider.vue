<script setup lang="ts">
import type { SectionSystemsDividerProps } from '~/types/systems'

defineProps<SectionSystemsDividerProps>()
</script>

<template>
  <p
    class="mt-2 flex items-center gap-2.5 text-[0.78rem] font-semibold tracking-[0.02em] text-ink-soft before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10 md:mt-4 md:gap-3 md:text-sm">
    <BaseIcon
      :name="icon"
      class="size-4"
      :class="iconClass"
      aria-hidden="true" />
    <slot />
  </p>
</template>
