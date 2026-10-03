<script setup lang="ts">
import type { BaseSplitTextProps } from '~/types/base'

const props = defineProps<BaseSplitTextProps>()

const SPACE = ' '

const lines = computed(() => {
  let charIndex = 0
  return props.text.split('\n').map((line) =>
    line
      .split(' ')
      .filter(Boolean)
      .map((word) => [...word].map((char) => ({ char, style: { '--char-index': charIndex++ } }))),
  )
})
</script>

<template>
  <span class="sr-only">{{ text }}</span>
  <span aria-hidden="true">
    <template
      v-for="(words, lineIndex) in lines"
      :key="lineIndex">
      <br v-if="lineIndex > 0" />
      <template
        v-for="(chars, wordIndex) in words"
        :key="wordIndex">
        <span class="inline-block whitespace-nowrap">
          <span
            v-for="(item, charIndex) in chars"
            :key="charIndex"
            class="inline-block in-[.is-revealed]:animate-reveal-char"
            :style="item.style"
            v-text="item.char" />
        </span>
        {{ SPACE }}
      </template>
    </template>
  </span>
</template>
