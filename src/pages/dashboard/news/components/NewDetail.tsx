/* eslint-disable react-refresh/only-export-components */
import { loaderNewDetail } from '@/lib/loader/NewsLoader'
import New from '@/utils/api/New'
import { useQuery } from 'react-query'
import { useLoaderData, useParams } from 'react-router-dom'
import EditorOutput from '@/components/EditorOutpu'
import { format } from 'date-fns'
export const newDetailQuery = (slug?: string) => ({
  queryKey: ['news', 'newDetail', slug],
  queryFn: async () => New.getNewDetail(slug)
})

const NewsDetail = () => {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loaderNewDetail>>>
  const { id } = useParams()
  // ⬇️ useQuery as per usual
  const { data: newDetail } = useQuery({
    ...newDetailQuery(id),
    initialData
  })
  const getContent = (content: string) => JSON.parse(content)
  console.log('newDetail: ' + newDetail.postedAt)
  const getDate = (postedAt: string) => {
    const date = new Date(postedAt)
    return format(date, 'PPP')
  }

  return (
    <div className='w-full h-full border rounded-md shadow-md flex flex-col p-2 gap-2'>
      <div className='flex-1 overflow-auto p-5'>
        <header className='flex flex-col'>
          <h1 className='mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'>
            {newDetail?.title}
          </h1>
          <div className='order-first flex items-center  gap-2 text-base text-zinc-400 dark:text-zinc-500'>
            <div className=''>
              {!newDetail?.author ? 'Unknown' : <> {newDetail.author?.fname + ' ' + newDetail.author?.lname} </>}
            </div>
            <time dateTime={getDate(newDetail?.postedAt)} className=' flex items-center text-base'>
              <span className='h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500'></span>
              <span className='ml-3'>{getDate(newDetail?.postedAt)}</span>
            </time>
          </div>
        </header>
        <EditorOutput content={getContent(newDetail?.content)} />
      </div>
    </div>
  )
}

export default NewsDetail
