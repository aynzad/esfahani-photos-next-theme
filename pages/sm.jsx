/* istanbul ignore file */
import { SliceZone } from '@prismicio/react'
import { SliceSimulator } from '@prismicio/slice-simulator-react'
import state from '../.slicemachine/libraries-state.json'
import { components } from '../slices'

const SliceSimulatorPage = () => {
  return (
    <SliceSimulator
      sliceZone={({ slices }) => (
        <SliceZone slices={slices} components={components} />
      )}
      state={state}
    />
  )
}

export default SliceSimulatorPage

// Only include this page in development
export const getStaticProps = async () => {
  if (process.env.NODE_ENV === 'production') {
    return { notFound: true }
  } else {
    return { props: {} }
  }
}
