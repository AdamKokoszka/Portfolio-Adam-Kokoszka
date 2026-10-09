import { OG_IMAGE, PERSON } from '~/data/seo'
import { SOCIAL_LINKS } from '~/data/socials'

export const usePageSeo = () => {
  const { t, locale, locales } = useI18n()
  const site = useSiteConfig()
  const route = useRoute()

  const absoluteUrl = (path: string) => new URL(path, site.url).href

  const title = computed(() => t('meta.title'))
  const description = computed(() => t('meta.description'))
  const imageUrl = `${absoluteUrl(OG_IMAGE.path)}?v=${OG_IMAGE.version}`
  const imageAlt = computed(() => t('meta.ogImageAlt'))

  const pageUrl = computed(() => absoluteUrl(route.path))

  const language = computed(
    () => locales.value.find((item) => item.code === locale.value)?.language ?? locale.value,
  )

  const toOgLocale = (code: string) => code.replace('-', '_')
  const ogLocale = computed(() => toOgLocale(language.value))
  const ogLocaleAlternate = computed(() =>
    locales.value.flatMap((item) =>
      item.code !== locale.value && item.language ? [toOgLocale(item.language)] : [],
    ),
  )

  useSeoMeta({
    title,
    description,
    ogType: 'website',
    ogUrl: pageUrl,
    ogLocale,
    ogLocaleAlternate,
    ogSiteName: site.name,
    ogTitle: title,
    ogDescription: description,
    ogImage: imageUrl,
    ogImageWidth: OG_IMAGE.width,
    ogImageHeight: OG_IMAGE.height,
    ogImageAlt: imageAlt,
    ogImageType: 'image/jpeg',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
    twitterImageAlt: imageAlt,
  })

  const structuredData = computed(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: PERSON.name,
        jobTitle: PERSON.jobTitle,
        description: description.value,
        url: site.url,
        image: absoluteUrl(PERSON.image),
        sameAs: SOCIAL_LINKS.map((link) => link.href),
        worksFor: { '@type': 'Organization', name: PERSON.worksFor },
        alumniOf: { '@type': 'CollegeOrUniversity', name: PERSON.alumniOf },
        knowsAbout: PERSON.knowsAbout,
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        name: site.name,
        url: site.url,
        inLanguage: language.value,
        author: { '@id': `${site.url}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl.value}#webpage`,
        url: pageUrl.value,
        name: title.value,
        description: description.value,
        inLanguage: language.value,
        isPartOf: { '@id': `${site.url}/#website` },
        mainEntity: { '@id': `${site.url}/#person` },
      },
    ],
  }))

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: () => JSON.stringify(structuredData.value),
      },
    ],
  })
}
