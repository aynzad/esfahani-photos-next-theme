import { isFilled } from '@prismicio/helpers'
import { PrismicText } from '@prismicio/react'
import { QuoteSlice } from '@app/types/custom-types'

interface Props {
  slice: QuoteSlice
}
const Quote: React.FC<Props> = ({ slice }) => {
  return (
    <>
      {isFilled.richText(slice.primary.quote) && (
        <div className="my-8 mx-auto max-w-3xl text-3xl italic leading-relaxed">
          &ldquo;
          <PrismicText field={slice.primary.quote} />
          &rdquo;
          {isFilled.keyText(slice.primary.source) && (
            <> &mdash; {slice.primary.source}</>
          )}
        </div>
      )}
    </>
  )
}

export default Quote
