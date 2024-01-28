import type { LinkResolverFunction } from '@prismicio/helpers'
import type { FilledLinkToDocumentField } from '@prismicio/types'
import { AllDocumentTypes } from '@app/types/custom-types'
import { defaultLocale, siteURL } from './configs'

/**
 * The project's Prismic Link Resolver. This function determines the URL for a given Prismic document.
 *
 * @type {LinkResolverFunction}
 */
export const linkResolver: LinkResolverFunction = doc => {
  switch (doc.type) {
    case 'collections':
      return `/collections`
    case 'collection':
      return `/collections/${doc.uid}`
    case 'genre':
      return `/genres/${doc.uid}`
    case 'page':
      return `/${doc.uid}`
    default:
      return '/'
  }
}

/**
 * The XML Prismic Link Resolver. This function determines the full URL for a given Prismic document.
 */
export const fullLinkResolver = (
  linkToDocumentField: AllDocumentTypes,
  locale: string
) => {
  const localePart = locale === defaultLocale ? '' : `/${locale}`
  return `${siteURL}${localePart}${linkResolver(
    linkToDocumentField as unknown as FilledLinkToDocumentField
  )}`
}
