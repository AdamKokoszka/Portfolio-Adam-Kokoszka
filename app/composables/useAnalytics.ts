const UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js'

export const useAnalytics = () => {
  const { umamiWebsiteId } = useRuntimeConfig().public
  const site = useSiteConfig()

  if (!umamiWebsiteId) return

  useHead({
    script: [
      {
        src: UMAMI_SCRIPT_URL,
        defer: true,
        'data-website-id': umamiWebsiteId,
        'data-domains': new URL(site.url).hostname,
      },
    ],
  })
}
