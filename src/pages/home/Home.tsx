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
      <Banner />
    </div>
  )
}

export default Home
