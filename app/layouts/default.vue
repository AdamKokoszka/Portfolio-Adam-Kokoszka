<script setup lang="ts">
const head = useLocaleHead()

useAnalytics()

const topSentinel = useTemplateRef('topSentinel')
const isAtTop = useElementVisibility(topSentinel, { initialValue: true })
const isScrolled = computed(() => !isAtTop.value)

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs.lang },
  link: head.value.link,
  meta: head.value.meta,
}))
</script>

<template>
  <div
    id="top"
    class="relative min-h-dvh">
    <div
      ref="topSentinel"
      class="pointer-events-none absolute inset-x-0 top-0 h-6"
      aria-hidden="true" />
    <div
      class="fixed inset-x-0 top-0 z-60 scroll-progress h-0.5 bg-accent"
      aria-hidden="true" />
    <TheHeader :is-scrolled="isScrolled" />
    <slot />
    <TheFooter />
  </div>
</template>
