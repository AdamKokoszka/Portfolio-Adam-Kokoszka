<script setup lang="ts">
import type { BaseGhostNumberProps } from '~/types/base'

defineProps<BaseGhostNumberProps>()
</script>

<template>
  <span
    class="pointer-events-none absolute top-6 right-[3%] z-0 text-[7.375rem]/none font-bold tracking-[-0.06em] text-outline select-none md:text-[15rem]"
    aria-hidden="true"
    v-text="number" />
</template>
