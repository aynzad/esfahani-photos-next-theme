import { getRepositoryName } from '@prismicio/client'
import { PrismicNextImageProps } from '@prismicio/next'

export const apiEndpoint = process.env.API_ENDPOINT || ''

export const repositoryName = getRepositoryName(apiEndpoint)

export const pagesRevalidate = +(process.env.PAGES_REVALIDATE_S || '') || 60

export const defaultImageBlurData =
  process.env.DEFAULT_IMAGE_BLUR_DATA ||
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVR4nGNgYGBQkhEX5ONhZmZmyEmM2T6tbEp3OwMDA8PLc2v+fz86tzHRTFWaYfbMqTn5+bVp7vMKvQBvVxHFn86fVQAAAABJRU5ErkJggg=='

export const imageWatermarkUrl = process.env.NEXT_PUBLIC_IMAGE_WATERMARK_URL

export const imgixWatermarkParams: PrismicNextImageProps['imgixParams'] =
  imageWatermarkUrl
    ? {
        markPad: 250,
        mark: imageWatermarkUrl,
        markTile: 'grid',
        crop: ['edges'],
        markRot: 35,
        markW: 160,
        markH: 50,
        markFit: 'clip',
        markAlpha: 25,
        fit: 'crop'
      }
    : undefined
