<script setup lang="ts">
import { CONTACT_EMAIL } from '~/data/contact'

const { t } = useI18n()

const mailto = `mailto:${CONTACT_EMAIL}`
</script>

<template>
  <BaseCard
    as="div"
    class="rounded-[1.125rem] px-4 pt-5 pb-4 shadow-card [--card-bg:var(--color-panel-card)] md:rounded-[1.375rem] md:p-7.5">
    <div
      class="grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3.5 md:flex md:items-start md:gap-4">
      <span
        class="col-start-1 row-start-1 flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent-fg md:size-12.5 md:rounded-[0.875rem]"
        aria-hidden="true">
        <BaseIcon
          name="mail"
          class="size-5" />
      </span>

      <div class="contents md:block md:min-w-0 md:flex-1">
        <p class="col-start-2 row-start-1 text-caption font-semibold text-fg-soft">
          {{ t('contact.emailLabel') }}
        </p>
        <div class="contents md:flex md:flex-wrap md:items-center md:gap-1">
          <a
            :href="mailto"
            data-umami-event="email-click"
            class="col-span-3 row-start-2 font-semibold whitespace-nowrap text-base/[1.3] text-fg transition-colors duration-400 ease-smooth hover:text-accent-fg md:text-[1.15625rem] md:wrap-anywhere md:whitespace-normal">
            {{ CONTACT_EMAIL }}
          </a>
          <CopyButton
            class="col-start-3 row-start-1"
            :text="CONTACT_EMAIL"
            :label="t('contact.copy')"
            data-umami-event="email-copy" />
        </div>
      </div>
    </div>

    <SocialLinks
      placement="contact"
      class="mt-4.5 border-t border-line pt-4 md:mt-5.5 md:pt-5" />
  </BaseCard>
</template>
