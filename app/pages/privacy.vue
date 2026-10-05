<script setup lang="ts">
import { CONTACT_EMAIL } from '~/data/contact'
import type { PrivacySection } from '~/types/privacy'

definePageMeta({
  i18n: {
    paths: {
      pl: '/polityka-prywatnosci',
      en: '/privacy-policy',
    },
  },
})

const { t, tm } = useI18n()
const localePath = useLocalePath()

const SEPARATOR = ' - '

const emailHref = `mailto:${CONTACT_EMAIL}`
const homePath = computed(() => localePath('/'))

const sections = computed(() =>
  (tm('privacy.sections') as PrivacySection[]).map((section, index) => ({
    id: `privacy-section-${index}`,
    titleKey: `privacy.sections.${index}.title`,
    items: (section.items ?? []).map((_, itemIndex) => ({
      labelKey: `privacy.sections.${index}.items.${itemIndex}.label`,
      textKey: `privacy.sections.${index}.items.${itemIndex}.text`,
    })),
    paragraphKeys: section.paragraphs.map(
      (_, paragraphIndex) => `privacy.sections.${index}.paragraphs.${paragraphIndex}`,
    ),
  })),
)

useSeoMeta({
  title: () => t('privacy.metaTitle'),
  description: () => t('privacy.metaDescription'),
  robots: 'noindex, follow',
})
</script>

<template>
  <main
    class="bg-base pt-16 md:pt-21"
    aria-labelledby="privacy-title">
    <article class="container max-w-190 py-14 md:py-22">
      <NuxtLink
        :to="homePath"
        class="inline-flex items-center gap-1.5 text-ui font-medium text-fg-muted transition-colors duration-400 ease-smooth hover:text-accent-fg">
        <BaseIcon
          name="chevron-left"
          class="size-4.5"
          aria-hidden="true" />
        {{ t('privacy.backHome') }}
      </NuxtLink>
      <h1
        id="privacy-title"
        class="mt-8 text-3xl/[1.15] font-semibold tracking-[-0.025em] text-fg md:text-[2.75rem]/[1.15]">
        {{ t('privacy.title') }}
      </h1>
      <p class="mt-3 text-caption text-fg-soft md:text-sm">{{ t('privacy.updated') }}</p>

      <section
        v-for="section in sections"
        :key="section.id"
        class="mt-10 md:mt-12"
        :aria-labelledby="section.id">
        <h2
          :id="section.id"
          class="text-xl font-semibold tracking-[-0.015em] text-fg md:text-2xl">
          {{ t(section.titleKey) }}
        </h2>
        <ul
          v-if="section.items.length"
          class="mt-3.5 space-y-3.5">
          <li
            v-for="item in section.items"
            :key="item.labelKey"
            class="text-[1rem]/[1.75] text-fg-muted">
            <strong class="font-semibold text-fg">{{ t(item.labelKey) }}</strong>
            {{ SEPARATOR }}{{ t(item.textKey) }}
          </li>
        </ul>
        <I18nT
          v-for="paragraphKey in section.paragraphKeys"
          :key="paragraphKey"
          :keypath="paragraphKey"
          tag="p"
          scope="global"
          class="mt-3.5 text-[1rem]/[1.75] text-fg-muted">
          <template #email>
            <a
              :href="emailHref"
              class="font-semibold text-accent-fg underline-offset-4 hover:underline">
              {{ CONTACT_EMAIL }}
            </a>
          </template>
        </I18nT>
      </section>
    </article>
  </main>
</template>
