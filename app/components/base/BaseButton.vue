<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'ghost'
  size?: 'md' | 'sm'
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

const VARIANT_CLASSES = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover',
  ghost: 'border-[1.5px] border-accent-line text-fg hover:border-accent hover:bg-accent-soft',
} as const

const SIZE_CLASSES = {
  md: 'h-13 px-6.5 text-[0.9375rem]',
  sm: 'h-11.5 px-6 text-sm',
} as const

const classes = computed(() => [VARIANT_CLASSES[props.variant], SIZE_CLASSES[props.size]])
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? undefined : 'button'"
    class="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-bold transition-colors duration-400 ease-smooth [&_svg]:size-5 [&_svg]:transition-transform [&_svg]:duration-400 [&_svg]:ease-smooth hover:[&_svg]:translate-x-0.75"
    :class="classes">
    <slot />
  </component>
</template>
