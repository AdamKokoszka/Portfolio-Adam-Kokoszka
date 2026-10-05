<script setup lang="ts">
import type { PortraitSource } from '~/types/hero'

const { t } = useI18n()
const img = useImage()

const PORTRAIT_SRC = '/images/adam-kokoszka.webp'
const PORTRAIT_WIDTH = 520
const PORTRAIT_HEIGHT = 650
const PORTRAIT_FORMATS = ['avif', 'webp'] as const

// Desktop gets a higher quality than phones, where the portrait is the LCP on slow networks.
const PORTRAIT_VARIANTS = [
  { media: DESKTOP_MEDIA_QUERY, sizes: '468px', quality: 80, densities: 'x1 x2' },
  { media: MOBILE_MEDIA_QUERY, sizes: '322px md:416px', quality: 70, densities: 'x1 x2 x3' },
] as const

const portraitSizes = (sizes: string, densities: string, quality: number, format: string) =>
  img.getSizes(PORTRAIT_SRC, {
    sizes,
    densities,
    modifiers: { format, quality, width: PORTRAIT_WIDTH, height: PORTRAIT_HEIGHT },
  })

const portraitSources: PortraitSource[] = PORTRAIT_VARIANTS.flatMap(
  ({ media, sizes, densities, quality }) =>
    PORTRAIT_FORMATS.map((format) => ({
      media,
      type: `image/${format}`,
      ...portraitSizes(sizes, densities, quality, format),
    })),
)

const [, MOBILE_VARIANT] = PORTRAIT_VARIANTS
const portraitFallback = portraitSizes(
  MOBILE_VARIANT.sizes,
  MOBILE_VARIANT.densities,
  MOBILE_VARIANT.quality,
  'webp',
)

const portraitAlt = computed(() => t('hero.photoAlt'))

useHead({
  link: portraitSources
    .filter((source) => source.type === 'image/avif')
    .map((source) => ({
      rel: 'preload',
      as: 'image',
      type: source.type,
      media: source.media,
      imagesrcset: source.srcset,
      imagesizes: source.sizes,
      fetchpriority: 'high',
    })),
})

const ORBIT_INNER_LENGTH = 1520
const orbitDrawStyle = { '--draw-length': ORBIT_INNER_LENGTH }

const ORBIT_INNER_PATH = "path('M 15 342 a 330 128 0 1 0 660 0 a 330 128 0 1 0 -660 0')"
const ORBIT_OUTER_PATH = "path('M 60 342 a 285 96 0 1 0 570 0 a 285 96 0 1 0 -570 0')"
</script>

<template>
  <div
    class="absolute top-0 left-0 h-150 w-125 [zoom:0.62] md:[zoom:0.8] lg:[zoom:0.9]"
    :style="{ '--orbit-inner': ORBIT_INNER_PATH, '--orbit-outer': ORBIT_OUTER_PATH }">
    <div
      class="absolute -top-3 -left-24 h-171.25 w-172.5 parallax-4 -rotate-18 text-accent"
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
          stroke-width="1.2"
          :stroke-dasharray="ORBIT_INNER_LENGTH"
          :style="orbitDrawStyle"
          class="animate-draw [animation-delay:600ms]" />
      </svg>
      <span
        class="absolute top-0 left-0 -mt-1.25 -ml-1.25 size-2.5 animate-orbit rounded-full bg-accent shadow-glow-accent [offset-path:var(--orbit-inner)] [offset-rotate:0deg]" />
      <span
        class="absolute top-0 left-0 -mt-0.75 -ml-0.75 size-1.5 animate-orbit rounded-full bg-accent-fg shadow-glow-accent-sm [animation-delay:-16s] [offset-path:var(--orbit-inner)] [offset-rotate:0deg]" />
    </div>

    <div
      class="absolute -top-3 -left-24 h-171.25 w-172.5 parallax-3 rotate-24 animate-fade text-accent [animation-delay:800ms]"
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
      class="absolute top-22.5 left-2.5 size-120 parallax-6 animate-pop rounded-full shadow-disc [animation-delay:250ms] bg-disc"
      aria-hidden="true">
      <i class="absolute -inset-8.5 rounded-full border border-line" />
      <i class="absolute -inset-16.5 rounded-full border border-dashed border-line" />
    </div>

    <p
      class="absolute top-2 -right-1 z-10 parallax-8 -rotate-8 animate-blur-in font-hand text-[2.4rem]/none font-semibold whitespace-pre-line text-accent-fg [animation-delay:1300ms] md:top-7.5 md:-right-27.5 md:text-4xl/none"
      aria-hidden="true">
      {{ t('hero.note') }}
    </p>

    <picture>
      <source
        v-for="source in portraitSources"
        :key="source.srcset"
        :media="source.media"
        :type="source.type"
        :srcset="source.srcset"
        :sizes="source.sizes" />
      <img
        :src="portraitFallback.src"
        :srcset="portraitFallback.srcset"
        :sizes="portraitFallback.sizes"
        :width="PORTRAIT_WIDTH"
        :height="PORTRAIT_HEIGHT"
        :alt="portraitAlt"
        loading="eager"
        fetchpriority="high"
        class="absolute -top-5 left-0 h-162.5 w-130 animate-portrait mask-portrait object-cover object-top [animation-delay:150ms]" />
    </picture>
  </div>
</template>
