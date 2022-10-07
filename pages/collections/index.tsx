import { asText } from '@prismicio/helpers'
import { GetStaticProps } from 'next'
import { pagesRevalidate } from '@app/helpers/configs'
import { createPrismicClient } from '@app/helpers/create-prismic-client'
import { getImagesBlurData } from '@app/helpers/get-images-blur-data'
import { getLayoutConfig } from '@app/helpers/get-layout-config'
import { Collections, getLayout, Props } from '@app/partials/Collections'

const CollectionsPage: NextPageWithLayout<Props> = props => {
  return <Collections {...props} />
}

export const getStaticProps: GetStaticProps<Props> = async ({
  previewData,
  locale
}) => {
  const client = createPrismicClient({ previewData })
  const collections = await client.getAllByType('collection', { lang: locale })

  const collectionsDoc = await client.getSingle('collections', {
    lang: locale
  })

  const layoutConfig = await getLayoutConfig(client, locale, collectionsDoc)

  const imagesBlurData = await getImagesBlurData(
    collections.map(collection => collection.data.featuredImage.thumb.url || '')
  )

  return {
    props: {
      ...layoutConfig,
      collections,
      title: asText(collectionsDoc.data.title),
      imagesBlurData
    },
    revalidate: pagesRevalidate
  }
}

CollectionsPage.getLayout = getLayout

export default CollectionsPage
