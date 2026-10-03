const TRANSITION_CLASS = 'theme-transition'

export const useThemeTransition = () => {
  const reducedMotion = usePreferredReducedMotion()

  const waitForClass = (className: string) =>
    new Promise<void>((resolve) => {
      const root = document.documentElement
      if (root.classList.contains(className)) return resolve()
      const observer = new MutationObserver(() => {
        if (!root.classList.contains(className)) return
        observer.disconnect()
        resolve()
      })
      observer.observe(root, { attributes: true, attributeFilter: ['class'] })
      setTimeout(() => {
        observer.disconnect()
        resolve()
      }, 300)
    })

  const switchTheme = (origin: HTMLElement, nextTheme: string, apply: () => void) => {
    if (!document.startViewTransition || reducedMotion.value === 'reduce') return apply()

    const root = document.documentElement
    const rect = origin.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    root.style.setProperty('--theme-x', `${x}px`)
    root.style.setProperty('--theme-y', `${y}px`)
    root.style.setProperty('--theme-r', `${radius}px`)
    root.classList.add(TRANSITION_CLASS)

    const transition = document.startViewTransition(() => {
      apply()
      return waitForClass(nextTheme)
    })
    transition.ready.catch(() => undefined)
    transition.finished.finally(() => root.classList.remove(TRANSITION_CLASS))
  }

  return { switchTheme }
}
