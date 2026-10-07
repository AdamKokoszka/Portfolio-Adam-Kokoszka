const WAITING_CLASS = '[&_.logo-knob-on]:-translate-x-[0.3px] [&_.logo-knob-on]:fill-accent'
const INTRO_CLASS = '[&_.logo-knob-on]:animate-logo-switch'
const SWAP_CLASS = '[&_.logo-knob-off]:animate-logo-swap-off [&_.logo-knob-on]:animate-logo-swap-on'
const SWAP_END_ANIMATION = 'logo-swap-on'

export const useLogoAnimation = () => {
  const isWaiting = ref(true)
  const isIntro = ref(true)
  const isSwapping = ref(false)

  const logoClass = computed(() => {
    if (isSwapping.value) return SWAP_CLASS
    if (isWaiting.value) return WAITING_CLASS
    return isIntro.value ? INTRO_CLASS : ''
  })

  const nextFrame = (callback: () => void) =>
    requestAnimationFrame(() => requestAnimationFrame(callback))

  // The intro waits for the full page load, so it plays once the page has settled instead of
  // during loading and hydration (the knob stays in the "off" position until then).
  const startIntro = () => nextFrame(() => (isWaiting.value = false))

  onMounted(() => {
    if (document.readyState === 'complete') startIntro()
  })
  useEventListener(window, 'load', startIntro, { once: true })

  const swap = () => {
    isWaiting.value = false
    isIntro.value = false
    isSwapping.value = false
    nextFrame(() => (isSwapping.value = true))
  }

  const onAnimationEnd = (event: AnimationEvent) => {
    if (event.animationName === SWAP_END_ANIMATION) isSwapping.value = false
  }

  return { logoClass, swap, onAnimationEnd }
}
