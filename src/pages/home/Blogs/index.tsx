import LoadingScreen from '@/components/Loading'
import Error from '@/pages/Error'
import useQueryCustom from '@/hooks/useQueryCustom'
import { NewType } from '@/types'
import { getDate } from '@/lib/utils'
import { Link } from 'react-router-dom'
import BgBlog from '@/assets/background/SWP.png'
import { ScrollArea } from '@/components/ui/scroll-area'
export default function Blogs() {
  const new_data = useQueryCustom<NewType, []>({
    query: '/news/?status=PUBLISHED',
    queryKey: ['newGuests'],
    data: {} as NewType
  })
  const data = new_data.data as NewType[]

  return (
    <div className='relative flex w-full min-h-screen  backdrop-blur-lg'>
      <img src={BgBlog} alt='background' className='fixed   w-full  z-2 object-cover min-h-full' />
      <div className='fixed w-full  min-h-screen inset-0 flex justify-center sm:px-8 top-32'>
        <div className='flex w-full max-w-7xl lg:px-8 z-7 min-h-full'>
          <div className='w-full bg-green-300  ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20'></div>
        </div>
      </div>
      <div className='relative flex w-full flex-col z-10 min-h-screen h-full'>
        <main className='flex-auto h-full '>
          <div className='sm:px-8 mt-36 sm:mt-44 min-h-full mb-36'>
            <div className='mx-auto w-full max-w-7xl lg:px-8'>
              <div className='relative px-4 sm:px-8 lg:px-12'>
                <div className='mx-auto max-w-2xl lg:max-w-5xl'>
                  <header className='max-w-2xl'>
                    <h1 className='text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'>
                      Welcome to our blog, where we embark on an exciting adventure to explore the captivating world of
                      zoos.
                    </h1>
                    <p className='mt-6 text-base text-zinc-600 dark:text-zinc-400'>
                      Zoos have long been cherished as places where humans can connect with wildlife from all corners of
                      the globe. These remarkable establishments serve as both educational centers and conservation
                      sanctuaries, offering a unique opportunity to observe and learn about a diverse array of animal
                      species.
                    </p>
                  </header>
                  <div className='mt-16 sm:mt-20'>
                    <div className='md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40'>
                      <div className='flex max-w-3xl flex-col space-y-16'>
                        <ScrollArea className='min-h-full '>
                          {new_data.isError ? (
                            <Error />
                          ) : !new_data.isLoading ? (
                            data.length == 0 ? (
                              <div>News is empty</div>
                            ) : (
                              data.map((el: NewType, id: number) => {
                                return (
                                  <article className=' md:grid md:grid-cols-4 mb-5 md:items-baseline' key={id}>
                                    <div className='md:col-span-3 group relative flex flex-col items-start'>
                                      <h2 className='text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100'>
                                        <div className='absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl'></div>
                                        <Link to={`/blogs/${el.id}`}>
                                          <span className='absolute -inset-x-4 -inset-y-4 z-20 sm:-inset-x-6 sm:rounded-2xl'></span>
                                          <span className='relative z-10'>{el.title}</span>
                                        </Link>
                                      </h2>
                                      <time
                                        className='md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5'
                                        dateTime={getDate(el?.postedAt)}
                                      >
                                        <span
                                          className='absolute inset-y-0 left-0 flex items-center'
                                          aria-hidden='true'
                                        >
                                          <span className='h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500'></span>
                                        </span>
                                        <span className='ml-3'>{getDate(el?.postedAt)}</span>
                                      </time>
                                      <p className='relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
                                        we will peek into the fascinating lives of animals, delving into their
                                        remarkable characteristics and the extraordinary ways in which they navigate
                                        their environments. From the graceful movements of marine life in the depths of
                                        the ocean to the impressive feats of birds soaring through the sky, animals
                                        captivate us with their beauty, agility, and innate survival instincts.
                                      </p>
                                      <div
                                        aria-hidden='true'
                                        className='relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500'
                                      >
                                        Read article
                                        <svg
                                          viewBox='0 0 16 16'
                                          fill='none'
                                          aria-hidden='true'
                                          className='ml-1 h-4 w-4 stroke-current'
                                        >
                                          <path
                                            d='M6.75 5.75 9.25 8l-2.5 2.25'
                                            stroke-width='1.5'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                          ></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <time
                                      className='mt-1 hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500'
                                      dateTime={getDate(el?.postedAt)}
                                    >
                                      {getDate(el?.postedAt)}
                                    </time>
                                  </article>
                                )
                              })
                            )
                          ) : (
                            <LoadingScreen></LoadingScreen>
                          )}
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
// <div classNameName='w-full p-2  py-2 h-full shadow-2xl border rounded-md '>
//   {new_data.isError ? <Error /> : !new_data.isLoading ? <>this is news section</> : <LoadingScreen></LoadingScreen>}
// </div>
