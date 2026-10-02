<script setup lang="ts">
import { SECTION_IDS } from '~/data/navigation'

const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
})
</script>

<template>
  <main>
    <div class="min-h-dvh pt-16 bg-hero md:pt-21">
      <div class="container py-24">
        <p class="text-fg-muted">{{ t('home.placeholder') }}</p>
      </div>
    </div>
    <section
      v-for="(id, index) in SECTION_IDS"
      :id="id"
      :key="id"
      class="min-h-[80vh] border-t border-line py-28"
      :class="[index % 2 ? 'bg-alt' : 'bg-base', { 'theme-inverted': id === 'experience' }]">
      <div class="container">
        <h2 class="text-3xl font-semibold text-fg md:text-[2.375rem]">{{ t(`nav.${id}`) }}</h2>
      </div>
    </section>
  </main>
</template>
