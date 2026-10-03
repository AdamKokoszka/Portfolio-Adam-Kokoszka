<script setup lang="ts">
import type { BaseEyebrowProps, EyebrowTone } from '~/types/base'

const props = withDefaults(defineProps<BaseEyebrowProps>(), {
  tone: 'accent',
  as: 'p',
})

const TONE_CLASSES = {
  accent: 'text-accent-fg',
  warm: 'text-warm-fg',
  peach: 'text-peach-fg',
} satisfies Record<EyebrowTone, string>

const label = computed(() => `${props.number} / `)
</script>

<template>
  <component
    :is="as"
    class="mb-3 text-xs font-bold tracking-[0.16em] uppercase md:mb-4 md:text-caption"
    :class="TONE_CLASSES[tone]">
    <span
      class="before:content-[attr(data-label)]"
      :data-label="label"
      aria-hidden="true" />
    <slot />
  </component>
</template>
