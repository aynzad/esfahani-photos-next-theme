import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="scroll-smooth">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;700&family=Vazirmatn:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`
          }}
        />
      </Head>
      <body className="overflow-x-hidden pt-20 antialiased sm:pt-28">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
