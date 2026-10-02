<script setup lang="ts">
const ORBITS = [
  {
    size: 'size-71',
    timing: '[animation-duration:22s]',
    delays: ['[animation-delay:-4s]', '[animation-delay:-15s]'],
  },
  {
    size: 'size-100',
    timing: '[animation-duration:30s] [animation-direction:reverse]',
    delays: ['[animation-delay:-22s]', '[animation-delay:-7s]'],
  },
  {
    size: 'size-129',
    timing: '[animation-duration:38s]',
    delays: ['[animation-delay:-30s]', '[animation-delay:-11s]'],
  },
] as const

const DOT_CLASSES = [
  'size-2 bg-accent shadow-[0_0_10px_3px_rgb(97_150_255/0.45)]',
  'size-1.75 bg-peach shadow-[0_0_10px_3px_rgb(255_170_114/0.45)]',
] as const
</script>

<template>
  <div
    class="pointer-events-none absolute -bottom-50 -left-55 size-130 origin-bottom-left scale-60 text-accent md:scale-100"
    aria-hidden="true">
    <svg
      class="absolute inset-0 size-full"
      viewBox="0 0 520 520"
      fill="none">
      <circle
        cx="260"
        cy="260"
        r="258"
        stroke="currentColor"
        stroke-opacity=".10" />
      <circle
        cx="260"
        cy="260"
        r="200"
        stroke="currentColor"
        stroke-opacity=".14" />
      <circle
        cx="260"
        cy="260"
        r="142"
        stroke="currentColor"
        stroke-opacity=".18"
        stroke-dasharray="4 8" />
    </svg>
    <span
      v-for="orbit in ORBITS"
      :key="orbit.size"
      class="absolute top-1/2 left-1/2 -translate-1/2 rounded-full"
      :class="orbit.size">
      <span
        v-for="(delay, index) in orbit.delays"
        :key="delay"
        class="absolute inset-0 animate-spin rounded-full"
        :class="[orbit.timing, delay]">
        <span
          class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 rounded-full"
          :class="DOT_CLASSES[index]" />
      </span>
    </span>
  </div>
</template>
