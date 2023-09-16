import { FC } from 'react'
import { useUserStore } from '../../stores'
interface HomeProps {}
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../../components/ui/button'
import { useTheme } from '@/components/theme-provider'
const Home: FC<HomeProps> = () => {
  console.log('Home')
  const { increase, user } = useUserStore((state) => ({ increase: state.increase, user: state.user }))
  console.log('user: ', user)
  const { setTheme } = useTheme()

  return (
    <div className='min-h-[1280px]'>
      <div>
        <button type='button' onClick={() => increase({ name: '3', age: 4 })} className='bg-red-400'>
          submit
        </button>

        <Button className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}>tesst</Button>
      </div>

      {user && <div>{user.name}</div>}

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
