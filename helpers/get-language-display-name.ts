export const getLanguageDisplayName = (
  locale: string,
  shouldShowRegion = false
) => {
  const lang = shouldShowRegion ? locale : locale.split('-')[0]
  const languageNames = new Intl.DisplayNames(lang, { type: 'language' })
  return languageNames.of(lang)
}
