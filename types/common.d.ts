import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'

declare global {
  type ImagesBlurData = Record<string, string>

  type GetLayout<P = Record<string, unknown>> = (
    page: ReactElement,
    pageProps: P
  ) => ReactNode

  type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
    P,
    IP
  > & {
    getLayout?: GetLayout<P>
  }

  type WithChildren<P = unknown> = P & {
    children?: ReactNode
  }

  type WithClassName<P = unknown> = P & {
    className?: string
  }

  type WithImagesBlurData<P = unknown> = P & {
    imagesBlurData: Nullable<ImagesBlurData>
  }

  type Nullable<T> = T | null

  type Optional<T> = T | undefined

  type OptionalNullable<T> = Optional<T> | Nullable<T>

  type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
  > &
    {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

  type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
  > &
    {
      [K in Keys]-?: Required<Pick<T, K>> &
        Partial<Record<Exclude<Keys, K>, undefined>>
    }[Keys]
}

module '@prismic/next' {
  type PrismicNextImageProps = Omit<
    ImageProps,
    'src' | 'alt' | 'width' | 'height'
  > & {
    /**
     * The Prismic Image field or thumbnail to render.
     */
    field: prismicT.ImageFieldImage | null | undefined
    /**
     * An object of Imgix URL API parameters to transform the image.
     *
     * @see https://docs.imgix.com/apis/rendering
     */
    imgixParams?: ImgixURLParams
    /**
     * Declare an image as decorative by providing `alt=""`.
     *
     * See:
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt#decorative_images
     */
    alt?: string
    /**
     * Declare an image as decorative only if the Image field does not have
     * alternative text by providing `fallbackAlt=""`.
     *
     * See:
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt#decorative_images
     */
    fallbackAlt?: string
  }
}
