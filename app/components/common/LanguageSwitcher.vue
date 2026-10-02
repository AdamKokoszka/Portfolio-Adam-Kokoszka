<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div
    role="group"
    :aria-label="t('language.label')"
    class="flex items-center text-sm font-bold">
    <template
      v-for="(item, index) in locales"
      :key="item.code">
      <span
        v-if="index > 0"
        class="text-fg-soft"
        aria-hidden="true">
        /
      </span>
      <NuxtLink
        :to="switchLocalePath(item.code)"
        :hreflang="item.language"
        :lang="item.language"
        :aria-current="item.code === locale ? 'true' : undefined"
        class="inline-flex h-11 items-center px-1.5 text-fg-soft uppercase transition-colors duration-400 ease-smooth hover:text-fg aria-[current=true]:text-accent-fg lg:h-10">
        {{ item.code }}
        <span class="sr-only">{{ item.name }}</span>
      </NuxtLink>
    </template>
  </div>
</template>
