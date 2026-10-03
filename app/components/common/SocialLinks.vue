<script setup lang="ts">
import type { SocialLinksProps } from '~/types/common'
import { SOCIAL_LINKS } from '~/data/socials'

defineProps<SocialLinksProps>()

const { t } = useI18n()

const links = SOCIAL_LINKS.map((link) => ({ ...link, event: `social-${link.id}` }))
</script>

<template>
  <ul class="flex flex-wrap items-center gap-6 md:gap-7">
    <li
      v-for="link in links"
      :key="link.id">
      <a
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
        :data-umami-event="link.event"
        :data-umami-event-placement="placement"
        class="inline-flex min-h-11 items-center gap-2.5 text-ui font-semibold text-fg transition-colors duration-400 ease-smooth hover:text-accent-fg">
        <BaseIcon
          :name="link.icon"
          class="size-5.5"
          aria-hidden="true" />
        {{ t(`social.${link.id}`) }}
        <span class="sr-only">{{ t('common.newTab') }}</span>
      </a>
    </li>
  </ul>
</template>
