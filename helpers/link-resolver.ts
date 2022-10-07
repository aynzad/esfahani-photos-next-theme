import type { LinkResolverFunction } from '@prismicio/helpers'

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
    case 'page':
      return `/${doc.uid}`
    default:
      return '/'
  }
}
