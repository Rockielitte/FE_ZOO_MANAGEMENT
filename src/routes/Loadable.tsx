import { FC, lazy, Suspense } from 'react'
import LoadingScreen from '../components/Loading'

interface LoadableProps {
  loader: () => Promise<{ default: React.ComponentType }>
}

const Loadable: FC<LoadableProps> = ({ loader }) => {
  const Component = lazy(loader)

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component />
    </Suspense>
  )
}

export default Loadable
