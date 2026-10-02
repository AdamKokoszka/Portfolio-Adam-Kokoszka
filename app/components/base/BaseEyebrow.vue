<script setup lang="ts">
import type { BaseEyebrowProps, EyebrowTone } from '~/types/base'

const props = withDefaults(defineProps<BaseEyebrowProps>(), {
  tone: 'accent',
})

const TONE_CLASSES = {
  accent: 'text-accent-fg',
  warm: 'text-warm-fg',
  peach: 'text-peach-fg',
} satisfies Record<EyebrowTone, string>

const label = computed(() => `${props.number} / `)
</script>

<template>
  <p
    class="mb-3 text-xs font-bold tracking-[0.16em] uppercase md:mb-4 md:text-[0.8125rem]"
    :class="TONE_CLASSES[tone]">
    <span v-text="label" />
    <slot />
  </p>
</template>
