// Runs the callback once per frame while scrolling. Reading scroll position or element rects
// inside the scroll event forces an extra style recalc while animations are running, which made
// scrolling stutter on slower phones (useWindowScroll also calls getComputedStyle on every event).
export const useScrollFrame = (callback: () => void) => {
  let frame = 0

  const schedule = () => {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      callback()
    })
  }

  useEventListener(window, 'scroll', schedule, { passive: true })
  useEventListener(window, 'resize', schedule, { passive: true })
  onScopeDispose(() => cancelAnimationFrame(frame))

  return schedule
}
