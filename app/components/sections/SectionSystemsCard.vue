<script setup lang="ts">
import type { SectionSystemsCardProps, SystemCardVariant } from '~/types/systems'

const props = withDefaults(defineProps<SectionSystemsCardProps>(), {
  variant: 'compact',
})

const VARIANTS = {
  featured: {
    root: 'h-105 md:h-110',
    image: 'object-[62%_50%] md:object-[60%_50%]',
    sizes: '100vw lg:1160px',
    shade:
      'bg-[linear-gradient(180deg,rgb(13_15_18/0)_25%,rgb(13_15_18/0.78)_58%,rgb(13_15_18/0.97)_100%)] md:bg-[linear-gradient(90deg,rgb(13_15_18/0.96)_0%,rgb(13_15_18/0.86)_30%,rgb(13_15_18/0.2)_62%,rgb(13_15_18/0)_80%)]',
    body: 'inset-x-5.5 bottom-6 md:inset-y-0 md:right-auto md:left-13 md:flex md:w-105 md:flex-col md:justify-center',
    title: 'text-2xl md:text-[2.125rem]',
    description: 'text-[0.9375rem] md:text-[1.0625rem]',
  },
  compact: {
    root: 'h-75 md:h-100',
    image: 'object-center',
    sizes: '100vw md:50vw lg:570px',
    shade:
      'bg-[linear-gradient(180deg,rgb(13_15_18/0)_35%,rgb(13_15_18/0.72)_68%,rgb(13_15_18/0.96)_100%)]',
    body: 'inset-x-5 bottom-5.5 md:inset-x-8 md:bottom-7.5',
    title: 'text-[1.3125rem] md:text-[1.5625rem]',
    description: 'text-[0.9375rem] md:text-base',
  },
} satisfies Record<SystemCardVariant, Record<string, string>>

const { t } = useI18n()

const styles = computed(() => VARIANTS[props.variant])
</script>

<template>
  <article
    class="group/system beam-border relative overflow-hidden rounded-[1.375rem] border border-white/8 bg-ink-surface transition-colors duration-[600ms] ease-smooth hover:border-peach-fg/22"
    :class="styles.root">
    <NuxtImg
      :src="system.image"
      :sizes="styles.sizes"
      format="webp"
      loading="lazy"
      alt=""
      class="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-smooth group-hover/system:scale-[1.025]"
      :class="styles.image" />
    <div
      class="pointer-events-none absolute inset-0"
      :class="styles.shade"
      aria-hidden="true" />

    <div
      class="absolute z-[2]"
      :class="styles.body">
      <span
        v-if="system.isCurrent"
        class="mb-3.5 inline-flex items-center gap-2 self-start rounded-full bg-peach px-3 py-1.25 text-[0.6875rem] font-bold tracking-[0.12em] text-on-peach uppercase shadow-[0_10px_26px_-12px_rgb(255_170_114/0.7)] md:mb-5.5 md:px-3.5 md:py-1.5 md:text-xs">
        <i
          class="block size-1.5 rounded-full bg-current"
          aria-hidden="true" />
        {{ t('systems.current') }}
      </span>
      <h3
        class="leading-[1.2] font-semibold tracking-[-0.02em] text-white"
        :class="styles.title">
        {{ t(`systems.items.${system.id}.title`) }}
      </h3>
      <p
        class="mt-2.5 leading-[1.6] text-ink-text"
        :class="styles.description">
        {{ t(`systems.items.${system.id}.description`) }}
      </p>
    </div>
  </article>
</template>
