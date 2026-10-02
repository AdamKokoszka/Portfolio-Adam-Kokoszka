<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
})
</script>

<template>
  <main class="min-h-dvh bg-hero">
    <div class="container flex flex-col items-start gap-6 py-24">
      <ThemeToggle />
      <p class="text-fg-muted">{{ t('home.placeholder') }}</p>
    </div>
  </main>
</template>
