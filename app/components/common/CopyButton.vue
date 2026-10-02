<script setup lang="ts">
import type { CopyButtonProps } from '~/types/common'

const props = defineProps<CopyButtonProps>()

const { t } = useI18n()

const { status, copy } = useCopyToClipboard()

const isCopied = computed(() => status.value === 'copied')

const feedback = computed(() => {
  if (status.value === 'copied') return t('copy.copied')
  if (status.value === 'error') return t('copy.failed')
  return ''
})

const copyText = () => copy(props.text)
</script>

<template>
  <span class="relative inline-flex">
    <BaseIconButton
      :class="{ 'text-success! hover:text-success!': isCopied }"
      :label="label"
      @click="copyText">
      <Icon
        v-if="isCopied"
        name="ic:check"
        class="size-4.5"
        aria-hidden="true" />
      <Icon
        v-else
        name="ic:copy"
        class="size-4.5"
        aria-hidden="true" />
    </BaseIconButton>

    <Transition
      enter-active-class="transition-[opacity,translate] duration-300 ease-smooth"
      leave-active-class="transition-[opacity,translate] duration-200"
      enter-from-class="translate-y-1 opacity-0"
      leave-to-class="translate-y-1 opacity-0">
      <span
        v-if="feedback"
        class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2.5 -translate-x-1/2 rounded-lg bg-fg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-surface shadow-card after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-fg"
        aria-hidden="true">
        {{ feedback }}
      </span>
    </Transition>

    <span
      class="sr-only"
      aria-live="polite">
      {{ feedback }}
    </span>
  </span>
</template>
