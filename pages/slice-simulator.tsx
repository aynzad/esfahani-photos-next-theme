'use client'

import { SliceZone } from '@prismicio/react'
// eslint-disable-next-line import/no-unresolved
import { SliceSimulator } from '@slicemachine/adapter-next/simulator'
import { components } from '../slices'

export default function SliceSimulatorPage() {
  return (
    <SliceSimulator
      sliceZone={props => <SliceZone {...props} components={components} />}
    />
  )
}

// Only include this page in development
export const getStaticProps = async () => {
  if (process.env.NODE_ENV === 'production') {
    return { notFound: true }
  } else {
    return { props: {} }
  }
}
