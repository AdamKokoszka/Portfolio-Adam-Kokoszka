import type { MaybeRefOrGetter } from 'vue'
import type { TypewriterDelays } from '~/types/composables'

export const useTypewriter = (
  words: readonly string[],
  isActive: MaybeRefOrGetter<boolean>,
  { type = 95, erase = 55, hold = 2200, gap = 350 }: TypewriterDelays = {},
) => {
  const text = ref(words[0] ?? '')
  const isTyping = ref(false)

  let wordIndex = 0
  let isErasing = true
  let timer: ReturnType<typeof setTimeout> | undefined

  const stop = () => {
    clearTimeout(timer)
    timer = undefined
    isTyping.value = false
  }

  const step = () => {
    if (isErasing) {
      if (text.value.length > 0) {
        text.value = text.value.slice(0, -1)
        isTyping.value = true
        return erase
      }
      isErasing = false
      wordIndex = (wordIndex + 1) % words.length
      return gap
    }

    const target = words[wordIndex] ?? ''
    if (text.value.length < target.length) {
      text.value = target.slice(0, text.value.length + 1)
      isTyping.value = true
      return type
    }

    isErasing = true
    isTyping.value = false
    return hold
  }

  const schedule = (delay: number) => {
    clearTimeout(timer)
    timer = setTimeout(() => schedule(step()), delay)
  }

  watch(
    () => toValue(isActive),
    (active) => (active ? schedule(hold) : stop()),
  )

  onMounted(() => {
    if (toValue(isActive)) schedule(hold)
  })

  onScopeDispose(stop)

  return { text, isTyping }
}
