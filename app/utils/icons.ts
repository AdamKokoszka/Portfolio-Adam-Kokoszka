const ICON_FILES = import.meta.glob<string>('~/assets/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const ICONS: Record<string, string> = Object.fromEntries(
  Object.entries(ICON_FILES).map(([path, svg]) => [
    path.slice(path.lastIndexOf('/') + 1, -'.svg'.length),
    svg,
  ]),
)
