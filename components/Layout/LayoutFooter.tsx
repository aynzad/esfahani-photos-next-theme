import { memo } from 'react'
import { useRouter } from 'next/router'
import { PrismicText } from '@prismicio/react'
import { dateTimeFormat } from '@app/helpers/date-time-format'
import { SettingsDocument } from '@app/types/custom-types'

interface Props {
  settings: SettingsDocument
}

const LayoutFooter: React.FC<Props> = memo(({ settings }) => {
  const router = useRouter()
  const currentYear = dateTimeFormat(router.locale, {
    month: undefined,
    day: undefined,
    year: 'numeric'
  }).format(new Date())

  return (
    <footer className="mt-10 mb-8 px-2">
      <p className="text-center text-xs md:text-base">
        &copy; {currentYear} <PrismicText field={settings.data.name} />
        {'. '}
        <PrismicText field={settings.data.copyright} />
      </p>
    </footer>
  )
})

LayoutFooter.displayName = 'LayoutFooter'
export default LayoutFooter
