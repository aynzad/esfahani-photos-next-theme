import { memo } from 'react'
import clsx from 'clsx'

interface Props {
  subTitle?: string
}
export const PageTitle: React.FC<WithChildren<WithClassName<Props>>> = memo(
  ({ subTitle, children, className = '' }) => {
    return (
      <section className={clsx(className, 'mb-6 text-center sm:mb-12')}>
        <h1 className="text-3xl font-medium sm:text-5xl">{children}</h1>
        {subTitle && (
          <h3 className="mt-1 text-sm font-medium sm:text-lg">{subTitle}</h3>
        )}
      </section>
    )
  }
)

PageTitle.displayName = 'PageTitle'
