import { memo } from 'react'
import Link from 'next/link'
import router from 'next/router'
import { PrismicText } from '@prismicio/react'
import clsx from 'clsx'
import { PrismicNextImage } from '@app/components/Prismic'
import { setImageBlurData } from '@app/helpers/set-image-blur-data'
import { CollectionDocument } from '@app/types/custom-types'

interface Props {
  collection: CollectionDocument
  seeCollectionText: Nullable<string>
  isFloatTitle?: boolean
  imageSize?: 'thumb' | 'long'
}

export const CollectionCard: React.FC<
  WithClassName<WithImagesBlurData<Props>>
> = memo(
  ({
    collection,
    imagesBlurData,
    seeCollectionText = '...',
    isFloatTitle = false,
    className = '',
    imageSize = 'long'
  }) => {
    return (
      <figure
        onClick={() => {
          router.push(`/collections/${collection.uid}`)
        }}
        className={clsx(
          className,
          isFloatTitle && 'group',
          'flex cursor-pointer flex-col'
        )}
      >
        <div className="border border-gray-100">
          <PrismicNextImage
            priority
            layout="responsive"
            className="lg:hover:invert lg:hover:filter"
            field={collection.data.featuredImage[imageSize]}
            {...setImageBlurData(
              collection.data.featuredImage[imageSize],
              imagesBlurData
            )}
          />
        </div>
        {isFloatTitle && (
          <h2 className="not-sr-only pointer-events-none top-[50%] left-0 z-50 hidden w-full -translate-y-1/2 select-none text-center text-5xl font-bold text-gray-500 opacity-0 mix-blend-difference group-hover:opacity-100 lg:fixed lg:text-6xl xl:text-8xl">
            <PrismicText field={collection.data.title} />
          </h2>
        )}

        <div className="mt-2 flex justify-between">
          <figcaption className="text-start text-sm">
            <PrismicText field={collection.data.title} />
          </figcaption>

          <Link href={`/collections/${collection.uid}`}>
            <a className="mt-[2px] whitespace-nowrap text-end text-xs text-gray-600">
              {seeCollectionText}
            </a>
          </Link>
        </div>
      </figure>
    )
  }
)

CollectionCard.displayName = 'CollectionCard'
