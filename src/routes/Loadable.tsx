import { FC, lazy, Suspense } from 'react'
import LoadingScreen from '../components/Loading'

interface LoadableProps {
  loader: () => Promise<{ default: React.ComponentType<any> }>
}

const Loadable: FC<LoadableProps> = ({ loader }) => {
  const Component = lazy(loader)
  console.log('rerednerrajsdif')

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component />
    </Suspense>
  )
}

export default Loadable
