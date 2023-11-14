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
              <div className='lg:text-[120px] text-white sm:text-8xl text-right'>
                Discover{' '}
                <span className='' style={{ fontFamily: 'Roboto Slab' }}>
                  TheZoo
                </span>
              </div>
              <span className='text-2xl text-right   text-lime-500'>A World of Animals in One Place!</span>
            </div>

            {/* fdsdf */}
            <div className='flex flex-col  gap-2 mr-20'>
              <p className='text-right text-white'>
                TheZoo is not just a place to see animals – it's a place to learn about them and help them. From
                interactive tours to hands-on conservation programs, every experience is a step toward understanding our
                planet’s precious wildlife.
              </p>
            </div>
          </div>
          <div className=''></div>
        </div>
      </div>
    </div>
  )
}

export default Banner
