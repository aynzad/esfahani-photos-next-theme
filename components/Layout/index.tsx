import React, { Fragment, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { asText } from '@prismicio/helpers'
import type { Language } from '@prismicio/types'
import clsx from 'clsx'
import { useWindowScroll } from 'react-use'
import { NavigationDocument, SettingsDocument } from '@app/types/custom-types'
import classes from './Layout.module.css'
import LayoutFooter from './LayoutFooter'
import LayoutHeader from './LayoutHeader'

export interface ILayoutConfig {
  navigation: NavigationDocument
  settings: SettingsDocument
  languages: Language[]
  documentAlternateLanguages: string[]
}
export interface Props extends ILayoutConfig {
  title?: string
}

const Layout: React.FC<WithChildren<Props>> = ({
  children,
  title,
  languages,
  settings,
  documentAlternateLanguages,
  navigation
}) => {
  const router = useRouter()
  const shouldAnimate = router.pathname === '/'
  const { y: scrollY } = useWindowScroll()

  const scrolled = useMemo(() => {
    return !shouldAnimate || !!scrollY
  }, [shouldAnimate, scrollY])

  const scrollDown = () => {
    window.scrollTo({ top: 1 })
  }

  return (
    <>
      <Head>
        {languages
          .filter(lang => router.locale !== lang.id)
          .map(lang => (
            <Fragment key={lang.id}>
              {documentAlternateLanguages.includes(lang.id) ? (
                <link
                  rel="alternate"
                  href={router.pathname}
                  hrefLang={lang.id}
                />
              ) : (
                <link rel="alternate" href={`/${lang.id}`} hrefLang={lang.id} />
              )}
            </Fragment>
          ))}
        <title>
          {(title ? `${title} | ` : '') + asText(settings.data.name)}
        </title>
      </Head>
      <LayoutHeader
        isHero={!scrolled}
        settings={settings}
        navigation={navigation}
        languages={languages}
        documentAlternateLanguages={documentAlternateLanguages}
      />
      <main
        className={clsx({
          [classes.main]: true,
          [classes.main__hero]: !scrolled
        })}
      >
        <div className="text-center">
          <button
            onClick={scrollDown}
            type="button"
            className={clsx({
              [classes.scrollIcon]: true,
              [classes.scrollIcon__hero]: !scrolled
            })}
          >
            <span>↓</span>
          </button>
        </div>
        {children}
      </main>
      <LayoutFooter settings={settings} />
    </>
  )
}

export default Layout
