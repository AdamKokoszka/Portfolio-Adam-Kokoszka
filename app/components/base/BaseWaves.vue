<script setup lang="ts">
import type { BaseWavesProps } from '~/types/base'

const props = withDefaults(defineProps<BaseWavesProps>(), {
  lines: 7,
  spread: 14,
})

const gradientId = useId()

const viewBox = computed(() => `0 0 ${props.width} ${props.height}`)
const stroke = computed(() => `url(#${gradientId})`)

const round = (value: number) => Math.round(value * 10) / 10

const paths = computed(() =>
  Array.from({ length: props.lines }, (_, index) => {
    const { width: w, height: h, spread } = props
    const offset = index * spread
    const y = round(h * 0.4 + offset)
    const control1 = round(y - h * 0.233 - offset * 0.3)
    const control2 = round(y + h * 0.21 + offset * 0.27)
    const smooth = round(y - h * 0.187 - offset * 0.24)
    const end = round(y + h * 0.047 + offset * 0.06)
    return `M-40 ${y} C ${0.22 * w} ${control1}, ${0.42 * w} ${control2}, ${0.6 * w} ${y} S ${0.92 * w} ${smooth}, ${w + 40} ${end}`
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
