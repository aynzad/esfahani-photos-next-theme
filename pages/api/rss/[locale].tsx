import { asText } from '@prismicio/helpers'
import { SliceZone } from '@prismicio/react'
import { NextApiRequest, NextApiResponse } from 'next'
import { renderToStaticMarkup } from 'react-dom/server'
import { defaultLocale, siteURL } from '@app/helpers/configs'
import { createPrismicClient } from '@app/helpers/create-prismic-client'
import { dateTimeFormat } from '@app/helpers/date-time-format'
import { fullLinkResolver } from '@app/helpers/link-resolver'
import { components } from '@app/slices'
import { CollectionDocument, PageDocument } from '@app/types/custom-types'

function createRSSItem(
  documents: CollectionDocument[] | PageDocument[],
  lang: string,
  category: string
) {
  return documents.map(document => {
    return `<item>
    <title>${asText(document.data.title)}</title>
    <link>${fullLinkResolver(document, lang)}</link> 
    <category>${category}</category>
    <guid>${fullLinkResolver(document, lang)}</guid>
    <pubDate>${new Date(
      document.first_publication_date
    ).toUTCString()}</pubDate>
    <description>${renderToStaticMarkup(
      <SliceZone slices={document.data.slices} components={components} />
    )
      .trim()
      .replace(/(<([^>]+)>)/gi, '')}</description>
  </item>`
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const lang = (req.query?.locale as string) || defaultLocale
    const client = createPrismicClient()
    const settings = await client.getSingle('settings', { lang })
    const currentYear = dateTimeFormat(lang, {
      month: undefined,
      day: undefined,
      year: 'numeric'
    }).format(new Date())

    const rssURL = req.url

    const metadata = {
      title: asText(settings.data.name),
      description: asText(settings.data.description),
      link: rssURL
    }

    const collections = await client.getAllByType('collection', {
      lang
    })

    const pages = await client.getAllByType('page', {
      lang
    })

    const lastBuildDate = collections.reduce((prev, cur) => {
      return prev === '' || new Date(cur.last_publication_date) > new Date(prev)
        ? cur.last_publication_date
        : prev
    }, '')

    const collectionItems = createRSSItem(collections, lang, 'Image collection')

    const pageItems = createRSSItem(pages, lang, 'Page')

    // Add urlSet to entire sitemap string
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
      <title>${metadata.title}</title>
      <description>${metadata.description}</description>
      <language>${lang}</language>
      <link>${siteURL}${rssURL}</link>
      <copyright>© ${currentYear} ${asText(settings.data.name)}. ${asText(
      settings.data.copyright
    )}</copyright>
      <category>Photography</category>
      <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
      ${collectionItems.join('')}
      ${pageItems.join('')}
      </channel>
      </rss>`

    res.statusCode = 200
    res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600')
    res.setHeader('Content-Type', 'text/xml')
    // we send the XML to the browser
    res.end(rss)
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw e
    }
  }
}
