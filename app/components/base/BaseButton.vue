<script setup lang="ts">
import type { BaseButtonProps, ButtonSize, ButtonVariant } from '~/types/base'

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  size: 'md',
})

const VARIANT_CLASSES = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover',
  ghost: 'border-[1.5px] border-accent-line text-fg hover:border-accent hover:bg-accent-soft',
} satisfies Record<ButtonVariant, string>

const SIZE_CLASSES = {
  md: 'h-13 px-6.5 text-ui',
  sm: 'h-11.5 px-6 text-sm',
} satisfies Record<ButtonSize, string>

const classes = computed(() => [VARIANT_CLASSES[props.variant], SIZE_CLASSES[props.size]])

const tag = computed(() => (props.href ? 'a' : 'button'))
const type = computed(() => (props.href ? undefined : 'button'))
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :type="type"
    class="inline-flex press cursor-pointer items-center justify-center gap-2.5 rounded-full font-bold duration-200 ease-smooth [&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-smooth hover:[&_svg]:translate-x-0.75"
    :class="classes">
    <slot />
  </component>
</template>
