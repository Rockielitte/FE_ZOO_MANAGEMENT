import { FC } from 'react'

interface BannerProps {}

const Banner: FC<BannerProps> = () => {
  return (
    <div className='bg-[url(@/assets/background/BgCus2.png)] bg-no-repeat bg-cover bg-center sm:bg-right'>
      <div className='container max-w-7xl h-full min-h-screen mx-auto flex items-center justify-between gap-2 p-6 lg:px-8 pt-[140px]'>
        <div className='grid lg:grid-cols-2 sm:grid-cols-1 min-w-full '>
          <div className='flex flex-col justify-between gap-20'>
            {/* dfsf */}
            <div className='flex flex-col mr-20 border-r-4 p-3 border-white'>
              <div className='lg:text-[120px] sm:text-8xl text-right'>Animal</div>
              <span className='text-2xl text-right   text-lime-500'>Conservation</span>
            </div>

            {/* fdsdf */}
            <div className='flex flex-col  gap-2 mr-20'>
              <p className='text-right'>Animal Conservation </p>
              <span className='text-right text-slate-400'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam.
              </span>
            </div>
          </div>
          <div className=''></div>
        </div>
      </div>
    </div>
  )
}

export default Banner
