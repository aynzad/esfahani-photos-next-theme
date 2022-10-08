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
      <div className={clsx(className, 'absolute top-5 left-0 flex sm:hidden')}>
        <button
          type="button"
          onClick={toggleOpen}
          className="cursor-pointer space-y-1.5"
        >
          <span
            className={clsx(
              'block h-0.5 w-7 bg-gray-700 transition-transform',
              isOpen && '-translate-x-3'
            )}
          ></span>
          <span
            className={clsx(
              'block h-0.5 w-7 -translate-x-3 bg-gray-700 transition-transform',
              isOpen && '-translate-x-1'
            )}
          ></span>
          <span
            className={clsx(
              'block h-0.5 w-7 -translate-x-1 bg-gray-700 transition-transform',
              isOpen && '-translate-x-4'
            )}
          ></span>
        </button>
      </div>

      <nav className={clsx({ hidden: !isOpen })}>
        <ul className="container flex h-[calc(100vh-60px)] flex-col flex-nowrap gap-8 overflow-hidden pt-6">
          {navigation.data?.links.map(item => (
            <li
              key={asText(item.label)}
              className={clsx(classes.menuItem, classes.menuItemMobile)}
            >
              <PrismicLink field={item.link}>
                <PrismicText field={item.label} />
              </PrismicLink>
            </li>
          ))}
          <li className={clsx(classes.menuItem, classes.menuItemMobile)}>
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
