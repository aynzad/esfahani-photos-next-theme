import { getCalendarByLocale } from './get-calendar-by-locale'

export const dateTimeFormat = (
  locale: Optional<string>,
  options: Intl.DateTimeFormatOptions = {
    month: undefined,
    day: undefined,
    year: 'numeric'
  }
) => {
  return new Intl.DateTimeFormat(locale, {
    calendar: getCalendarByLocale(locale),
    ...options
  })
}
