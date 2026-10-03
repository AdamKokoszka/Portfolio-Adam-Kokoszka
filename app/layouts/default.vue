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
    <TheHeader />
    <slot />
    <TheFooter />
  </div>
</template>
