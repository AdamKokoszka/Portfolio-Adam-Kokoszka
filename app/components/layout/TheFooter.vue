<script setup lang="ts">
import { SITE_DOMAIN } from '~/data/contact'

const { t } = useI18n()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-sunken pb-8">
    <div
      class="container grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 border-t border-line pt-6 text-[0.8125rem] text-fg-soft md:flex md:justify-between md:gap-6 md:pt-7 md:text-sm">
      <div class="contents md:flex md:items-center md:gap-4.5">
        <p class="col-start-1 row-start-1 text-[0.9375rem] font-bold text-fg">
          {{ t('brand.name') }}
        </p>
        <p class="col-start-1 row-start-2">{{ t('footer.copyright', { year }) }}</p>
      </div>
      <div class="contents md:flex md:items-center md:gap-5.5">
        <a
          :href="SITE_DOMAIN.href"
          class="col-start-1 row-start-3 justify-self-start font-semibold text-fg transition-colors duration-400 ease-smooth hover:text-accent-fg">
          {{ SITE_DOMAIN.label }}
        </a>
        <a
          href="#top"
          class="col-start-2 row-span-3 row-start-1 inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-accent-line text-fg transition-colors duration-400 ease-smooth hover:border-accent hover:text-accent-fg"
          :aria-label="t('footer.backToTop')"
          :title="t('footer.backToTop')">
          <Icon
            name="ic:arrow-up"
            class="size-4.5"
            aria-hidden="true" />
        </a>
      </div>
    </div>
  </footer>
</template>
