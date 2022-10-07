import { asText } from '@prismicio/helpers'
import { PrismicText, SliceZone } from '@prismicio/react'
import { ContactBox } from '@app/components/ContactBox'
import Layout, { ILayoutConfig } from '@app/components/Layout'
import { PageTitle } from '@app/components/PageTitle'
import { components } from '@app/slices'
import { PageDocument } from '@app/types/custom-types'

export interface Props extends WithImagesBlurData<ILayoutConfig> {
  page: PageDocument
}

export const Page: React.FC<Props> = ({ page, settings, imagesBlurData }) => {
  return (
    <section className="container px-4">
      <PageTitle subTitle={asText(page.data.subtitle)}>
        <PrismicText field={page.data.title} />
      </PageTitle>
      <article className="md:container">
        <SliceZone slices={page.data.slices} components={components} />
      </article>

      {!!page.data.hasContactBox && (
        <ContactBox
          className="mt-32 lg:mt-44"
          settings={settings}
          imagesBlurData={imagesBlurData}
        />
      )}
    </section>
  )
}

export const getLayout: GetLayout<Props> = (page, pageProps) => {
  return (
    <Layout
      title={asText(pageProps.page.data.title)}
      languages={pageProps.languages}
      documentAlternateLanguages={pageProps.documentAlternateLanguages}
      navigation={pageProps.navigation}
      settings={pageProps.settings}
    >
      {page}
    </Layout>
  )
}
