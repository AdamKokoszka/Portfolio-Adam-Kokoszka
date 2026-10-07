<script setup lang="ts">
import { SECTION_IDS } from '~/data/navigation'

const { t } = useI18n()
const sectionHref = useSectionHref()

const SCROLLED_OFFSET = 24

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > SCROLLED_OFFSET)

const { activeId } = useScrollSpy(SECTION_IDS)

const topHref = computed(() => sectionHref('top'))

const { logoClass, swap: playLogo, onAnimationEnd: onLogoAnimationEnd } = useLogoAnimation()

const navList = useTemplateRef('navList')

const { indicatorStyle, isVisible: isIndicatorVisible } = useSlidingIndicator(navList, activeId)

const indicatorClass = computed(() => (isIndicatorVisible.value ? 'opacity-100' : 'opacity-0'))

const navItems = computed(() =>
  SECTION_IDS.map((id) => ({
    id,
    href: sectionHref(id),
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
        :href="topHref"
        class="flex items-center text-fg"
        @click="playLogo"
        @animationend="onLogoAnimationEnd">
        <BaseIcon
          name="logo"
          class="aspect-logo h-8.5 md:h-10"
          :class="logoClass"
          aria-hidden="true" />
        <span class="sr-only">{{ t('brand.name') }}</span>
        <span class="sr-only">{{ t('header.backToTop') }}</span>
      </a>

      <nav
        :aria-label="t('header.navLabel')"
        class="flex items-center gap-7">
        <ul
          ref="navList"
          class="relative hidden gap-7.5 lg:flex">
          <li
            v-for="{ id, href, ariaCurrent } in navItems"
            :key="id">
            <a
              :href="href"
              :aria-current="ariaCurrent"
              class="relative block py-2 text-ui font-medium text-fg-muted transition-colors duration-200 ease-smooth after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 after:ease-smooth hover:text-fg hover:after:scale-x-100 aria-[current=location]:text-fg">
              {{ t(`nav.${id}`) }}
            </a>
          </li>
          <span
            class="pointer-events-none absolute bottom-0.5 left-0 h-0.5 w-(--indicator-w) translate-x-(--indicator-x) rounded-full bg-accent shadow-glow-accent-sm transition-[translate,width,opacity] duration-700 ease-spring"
            :class="indicatorClass"
            :style="indicatorStyle"
            aria-hidden="true" />
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
            <BaseIcon
              v-if="isMenuOpen"
              name="close"
              class="size-5"
              aria-hidden="true" />
            <BaseIcon
              v-else
              name="menu"
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
