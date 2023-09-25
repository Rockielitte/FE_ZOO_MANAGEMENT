import { FC } from 'react'
import Banner from './banner/Banner'
interface HomeProps {}
const Home: FC<HomeProps> = () => {
  return (
    <div>
      <Banner />
    </div>
  )
}

export default Home
