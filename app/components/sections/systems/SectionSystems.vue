<script setup lang="ts">
import { FEATURED_SYSTEM, PRORMS_SYSTEMS } from '~/data/systems'

const { t } = useI18n()

const number = sectionNumber('systems')
</script>

<template>
  <section
    id="systems"
    class="theme-ink relative overflow-hidden bg-ink pt-18 pb-12 md:pt-30 md:pb-32"
    aria-labelledby="systems-title">
    <div
      class="pointer-events-none absolute -bottom-65 left-1/2 h-130 w-300 -translate-x-1/2 rounded-full bg-peach-glow"
      aria-hidden="true" />
    <div
      class="pointer-events-none absolute top-14 left-[3%] size-24 bg-dots [mask-image:linear-gradient(135deg,#000_30%,transparent_90%)] md:size-40"
      aria-hidden="true" />
    <BaseGhostNumber :number="number" />
    <BaseWaves
      class="pointer-events-none absolute bottom-0 left-0 h-65 w-full text-peach"
      :width="1440"
      :height="260"
      :lines="8" />

    <div
      v-reveal
      class="relative z-10 container">
      <div class="mb-7 md:mb-12">
        <BaseEyebrow
          data-reveal
          tone="peach"
          :number="number">
          {{ t('systems.eyebrow') }}
        </BaseEyebrow>
        <h2
          id="systems-title"
          data-reveal="soft"
          class="text-[1.75rem]/[1.15] font-semibold tracking-[-0.02em] text-white md:text-[2.375rem]/[1.15]">
          {{ t('systems.title') }}
        </h2>
      </div>

      <div class="grid gap-4 md:gap-5.5">
        <SectionSystemsCard
          :system="FEATURED_SYSTEM"
          variant="featured"
          data-reveal="sharpen" />

        <p
          data-reveal="fade"
          class="mt-2 flex items-center gap-2.5 text-[0.78rem] font-semibold tracking-[0.02em] text-ink-soft before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10 md:mt-4 md:gap-3 md:text-sm">
          <BaseIcon
            name="link"
            class="size-4 text-peach-fg"
            aria-hidden="true" />
          {{ t('systems.ecosystem') }}
        </p>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5.5">
          <SectionSystemsCard
            v-for="system in PRORMS_SYSTEMS"
            :key="system.id"
            :system="system"
            data-reveal="sharpen" />
        </div>
      </div>

      <p
        data-reveal="fade"
        class="mt-4 text-right text-xs text-ink-soft">
        {{ t('systems.illustrative') }}
      </p>
    </div>
  </section>
</template>
