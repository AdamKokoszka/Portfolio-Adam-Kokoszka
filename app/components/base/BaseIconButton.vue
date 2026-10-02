<script setup lang="ts">
import type { BaseIconButtonProps } from '~/types/base'

defineProps<BaseIconButtonProps>()
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :title="label"
    class="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-fg-muted transition-colors duration-400 ease-smooth hover:border-accent-line hover:text-fg lg:size-10">
    <slot />
  </button>
</template>
