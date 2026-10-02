<script setup lang="ts">
const { t } = useI18n()

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
    <SectionStack />
    <SectionSystems />
    <SectionContact />
  </main>
</template>
