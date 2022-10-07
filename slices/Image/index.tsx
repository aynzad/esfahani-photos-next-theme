import { isFilled } from '@prismicio/helpers'
import { PrismicRichText } from '@prismicio/react'
import clsx from 'clsx'
import { PrismicNextImage } from '@app/components/Prismic'
import { ImageSlice } from '@app/types/custom-types'

interface Props {
  slice: ImageSlice
}
const Image: React.FC<Props> = ({ slice }) => {
  const image = slice.primary.image

  return (
    <>
      <figure
        className={clsx(
          'grid grid-cols-1 gap-8 pb-6 text-center',
          slice.variation === 'wide' ? 'widest' : 'base',
          slice.primary.className
        )}
      >
        {isFilled.image(image) && (
          <div>
            <PrismicNextImage
              layout="fixed"
              className={clsx(slice.variation === 'round' && 'rounded-[50%]')}
              field={image}
            />
          </div>
        )}
        {isFilled.richText(slice.primary.caption) && (
          <figcaption className="text-center font-serif italic tracking-tight text-slate-500">
            <PrismicRichText field={slice.primary.caption} />
          </figcaption>
        )}
      </figure>
    </>
  )
}

export default Image
