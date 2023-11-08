import { QueryClientProvider } from 'react-query'
import router, { queryClient } from './routes'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import LoadingScreen from './components/Loading'

import { MantineProvider } from '@mantine/core'
import '@mantine/dates/styles.css'
const App = () => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
        </ThemeProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}
export default App
