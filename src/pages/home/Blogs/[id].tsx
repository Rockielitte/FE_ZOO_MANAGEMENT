import LoadingScreen from '@/components/Loading'
import Error from '@/pages/Error'
import useQueryCustom from '@/hooks/useQueryCustom'
import { NewType } from '@/types'
import { getContent, getDate } from '@/lib/utils'
import { useParams, useNavigate } from 'react-router-dom'
import EditorOutput from '@/components/EditorOutpu'
import BgBlog from '@/assets/background/SWP.png'

export default function BlogDetail() {
  const navigate = useNavigate()
  const id = useParams().id
  const new_data = useQueryCustom<NewType, NewType>({
    query: `/news/${id}`,
    queryKey: ['newDetail', String(id)],
    dataRes: {} as NewType,
    data: {} as NewType
  })
  const newDetail = new_data.data as NewType
  return (
    <div className='relative flex w-full min-h-screen  backdrop-blur-lg'>
      <img
        src={BgBlog}
        alt='background'
        className='relative top-0 left-0 right-0 bottom-0 z-5 object-cover min-h-screen'
      />

      <div className='fixed inset-0 flex justify-center sm:px-8 top-32'>
        <div className='flex w-full max-w-7xl lg:px-8 z-7 min-h-full'>
          <div className='w-full bg-green-300  ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20'></div>
        </div>
      </div>
      <div className='fixed flex w-full flex-col z-10 min-h-screen'>
        <main className='flex-auto'>
          <div className='sm:px-8 mt-36 sm:mt-44 min-h-full mb-36'>
            <div className='mx-auto w-full max-w-7xl lg:px-8'>
              <div className='relative px-4 sm:px-8 lg:px-12'>
                <div className='mx-auto max-w-2xl lg:max-w-5xl'>
                  <div className='xl:relative'>
                    <div className='mx-auto max-w-2xl'>
                      <button
                        type='button'
                        aria-label='Go back to articles'
                        onClick={() => navigate(-1)}
                        className='group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0'
                      >
                        <svg
                          viewBox='0 0 16 16'
                          fill='none'
                          aria-hidden='true'
                          className='h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400'
                        >
                          <path
                            d='M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5'
                            stroke-width='1.5'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          ></path>
                        </svg>
                      </button>
                      {new_data.isError ? (
                        <Error />
                      ) : !new_data.isLoading ? (
                        <article>
                          <header className='flex flex-col'>
                            <h1 className='my-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'>
                              {newDetail?.title}
                            </h1>
                            <div className='order-first flex items-center  gap-2 text-base text-zinc-400 dark:text-zinc-500'>
                              <div className=''>{!newDetail?.author ? 'Unknown' : newDetail.author.email}</div>
                              <time dateTime={getDate(newDetail?.postedAt)} className=' flex items-center text-base'>
                                <span className='h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500'></span>
                                <span className='ml-3'>{getDate(newDetail?.postedAt)}</span>
                              </time>
                            </div>
                          </header>
                          <EditorOutput content={getContent(newDetail?.content)} />
                        </article>
                      ) : (
                        <LoadingScreen></LoadingScreen>
                      )}
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
