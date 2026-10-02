<script setup lang="ts">
import type { BaseWavesProps } from '~/types/base'

const props = withDefaults(defineProps<BaseWavesProps>(), {
  lines: 7,
  spread: 14,
})

const gradientId = useId()

const viewBox = computed(() => `0 0 ${props.width} ${props.height}`)
const stroke = computed(() => `url(#${gradientId})`)

const paths = computed(() =>
  createWavePaths({
    width: props.width,
    height: props.height,
    lines: props.lines,
    spread: props.spread,
  }),
)
</script>

<template>
  <svg
    :viewBox="viewBox"
    preserveAspectRatio="none"
    fill="none"
    aria-hidden="true">
    <defs>
      <linearGradient
        :id="gradientId"
        x1="0"
        y1="0"
        x2="1"
        y2="0">
        <stop
          offset="0"
          stop-color="currentColor"
          stop-opacity="0" />
        <stop
          offset=".5"
          stop-color="currentColor"
          stop-opacity=".4" />
        <stop
          offset="1"
          stop-color="currentColor"
          stop-opacity="0" />
      </linearGradient>
    </defs>
    <g
      :stroke="stroke"
      stroke-width="1.1">
      <path
        v-for="(d, index) in paths"
        :key="index"
        :d="d" />
    </g>
  </svg>
</template>
