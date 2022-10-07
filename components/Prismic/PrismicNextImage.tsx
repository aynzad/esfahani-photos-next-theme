import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { isFilled } from '@prismicio/helpers'
import type { ImageFieldImage } from '@prismicio/types'
import { buildURL, ImgixURLParams } from 'imgix-url-builder'

export type Props = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  field: ImageFieldImage | null | undefined
  imgixParams?: ImgixURLParams
  alt?: string
}

export const PrismicNextImage: React.FC<Props> = ({
  field,
  imgixParams = {},
  alt,
  layout,
  ...restProps
}) => {
  if (isFilled.imageThumbnail(field)) {
    const src = buildURL(field.url, imgixParams)

    return (
      <Image
        src={src}
        width={layout === 'fill' ? undefined : field.dimensions.width}
        height={layout === 'fill' ? undefined : field.dimensions.height}
        alt={alt ?? (field.alt || '')}
        layout={layout}
        {...restProps}
      />
    )
  } else {
    return null
  }
}

PrismicNextImage.displayName = 'PrismicNextImage'
