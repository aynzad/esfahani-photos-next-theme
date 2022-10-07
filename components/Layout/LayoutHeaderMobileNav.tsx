import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { asText } from '@prismicio/helpers'
import { PrismicLink, PrismicText } from '@prismicio/react'
import clsx from 'clsx'
import classes from './Layout.module.css'
import LayoutHeaderNavLang from './LayoutHeaderNavLang'
import type { ILayoutConfig } from './index'

const LayoutHeaderMobileNav: React.FC<
  WithClassName<Omit<ILayoutConfig, 'settings'>>
> = ({ navigation, languages, documentAlternateLanguages, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsOpen(false)
  }, [router.asPath, router.locale])

  const toggleOpen = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      <div className={clsx(className, 'absolute top-4 left-0 flex  sm:hidden')}>
        <button
          type="button"
          onClick={toggleOpen}
          className="cursor-pointer space-y-2"
        >
          <span
            className={clsx(
              'block h-0.5 w-8 bg-gray-700 transition-transform',
              isOpen && '-translate-x-5'
            )}
          ></span>
          <span
            className={clsx(
              'block h-0.5 w-8 -translate-x-3 bg-gray-700 transition-transform',
              isOpen && '-translate-x-5'
            )}
          ></span>
          <span
            className={clsx(
              'block h-0.5 w-8 -translate-x-1 bg-gray-700 transition-transform',
              isOpen && '-translate-x-5'
            )}
          ></span>
        </button>
      </div>

      <nav className={clsx({ hidden: !isOpen })}>
        <ul className="container flex h-[calc(100vh-60px)] flex-col flex-nowrap justify-around">
          {navigation.data?.links.map(item => (
            <li key={asText(item.label)} className={classes.menuItem}>
              <PrismicLink field={item.link}>
                <PrismicText field={item.label} />
              </PrismicLink>
            </li>
          ))}
          <li className={classes.menuItem}>
            <LayoutHeaderNavLang
              languages={languages}
              documentAlternateLanguages={documentAlternateLanguages}
            />
          </li>
        </ul>
      </nav>
    </>
  )
}

export default LayoutHeaderMobileNav
