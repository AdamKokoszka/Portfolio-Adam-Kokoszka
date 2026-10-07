import type { RevealItem, RevealVariant } from '~/types/plugins'

const ITEM_SELECTOR = '[data-reveal]'
const STAGGER_MS = 90
const MAX_STAGGER_STEPS = 10
const SETTLE_MS = 4000
const TRIGGER_CLASS = 'is-revealed'
const SKIPPED_MARGIN_PX = 100000

const ANIMATION_CLASSES: Record<RevealVariant, string[]> = {
  up: ['animate-reveal-up'],
  soft: ['animate-reveal-soft'],
  scale: ['animate-reveal-scale'],
  fade: ['animate-reveal-fade'],
  draw: ['animate-reveal-draw'],
  flight: ['animate-reveal-flight'],
  sharpen: ['animate-reveal-sharpen', TRIGGER_CLASS],
  group: [TRIGGER_CLASS],
}

const HIDDEN_CLASSES: Record<RevealVariant, string> = {
  up: 'opacity-0',
  soft: 'opacity-0',
  scale: 'opacity-0',
  fade: 'opacity-0',
  draw: '[stroke-dashoffset:var(--draw-length)]',
  flight: 'opacity-0',
  sharpen: 'opacity-0',
  group: 'opacity-0',
}

// With reduced motion, items only fade in (short, no movement or stagger); `reveal-gentle` exempts
// this fade from the global reduced-motion kill switch in main.css.
const GENTLE_CLASSES = ['animate-reveal-gentle', 'reveal-gentle']

const isRevealVariant = (value: string | null): value is RevealVariant =>
  value !== null && value in ANIMATION_CLASSES

const variantOf = (item: Element): RevealVariant => {
  const variant = item.getAttribute('data-reveal')
  return isRevealVariant(variant) ? variant : 'up'
}

const isBelowViewport = (entry: IntersectionObserverEntry) =>
  entry.boundingClientRect.top >= window.innerHeight

const isAboveViewport = (entry: IntersectionObserverEntry) => entry.boundingClientRect.bottom <= 0

const observedTarget = (item: RevealItem): Element =>
  item instanceof SVGElement && !(item instanceof SVGSVGElement) && item.ownerSVGElement
    ? item.ownerSVGElement
    : item

const prepareDraw = (item: RevealItem) => {
  if (!(item instanceof SVGGeometryElement)) return
  const length = Math.ceil(item.getTotalLength())
  item.style.setProperty('--draw-length', String(length))
  item.style.setProperty('stroke-dasharray', String(length))
}

const byDocumentOrder = (a: Element, b: Element) =>
  a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1

export default defineNuxtPlugin((nuxtApp) => {
  const observers = new WeakMap<HTMLElement, IntersectionObserver>()

  nuxtApp.vueApp.directive<HTMLElement>('reveal', {
    getSSRProps: () => ({}),
    mounted: (el) => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!('IntersectionObserver' in window)) return

      const nested = Array.from(el.querySelectorAll<RevealItem>(ITEM_SELECTOR))
      const items: RevealItem[] = nested.length ? nested : [el]
      const hidden = new WeakSet<Element>()
      const itemsByTarget = new Map<Element, RevealItem[]>()
      items.forEach((item) => {
        const target = observedTarget(item)
        itemsByTarget.set(target, [...(itemsByTarget.get(target) ?? []), item])
      })

      const hide = (item: RevealItem) => {
        const variant = variantOf(item)
        if (prefersReducedMotion && variant === 'draw') return
        if (variant === 'draw') prepareDraw(item)
        item.classList.add(HIDDEN_CLASSES[variant])
        hidden.add(item)
      }

      const uncover = (item: RevealItem) => item.classList.remove(HIDDEN_CLASSES[variantOf(item)])

      const show = (item: RevealItem, step: number) => {
        if (prefersReducedMotion) {
          uncover(item)
          item.classList.add(...GENTLE_CLASSES)
          return
        }
        const extraDelay = Number(item.dataset.revealDelay ?? 0)
        item.style.setProperty('--reveal-delay', `${step * STAGGER_MS + extraDelay}ms`)
        uncover(item)
        item.classList.add(...ANIMATION_CLASSES[variantOf(item)])
        setTimeout(() => item.classList.remove(TRIGGER_CLASS), SETTLE_MS)
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const entering: RevealItem[] = []
          entries.forEach((entry) => {
            const targetItems = itemsByTarget.get(entry.target) ?? []
            if (targetItems.some((item) => hidden.has(item))) {
              if (!entry.isIntersecting) return
              observer.unobserve(entry.target)
              if (isAboveViewport(entry)) {
                targetItems.forEach(uncover)
                return
              }
              entering.push(...targetItems)
              return
            }
            if (isBelowViewport(entry)) targetItems.forEach(hide)
            else observer.unobserve(entry.target)
          })
          entering
            .sort(byDocumentOrder)
            .forEach((item, index) => show(item, Math.min(index, MAX_STAGGER_STEPS)))
        },
        // The root extends far above the viewport, so an instant jump past an item (anchor link,
        // reduced motion) still reports it as intersecting; such items are shown without animation.
        { rootMargin: `${SKIPPED_MARGIN_PX}px 0px -8% 0px` },
      )

      itemsByTarget.forEach((_, target) => observer.observe(target))
      observers.set(el, observer)
    },
    unmounted: (el) => {
      observers.get(el)?.disconnect()
      observers.delete(el)
    },
  })
})
