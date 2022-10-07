import { asText } from '@prismicio/helpers'
import { GetStaticProps } from 'next'
import { pagesRevalidate } from '@app/helpers/configs'
import { createPrismicClient } from '@app/helpers/create-prismic-client'
import { getImagesBlurData } from '@app/helpers/get-images-blur-data'
import { getLayoutConfig } from '@app/helpers/get-layout-config'
import { Collection, getLayout, Props } from '@app/partials/Collection'

const CollectionPage: NextPageWithLayout<Props> = props => {
  return <Collection {...props} />
}

export const getStaticProps: GetStaticProps<Props> = async ({
  previewData,
  locale,
  params
}) => {
  if (!params || !params.uid) {
    return {
      redirect: {
        permanent: false,
        destination: '/collections'
      }
    }
  }
  const client = createPrismicClient({ previewData })

  const collection = await client.getByUID('collection', params.uid as string, {
    lang: locale
  })

  const collectionsDoc = await client.getSingle('collections', {
    lang: locale
  })

  const layoutConfig = await getLayoutConfig(client, locale, collection)

  const thumbImages = collection.data.gallery.map(
    gallery => gallery.image?.thumb?.url || ''
  )
  const largeImages = collection.data.gallery.map(
    gallery => gallery.image.large?.url || ''
  )

  const imagesBlurData = await getImagesBlurData([
    ...thumbImages,
    ...largeImages
  ])

  return {
    props: {
      ...layoutConfig,
      collection,
      imagesBlurData,
      subTitle: asText(collectionsDoc.data.subtitle)
    },
    revalidate: pagesRevalidate
  }
}

export async function getStaticPaths() {
  const client = createPrismicClient()

  const collections = await client.getAllByType('collection', { lang: '*' })

  return {
    paths: collections.map(collection => {
      return {
        params: { uid: collection.uid },
        locale: collection.lang
      }
    }),
    fallback: false
  }
}

CollectionPage.getLayout = getLayout

export default CollectionPage
