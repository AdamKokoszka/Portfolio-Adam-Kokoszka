<script setup lang="ts">
import type { BaseIconProps } from '~/types/base'

const props = defineProps<BaseIconProps>()

const svg = computed(() => ICONS[props.name] ?? '')
</script>

<template>
  <!-- eslint-disable vue/no-v-html -- trusted SVG files bundled from app/assets/icons -->
  <span
    class="inline-flex shrink-0 [&>svg]:size-full"
    v-html="svg" />
  <!-- eslint-enable vue/no-v-html -->
</template>
