export const useSectionHref = () => {
  const localePath = useLocalePath()

  return (id: string) => `${localePath('/')}#${id}`
}
