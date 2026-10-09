export const useIsScrolled = (offset: number) => {
  const isScrolled = ref(false)

  const update = () => {
    isScrolled.value = window.scrollY > offset
  }

  onMounted(update)
  useScrollFrame(update)

  return isScrolled
}
