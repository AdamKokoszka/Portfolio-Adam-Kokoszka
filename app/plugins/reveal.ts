const HIDDEN_CLASSES = ['opacity-0', 'translate-y-4']
const TRANSITION_CLASSES = ['transition-[opacity,translate]', 'duration-550', 'ease-smooth']

const isBelowViewport = (entry: IntersectionObserverEntry) =>
  entry.boundingClientRect.top >= (entry.rootBounds?.height ?? window.innerHeight)

export default defineNuxtPlugin((nuxtApp) => {
  const observers = new WeakMap<HTMLElement, IntersectionObserver>()

  nuxtApp.vueApp.directive<HTMLElement>('reveal', {
    getSSRProps: () => ({}),
    mounted: (el) => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion || !('IntersectionObserver' in window)) return

      let isHidden = false

      const hide = () => {
        el.classList.add(...TRANSITION_CLASSES, ...HIDDEN_CLASSES)
        isHidden = true
      }

      const show = () => {
        el.classList.remove(...HIDDEN_CLASSES)
        observer.disconnect()
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return
          if (isHidden) {
            if (entry.isIntersecting) show()
            return
          }
          if (isBelowViewport(entry)) hide()
          else observer.disconnect()
        },
        { threshold: 0.1 },
      )
      observer.observe(el)
      observers.set(el, observer)
    },
    unmounted: (el) => {
      observers.get(el)?.disconnect()
      observers.delete(el)
    },
  })
})
