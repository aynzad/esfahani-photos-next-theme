import { asImageSrc } from '@prismicio/helpers'
import { NextApiRequest, NextApiResponse } from 'next'
import { defaultLocale, imgixWatermarkParams } from '@app/helpers/configs'
import { createPrismicClient } from '@app/helpers/create-prismic-client'
import { fullLinkResolver } from '@app/helpers/link-resolver'
import { AllDocumentTypes } from '@app/types/custom-types'

function createSiteMapUrl(
  documents: AllDocumentTypes[],
  priority: '1.0' | `0.${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`,
  changeFreq: 'hourly' | 'weekly' | 'monthly' | 'yearly',
  lastMod?: string
) {
  return documents.map(document => {
    const galleryItems =
      document.type === 'collection'
        ? document.data.gallery
            .map(img => {
              return `
    <image:image>
      <image:loc><![CDATA[${asImageSrc(
        img.image.large,
        imgixWatermarkParams
      )}]]></image:loc>
    </image:image>`
            })
            .join('')
        : ''

    const altItems = document.alternate_languages
      ? document.alternate_languages
          .map(alt => {
            return `<xhtml:link rel="alternate" hreflang="${
              alt.lang
            }" href="${fullLinkResolver(document, alt.lang)}"/>`
          })
          .join('')
      : ''

    return `<url>
    <loc>${fullLinkResolver(document, document.lang)}</loc>
    <lastmod>${new Date(
      lastMod ?? document.last_publication_date
    ).toISOString()}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
      ${altItems}
      ${galleryItems}
  </url>`
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = createPrismicClient()

    const settingsData = await client.getSingle('settings', {
      lang: defaultLocale
    })

    const collectionsData = await client.getSingle('collections', {
      lang: defaultLocale
    })

    const collectionData = await client.getAllByType('collection', {
      lang: '*'
    })
    const pagesData = await client.getAllByType('page', {
      lang: '*'
    })

    const lastBuildDate = collectionData.reduce((prev, cur) => {
      return prev === '' || new Date(cur.last_publication_date) > new Date(prev)
        ? cur.last_publication_date
        : prev
    }, '')

    const homepageItems = createSiteMapUrl(
      [settingsData],
      '1.0',
      'weekly',
      lastBuildDate
    )

    const collectionsItems = createSiteMapUrl(
      [collectionsData],
      '1.0',
      'weekly',
      lastBuildDate
    )

    const collectionItems = createSiteMapUrl(collectionData, '0.8', 'yearly')
    const pagesItems = createSiteMapUrl(pagesData, '0.5', 'yearly')

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${homepageItems.join('')}
      ${collectionsItems.join('')}
      ${collectionItems.join('')}
      ${pagesItems.join('')}
    </urlset>`

    res.statusCode = 200
    res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600')
    res.setHeader('Content-Type', 'text/xml')
    // we send the XML to the browser
    res.end(sitemap)
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw e
    }
  }
}
