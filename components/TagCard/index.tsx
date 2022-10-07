import { memo } from 'react'
import { PrismicNextImage } from '@prismicio/next'
import clsx from 'clsx'
import { setImageBlurData } from '@app/helpers/set-image-blur-data'
import { SettingsDocumentDataTagsItem } from '@app/types/custom-types'
import { TagCardWrapper } from './TagCardWrapper'

interface Props {
  tag: SettingsDocumentDataTagsItem
  index: number
}

export const TagCard: React.FC<WithClassName<WithImagesBlurData<Props>>> = memo(
  ({ tag, index, className, imagesBlurData }) => {
    return (
      <TagCardWrapper link={tag.link}>
        <figure
          className={clsx(
            className,
            'group relative w-56 translate-x-1/2 translate-y-1/2 select-none',
            tag.link.link_type !== 'Any' && 'cursor-pointer',
            index === 0 && 'left-[25%]',
            index === 1 && 'top-[70%] right-[-20%]',
            index === 2 && 'top-[50%] left-[75%]',
            index === 3 && 'top-[170%] right-[-10%]',
            index === 4 && 'top-[50%] left-[30%]'
          )}
        >
          <PrismicNextImage
            layout="responsive"
            field={tag.image.square}
            {...setImageBlurData(tag.image.square, imagesBlurData)}
          />
          {tag.name && (
            <figcaption
              className={clsx(
                'xl:tracking-extra absolute whitespace-nowrap font-light group-hover:text-gray-800 lg:tracking-wider',
                index === 0 &&
                  'left-[75%] top-[105%] text-left text-6xl text-gray-600',
                index === 1 &&
                  'orientation-mixed vertical-writing-lr right-[-30%] top-[15%] text-5xl text-gray-700',
                index === 2 &&
                  'right-[110%] top-[25%] text-right text-5xl text-gray-500',
                index === 3 && 'top-[105%] left-1 text-6xl text-gray-600',
                index === 4 &&
                  'orientation-mixed vertical-writing-lr left-[-35%] bottom-[5%] text-6xl text-gray-400'
              )}
            >
              {tag.name}
            </figcaption>
          )}
        </figure>
      </TagCardWrapper>
    )
  }
)

TagCard.displayName = 'TagCard'
