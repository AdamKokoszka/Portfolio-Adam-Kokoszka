import type { RevealVariant } from '~/types/common'

const ITEM_SELECTOR = '[data-reveal]'
const STAGGER_MS = 90
const MAX_STAGGER_STEPS = 7

const ANIMATION_CLASSES: Record<RevealVariant, string> = {
  up: 'animate-reveal-up',
  scale: 'animate-reveal-scale',
  fade: 'animate-reveal-fade',
  draw: 'animate-reveal-draw',
  chars: 'is-revealed',
  flight: 'animate-reveal-flight',
}

const HIDDEN_CLASSES: Record<RevealVariant, string> = {
  up: 'opacity-0',
  scale: 'opacity-0',
  fade: 'opacity-0',
  draw: '[stroke-dashoffset:1]',
  chars: 'opacity-0',
  flight: 'opacity-0',
}

const variantOf = (item: Element): RevealVariant => {
  const variant = item.getAttribute('data-reveal')
  return variant && variant in ANIMATION_CLASSES ? (variant as RevealVariant) : 'up'
}

const isBelowViewport = (entry: IntersectionObserverEntry) =>
  entry.boundingClientRect.top >= window.innerHeight

const byDocumentOrder = (a: Element, b: Element) =>
  a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1

export default defineNuxtPlugin((nuxtApp) => {
  const observers = new WeakMap<HTMLElement, IntersectionObserver>()

  nuxtApp.vueApp.directive<HTMLElement>('reveal', {
    getSSRProps: () => ({}),
    mounted: (el) => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion || !('IntersectionObserver' in window)) return

      const nested = Array.from(el.querySelectorAll<HTMLElement>(ITEM_SELECTOR))
      const items = nested.length ? nested : [el]
      const hidden = new WeakSet<Element>()

      const hide = (item: Element) => {
        item.classList.add(HIDDEN_CLASSES[variantOf(item)])
        hidden.add(item)
      }

      const show = (item: HTMLElement, step: number) => {
        const variant = variantOf(item)
        const extraDelay = Number(item.dataset.revealDelay ?? 0)
        item.style.setProperty('--reveal-delay', `${step * STAGGER_MS + extraDelay}ms`)
        item.classList.remove(HIDDEN_CLASSES[variant])
        item.classList.add(ANIMATION_CLASSES[variant])
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const entering: HTMLElement[] = []
          entries.forEach((entry) => {
            const item = entry.target as HTMLElement
            if (hidden.has(item)) {
              if (!entry.isIntersecting) return
              entering.push(item)
              observer.unobserve(item)
              return
            }
            if (isBelowViewport(entry)) hide(item)
            else observer.unobserve(item)
          })
          entering
            .sort(byDocumentOrder)
            .forEach((item, index) => show(item, Math.min(index, MAX_STAGGER_STEPS)))
        },
        { rootMargin: '0px 0px -8% 0px' },
      )

      items.forEach((item) => observer.observe(item))
      observers.set(el, observer)
    },
    unmounted: (el) => {
      observers.get(el)?.disconnect()
      observers.delete(el)
    },
  })
})
