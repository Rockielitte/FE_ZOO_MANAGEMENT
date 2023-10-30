import { FC } from 'react'
import Banner from './banner/Banner'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import Lin from '@/assets/image14.png'
import logo from '@/assets/logo/dark.svg'
import { Icons } from '@/components/Icon'
import Elephant from '@/assets/elephant1.png'
import Banner2 from '@/assets/background/SWP2.png'
import Banner3 from '@/assets/background/SWP1.png'
interface HomeProps {}
const Home: FC<HomeProps> = () => {
  console.log('Home')

  // const { setTheme } = useTheme()

  return (
    <div className='w-full h-full'>
      <Banner />

      <div className='flex flex-col items-center pt-14'>
        <h1 className='mt-4 text-7xl font-bold tracking-tight text-green-600 sm:text-7xl items-center'>
          About Our Zoo
        </h1>

        <div className='flex justify-center items-center self-stretch flex-1 p-24 gap-16'>
          <div className='flex flex-col items-start gap-20 w-[915px] h-[690px]'>
            <p className='mt-4 text-3xl leading-9 text-justify tracking-tight text-black self-stretch'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu sem a felis porta eleifend. Sed
              fringilla diam sed sem egestas lacinia. Morbi ornare eget ante id efficitur Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Aliquam eu sem a felis porta eleifend. Sed fringilla diam sed sem egestas
              lacinia. Morbi ornare eget ante id efficitur
            </p>

            <div className='flex justify-center items-center gap-7'>
              <div className='border-2 rounded-3xl bg-lime-500 w-[285px] h-[392px] flex flex-col justify-end gap-14 items-center mt-4 pt-12'>
                <div className='flex flex-col justify-center items-center'>
                  <Icons.feedingTheAnimalLogo />
                  <p className='text-4xl font-semibold text-white overflow-auto text-center p-4'>Feeding The Animal</p>
                </div>
                <div className='border-0 rounded-xl bg-green-600 w-[162px] h-[21px] align-bottom'></div>
              </div>

              <div className='border-2 rounded-3xl bg-green-600 w-[285px] h-[392px] flex flex-col justify-end gap-14 items-center mt-4 pt-12'>
                <div className='flex flex-col justify-center items-center px-6'>
                  <Icons.animalShowLogo />
                  <p className='text-4xl font-semibold text-white overflow-auto text-center p-4'>Animal Show</p>
                </div>
                <div className='border-0 rounded-xl bg-lime-500 w-[162px] h-[21px] align-bottom'></div>
              </div>

              <div className='border-2 rounded-3xl bg-lime-500 w-[285px] h-[392px] flex flex-col justify-end gap-14 items-center mt-4 pt-12'>
                <div className='flex flex-col justify-center items-center px-2'>
                  <Icons.takeAPhotoLogo />
                  <p className='text-4xl font-semibold text-white overflow-auto text-center p-4'>Taking a Photo</p>
                </div>
                <div className='border-0 rounded-xl bg-green-600 w-[162px] h-[21px] align-bottom'></div>
              </div>
            </div>
          </div>

          <div className='relative w-[726px] h-[726px]'>
            <img src={Elephant} alt='' />
            <Icons.leafUp className='absolute -bottom-40 -left-10 w-64' />
            <Icons.leafDown className='absolute -top-40 -right-10 w-56' />
          </div>
        </div>
      </div>

      <img src={Banner2} alt='' className='w-full pt-10' />

      <div className='flex flex-col items-center pt-14'>
        <h1 className='mt-4 text-7xl font-bold tracking-tight text-green-600 sm:text-7xl items-center'>
          Ticket Price List
        </h1>

        <div className='relative flex justify-center items-center gap-40 pt-14'>
          <div className='border-2 rounded-3xl bg-lime-500 w-[522px] h-[725px] flex flex-col justify-between gap-14 items-center mt-4 pt-12'>
            <p className='text-9xl font-bold text-white text-center pt-8'>$33</p>

            <div className=''>
              <p className='text-7xl font-semibold text-white text-center p-4'>Child</p>
              <p className='text-4xl font-normal text-white text-center p-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu sem a felis porta eleifend. Sed
                fringilla diam sed sem egestas lacinia.{' '}
              </p>
            </div>

            <div className='border-0 rounded-xl bg-green-600 w-[162px] h-[21px] align-bottom'></div>
            <Icons.leafUp className='absolute -bottom-18 -left-36 w-64' />
          </div>

          <div className='border-2 rounded-3xl bg-green-600 w-[522px] h-[725px] flex flex-col justify-between gap-14 items-center mt-4 pt-12'>
            <p className='text-9xl font-bold text-white text-center pt-8'>$45</p>

            <div className=''>
              <p className='text-7xl font-semibold text-white text-center p-4'>Adult</p>
              <p className='text-4xl font-normal text-white text-center p-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu sem a felis porta eleifend. Sed
                fringilla diam sed sem egestas lacinia.{' '}
              </p>
            </div>

            <div className='border-0 rounded-xl bg-lime-500 w-[162px] h-[21px] align-bottom'></div>
          </div>

          <div className='relative border-2 rounded-3xl bg-lime-500 w-[522px] h-[725px] flex flex-col justify-between gap-14 items-center mt-4 pt-12'>
            <p className='text-9xl font-bold text-white text-center pt-8'>$45</p>

            <div className=''>
              <p className='text-7xl font-semibold text-white text-center p-4'>Adult</p>
              <p className='text-4xl font-normal text-white text-center p-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu sem a felis porta eleifend. Sed
                fringilla diam sed sem egestas lacinia.{' '}
              </p>
            </div>

            <div className='border-0 rounded-xl bg-green-600 w-[162px] h-[21px] align-bottom'></div>
            <Icons.leafDown className='absolute -top-20 -right-10 w-56' />
          </div>
        </div>
      </div>

      <img src={Banner3} alt='' className='w-full pt-20' />

      <section id='newsletter' aria-label='Newsletter'>
        <div className='mx-auto px-20 sm:px-10 lg:px-20 p-4 pt-20 items-center align-middle flex justify-center'>
          <div className='bg-[url(@/assets/background/BgFooter.svg)] w-[1696px] h-[594px] relative -mx-4 overflow-hidden px-4 py-20 sm:-mx-6 sm:px-6 md:mx-0 md:rounded-5xl md:px-16 xl:px-24 xl:py-36 flex justify-center items-center align-middle'>
            {/* <img alt="" loading="lazy" width="919" height="1351" decoding="async" data-nimg="1" class="absolute left-1/2 top-0 translate-x-[-10%] translate-y-[-45%] lg:translate-x-[-32%]" style={{color:"transparent"}} src={Lin}/> */}

            <div className='relative mx-auto grid max-w-2xl grid-cols-1 gap-x-36 gap-y-20 xl:max-w-none xl:grid-cols-2'>
              <div>
                <p className='font-display text-6xl font-medium tracking-tighter text-slate-50 sm:text-6xl'>
                  Stay up to date
                </p>
                <p className='mt-4 text-2xl tracking-tight text-slate-50'>
                  Get updates on all of our events and be the first to get notified when tickets go on sale.
                </p>
              </div>
              <form>
                <h3 className='text-2xl font-semibold tracking-tight text-slate-50'>
                  Sign up to our newsletter
                  <span aria-hidden='true'>↓</span>
                </h3>

                <div className='mt-5 flex rounded-3xl bg-white py-2.5 pr-2.5 shadow-xl shadow-blue-900/5 focus-within:ring-2 focus-within:ring-blue-900'>
                  <input
                    type='email'
                    required
                    placeholder='Email address'
                    aria-label='Email address'
                    className='-my-2.5 flex-auto bg-transparent pl-6 pr-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none'
                  />
                  <button
                    className='inline-flex justify-center rounded-2xl bg-green-600 p-4 text-base font-semibold text-white hover:bg-green-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70'
                    type='submit'
                  >
                    <span className='sr-only sm:not-sr-only'>Sign up today</span>
                    <span className='sm:hidden'>
                      <svg aria-hidden='true' viewBox='0 0 24 24' className='h-6 w-6'>
                        <path
                          d='m14 7 5 5-5 5M19 12H5'
                          fill='none'
                          stroke='currentColor'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className='flex-none py-14'>
        <div className='mx-auto max-w-[77%] flex flex-col items-center justify-between md:flex-row'>
          <div className='flex items-center justify-between'>
            <Icons.darkLogo className='h-16 w-auto' />
            <p className='text-2xl font-bold text-black'>The Zoo</p>
          </div>

          <p className='mt-6 text-base text-slate-500 md:mt-0'>Copyright © DeceptiConf, LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
