import { asText } from '@prismicio/helpers'
import { PrismicText, SliceZone } from '@prismicio/react'
import { CollectionCard } from '@app/components/CollectionCard'
import Layout, { ILayoutConfig } from '@app/components/Layout'
import { PageTitle } from '@app/components/PageTitle'
import { components } from '@app/slices'
import { GenreDocument, CollectionDocument } from '@app/types/custom-types'
import classes from '../Home/home.module.css'

interface GenreDocumentDataCollectionsItem {
  collection: CollectionDocument
}

export interface Props extends WithImagesBlurData<ILayoutConfig> {
  genre: GenreDocument
}

export const Genre: React.FC<Props> = ({ genre, settings, imagesBlurData }) => {
  const collections = genre.data
    .collections as GenreDocumentDataCollectionsItem[]

  return (
    <section className="container px-4">
      <PageTitle subTitle={''}>
        <PrismicText field={genre.data.title} />
      </PageTitle>
      <article className="md:container">
        <SliceZone slices={genre.data.slices} components={components} />
      </article>
      <div className="container px-4 sm:mt-32">
        {collections.length && (
          <>
            <section className={classes.collections}>
              {collections.map(collection => (
                <CollectionCard
                  key={collection.collection.uid}
                  collection={collection.collection}
                  seeCollectionText={settings.data.seeCollection}
                  isFloatTitle
                  className="group relative"
                  imagesBlurData={imagesBlurData}
                />
              ))}
            </section>
          </>
        )}
      </div>
    </section>
  )
}

export const getLayout: GetLayout<Props> = (page, pageProps) => {
  return (
    <Layout
      title={asText(pageProps.genre.data.title)}
      languages={pageProps.languages}
      documentAlternateLanguages={pageProps.documentAlternateLanguages}
      navigation={pageProps.navigation}
      settings={pageProps.settings}
    >
      {page}
    </Layout>
  )
}
