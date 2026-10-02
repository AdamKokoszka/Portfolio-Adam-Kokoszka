<script setup lang="ts">
import type { SectionExperienceTimelineProps } from '~/types/experience'

const props = defineProps<SectionExperienceTimelineProps>()

const { t } = useI18n()

const items = computed(() =>
  props.roles.map((role, index) => ({
    id: role.id,
    period: formatPeriod(role.from, role.to, t('experience.present')),
    title: t(`experience.companies.${props.companyId}.roles.${role.id}`),
    isCurrent: role.to === null,
    hasConnector: index < props.roles.length - 1,
  })),
)
</script>

<template>
  <ul class="mt-5 pl-17.5 md:mt-6 md:pl-23">
    <li
      v-for="item in items"
      :key="item.id"
      class="relative pb-6 last:pb-0">
      <span
        v-if="item.hasConnector"
        class="absolute top-6.75 bottom-0.5 -left-10.75 w-0.5 rounded-xs bg-[linear-gradient(180deg,var(--c-warm),var(--c-warm-soft))] md:-left-14.25"
        aria-hidden="true" />
      <span
        v-if="item.isCurrent"
        class="absolute top-0.75 -left-12.75 z-10 size-4.5 rounded-full bg-warm md:-left-16.25"
        aria-hidden="true">
        <span class="absolute inset-0 animate-ping rounded-full bg-warm opacity-60" />
        <span class="absolute inset-0 m-auto size-1.25 rounded-full bg-white" />
      </span>
      <span
        v-else
        class="absolute top-0.75 -left-12.75 z-10 size-4.5 rounded-full border-2 border-warm bg-[radial-gradient(circle,var(--c-warm)_0_2.5px,var(--c-surface)_3px)] md:-left-16.25"
        aria-hidden="true" />

      <p class="text-xs font-bold tracking-[0.05em] text-fg-soft tabular-nums md:text-[0.8125rem]">
        {{ item.period }}
      </p>
      <p class="mt-0.75 font-semibold text-base/[1.45] text-fg md:text-[1.09375rem]/[1.45]">
        {{ item.title }}
      </p>
    </li>
  </ul>
</template>
