import { useRef, useState, useCallback } from 'react'
import { asText } from '@prismicio/helpers'
import { PrismicText, SliceZone } from '@prismicio/react'
import Layout, { ILayoutConfig } from '@app/components/Layout'
import { PageTitle } from '@app/components/PageTitle'
import { PrismicNextImage } from '@app/components/Prismic'
import Slider, { SliderRef } from '@app/components/Slider'
import { imgixWatermarkParams } from '@app/helpers/configs'
import { setImageBlurData } from '@app/helpers/set-image-blur-data'
import { components } from '@app/slices'
import { CollectionDocument } from '@app/types/custom-types'

export interface Props extends WithImagesBlurData<ILayoutConfig> {
  collection: CollectionDocument
  subTitle?: string
}

export const Collection: React.FC<Props> = ({
  collection,
  imagesBlurData,
  subTitle
}) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const sliderRef = useRef<SliderRef>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const onChangeSlider = useCallback((slideNumber: number) => {
    setCurrentSlide(slideNumber + 1)
  }, [])
  const openModal = useCallback(
    (index: number) => {
      modalRef.current?.showModal()
      sliderRef.current?.move(index)
      document.body.style.overflow = 'hidden'
    },
    [modalRef, sliderRef]
  )

  const closeModal = () => {
    document.body.style.overflow = 'auto'
    modalRef.current?.close()
  }

  const handleModalKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.key === 'Escape' || e.keyCode === 27) {
      closeModal()
    }
    if (e.key === 'ArrowLeft' || e.keyCode === 37) {
      sliderRef.current?.prev()
    }
    if (e.key === 'ArrowRight' || e.keyCode === 39) {
      sliderRef.current?.next()
    }
  }
  return (
    <section className="container px-4">
      <PageTitle subTitle={subTitle}>
        <PrismicText field={collection.data.title} />
      </PageTitle>
      <article className="md:container">
        <SliceZone slices={collection.data.slices} components={components} />
      </article>
      {collection.data.gallery.length && (
        <section className="col-xs-12 my-16 columns-1 gap-16 md:columns-2 md:gap-12 lg:columns-3 lg:gap-16 xl:gap-24">
          {collection.data.gallery.map((image, index) => (
            <div
              onClick={() => {
                openModal(index)
              }}
              key={index}
              className="mb-16 w-full cursor-zoom-in border border-gray-100 md:mb-12 lg:mb-16 xl:mb-24"
            >
              <PrismicNextImage
                layout="responsive"
                className="w-full lg:hover:invert lg:hover:filter"
                field={image.image.thumb}
                {...setImageBlurData(image.image.thumb, imagesBlurData)}
              />
            </div>
          ))}
        </section>
      )}
      <dialog
        aria-modal="true"
        role="dialog"
        aria-label="gallery"
        onKeyDown={handleModalKeyDown}
        ref={modalRef}
        className="fixed m-0 h-[100vh] max-h-[none] w-[100vw] max-w-[none] overflow-hidden border-0 py-4 px-0 backdrop:bg-white"
      >
        <button
          type="button"
          tabIndex={3}
          aria-label="close modal"
          className="absolute top-4 right-4 h-8 w-8"
          onClick={closeModal}
        >
          <span className="absolute top-1/2 right-0 inline-block h-[1px] w-8 origin-center -translate-y-1/2 rotate-45 bg-slate-700"></span>
          <span className="absolute top-1/2 right-0 inline-block h-[1px] w-8 origin-center -translate-y-1/2 -rotate-45 bg-slate-700"></span>
        </button>
        <h2 className="mb-2 text-center text-2xl sm:text-2xl md:mb-4 md:text-4xl lg:mb-10 lg:text-5xl">
          <PrismicText field={collection.data.title} />
        </h2>
        <div className="relative mx-auto">
          <Slider onChange={onChangeSlider} ref={sliderRef}>
            {collection.data.gallery.map((image, index) => (
              <div
                key={index}
                className="h-[calc(100vh-100px)] w-full md:h-[calc(100vh-115px)] lg:h-[calc(100vh-156px)] "
              >
                <PrismicNextImage
                  layout="fill"
                  objectFit="contain"
                  className="select-none"
                  field={image.image.large}
                  imgixParams={imgixWatermarkParams}
                  quality={100}
                  {...setImageBlurData(image.image.large, imagesBlurData)}
                />
              </div>
            ))}
          </Slider>
        </div>
        {!!currentSlide && (
          <p className="mt-2 text-center lg:mt-3">
            {currentSlide}/{collection.data.gallery.length}
          </p>
        )}
      </dialog>
    </section>
  )
}

export const getLayout: GetLayout<Props> = (page, pageProps) => {
  return (
    <Layout
      title={asText(pageProps.collection.data.title)}
      languages={pageProps.languages}
      documentAlternateLanguages={pageProps.documentAlternateLanguages}
      navigation={pageProps.navigation}
      settings={pageProps.settings}
    >
      {page}
    </Layout>
  )
}
