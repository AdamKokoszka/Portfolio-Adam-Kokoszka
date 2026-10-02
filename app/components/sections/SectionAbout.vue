<script setup lang="ts">
const { t } = useI18n()

const number = sectionNumber('about')
</script>

<template>
  <section
    id="about"
    class="relative overflow-hidden border-t border-line bg-base py-18 md:py-28"
    aria-labelledby="about-title">
    <div
      class="pointer-events-none absolute bottom-14 -left-7 size-24 bg-dots md:size-40"
      aria-hidden="true" />
    <BaseGhostNumber :number="number" />

    <div
      v-reveal
      class="relative z-10 container grid grid-cols-1 items-center gap-5.5 md:gap-8 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1.25fr)] lg:gap-18">
      <div>
        <BaseEyebrow :number="number">
          {{ t('nav.about') }}
        </BaseEyebrow>
        <h2
          id="about-title"
          class="text-3xl/[1.15] font-semibold tracking-[-0.025em] text-fg md:text-[2.75rem]/[1.15]">
          {{ t('about.title') }}
        </h2>
        <svg
          class="mt-3.5 block h-5 w-35 text-accent md:mt-5.5 md:w-42.5"
          viewBox="0 0 170 20"
          fill="none"
          aria-hidden="true">
          <path
            d="M3 13C40 5 90 3 167 9"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round" />
        </svg>
      </div>

      <div
        class="hidden self-stretch bg-[linear-gradient(180deg,transparent,var(--c-accent-line)_20%,var(--c-line)_80%,transparent)] lg:block"
        aria-hidden="true" />

      <div class="space-y-5.5 text-base/[1.75] text-fg-muted md:text-lg/[1.8]">
        <p>{{ t('about.paragraph1') }}</p>
        <p>{{ t('about.paragraph2') }}</p>
      </div>
    </div>
  </section>
</template>
