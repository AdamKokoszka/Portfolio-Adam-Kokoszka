<script setup lang="ts">
import { SOCIAL_LINKS } from '~/data/socials'

const { t } = useI18n()
</script>

<template>
  <ul class="flex flex-wrap items-center gap-6 md:gap-7">
    <li
      v-for="link in SOCIAL_LINKS"
      :key="link.id">
      <a
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] font-semibold text-fg transition-colors duration-400 ease-smooth hover:text-accent-fg">
        <Icon
          :name="link.icon"
          class="size-5.5"
          aria-hidden="true" />
        {{ t(`social.${link.id}`) }}
        <span class="sr-only">{{ t('common.newTab') }}</span>
      </a>
    </li>
  </ul>
</template>
