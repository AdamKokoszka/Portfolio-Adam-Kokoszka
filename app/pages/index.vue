<script setup lang="ts">
import { SECTION_IDS } from '~/data/navigation'

const { t } = useI18n()

const PLACEHOLDER_SECTION_IDS = SECTION_IDS.filter((id) => !['about', 'experience'].includes(id))

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
})
</script>

<template>
  <main>
    <SectionHero />
    <SectionAbout />
    <SectionExperience />
    <section
      v-for="(id, index) in PLACEHOLDER_SECTION_IDS"
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
