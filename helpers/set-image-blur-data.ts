import type { ImageProps } from 'next/image'
import type {
  EmptyImageFieldImage,
  FilledImageFieldImage
} from '@prismicio/types'
import { defaultImageBlurData } from '@app/helpers/configs'

export function setImageBlurData(
  image: EmptyImageFieldImage | FilledImageFieldImage,
  imagesBlurData: Nullable<ImagesBlurData>
): Pick<ImageProps, 'placeholder' | 'blurDataURL'> {
  const hasBlurData = imagesBlurData && image.url && imagesBlurData[image.url]
  return {
    placeholder: 'blur',
    blurDataURL:
      (hasBlurData && imagesBlurData[image.url]) || defaultImageBlurData
  }
}
