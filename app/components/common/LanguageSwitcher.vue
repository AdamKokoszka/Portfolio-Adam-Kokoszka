<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const languages = computed(() =>
  locales.value.map((item) => ({
    ...item,
    path: switchLocalePath(item.code).split('#')[0],
    isCurrent: item.code === locale.value,
  })),
)
</script>

<template>
  <div
    role="group"
    :aria-label="t('language.label')"
    class="flex items-center text-sm font-bold">
    <template
      v-for="(item, index) in languages"
      :key="item.code">
      <span
        v-if="index > 0"
        class="text-fg-soft"
        aria-hidden="true">
        /
      </span>
      <NuxtLink
        :to="item.path"
        :hreflang="item.language"
        :lang="item.language"
        :aria-current="item.isCurrent ? 'true' : undefined"
        class="inline-flex h-11 items-center px-1.5 text-fg-soft uppercase transition-colors duration-400 ease-smooth hover:text-fg aria-[current=true]:text-accent-fg lg:h-10">
        {{ item.code }}
        <span class="sr-only">{{ item.name }}</span>
      </NuxtLink>
    </template>
  </div>
</template>
