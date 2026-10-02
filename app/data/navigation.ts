export const SECTION_IDS = ['about', 'experience', 'stack', 'systems', 'contact'] as const

export type SectionId = (typeof SECTION_IDS)[number]
