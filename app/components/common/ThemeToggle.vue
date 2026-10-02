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
      <Icon
        v-if="isDark"
        name="ic:sun"
        class="size-[1.125rem]"
        aria-hidden="true" />
      <Icon
        v-else
        name="ic:moon"
        class="size-[1.125rem]"
        aria-hidden="true" />
      <template #placeholder>
        <Icon
          name="ic:sun"
          class="size-[1.125rem]"
          aria-hidden="true" />
      </template>
    </ColorScheme>
  </BaseIconButton>
</template>
