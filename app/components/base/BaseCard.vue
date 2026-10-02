<script setup lang="ts">
import type { BaseCardProps } from '~/types/base'

const props = withDefaults(defineProps<BaseCardProps>(), {
  isStrong: false,
  as: 'article',
})

const card = useTemplateRef<HTMLElement>('card')

usePointerCssVars(card)

const borderClass = computed(() => (props.isStrong ? 'border-gradient-strong' : 'border-gradient'))
</script>

<template>
  <component
    :is="as"
    ref="card"
    class="group/card relative transition-[translate,box-shadow] duration-700 ease-smooth hover:-translate-y-0.5 hover:shadow-card-hover"
    :class="borderClass">
    <span
      class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-600 ease-smooth bg-spotlight pointer-fine:group-hover/card:opacity-100"
      aria-hidden="true" />
    <div class="relative">
      <slot />
    </div>
  </component>
</template>
