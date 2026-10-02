<script setup lang="ts">
const { t } = useI18n()

const isPaused = ref(false)

const togglePause = () => {
  isPaused.value = !isPaused.value
}
</script>

<template>
  <section
    class="relative overflow-x-clip pt-16 bg-hero md:pt-21"
    :class="{ 'animations-paused': isPaused }"
    aria-labelledby="hero-name">
    <div
      class="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true">
      <div
        class="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_70%_30%_at_50%_452px,#000_12%,transparent_72%)] opacity-90 md:[mask-image:radial-gradient(ellipse_62%_30%_at_50%_800px,#000_12%,transparent_72%)] lg:[mask-image:radial-gradient(ellipse_52%_58%_at_72%_46%,#000_12%,transparent_72%)]" />
      <div
        class="absolute top-25 -right-42.5 size-130 rounded-full bg-[radial-gradient(circle,var(--c-glow),transparent_64%)] md:top-107.5 md:-right-15 md:size-190 lg:top-10" />
      <div
        class="absolute top-47.5 -right-6 hidden font-mono text-[18.75rem]/none tracking-[-0.08em] text-outline select-none before:content-['{_}'] md:top-140 md:right-[4%] md:block md:text-[26.25rem] lg:top-27.5 lg:right-[2%] lg:text-[33.75rem]" />
    </div>

    <div
      class="relative container grid grid-cols-1 items-center pt-5.5 pb-16 md:pt-14 md:pb-30 lg:min-h-204 lg:grid-cols-2 lg:gap-12 lg:pt-12 lg:pb-28">
      <div class="contents lg:block">
        <p
          class="mb-4 inline-flex animate-enter items-center gap-2.5 justify-self-start rounded-full border border-line bg-accent-soft py-1.5 pr-3.5 pl-2.5 text-[0.6875rem] font-bold tracking-[0.16em] text-accent-fg uppercase md:mb-4.5 md:pr-4 md:pl-3 md:text-[0.78rem]">
          <span
            class="relative size-2 rounded-full bg-accent"
            aria-hidden="true">
            <span class="absolute inset-0 animate-ping rounded-full bg-accent" />
          </span>
          {{ t('hero.hello') }}
        </p>

        <h1
          id="hero-name"
          class="mt-1.5 text-[2.75rem]/none font-semibold tracking-[-0.04em] text-fg md:text-[4.875rem]/[0.98] md:tracking-[-0.045em]">
          <span class="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
            <span class="block animate-rise font-light opacity-82 [animation-delay:120ms]">
              {{ t('hero.firstName') }}
            </span>
          </span>
          <span class="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
            <span
              class="block animate-rise font-bold [animation-delay:240ms] after:ml-[0.06em] after:inline-block after:size-[0.16em] after:rounded-[0.04em] after:bg-accent after:content-['']">
              {{ t('hero.lastName') }}
            </span>
          </span>
        </h1>

        <I18nT
          keypath="hero.role"
          tag="p"
          scope="global"
          class="mt-3 animate-enter text-[1.1875rem] font-medium tracking-[-0.005em] text-fg/90 [animation-delay:170ms] md:mt-6 md:text-[1.4375rem]">
          <template #highlight>
            <mark class="bg-transparent px-[0.08em] text-inherit text-highlight">
              {{ t('hero.roleHighlight') }}
            </mark>
          </template>
        </I18nT>

        <I18nT
          keypath="hero.lead"
          tag="p"
          scope="global"
          class="order-2 mt-11 max-w-115 animate-enter text-base/[1.7] text-fg-muted [animation-delay:255ms] md:order-none md:mt-5.5 md:text-lg/[1.75]">
          <template #strong>
            <strong class="font-semibold text-fg">{{ t('hero.leadStrong') }}</strong>
          </template>
        </I18nT>

        <div
          class="order-2 mt-7 flex animate-enter flex-col gap-2.5 [animation-delay:340ms] md:mt-14 md:flex-row md:flex-wrap md:gap-3.5 lg:mt-9.5">
          <BaseButton href="#contact">
            {{ t('hero.ctaPrimary') }}
            <Icon
              name="ic:arrow-right"
              aria-hidden="true" />
          </BaseButton>
          <BaseButton
            href="#experience"
            variant="ghost">
            {{ t('hero.ctaSecondary') }}
          </BaseButton>
        </div>

        <SocialLinks class="order-2 mt-5.5 animate-enter [animation-delay:425ms] md:mt-9" />
      </div>

      <div
        class="relative order-1 mx-auto mt-1 h-93 w-77.5 animate-enter [animation-delay:255ms] md:mt-14 md:h-120 md:w-100 lg:order-none lg:mx-0 lg:-mt-6 lg:mr-7 lg:h-150 lg:w-125 lg:justify-self-end">
        <SectionHeroVisual />
        <SectionHeroEditor
          class="absolute -bottom-5.5 -left-1.5 z-10 md:-bottom-4.5 md:-left-10 lg:-bottom-3.5 lg:-left-26"
          :is-paused="isPaused"
          @toggle-pause="togglePause" />
      </div>
    </div>

    <a
      href="#about"
      class="absolute bottom-5.5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.6875rem] font-bold tracking-[0.24em] text-fg-muted uppercase transition-colors duration-400 ease-smooth hover:text-fg md:flex">
      <span
        class="relative block h-14 w-[1.5px] overflow-hidden rounded-xs bg-line"
        aria-hidden="true">
        <span
          class="absolute -top-6 left-0 h-6 w-full animate-cue rounded-xs bg-[linear-gradient(180deg,transparent,var(--c-accent))]" />
      </span>
      {{ t('hero.scroll') }}
    </a>
  </section>
</template>
