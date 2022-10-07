import { getPlaiceholder } from 'plaiceholder'
import { defaultImageBlurData } from '@app/helpers/configs'

export async function getImagesBlurData(
  images: string[]
): Promise<ImagesBlurData> {
  const imagesBlurData: ImagesBlurData = {}

  for (const url of images) {
    if (url) {
      const { base64 } = await getPlaiceholder(url)
      imagesBlurData[url] = base64
    } else {
      imagesBlurData[url] = defaultImageBlurData
    }
  }

  return imagesBlurData
}
