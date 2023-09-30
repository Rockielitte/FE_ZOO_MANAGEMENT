import { FC } from 'react'
import Banner from './banner/Banner'
import { useTheme } from '@/components/theme-provider'
interface HomeProps {}
const Home: FC<HomeProps> = () => {
  const { setTheme } = useTheme()
  return (
    <div>
      <Banner />

      <button type='button' onClick={() => setTheme('light')}>
        light
      </button>
      <br />
      <button type='button' onClick={() => setTheme('dark')}>
        dark
      </button>
    </div>
  )
}

export default Home
