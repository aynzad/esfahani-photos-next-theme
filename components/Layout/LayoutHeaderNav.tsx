import { asText } from '@prismicio/helpers'
import { PrismicLink, PrismicText } from '@prismicio/react'
import classes from './Layout.module.css'
import LayoutHeaderNavLang from './LayoutHeaderNavLang'
import type { ILayoutConfig } from './index'

interface Props extends Omit<ILayoutConfig, 'settings'> {
  menuListClassName?: string
}
const LayoutHeaderNav: React.FC<Props> = ({
  navigation,
  languages,
  documentAlternateLanguages,
  menuListClassName
}) => {
  return (
    <nav className="container flex flex-row flex-nowrap justify-between">
      <ul className={menuListClassName}>
        {navigation.data?.links
          .slice(0, (navigation.data.links.length + 1) / 2)
          .map(item => (
            <li key={asText(item.label)} className={classes.menuItem}>
              <PrismicLink field={item.link}>
                <PrismicText field={item.label} />
              </PrismicLink>
            </li>
          ))}
      </ul>
      <ul className={menuListClassName}>
        {navigation.data?.links
          .slice((navigation.data.links.length + 1) / 2)
          .map(item => (
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
  )
}

export default LayoutHeaderNav
