export interface SectionHeroEditorProps {
  isPaused: boolean
}

export interface SectionHeroEditorEmits {
  togglePause: []
}

export interface PortraitSource {
  media: string
  type: string
  srcset: string
  sizes?: string
  src?: string
}
