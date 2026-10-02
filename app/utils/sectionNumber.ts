import { SECTION_IDS } from '~/data/navigation'
import type { SectionId } from '~/types/navigation'

export const sectionNumber = (id: SectionId) => String(SECTION_IDS.indexOf(id) + 1).padStart(2, '0')
