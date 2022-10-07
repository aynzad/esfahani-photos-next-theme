import { setPreviewData, redirectToPreviewURL } from '@prismicio/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { createPrismicClient } from '@app/helpers/create-prismic-client'
import { linkResolver } from '@app/helpers/link-resolver'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = createPrismicClient({ req })

  setPreviewData({ req, res })

  await redirectToPreviewURL({ req, res, client, linkResolver })
}
