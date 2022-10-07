import Link from 'next/link'
import { useRouter } from 'next/router'
import { getLanguageDisplayName } from '@app/helpers/get-language-display-name'
import type { ILayoutConfig } from './index'

const LayoutHeaderNavLang: React.FC<
  Pick<ILayoutConfig, 'languages' | 'documentAlternateLanguages'>
> = ({ languages, documentAlternateLanguages }) => {
  const router = useRouter()

  return (
    <>
      {languages
        .filter(lang => router.locale !== lang.id)
        .map(lang => (
          <span
            key={lang.id}
            className="after:px-2 after:content-['/'] last-of-type:after:hidden"
          >
            <>
              {documentAlternateLanguages.includes(lang.id) ? (
                <Link href={router.asPath} locale={lang.id}>
                  <a>{getLanguageDisplayName(lang.id)}</a>
                </Link>
              ) : (
                <Link href="/" locale={lang.id}>
                  <a>{getLanguageDisplayName(lang.id)}</a>
                </Link>
              )}
            </>
          </span>
        ))}
    </>
  )
}

export default LayoutHeaderNavLang
