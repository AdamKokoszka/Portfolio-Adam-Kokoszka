<script setup lang="ts">
const { t } = useI18n()

const number = sectionNumber('contact')

const flightStyle = {
  '--flight-path': "path('M4 112c40-6 70-30 96-52s60-40 100-34c8 0 16-4 25-12')",
}
</script>

<template>
  <section
    id="contact"
    class="relative overflow-hidden bg-sunken pt-18 pb-14 md:pt-26 md:pb-22"
    aria-labelledby="contact-title">
    <div
      class="pointer-events-none absolute bottom-14 -left-6 size-24 bg-dots md:size-40"
      aria-hidden="true" />
    <BaseGhostNumber :number="number" />

    <div
      v-reveal
      class="relative z-10 container">
      <div
        data-reveal="scale"
        class="relative isolate overflow-hidden rounded-3xl px-5 pt-8 pb-7 shadow-panel panel-surface md:rounded-[2rem] md:px-15 md:py-16">
        <div
          class="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true">
          <div class="absolute -top-60 -right-40 size-155 rounded-full bg-glow" />
          <div
            class="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_45%_70%_at_88%_12%,#000,transparent_70%)]" />
          <BaseWaves
            class="absolute -bottom-5 left-[48%] h-55 w-[52%] text-accent"
            :width="1040"
            :height="220"
            :spread="13" />
        </div>

        <svg
          class="pointer-events-none absolute top-3.5 right-3 h-14.5 w-30 overflow-visible text-accent-fg opacity-70 md:top-7.5 md:right-12 md:h-27.5 md:w-57.5 md:opacity-100"
          viewBox="0 0 250 120"
          fill="none"
          aria-hidden="true">
          <path
            d="M4 112c40-6 70-30 96-52s60-40 100-34"
            stroke="currentColor"
            stroke-opacity=".5"
            stroke-width="1.6"
            stroke-dasharray="4 7"
            stroke-linecap="round" />
          <g
            class="[offset-distance:100%] [offset-path:var(--flight-path)] [offset-rotate:auto]"
            :style="flightStyle"
            data-reveal="flight"
            data-reveal-delay="500">
            <g class="origin-center animate-glide [transform-box:fill-box]">
              <path
                d="M-17-11 21 0-17 11-8 0Z"
                fill="currentColor"
                fill-opacity=".18"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round" />
              <path
                d="M-8 0h29"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round" />
            </g>
          </g>
        </svg>

        <div
          class="grid grid-cols-1 items-center gap-7 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,27.5rem)] lg:gap-16">
          <div>
            <BaseEyebrow
              data-reveal
              :number="number">
              {{ t('nav.contact') }}
            </BaseEyebrow>
            <h2
              id="contact-title"
              data-reveal="chars"
              class="text-[2.125rem]/[1.08] font-semibold tracking-[-0.03em] whitespace-pre-line text-fg md:text-[3.25rem]/[1.08]">
              <BaseSplitText :text="t('contact.title')" />
            </h2>
            <p
              data-reveal
              class="mt-4 max-w-107.5 text-base/[1.7] text-fg-muted md:mt-5 md:text-lg/[1.75]">
              {{ t('contact.lead') }}
            </p>

            <div
              class="relative mt-5.5 pb-7.5 font-hand text-[1.5625rem]/[1.05] text-accent-fg md:mt-7.5 md:flex md:items-end md:gap-2.5 md:pb-0 md:text-3xl/[1.05]"
              aria-hidden="true">
              <p
                data-reveal="fade"
                class="-rotate-4 whitespace-pre-line">
                {{ t('contact.note') }}
              </p>
              <svg
                class="absolute -bottom-3.5 left-37.5 h-10 w-15.5 -scale-y-100 -rotate-8 md:static md:-mb-3 md:h-14 md:w-24 md:scale-y-100 md:rotate-0"
                viewBox="0 0 96 56"
                fill="none">
                <path
                  d="M4 40c30 12 62 6 84-26"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  pathLength="1"
                  stroke-dasharray="1"
                  data-reveal="draw"
                  data-reveal-delay="300" />
                <path
                  d="M76 14h12v12"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  pathLength="1"
                  stroke-dasharray="1"
                  data-reveal="draw"
                  data-reveal-delay="1000" />
              </svg>
            </div>
          </div>

          <SectionContactCard data-reveal />
        </div>
      </div>
    </div>
  </section>
</template>
