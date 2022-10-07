import { ILayoutConfig } from '@app/components/Layout'
import { createPrismicClient } from '@app/helpers/create-prismic-client'
import type { AllDocumentTypes } from '@app/types/custom-types'

export async function getLayoutConfig(
  client: ReturnType<typeof createPrismicClient>,
  locale?: string,
  document?: AllDocumentTypes
): Promise<ILayoutConfig> {
  const repository = await client.getRepository()
  const navigation = await client.getSingle('navigation', { lang: locale })
  const settings = await client.getSingle('settings', { lang: locale })

  return {
    navigation,
    settings,
    languages: repository.languages,
    documentAlternateLanguages:
      document?.alternate_languages.map(
        alternateLanguage => alternateLanguage.lang
      ) || []
  }
}
