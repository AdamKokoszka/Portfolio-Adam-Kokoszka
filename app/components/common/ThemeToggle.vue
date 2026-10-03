<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed(() => colorMode.value !== 'light')
const label = computed(() => (isDark.value ? t('theme.toLight') : t('theme.toDark')))

const toggle = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <BaseIconButton
    :label="label"
    @click="toggle">
    <ColorScheme>
      <BaseIcon
        v-if="isDark"
        name="sun"
        class="size-[1.125rem]"
        aria-hidden="true" />
      <BaseIcon
        v-else
        name="moon"
        class="size-[1.125rem]"
        aria-hidden="true" />
      <template #placeholder>
        <BaseIcon
          name="sun"
          class="size-[1.125rem]"
          aria-hidden="true" />
      </template>
    </ColorScheme>
  </BaseIconButton>
</template>
