import { memo } from 'react'
import Link from 'next/link'
import { PrismicText } from '@prismicio/react'
import clsx from 'clsx'
import classes from './Layout.module.css'
import LayoutHeaderMobileNav from './LayoutHeaderMobileNav'
import LayoutHeaderNav from './LayoutHeaderNav'
import type { ILayoutConfig } from './index'

interface Props extends ILayoutConfig {
  isHero: boolean
}

const LayoutHeader: React.FC<Props> = memo(
  ({ settings, navigation, languages, documentAlternateLanguages, isHero }) => {
    return (
      <>
        <header
          className={clsx({
            [classes.header]: true,
            [classes.header__hero]: isHero
          })}
        >
          <h4
            className={clsx({
              [classes.description]: true,
              [classes.description__hero]: isHero
            })}
          >
            <PrismicText field={settings.data.description} />
          </h4>
          <h2
            className={clsx({
              [classes.title]: true,
              [classes.title__hero]: isHero
            })}
          >
            <Link href="/">
              <a className="hover:decoration-transparent focus:decoration-transparent">
                <PrismicText field={settings.data.name} />
              </a>
            </Link>
          </h2>

          <LayoutHeaderMobileNav
            navigation={navigation}
            languages={languages}
            documentAlternateLanguages={documentAlternateLanguages}
          />
          <LayoutHeaderNav
            menuListClassName={clsx({
              [classes.menuList]: true,
              [classes.menuList__hero]: isHero
            })}
            navigation={navigation}
            languages={languages}
            documentAlternateLanguages={documentAlternateLanguages}
          />
        </header>
      </>
    )
  }
)

LayoutHeader.displayName = 'LayoutHeader'

export default LayoutHeader
