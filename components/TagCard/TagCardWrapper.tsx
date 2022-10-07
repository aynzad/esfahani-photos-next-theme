import { memo } from 'react'
import { PrismicLink } from '@prismicio/react'
import { SettingsDocumentDataTagsItem } from '@app/types/custom-types'

interface Props {
  link: SettingsDocumentDataTagsItem['link']
}

export const TagCardWrapper: React.FC<WithChildren<Props>> = memo(
  ({ link, children }) => {
    if (link.link_type !== 'Any') {
      return <PrismicLink field={link}>{children}</PrismicLink>
    }
    return <>{children}</>
  }
)

TagCardWrapper.displayName = 'TagCardWrapper'
