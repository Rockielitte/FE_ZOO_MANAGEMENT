import { QueryClientProvider } from 'react-query'
import router, { queryClient } from './routes'
import { RouterProvider } from 'react-router-dom'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
export default App
