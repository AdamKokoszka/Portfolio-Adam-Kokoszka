/** Page sections in display order; each id is both the anchor and the `nav.<id>` i18n key. */
export const SECTION_IDS = ['about', 'experience', 'stack', 'systems', 'contact'] as const

export type SectionId = (typeof SECTION_IDS)[number]
