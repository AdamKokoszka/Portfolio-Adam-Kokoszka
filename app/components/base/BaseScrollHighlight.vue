<script setup lang="ts">
import type { BaseScrollHighlightProps } from '~/types/base'

const props = defineProps<BaseScrollHighlightProps>()

const SPACE = ' '

const words = computed(() =>
  props.text
    .split(' ')
    .filter(Boolean)
    .map((word, index) => ({ word, style: { '--word-index': index } })),
)

const rootStyle = computed(() => ({ '--word-count': words.value.length }))
</script>

<template>
  <span
    class="block scroll-highlight"
    :style="rootStyle">
    <template
      v-for="(item, index) in words"
      :key="index">
      <span
        class="scroll-highlight-word"
        :style="item.style"
        v-text="item.word" />
      {{ SPACE }}
    </template>
  </span>
</template>
