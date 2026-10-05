<script setup lang="ts">
import type { SectionSystemsCardProps, SystemCardVariant } from '~/types/systems'

const props = withDefaults(defineProps<SectionSystemsCardProps>(), {
  variant: 'compact',
})

const VARIANTS = {
  featured: {
    root: 'h-105 md:h-110',
    image: 'object-[62%_50%] md:object-[60%_50%]',
    sizes: 'xs:100vw sm:100vw md:100vw lg:1160px',
    shade:
      'bg-linear-to-b from-ink-shade/0 from-25% via-ink-shade/78 via-58% to-ink-shade/97 md:bg-linear-to-r md:from-ink-shade/96 md:from-0% md:via-ink-shade/86 md:via-30% md:to-ink-shade/0 md:to-80%',
    body: 'inset-x-5.5 bottom-6 md:inset-y-0 md:right-auto md:left-13 md:flex md:w-105 md:flex-col md:justify-center',
    title: 'text-2xl md:text-[2.125rem]',
    description: 'text-ui md:text-[1.0625rem]',
  },
  compact: {
    root: 'h-75 md:h-100',
    image: 'object-center',
    sizes: 'xs:100vw sm:100vw md:50vw lg:570px',
    shade: 'bg-linear-to-b from-ink-shade/0 from-35% via-ink-shade/72 via-68% to-ink-shade/96',
    body: 'inset-x-5 bottom-5.5 md:inset-x-8 md:bottom-7.5',
    title: 'text-[1.3125rem] md:text-[1.5625rem]',
    description: 'text-ui md:text-[1rem]',
  },
} satisfies Record<SystemCardVariant, Record<string, string>>

const { t } = useI18n()

const styles = computed(() => VARIANTS[props.variant])

const imageAttrs = computed(() => ({
  alt: t('systems.imageAlt', { title: t(`systems.items.${props.system.id}.title`) }),
  loading: 'lazy' as const,
  class: `absolute inset-0 size-full object-cover transition-transform duration-1200 ease-smooth group-hover/system:scale-[1.025] ${styles.value.image}`,
}))
</script>

<template>
  <article
    class="group/system beam-border relative overflow-hidden rounded-[1.375rem] border border-white/8 bg-ink-surface transition-colors duration-600 ease-smooth hover:border-peach-fg/22"
    :class="styles.root">
    <NuxtPicture
      :src="system.image"
      :sizes="styles.sizes"
      format="avif,webp"
      :quality="75"
      :img-attrs="imageAttrs" />
    <div
      class="pointer-events-none absolute inset-0"
      :class="styles.shade"
      aria-hidden="true" />

    <div
      class="absolute z-[2] in-[.is-revealed]:animate-caption-in"
      :class="styles.body">
      <span
        v-if="system.isCurrent"
        class="mb-3.5 inline-flex items-center gap-2 self-start rounded-full bg-peach px-3 py-1.25 text-micro font-bold tracking-[0.12em] text-on-peach uppercase shadow-badge md:mb-5.5 md:px-3.5 md:py-1.5 md:text-xs">
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
