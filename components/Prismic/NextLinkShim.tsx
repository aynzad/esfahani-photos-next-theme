import Link from 'next/link'
import type { LinkProps } from '@prismicio/react'

export const NextLinkShim: React.ElementType<LinkProps> = ({
  children,
  ...props
}) => {
  return (
    <Link {...props}>
      <a>{children}</a>
    </Link>
  )
}
