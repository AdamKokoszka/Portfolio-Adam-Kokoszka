const HIDDEN_CLASSES = ['opacity-0', 'translate-y-4']
const TRANSITION_CLASSES = ['transition-[opacity,translate]', 'duration-[550ms]', 'ease-smooth']

export default defineNuxtPlugin((nuxtApp) => {
  const observers = new WeakMap<HTMLElement, IntersectionObserver>()

  nuxtApp.vueApp.directive<HTMLElement>('reveal', {
    getSSRProps: () => ({}),
    mounted: (el) => {
      const isInView = el.getBoundingClientRect().top < window.innerHeight
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (isInView || prefersReducedMotion || !('IntersectionObserver' in window)) return

      el.classList.add(...TRANSITION_CLASSES, ...HIDDEN_CLASSES)

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          el.classList.remove(...HIDDEN_CLASSES)
          observer.disconnect()
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
