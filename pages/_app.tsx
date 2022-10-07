import { AppProps } from 'next/app'
import { PrismicPreview } from '@prismicio/next'
import { PrismicProvider } from '@prismicio/react'
import NextNProgress from 'nextjs-progressbar'
import { NextLinkShim, RichTextComponents } from '@app/components/Prismic'
import { repositoryName } from '@app/helpers/configs'
import { linkResolver } from '@app/helpers/link-resolver'

import '../styles/globals.css'

type AppWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={NextLinkShim}
      richTextComponents={RichTextComponents}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <NextNProgress
          color="#2d2d2d"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          showOnShallow={true}
        />
        {getLayout(<Component {...pageProps} />, pageProps)}
      </PrismicPreview>
    </PrismicProvider>
  )
}
