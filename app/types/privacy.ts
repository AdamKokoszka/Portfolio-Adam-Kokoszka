export interface PrivacyItem {
  label: string
  text: string
}

export interface PrivacySection {
  title: string
  items?: PrivacyItem[]
  paragraphs: string[]
}
