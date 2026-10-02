<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed(() => colorMode.value !== 'light')
const label = computed(() => (isDark.value ? t('theme.toLight') : t('theme.toDark')))

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-fg-muted transition-colors duration-400 ease-smooth hover:border-accent-line hover:text-fg md:size-10"
    :aria-label="label"
    :title="label"
    @click="toggle"
  >
    <ColorScheme>
      <Icon :name="isDark ? 'ic:sun' : 'ic:moon'" class="size-[1.125rem]" aria-hidden="true" />
      <template #placeholder>
        <Icon name="ic:sun" class="size-[1.125rem]" aria-hidden="true" />
      </template>
    </ColorScheme>
  </button>
</template>
