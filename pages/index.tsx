import { GetStaticProps } from 'next'
import { pagesRevalidate } from '@app/helpers/configs'
import { createPrismicClient } from '@app/helpers/create-prismic-client'
import { getImagesBlurData } from '@app/helpers/get-images-blur-data'
import { getLayoutConfig } from '@app/helpers/get-layout-config'
import { getLayout, Home, Props } from '@app/partials/Home'

const HomePage: NextPageWithLayout<Props> = props => {
  return <Home {...props} />
}

export const getStaticProps: GetStaticProps<Props> = async ({
  previewData,
  locale
}) => {
  const client = createPrismicClient({ previewData })
  const layoutConfig = await getLayoutConfig(client, locale)
  const limit = process.env.HOMEPAGE_COLLECTIONS_LIMIT
    ? +process.env.HOMEPAGE_COLLECTIONS_LIMIT
    : undefined
  const collections = await client.getAllByType('collection', {
    limit,
    lang: locale
  })

  const collectionsImages = collections.map(
    collection => collection.data.featuredImage.long.url || ''
  )
  const tagsImages = layoutConfig.settings.data.tags.map(
    tag => tag.image.square.url || ''
  )
  const profileImages = [
    layoutConfig.settings.data.profilePicture.square.url || ''
  ]
  const contactBoxImages = layoutConfig.settings.data.contactBoxImages.map(
    contactBoxImage => contactBoxImage.image.square.url || ''
  )
  const allImages = [
    ...collectionsImages,
    ...tagsImages,
    ...profileImages,
    ...contactBoxImages
  ]
  const imagesBlurData = await getImagesBlurData(allImages)

  return {
    props: {
      ...layoutConfig,
      collections,
      imagesBlurData
    },
    revalidate: pagesRevalidate
  }
}

HomePage.getLayout = getLayout

export default HomePage
