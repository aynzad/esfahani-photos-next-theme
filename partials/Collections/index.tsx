import { CollectionCard } from '@app/components/CollectionCard'
import Layout, { ILayoutConfig } from '@app/components/Layout'
import { PageTitle } from '@app/components/PageTitle'
import { CollectionDocument } from '@app/types/custom-types'

export interface Props extends WithImagesBlurData<ILayoutConfig> {
  collections: CollectionDocument[]
  title: string
}

export const Collections: React.FC<Props> = ({
  collections,
  settings,
  title,
  imagesBlurData
}) => {
  return (
    <div className="container px-4">
      <PageTitle>{title}</PageTitle>
      {collections.length && (
        <section className="col-xs-12 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 xl:gap-24">
          {collections.map(collection => (
            <CollectionCard
              imageSize="thumb"
              imagesBlurData={imagesBlurData}
              key={collection.id}
              collection={collection}
              seeCollectionText={settings.data.seeCollection}
            />
          ))}
        </section>
      )}
    </div>
  )
}

export const getLayout: GetLayout<Props> = (page, pageProps) => {
  return (
    <Layout
      title={pageProps.title}
      languages={pageProps.languages}
      documentAlternateLanguages={pageProps.documentAlternateLanguages}
      navigation={pageProps.navigation}
      settings={pageProps.settings}
    >
      {page}
    </Layout>
  )
}
