<script setup lang="ts">
import type { LogoFit } from '~/types/experience'
import type { BaseLogoTileProps } from '~/types/base'

const props = withDefaults(defineProps<BaseLogoTileProps>(), {
  fit: 'padded',
})

const FIT_CLASSES = {
  tight: 'p-0.5',
  padded: 'p-1.75 md:p-2.25',
} satisfies Record<LogoFit, string>

const isVector = computed(() => props.src.endsWith('.svg'))
</script>

<template>
  <div
    class="flex size-14 shrink-0 items-center justify-center rounded-[0.875rem] border border-line bg-white shadow-[0_8px_18px_-12px_rgb(0_0_0/0.55)] md:size-18 md:rounded-2xl"
    :class="FIT_CLASSES[fit]">
    <img
      v-if="isVector"
      :src="src"
      :alt="alt"
      width="56"
      height="56"
      loading="lazy"
      class="max-h-full max-w-full object-contain" />
    <NuxtImg
      v-else
      :src="src"
      :alt="alt"
      width="72"
      densities="x1 x2"
      format="webp"
      loading="lazy"
      class="max-h-full max-w-full object-contain" />
  </div>
</template>
