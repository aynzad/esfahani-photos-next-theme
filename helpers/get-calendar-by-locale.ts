export const getCalendarByLocale = (locale: Optional<string>) => {
  const lang = locale ? locale.split('-')[0] : undefined

  switch (lang) {
    case 'fa':
      return 'persian'
    case 'he':
      return 'hebrew'
    case 'ar':
      return 'islamic-civil'
    case 'ja':
      return 'japanese'
    case 'zh':
      return 'chinese'
    case 'hi':
      return 'indian'
    default:
      return undefined
  }
}
