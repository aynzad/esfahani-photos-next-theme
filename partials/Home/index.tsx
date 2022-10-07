import Link from 'next/link'
import { isFilled } from '@prismicio/helpers'
import { PrismicRichText, PrismicText } from '@prismicio/react'
import { CollectionCard } from '@app/components/CollectionCard'
import { ContactBox } from '@app/components/ContactBox'
import Layout, { ILayoutConfig } from '@app/components/Layout'
import { PrismicNextImage } from '@app/components/Prismic'
import { TagCard } from '@app/components/TagCard'
import { setImageBlurData } from '@app/helpers/set-image-blur-data'
import { CollectionDocument } from '@app/types/custom-types'
import classes from './home.module.css'

export interface Props extends WithImagesBlurData<ILayoutConfig> {
  collections: CollectionDocument[]
}

export const Home: React.FC<Props> = ({
  collections,
  settings,
  imagesBlurData
}) => {
  return (
    <div className="container px-4 sm:mt-32">
      {collections.length && (
        <>
          <section className={classes.collections}>
            {collections.map(collection => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                seeCollectionText={settings.data.seeCollection}
                isFloatTitle
                className="group relative"
                imagesBlurData={imagesBlurData}
              />
            ))}
          </section>
          <Link href="/collections">
            <a className="mt-6 block w-full text-center text-lg lg:mt-24">
              {settings.data.seeAllCollection}
            </a>
          </Link>
        </>
      )}

      {settings.data.tags.length && (
        <section className="ltr mb-96 hidden grid-cols-2 gap-16 pb-28 pt-20 lg:grid">
          {settings.data.tags.map((tag, index) => (
            <TagCard
              key={index}
              index={index}
              tag={tag}
              imagesBlurData={imagesBlurData}
            />
          ))}
        </section>
      )}

      {isFilled.richText(settings.data.profileSummery) && (
        <section className="mx-auto my-20 flex max-w-5xl flex-col flex-nowrap gap-6 md:my-32 lg:my-40 lg:flex-row lg:gap-20">
          {isFilled.image(settings.data.profilePicture) && (
            <div className="basis-2/5">
              <PrismicNextImage
                layout="responsive"
                field={settings.data.profilePicture.square}
                {...setImageBlurData(
                  settings.data.profilePicture.square,
                  imagesBlurData
                )}
              />
            </div>
          )}
          <div className="basis-3/5">
            <h3 className="mb-6 font-medium sm:text-4xl">
              <PrismicText field={settings.data.profileTitle} />
            </h3>
            <PrismicRichText field={settings.data.profileSummery} />
            {isFilled.richText(settings.data.profileCTA) && (
              <div className="text-end">
                <PrismicRichText field={settings.data.profileCTA} />
              </div>
            )}
          </div>
        </section>
      )}

      <ContactBox settings={settings} imagesBlurData={imagesBlurData} />
    </div>
  )
}

export const getLayout: GetLayout<Props> = (page, pageProps) => {
  return (
    <Layout
      languages={pageProps.languages}
      documentAlternateLanguages={pageProps.documentAlternateLanguages}
      navigation={pageProps.navigation}
      settings={pageProps.settings}
    >
      {page}
    </Layout>
  )
}
