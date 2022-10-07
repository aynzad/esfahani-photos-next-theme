import { isFilled } from '@prismicio/helpers'
import { PrismicRichText } from '@prismicio/react'
import { TextSlice } from '@app/types/custom-types'

interface Props {
  slice: TextSlice
}
const Text: React.FC<Props> = ({ slice }) => {
  return (
    <>
      {isFilled.richText(slice.primary.text) && (
        <div className="mx-auto max-w-4xl font-serif leading-relaxed md:text-xl md:leading-relaxed">
          <PrismicRichText field={slice.primary.text} />
        </div>
      )}
    </>
  )
}

export default Text
