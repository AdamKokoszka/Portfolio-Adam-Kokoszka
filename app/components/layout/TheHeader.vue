<script setup lang="ts">
import { SECTION_IDS } from '~/data/navigation'

const { t } = useI18n()

const SCROLLED_OFFSET = 24

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > SCROLLED_OFFSET)

const { activeId } = useScrollSpy(SECTION_IDS)

const navItems = computed(() =>
  SECTION_IDS.map((id) => ({
    id,
    ariaCurrent: activeId.value === id ? ('location' as const) : undefined,
  })),
)

const headerClass = computed(() =>
  isScrolled.value
    ? 'mt-2 h-14 rounded-full border border-line bg-header/90 pr-1.5 pl-4.5 shadow-card backdrop-blur-md md:mt-3 md:h-15.5 md:pr-2.5 md:pl-6.5'
    : 'h-16 border-b border-line md:h-21',
)

const menuButton = useTemplateRef('menuButton')

const {
  isOpen: isMenuOpen,
  toggle: toggleMenu,
  close: closeMenu,
} = useMobileMenu({
  closeAt: DESKTOP_MEDIA_QUERY,
  onEscape: () => menuButton.value?.$el.focus(),
})

const menuLabel = computed(() => (isMenuOpen.value ? t('header.closeMenu') : t('header.openMenu')))
</script>

<template>
  <div class="pointer-events-none sticky top-0 z-50 -mb-16 h-16 md:-mb-21 md:h-21">
    <header
      class="pointer-events-auto relative z-10 container flex items-center justify-between gap-3 transition-[height,margin,padding,border-radius,background-color,box-shadow] duration-500 ease-smooth md:gap-8"
      :class="headerClass">
      <a
        href="#top"
        class="flex flex-col leading-tight text-fg">
        <span class="block text-[1.1875rem] font-bold tracking-[-0.015em] md:text-[1.3125rem]">
          {{ t('brand.name') }}
        </span>
        <span
          v-if="!isScrolled"
          class="mt-0.5 block text-xs font-medium text-fg-soft md:text-caption">
          {{ t('brand.owner') }}
        </span>
        <span class="sr-only">{{ t('header.backToTop') }}</span>
      </a>

      <nav
        :aria-label="t('header.navLabel')"
        class="flex items-center gap-7">
        <ul class="hidden gap-7.5 lg:flex">
          <li
            v-for="{ id, ariaCurrent } in navItems"
            :key="id">
            <a
              :href="`#${id}`"
              :aria-current="ariaCurrent"
              class="relative block py-2 text-ui font-medium text-fg-muted transition-colors duration-400 ease-smooth after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-smooth hover:text-fg hover:after:scale-x-100 aria-[current=location]:text-fg aria-[current=location]:after:scale-x-100">
              {{ t(`nav.${id}`) }}
            </a>
          </li>
        </ul>

        <div class="flex items-center gap-2 lg:gap-2.5 lg:border-l lg:border-line lg:pl-6">
          <LanguageSwitcher class="hidden lg:flex" />
          <ThemeToggle />
          <BaseIconButton
            ref="menuButton"
            class="text-fg lg:hidden"
            :label="menuLabel"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu"
            @click="toggleMenu">
            <Icon
              v-if="isMenuOpen"
              name="ic:close"
              class="size-5"
              aria-hidden="true" />
            <Icon
              v-else
              name="ic:menu"
              class="size-5"
              aria-hidden="true" />
          </BaseIconButton>
        </div>
      </nav>
    </header>

    <TheHeaderMobileMenu
      id="mobile-menu"
      :open="isMenuOpen"
      :active-id="activeId"
      :is-scrolled="isScrolled"
      @close="closeMenu" />
  </div>
</template>
