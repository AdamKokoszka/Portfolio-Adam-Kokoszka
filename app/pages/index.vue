<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({ title: () => t('meta.title') })
</script>

<template>
  <main>
    <p>{{ t('home.placeholder') }}</p>
  </main>
</template>
