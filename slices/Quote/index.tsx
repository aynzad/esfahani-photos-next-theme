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
        <div className="my-8 mx-auto max-w-3xl text-3xl leading-relaxed">
          <span className="text-5xl">&ldquo;</span>
          <span className="italic">
            <PrismicText field={slice.primary.quote} />
          </span>
          <span className="text-5xl">&rdquo;</span>
          <br />
          {isFilled.keyText(slice.primary.source) && (
            <span className="bold text-2xl">&mdash;{slice.primary.source}</span>
          )}
        </div>
      )}
    </>
  )
}

export default Quote
