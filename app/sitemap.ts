import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/config'

export const dynamic = 'force-static'

const sitemap = (): MetadataRoute.Sitemap => [{ priority: 1, url: SITE_URL }]

export default sitemap
