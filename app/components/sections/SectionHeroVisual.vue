<script setup lang="ts">
const { t } = useI18n()

const portraitAttrs = computed(() => ({
  alt: t('hero.photoAlt'),
  loading: 'eager' as const,
  fetchpriority: 'high' as const,
  class: 'absolute -top-4.5 -left-2.5 h-162.5 w-130 mask-portrait object-cover object-top',
}))

const ORBIT_INNER_PATH = "path('M 15 342 a 330 128 0 1 0 660 0 a 330 128 0 1 0 -660 0')"
const ORBIT_OUTER_PATH = "path('M 60 342 a 285 96 0 1 0 570 0 a 285 96 0 1 0 -570 0')"
</script>

<template>
  <div
    class="absolute top-0 left-0 h-150 w-125 [zoom:0.62] md:[zoom:0.8] lg:[zoom:0.9]"
    :style="{ '--orbit-inner': ORBIT_INNER_PATH, '--orbit-outer': ORBIT_OUTER_PATH }">
    <div
      class="absolute -top-3 -left-24 h-171.25 w-172.5 -rotate-18 text-accent"
      aria-hidden="true">
      <svg
        class="absolute inset-0 size-full overflow-visible"
        viewBox="0 0 690 685"
        fill="none">
        <ellipse
          cx="345"
          cy="342"
          rx="330"
          ry="128"
          stroke="currentColor"
          stroke-opacity=".28"
          stroke-width="1.2" />
      </svg>
      <span
        class="absolute top-0 left-0 -mt-1.25 -ml-1.25 size-2.5 animate-orbit rounded-full bg-accent shadow-glow-accent [offset-path:var(--orbit-inner)] [offset-rotate:0deg]" />
      <span
        class="absolute top-0 left-0 -mt-0.75 -ml-0.75 size-1.5 animate-orbit rounded-full bg-accent-fg shadow-glow-accent-sm [animation-delay:-16s] [offset-path:var(--orbit-inner)] [offset-rotate:0deg]" />
    </div>

    <div
      class="absolute -top-3 -left-24 h-171.25 w-172.5 rotate-24 text-accent"
      aria-hidden="true">
      <svg
        class="absolute inset-0 size-full overflow-visible"
        viewBox="0 0 690 685"
        fill="none">
        <ellipse
          cx="345"
          cy="342"
          rx="285"
          ry="96"
          stroke="currentColor"
          stroke-opacity=".18"
          stroke-dasharray="3 7" />
      </svg>
      <span
        class="absolute top-0 left-0 -mt-1 -ml-1 size-2 animate-orbit rounded-full bg-peach shadow-glow-peach [animation-direction:reverse] [animation-duration:44s] [offset-path:var(--orbit-outer)] [offset-rotate:0deg]" />
    </div>

    <div
      class="absolute -right-14 -bottom-6 size-37.5 bg-dots [mask-image:linear-gradient(315deg,#000_25%,transparent_85%)]"
      aria-hidden="true" />

    <div
      class="absolute top-22.5 left-2.5 size-120 rounded-full shadow-disc bg-disc"
      aria-hidden="true">
      <i class="absolute -inset-8.5 rounded-full border border-line" />
      <i class="absolute -inset-16.5 rounded-full border border-dashed border-line" />
    </div>

    <p
      class="absolute top-2 -right-1 z-10 -rotate-8 font-hand text-[2.4rem]/none font-semibold whitespace-pre-line text-accent-fg md:top-7.5 md:-right-27.5 md:text-4xl/none"
      aria-hidden="true">
      {{ t('hero.note') }}
    </p>

    <NuxtPicture
      src="/images/adam-kokoszka.webp"
      :width="520"
      :height="650"
      sizes="322px md:416px lg:468px"
      format="avif,webp"
      :img-attrs="portraitAttrs" />
  </div>
</template>
