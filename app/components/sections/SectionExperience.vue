<script setup lang="ts">
import { EDUCATION, EXPERIENCE } from '~/data/experience'

const { t } = useI18n()

const number = sectionNumber('experience')

const companies = computed(() =>
  EXPERIENCE.map((company) => {
    const [firstRole] = company.roles
    return {
      ...company,
      name: t(`experience.companies.${company.id}.name`),
      location: company.isFeatured ? t(`experience.companies.${company.id}.location`) : '',
      period: firstRole ? formatPeriod(firstRole.from, firstRole.to, t('experience.present')) : '',
      title: firstRole ? t(`experience.companies.${company.id}.roles.${firstRole.id}`) : '',
    }
  }),
)

const schools = computed(() =>
  EDUCATION.map((school) => ({
    ...school,
    name: t(`experience.schools.${school.id}.name`),
    degree: t(`experience.schools.${school.id}.degree`),
    period: formatPeriod(school.from, school.to, t('experience.present')),
  })),
)
</script>

<template>
  <section
    id="experience"
    class="theme-inverted relative overflow-hidden bg-alt py-18 md:py-28"
    aria-labelledby="experience-title">
    <div
      class="pointer-events-none absolute bottom-20 -left-7.5 size-24 bg-dots md:size-40"
      aria-hidden="true" />
    <BaseGhostNumber :number="number" />
    <BaseWaves
      class="pointer-events-none absolute -right-15 -bottom-10 h-75 w-225 text-fg"
      :width="900"
      :height="300" />

    <div
      v-reveal
      class="relative z-10 container">
      <BaseEyebrow
        id="experience-title"
        as="h2"
        tone="warm"
        :number="number">
        {{ t('experience.eyebrow') }}
      </BaseEyebrow>

      <div
        class="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-[minmax(0,1.3fr)_1px_minmax(0,1fr)] lg:gap-13">
        <div>
          <h3
            class="mb-4.5 flex items-center gap-3 text-[1.375rem] font-semibold tracking-[-0.01em] text-fg md:mb-6.5 md:text-[1.625rem]">
            <Icon
              name="ic:briefcase"
              class="size-5.5 text-warm md:size-6.5"
              aria-hidden="true" />
            {{ t('experience.work') }}
          </h3>

          <div class="flex flex-col gap-4.5">
            <BaseCard
              v-for="company in companies"
              :key="company.id"
              :is-strong="company.isFeatured"
              class="rounded-2xl px-4.5 py-5 md:rounded-[1.125rem] md:px-7 md:py-6.5">
              <div class="flex items-start gap-3.5 md:gap-5">
                <BaseLogoTile
                  :src="company.logo"
                  :alt="company.name"
                  :fit="company.logoFit" />
                <div v-if="company.isFeatured">
                  <p class="text-lg/[1.3] font-bold text-fg md:text-xl/[1.3]">
                    {{ company.name }}
                  </p>
                  <p class="mt-0.5 text-sm text-fg-soft">
                    {{ company.location }}
                  </p>
                </div>
                <div v-else>
                  <p
                    class="text-xs font-bold tracking-[0.05em] text-fg-soft tabular-nums md:text-[0.8125rem]">
                    {{ company.period }}
                  </p>
                  <p
                    class="mt-0.75 font-semibold text-base/[1.45] text-fg md:text-[1.09375rem]/[1.45]">
                    {{ company.title }}
                  </p>
                  <p class="mt-0.5 text-sm text-fg-soft">
                    {{ company.name }}
                  </p>
                </div>
              </div>
              <SectionExperienceTimeline
                v-if="company.isFeatured"
                :company-id="company.id"
                :roles="company.roles" />
            </BaseCard>
          </div>
        </div>

        <div
          class="hidden self-stretch bg-[linear-gradient(180deg,transparent,var(--c-warm)_20%,var(--c-line)_80%,transparent)] lg:block"
          aria-hidden="true" />

        <div>
          <h3
            class="mb-4.5 flex items-center gap-3 text-[1.375rem] font-semibold tracking-[-0.01em] text-fg md:mb-6.5 md:text-[1.625rem]">
            <Icon
              name="ic:graduation-cap"
              class="size-5.5 text-warm md:size-6.5"
              aria-hidden="true" />
            {{ t('experience.education') }}
          </h3>

          <div class="flex flex-col gap-4.5">
            <BaseCard
              v-for="school in schools"
              :key="school.id"
              class="rounded-2xl px-4.5 py-5 md:rounded-[1.125rem] md:px-7 md:py-6.5">
              <div class="flex items-start gap-3.5 md:gap-5">
                <BaseLogoTile
                  :src="school.logo"
                  :alt="school.name"
                  :fit="school.logoFit" />
                <div>
                  <p
                    class="text-xs font-bold tracking-[0.05em] text-fg-soft tabular-nums md:text-[0.8125rem]">
                    {{ school.period }}
                  </p>
                  <p
                    class="mt-0.75 font-semibold text-base/[1.45] text-fg md:text-[1.09375rem]/[1.45]">
                    {{ school.degree }}
                  </p>
                  <p class="mt-0.5 text-sm text-fg-soft">
                    {{ school.name }}
                  </p>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
