import { Link } from 'react-router-dom'
import Img403 from '@/assets/background/403NoBackground.png'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
const Error403 = () => {
  return (
    <div className='grid h-screen px-4 bg-white place-content-center'>
      <div className='text-center flex items-center justify-center flex-col '>
        <div className='h-[50%]'>
          <img src={Img403} alt='403 page' className='w-full h-full ' />
        </div>

        <h1 className='font-black text-gray-200 sm:text-7xl lg:text-9xl'>403</h1>

        <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Uh-oh!</p>

        <p className='my-4 text-gray-500 '>
          You do not have permission to access this page. How did you get here as a mystery? But you can click the
          button below to go back to the homepage.
        </p>

        <Link to='/dashboard' className={cn(buttonVariants({ variant: 'default' }))}>
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default Error403
