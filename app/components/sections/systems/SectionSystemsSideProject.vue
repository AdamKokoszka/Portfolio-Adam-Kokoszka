<script setup lang="ts">
import type { SectionSystemsSideProjectProps } from '~/types/systems'

const props = defineProps<SectionSystemsSideProjectProps>()

const { t, locale } = useI18n()

const key = computed(() => `systems.sideProject.${props.project.id}`)

const href = computed(() => props.project.href[locale.value])

const laptopAttrs = computed(() => ({
  alt: t(`${key.value}.laptopAlt`),
  width: props.project.laptop.width,
  height: props.project.laptop.height,
  loading: 'lazy' as const,
  class:
    'block h-auto w-full rounded-t-[0.25rem] rounded-b-[1px] lg:rounded-t-md lg:rounded-b-[2px]',
}))

const phoneAttrs = computed(() => ({
  alt: t(`${key.value}.phoneAlt`),
  width: props.project.phone.width,
  height: props.project.phone.height,
  loading: 'lazy' as const,
  class: 'block h-auto w-full rounded-[0.875rem] lg:rounded-3xl',
}))
</script>

<template>
  <article
    class="relative flex flex-col overflow-hidden rounded-[1.375rem] border border-white/8 transition-colors duration-600 ease-smooth bg-felt-glow hover:border-felt-fg/35 lg:block lg:h-110">
    <div
      class="relative aspect-[10/7] flex-none md:aspect-[2/1] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[62%]">
      <div
        class="absolute top-[7%] left-[4%] w-[76%] md:top-[8%] md:left-[10%] md:w-[56%] lg:top-7.5 lg:left-[7%] lg:w-135">
        <div
          class="rounded-t-[0.625rem] rounded-b-[3px] border border-b-0 border-white/16 bg-device p-1.25 lg:rounded-t-2xl lg:rounded-b-sm lg:p-2">
          <NuxtPicture
            :src="project.laptop.src[locale]"
            sizes="xs:280px md:400px lg:530px"
            format="avif,webp"
            :quality="80"
            :img-attrs="laptopAttrs" />
        </div>
        <div
          class="relative -mx-[8%] h-2.25 rounded-t-[2px] rounded-b-[9px] shadow-laptop bg-laptop-base lg:h-3.5 lg:rounded-b-[14px]"
          aria-hidden="true">
          <span
            class="absolute top-0 left-1/2 h-1.25 w-[16%] -translate-x-1/2 rounded-b-lg bg-device-notch" />
        </div>
      </div>
      <div
        class="absolute right-[5%] bottom-[4%] w-[27%] rounded-[1.125rem] border border-white/20 bg-device p-1 shadow-device md:right-[12%] md:w-[18%] lg:right-10 lg:bottom-6.5 lg:w-40 lg:rounded-[1.875rem] lg:p-1.5">
        <NuxtPicture
          :src="project.phone.src[locale]"
          sizes="xs:100px md:130px lg:150px"
          format="avif,webp"
          :quality="80"
          :img-attrs="phoneAttrs" />
      </div>
    </div>
    <div
      class="pointer-events-none absolute inset-0 bg-linear-to-b from-felt-shade/0 from-40% via-felt-shade/72 via-68% to-felt-shade/96 lg:bg-felt-fade"
      aria-hidden="true" />

    <div
      class="relative z-[2] flex flex-col px-5.5 pt-1 pb-6.5 in-[.is-revealed]:animate-caption-in md:px-8 md:pb-8 lg:absolute lg:inset-y-0 lg:left-13 lg:w-107.5 lg:justify-center lg:p-0">
      <div class="flex items-center gap-3 lg:gap-3.5">
        <img
          :src="project.mark"
          alt=""
          width="44"
          height="44"
          class="size-9 lg:size-11" />
        <h3
          class="text-2xl leading-[1.2] font-semibold tracking-[-0.02em] text-white lg:text-[2.125rem]">
          {{ t(`${key}.title`) }}
        </h3>
      </div>
      <p class="mt-2.5 text-ui leading-[1.6] text-ink-text lg:mt-3.5 lg:text-[1.0625rem]">
        {{ t(`${key}.description`) }}
      </p>
      <a
        :href="href"
        target="_blank"
        rel="noopener"
        data-umami-event="side-project-open"
        :data-umami-event-project="project.id"
        class="mt-5 inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-peach px-5.5 text-ui font-bold text-on-peach transition-colors duration-200 ease-smooth hover:bg-peach-hover md:self-start lg:mt-6.5">
        {{ t(`${key}.link`) }}
        <BaseIcon
          name="arrow-up-right"
          class="size-4.5"
          aria-hidden="true" />
        <span class="sr-only">{{ t('common.newTab') }}</span>
      </a>
    </div>
  </article>
</template>
