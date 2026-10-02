<script setup lang="ts">
import type { BaseIconButtonProps, IconButtonSize } from '~/types/base'

withDefaults(defineProps<BaseIconButtonProps>(), {
  size: 'md',
})

const SIZE_CLASSES = {
  md: 'size-11 border-line text-fg-muted hover:text-fg lg:size-10',
  lg: 'size-11 border-[1.5px] border-accent-line text-fg hover:border-accent hover:bg-accent-soft md:size-12.5',
} satisfies Record<IconButtonSize, string>
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :title="label"
    class="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors duration-400 ease-smooth hover:border-accent-line disabled:cursor-default disabled:opacity-40"
    :class="SIZE_CLASSES[size]">
    <slot />
  </button>
</template>
