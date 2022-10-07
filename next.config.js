/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */
const { withPlaiceholder } = require('@plaiceholder/next')
const prismic = require('@prismicio/client')
const fetch = require('node-fetch')

const nextConfig = async () => {
  let locales = ['en-us']

  try {
    const client = prismic.createClient(process.env.API_ENDPOINT, {
      fetch
    })
    const repository = await client.getRepository()
    locales = repository.languages.map(lang => lang.id)
  } catch (e) {
    console.log(e)
  }

  return withPlaiceholder({
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.prismic.io'
        }
      ]
    },
    redirects: async () => {
      return [
        {
          source: '/admin',
          destination: `https://${prismic.getRepositoryName(
            process.env.API_ENDPOINT
          )}.prismic.io`,
          permanent: true
        }
      ]
    },
    i18n: {
      locales,
      defaultLocale: process.env.DEFAULT_LOCALE || locales[0]
    }
  })
}

module.exports = nextConfig
