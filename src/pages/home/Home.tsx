import { FC } from 'react'
import Banner from './banner/Banner'
import { Icons } from '@/components/Icon'
import Elephant from '@/assets/elephant1.png'
import Banner2 from '@/assets/background/SWP2.png'
import Banner3 from '@/assets/background/SWP1.png'
import { Carousel } from 'flowbite-react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
const images = [
  'https://cdn.mos.cms.futurecdn.net/HjFE8NKWuCmgfHCcndJ3rK-1200-80.jpg',
  'https://media.istockphoto.com/id/492611032/photo/the-african-king.jpg?s=612x612&w=0&k=20&c=SPP0WTaFwSTmB_QX7WrWbVBPXiKTg4e8ArZrUAo2G6k=',
  'https://static.wixstatic.com/media/119740_c0df174c120f47e2a6928f13ee53f9c8~mv2.jpg/v1/fill/w_560,h_374,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Ryan%20Kilpatrick.jpg',
  'https://d1jyxxz9imt9yb.cloudfront.net/animal/219/meta_image/regular/20---IMG_0865_reduced.jpg',
  'https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg'
]
interface HomeProps {}
const Home: FC<HomeProps> = () => {
  // const { setTheme } = useTheme()

  return (
    <div className='w-full h-full bg-primary'>
      <Banner />

      <div className='flex flex-col items-center pt-14 bg-primary' id='about'>
        <h1 className='mt-4 text-7xl font-bold tracking-tight text-white sm:text-7xl items-center'>About Our Zoo</h1>

        <div className='flex justify-center items-center self-stretch flex-1 p-24 gap-16'>
          <div className='flex flex-col items-start gap-20 w-[915px] h-[690px]'>
            <p className='mt-4 text-3xl leading-9 text-justify text-white tracking-tight text-foreground self-stretch'>
              Step into a world where wildlife and wonder converge at TheZoo. As a bastion of nature's beauty and
              diversity, TheZoo stands as a beacon for animal lovers, families, and anyone with a thirst for knowledge
              about our planet's precious wildlife. We are thrilled to open our gates and welcome you into a space where
              every visit contributes to the greater good of conservation and education.
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
      <div>
        <img src={Banner2} alt='' className='w-full ' />
      </div>

      <div className='flex flex-col items-center mx-auto  max-w-7xl p-10' id='ticket'>
        <h1 className='mt-4 mb-10 text-7xl font-bold tracking-tight text-white sm:text-7xl items-center'>
          Exploring our Zoo
        </h1>

        <div className='relative mx-auto  h-screen w-full border rounded-[0.5rem]'>
          <Carousel
            className='w-full h-full'
            slideInterval={15000}
            leftControl={
              <AiOutlineLeft className='text-4xl text-primary p-2 active:ring-4 ring-primary text-white font-bold shadow-md bg-green-400 opacity-30 hover:opacity-100 transition-all rounded-full' />
            }
            rightControl={
              <AiOutlineRight className='text-4xl text-primary p-2 active:ring-4 ring-primary text-white font-bold shadow-md bg-green-400 opacity-30 hover:opacity-100 transition-all rounded-full' />
            }
          >
            {images?.map((item, index) => (
              <img key={index} alt='...' src={item} className='  w-full h-full object-cover ' />
            ))}
          </Carousel>
        </div>
      </div>

      <img src={Banner3} alt='' className='w-full ' />

      <section id='contact' aria-label='Newsletter'>
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
    </div>
  )
}

export default Home
