import { FC } from 'react'
import Banner from './banner/Banner'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
interface HomeProps {}
const Home: FC<HomeProps> = () => {
  console.log('Home')

  const { setTheme } = useTheme()

  return (
    <div className='w-full h-full'>
      <h1 className='bg-red-50 xsm:bg-green-500 md:bg-blue-300'>dasf</h1>

      <div>
        <Button>tesst</Button>
      </div>

      <button type='button' onClick={() => setTheme('light')}>
        light
      </button>
      <br />
      <button type='button' onClick={() => setTheme('dark')}>
        dark
      </button>
        <Banner />
    </div>
  )
}

export default Home
