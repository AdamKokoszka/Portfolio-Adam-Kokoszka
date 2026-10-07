<script setup lang="ts">
import { SITE_DOMAIN } from '~/data/contact'

const { t } = useI18n()
const localePath = useLocalePath()

const year = new Date().getFullYear()
const privacyPath = computed(() => localePath('privacy'))
</script>

<template>
  <footer class="bg-sunken pb-8">
    <div
      class="container grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 border-t border-line pt-6 text-caption text-fg-soft md:flex md:justify-between md:gap-6 md:pt-7 md:text-sm">
      <div class="contents md:flex md:items-center md:gap-4.5">
        <p class="col-start-1 row-start-1 text-fg">
          <BaseIcon
            name="logo"
            class="aspect-logo h-7"
            aria-hidden="true" />
          <span class="sr-only">{{ t('brand.name') }}</span>
        </p>
        <p class="col-start-1 row-start-2">{{ t('footer.copyright', { year }) }}</p>
      </div>
      <div class="contents md:flex md:items-center md:gap-5.5">
        <a
          :href="SITE_DOMAIN.href"
          class="col-start-1 row-start-3 justify-self-start font-semibold text-fg transition-colors duration-400 ease-smooth hover:text-accent-fg">
          {{ SITE_DOMAIN.label }}
        </a>
        <NuxtLink
          :to="privacyPath"
          class="col-start-1 row-start-4 justify-self-start transition-colors duration-400 ease-smooth hover:text-fg">
          {{ t('footer.privacy') }}
        </NuxtLink>
        <a
          href="#top"
          class="col-start-2 row-span-4 row-start-1 inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-accent-line text-fg transition-colors duration-400 ease-smooth hover:border-accent hover:text-accent-fg"
          :aria-label="t('footer.backToTop')"
          :title="t('footer.backToTop')">
          <BaseIcon
            name="arrow-up"
            class="size-4.5"
            aria-hidden="true" />
        </a>
      </div>
    </div>
  </footer>
</template>
