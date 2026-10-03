<script setup lang="ts">
const head = useLocaleHead()

useAnalytics()

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs.lang },
  link: head.value.link,
  meta: head.value.meta,
}))
</script>

<template>
  <div
    id="top"
    class="min-h-dvh">
    <div
      class="fixed inset-x-0 top-0 z-60 scroll-progress h-0.5 bg-accent"
      aria-hidden="true" />
    <TheHeader />
    <slot />
    <TheFooter />
  </div>
</template>
