import { createClient } from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'
import type { CreateClientConfig } from '@prismicio/next'
import { apiEndpoint } from '@app/helpers/configs'

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {CreateClientConfig} - A configuration object to
 */
export const createPrismicClient = (config: CreateClientConfig = {}) => {
  const client = createClient(apiEndpoint)

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req
  })

  return client
}
