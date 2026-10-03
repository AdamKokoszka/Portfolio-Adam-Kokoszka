<script setup lang="ts">
import type { ErrorPageProps } from '~/types/common'

const props = defineProps<ErrorPageProps>()

const { t } = useI18n()
const localePath = useLocalePath()

const isNotFound = computed(() => props.error.statusCode === 404)
const statusCode = computed(() => String(props.error.statusCode))
const title = computed(() => (isNotFound.value ? t('error.notFoundTitle') : t('error.title')))
const description = computed(() =>
  isNotFound.value ? t('error.notFoundDescription') : t('error.description'),
)
const homePath = computed(() => localePath('/'))

useSeoMeta({
  title,
  robots: 'noindex, follow',
})
</script>

<template>
  <NuxtLayout>
    <main
      class="relative flex min-h-svh items-center overflow-hidden pt-16 bg-hero md:pt-21"
      aria-labelledby="error-title">
      <div
        class="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,#000_10%,transparent_72%)]"
        aria-hidden="true" />
      <div class="relative container py-20 text-center">
        <p
          class="text-[7.5rem]/none font-bold tracking-[-0.06em] text-outline select-none md:text-[13rem]"
          aria-hidden="true"
          v-text="statusCode" />
        <h1
          id="error-title"
          class="mt-4 text-3xl font-semibold tracking-[-0.02em] text-fg md:text-[2.375rem]">
          {{ title }}
        </h1>
        <p class="mx-auto mt-4 max-w-115 text-base/[1.7] text-fg-muted md:text-lg/[1.75]">
          {{ description }}
        </p>
        <BaseButton
          class="mt-9"
          :href="homePath">
          {{ t('error.backHome') }}
          <BaseIcon
            name="arrow-right"
            class="size-5"
            aria-hidden="true" />
        </BaseButton>
      </div>
    </main>
  </NuxtLayout>
</template>
