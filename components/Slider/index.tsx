import React, {
  Children,
  isValidElement,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback
} from 'react'
import cn from 'clsx'
import { KeenSliderOptions, useKeenSlider } from 'keen-slider/react'
import classes from './Slider.module.css'
import 'keen-slider/keen-slider.min.css'

interface Props {
  onChange?: (index: number) => void
  children?: React.ReactNode[]
}

export interface SliderRef {
  move: (index: number) => void
  next: () => void
  prev: () => void
}

const Slider = forwardRef<SliderRef, WithClassName<Props>>(
  ({ onChange, children, className = '' }, ref) => {
    const [isMounted, setIsMounted] = useState(false)

    const getSliderOptions: () => KeenSliderOptions = useCallback(
      () => ({
        initial: 0,
        loop: true,
        slides: { perView: 1 },
        created: () => setIsMounted(true),
        slideChanged(s) {
          const slideNumber = s.track.details.rel
          onChange && onChange(slideNumber)
        }
      }),
      [onChange]
    )

    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
      getSliderOptions()
    )

    useImperativeHandle(ref, () => ({
      move: (index: number) => {
        // Update slider at start to fix loading issue on HTML dialogs
        slider.current?.update({ ...getSliderOptions(), initial: index })
        slider.current?.moveToIdx(index, true, { duration: 0 })
      },
      prev: onPrev,
      next: onNext
    }))

    const onPrev = React.useCallback(() => slider.current?.prev(), [slider])
    const onNext = React.useCallback(() => slider.current?.next(), [slider])

    return (
      <div className={cn(classes.root, className)}>
        <button
          aria-label="previous picture"
          tabIndex={1}
          className="absolute top-1/2 left-2 z-50 hidden h-16 w-16 -translate-y-1/2 rounded-full border bg-white/60 pt-1 text-center text-xl text-gray-600 lg:left-4 lg:block xl:left-6"
          onClick={onPrev}
        >
          ←
        </button>
        <button
          aria-label="next picture"
          tabIndex={2}
          className="absolute  top-1/2 right-2 z-50 hidden h-16 w-16 -translate-y-1/2 rounded-full border bg-white/60 pt-1 text-center text-xl text-gray-600 lg:right-4 lg:block xl:right-6"
          onClick={onNext}
        >
          →
        </button>
        <div
          ref={sliderRef}
          className={cn(
            classes.slider,
            { [classes.show]: isMounted },
            'keen-slider'
          )}
        >
          {Children.map(children, child => {
            // Add the keen-slider__slide className to children
            if (isValidElement(child)) {
              return {
                ...child,
                props: {
                  ...child.props,
                  className: `${
                    child.props.className ? `${child.props.className} ` : ''
                  }keen-slider__slide`
                }
              }
            }
            return child
          })}
        </div>
      </div>
    )
  }
)

Slider.displayName = 'Slider'
export default Slider
