import { GetStaticProps } from 'next'
import { pagesRevalidate } from '@app/helpers/configs'
import { createPrismicClient } from '@app/helpers/create-prismic-client'
import { getImagesBlurData } from '@app/helpers/get-images-blur-data'
import { getLayoutConfig } from '@app/helpers/get-layout-config'
import { Genre, getLayout, Props } from '@app/partials/Genre'
import { CollectionDocument } from '@app/types/custom-types'

const GenrePage: NextPageWithLayout<Props> = props => {
  return <Genre {...props} />
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
        destination: '/'
      }
    }
  }
  const client = createPrismicClient({ previewData })

  const genre = await client.getByUID('genre', params.uid as string, {
    lang: locale,
    fetchLinks: ['collection.title', 'collection.featuredImage']
  })

  const layoutConfig = await getLayoutConfig(client, locale, genre)

  const collectionsImages = genre.data.collections.map(
    item =>
      (item.collection as unknown as CollectionDocument).data.featuredImage.long
        .url || ''
  )

  console.log(collectionsImages)

  const imagesBlurData = await getImagesBlurData([...collectionsImages])

  return {
    props: {
      ...layoutConfig,
      imagesBlurData,
      genre
    },
    revalidate: pagesRevalidate
  }
}

export async function getStaticPaths() {
  const client = createPrismicClient()

  const genres = await client.getAllByType('genre', {
    lang: '*'
  })

  return {
    paths: genres.map(genre => {
      return {
        params: { uid: genre.uid },
        locale: genre.lang
      }
    }),
    fallback: false
  }
}

GenrePage.getLayout = getLayout

export default GenrePage
