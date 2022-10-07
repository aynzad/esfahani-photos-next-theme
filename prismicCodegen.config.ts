import type { Config } from 'prismic-ts-codegen'

const config: Config = {
  output: './types/custom-types.ts',
  models: ['./customtypes/**/index.json', './slices/**/model.json']
}

export default config
