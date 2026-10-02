<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed(() => colorMode.value !== 'light')

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <BaseIconButton :label="isDark ? t('theme.toLight') : t('theme.toDark')" @click="toggle">
    <ColorScheme>
      <Icon v-if="isDark" name="ic:sun" class="size-[1.125rem]" aria-hidden="true" />
      <Icon v-else name="ic:moon" class="size-[1.125rem]" aria-hidden="true" />
      <template #placeholder>
        <Icon name="ic:sun" class="size-[1.125rem]" aria-hidden="true" />
      </template>
    </ColorScheme>
  </BaseIconButton>
</template>
