import { memo } from 'react'
import { isFilled } from '@prismicio/helpers'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicText, PrismicRichText } from '@prismicio/react'
import clsx from 'clsx'
import { setImageBlurData } from '@app/helpers/set-image-blur-data'
import { SettingsDocument } from '@app/types/custom-types'
import classes from './ContactBox.module.css'

interface Props {
  settings: SettingsDocument
}

const CONTACT_BOX_MAX_IMAGES_COUNT = 6

export const ContactBox: React.FC<WithClassName<WithImagesBlurData<Props>>> =
  memo(({ settings, imagesBlurData, className = '' }) => {
    return (
      <section className={clsx('mx-auto flex flex-col gap-6', className)}>
        {isFilled.richText(settings.data.contactBoxTitle) && (
          <h2 className="text-center text-3xl font-medium tracking-wider md:text-5xl">
            <PrismicText field={settings.data.contactBoxTitle} />
          </h2>
        )}

        {isFilled.richText(settings.data.contactBoxSubtitle) && (
          <h5 className="-mt-6 text-center text-2xl font-medium tracking-wider md:text-4xl">
            <PrismicText field={settings.data.contactBoxSubtitle} />
          </h5>
        )}
        {isFilled.richText(settings.data.profileCTA) && (
          <div className="text-center">
            <PrismicRichText field={settings.data.contactBoxCTA} />
          </div>
        )}

        {settings.data.contactBoxImages.length && (
          <section className={classes.images}>
            {settings.data.contactBoxImages
              .slice(0, CONTACT_BOX_MAX_IMAGES_COUNT)
              .map((image, index) => (
                <div key={index} className="relative flex-1">
                  <PrismicNextImage
                    layout="responsive"
                    field={image.image.square}
                    {...setImageBlurData(image.image.square, imagesBlurData)}
                  />
                </div>
              ))}
          </section>
        )}
      </section>
    )
  })

ContactBox.displayName = 'ContactBox'
