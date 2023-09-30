import { FC } from 'react'
import { useUserStore } from '../../stores'
interface HomeProps {}
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../../components/ui/button'
import { useTheme } from '@/components/theme-provider'
const Home: FC<HomeProps> = () => {
  console.log('Home')

  const { setTheme } = useTheme()

  return (
    <div className='min-h-[1280px]'>
      <h1 className='bg-red-500 md:bg-green-500 lg:bg-blue-500'>hhd</h1>
      <div>
        <Button className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}>tesst</Button>
      </div>

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
