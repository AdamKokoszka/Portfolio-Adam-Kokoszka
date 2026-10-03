<script setup lang="ts">
import { FOCUS_WORDS } from '~/data/hero'
import type { SectionHeroEditorEmits, SectionHeroEditorProps } from '~/types/sections'

const props = defineProps<SectionHeroEditorProps>()

defineEmits<SectionHeroEditorEmits>()

const { t } = useI18n()

const editor = useTemplateRef('editor')
const canAnimate = useCanAnimate(editor)

const isActive = computed(() => !props.isPaused && canAnimate.value)

const pauseLabel = computed(() =>
  props.isPaused ? t('hero.editor.resume') : t('hero.editor.pause'),
)

const { text: focusText, isTyping } = useTypewriter(FOCUS_WORDS, isActive)

const QUOTE = "'"

const focusValue = computed(() => `${QUOTE}${focusText.value}`)

const caretClass = computed(() => (isTyping.value || !isActive.value ? '' : 'animate-blink'))

const LINES = [
  [
    { text: 'const', class: 'text-code-keyword' },
    { text: ' developer ', class: 'text-code-fg' },
    { text: '= {', class: 'text-code-punct' },
  ],
  [
    { text: '  name', class: 'text-code-prop' },
    { text: ': ', class: 'text-code-punct' },
    { text: "'Adam Kokoszka'", class: 'text-code-string' },
    { text: ',', class: 'text-code-punct' },
  ],
  [
    { text: '  focus', class: 'text-code-prop' },
    { text: ': ', class: 'text-code-punct' },
  ],
  [{ text: '};', class: 'text-code-punct' }],
] as const

const FOCUS_LINE_INDEX = 2
</script>

<template>
  <div
    ref="editor"
    class="w-[12.875rem] animate-float overflow-hidden rounded-xl font-mono text-[0.625rem]/[1.7] text-code-fg shadow-editor border-gradient-code md:w-75 md:rounded-[0.875rem] md:text-caption/[1.85]">
    <div
      class="flex h-7 items-center gap-2.5 border-b border-white/8 bg-code-bar pr-1 pl-3 text-[0.656rem] text-code-muted md:h-9 md:pl-3.5 md:text-xs">
      <span
        class="flex gap-1.5"
        aria-hidden="true">
        <i
          v-for="dot in 3"
          :key="dot"
          class="block size-2.25 rounded-full bg-code-dot" />
      </span>
      <span>{{ t('hero.editor.file') }}</span>
      <button
        type="button"
        class="ml-auto inline-flex size-7.5 cursor-pointer items-center justify-center rounded-lg text-code-punct transition-colors duration-400 ease-smooth hover:bg-white/6 hover:text-code-fg"
        :aria-label="pauseLabel"
        :title="pauseLabel"
        @click="$emit('togglePause')">
        <BaseIcon
          v-if="isPaused"
          name="play"
          class="size-3.25"
          aria-hidden="true" />
        <BaseIcon
          v-else
          name="pause"
          class="size-3.25"
          aria-hidden="true" />
      </button>
    </div>

    <div
      role="img"
      class="py-2 md:py-3"
      :aria-label="t('hero.editor.label')">
      <div
        v-for="(line, index) in LINES"
        :key="index"
        class="flex pr-3.5 whitespace-pre"
        aria-hidden="true">
        <span
          class="w-9 flex-none pr-3 text-right text-code-gutter select-none"
          v-text="index + 1" />
        <span
          v-for="token in line"
          :key="token.text"
          :class="token.class"
          v-text="token.text" />
        <template v-if="index === FOCUS_LINE_INDEX">
          <span
            class="text-code-string"
            v-text="focusValue" />
          <span
            class="mx-px inline-block h-[1.15em] w-0.5 bg-accent align-[-3px]"
            :class="caretClass" />
          <span
            class="text-code-string"
            v-text="QUOTE" />
        </template>
      </div>
    </div>
  </div>
</template>
