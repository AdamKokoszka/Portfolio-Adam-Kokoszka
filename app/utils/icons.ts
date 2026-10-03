const ICON_FILES = import.meta.glob<string>('~/assets/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const fileName = (path: string) => path.slice(path.lastIndexOf('/') + 1, -'.svg'.length)

export const ICONS: Record<string, string> = Object.fromEntries(
  Object.entries(ICON_FILES).map(([path, svg]) => [fileName(path), svg]),
)

const TECH_LOGO_FILES = import.meta.glob<string>('~/assets/icons/tech/*.svg', {
  query: '?no-inline',
  import: 'default',
  eager: true,
})

export const TECH_LOGOS: Record<string, string> = Object.fromEntries(
  Object.entries(TECH_LOGO_FILES).map(([path, url]) => [fileName(path), url]),
)
