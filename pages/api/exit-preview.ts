import { exitPreview } from '@prismicio/next'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  exitPreview({ res, req })
}
