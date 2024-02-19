import { memo } from 'react'
import Link from 'next/link'
import router from 'next/router'
import { PrismicText } from '@prismicio/react'
import clsx from 'clsx'
import { PrismicNextImage } from '@app/components/Prismic'
import { setImageBlurData } from '@app/helpers/set-image-blur-data'
import { GenreDocument } from '@app/types/custom-types'

interface Props {
  genre: GenreDocument
  isFloatTitle?: boolean
  imageSize?: 'thumb' | 'long'
}

export const GenreCard: React.FC<WithClassName<WithImagesBlurData<Props>>> =
  memo(
    ({
      genre,
      imagesBlurData,
      isFloatTitle = false,
      className = '',
      imageSize = 'thumb'
    }) => {
      return (
        <figure
          onClick={() => {
            router.push(`/genres/${genre.uid}`)
          }}
          className={clsx(
            className,
            isFloatTitle && 'group',
            'mb-12 flex w-full cursor-pointer flex-col sm:w-80 md:mb-20'
          )}
        >
          <div className="border border-gray-100">
            <PrismicNextImage
              priority
              layout="responsive"
              className="transition duration-700 ease-in-out hover:ease-in-out lg:hover:grayscale lg:hover:filter"
              field={genre.data.featuredImage[imageSize]}
              {...setImageBlurData(
                genre.data.featuredImage[imageSize],
                imagesBlurData
              )}
            />
          </div>
          {isFloatTitle && (
            <h2 className="not-sr-only pointer-events-none top-[50%] left-0 z-50 hidden w-full -translate-y-1/2 select-none text-center text-5xl font-bold text-gray-500 opacity-0 mix-blend-difference group-hover:opacity-100 lg:fixed lg:text-6xl xl:text-8xl">
              <PrismicText field={genre.data.title} />
            </h2>
          )}

          <Link href={`/genres/${genre.uid}`}>
            <a className="mt-2 whitespace-nowrap text-center text-3xl font-normal text-gray-600">
              <PrismicText field={genre.data.title} />
            </a>
          </Link>
        </figure>
      )
    }
  )

GenreCard.displayName = 'GenreCard'
