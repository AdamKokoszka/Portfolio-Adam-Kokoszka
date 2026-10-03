import type { CopyStatus, CopyToClipboardOptions } from '~/types/composables'

export const useCopyToClipboard = ({
  copiedDuration = 2000,
  errorDuration = 4000,
}: CopyToClipboardOptions = {}) => {
  const { copy: writeText, isSupported } = useClipboard({ legacy: true })
  const status = ref<CopyStatus>('idle')
  const resetDelay = ref(copiedDuration)

  const { start: scheduleReset, stop: cancelReset } = useTimeoutFn(
    () => {
      status.value = 'idle'
    },
    resetDelay,
    { immediate: false },
  )

  const showStatus = (next: CopyStatus, delay: number) => {
    cancelReset()
    status.value = next
    resetDelay.value = delay
    scheduleReset()
  }

  const copy = async (text: string) => {
    try {
      if (!isSupported.value) throw new Error('Clipboard API is not supported')
      await writeText(text)
      showStatus('copied', copiedDuration)
    } catch {
      showStatus('error', errorDuration)
    }
  }

  return { status, copy }
}
