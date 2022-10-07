import { GetStaticProps } from 'next'
import { pagesRevalidate } from '@app/helpers/configs'
import { createPrismicClient } from '@app/helpers/create-prismic-client'
import { getImagesBlurData } from '@app/helpers/get-images-blur-data'
import { getLayoutConfig } from '@app/helpers/get-layout-config'
import { Page, getLayout, Props } from '@app/partials/Page'

const PagePage: NextPageWithLayout<Props> = props => {
  return <Page {...props} />
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

  const page = await client.getByUID('page', params.uid as string, {
    lang: locale
  })

  const layoutConfig = await getLayoutConfig(client, locale, page)

  const contactBoxImages = layoutConfig.settings.data.contactBoxImages.map(
    contactBoxImage => contactBoxImage.image.square.url || ''
  )
  const imagesBlurData = !!page.data.hasContactBox
    ? await getImagesBlurData(contactBoxImages)
    : null

  return {
    props: {
      ...layoutConfig,
      page,
      imagesBlurData
    },
    revalidate: pagesRevalidate
  }
}

export async function getStaticPaths() {
  const client = createPrismicClient()

  const pages = await client.getAllByType('page', { lang: '*' })

  return {
    paths: pages.map(page => {
      return {
        params: { uid: page.uid },
        locale: page.lang
      }
    }),
    fallback: false
  }
}

PagePage.getLayout = getLayout

export default PagePage
